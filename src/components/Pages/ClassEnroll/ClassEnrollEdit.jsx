import React, { useContext, useEffect, useState } from 'react'
import { Button, Select, Input, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import { useParams } from 'react-router-dom';

const ClassEnrollEdit = () => {

  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [classEnrollmentData, setClassEnrollmentData] = useState({});
  const params = useParams();
  const class_enrollment_id = params.id;
  const [isValidClassEnrollmentId, setIsValidClassEnrollmentId] = useState(false);

  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  async function fetchStudentList(searchValue) {
    const url = '/students'
      + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
    console.log(url);

    try {
      const response = await axiosClient.get(url)
      const data = response.data.students
      return data.map((info) => ({
        label: `${info.id} ${info.full_name}`,
        value: info.id,
      }))
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  }

  async function fetchClassCourseList(searchValue) {
    const url = '/classCourses'
      + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
    console.log(url);

    try {
      const response = await axiosClient.get(url)
      const data = response.data.classCourses
      return data.map((info) => ({
        label: `${info.id} ${info.class_name} ${info.course_name}`,
        value: info.id,
      }))
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  }

  useEffect(() => {
    setContentLoading(true);
    const fetchClassEnrollmentData = async () => {
      try {
        const url = `/classEnrollments/edit-classEnrollment/${class_enrollment_id}`
        const response = await axiosClient.get(url)
        console.log(response);
        const { instructor_id, instructor_name, course_id, course_name, class_id, class_name, major_id, major_name, student_id, student_name, class_course_id } = response.data.classEnrollment
        setClassEnrollmentData({ id: class_enrollment_id, instructor_id, course_id, class_id, major_id, class_name, major_name, course_name, student_id, student_name, instructor_name, class_course_id })
        setIsValidClassEnrollmentId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchClassEnrollmentData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        class_course_id: fields.class_course_id,
        student_id: fields.student_id,
      }
      console.log(data);
      await axiosClient.put('/classEnrollments/update-classEnrollment/' + class_enrollment_id, data)
        .then((response) => {
          setSuccessMessage(response.data.message);
          setContentLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.error);
          setContentLoading(false);
        })
    })()
  }

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors)
    console.log(errorInfo);
  }

  return (
    <div>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      {isValidClassEnrollmentId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={classEnrollmentData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Add Student</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="id">Class Enrollment ID</label>
                <Form.Item
                  name="id"
                  noStyle>
                  <Input id='id' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="class">Class Name</label>
                <Form.Item
                  name="class_name"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="instructor_name">Teacher:</label>
                <Form.Item
                  name="instructor_name"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>
              </div>
            </div>
            <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="sid">Student ID</label>
                <Form.Item
                  name="student_id"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                  name="student_id"
                  noStyle
                  rules={[
                    { required: true, message: 'Please search & select a student ID' }
                  ]}>
                  <DebounceSelect
                    placeholder="Select Student ID"
                    key='student_id'
                    fetchOptions={fetchStudentList} />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="course">Course:</label>
                <Form.Item
                  name="course_name"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>
              </div>

              <div className={classes['add__form-row']}>
                <label htmlFor="class_course_id"> Class Course Input :</label>
                <Form.Item
                  name="class_course_id"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                  name="class_course_id"
                  noStyle
                  rules={[
                    { required: true, message: 'Please search & select a class course ID' }
                  ]}>
                  <DebounceSelect
                    placeholder="Select Class Course ID"
                    key='class_course_id'
                    fetchOptions={fetchClassCourseList} />
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
            <Form.Item>
              <Button type='primary' htmlType="submit">Submit</Button>
            </Form.Item>
          </div>
        </Form>
      }
    </div>
  )
}

export default ClassEnrollEdit