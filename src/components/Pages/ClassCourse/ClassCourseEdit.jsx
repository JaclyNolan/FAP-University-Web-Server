import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import { useParams } from 'react-router-dom';
const ClassCourseEdit = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [classCourseData, setClassCourseData] = useState({});
  const params = useParams();
  const class_course_id = params.id;
  const [isValidClassCourseId, setIsValidClassCourseId] = useState(false);

  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }
  async function fetchClassList(searchValue) {
    const url = '/class'
      + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
    console.log(url);

    try {
      const response = await axiosClient.get(url)
      const data = response.data.classes
      return data.map((info) => ({
        label: `${info.id} ${info.name} ${info.major_name}`,
        value: info.id,
      }))
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  }

  async function fetchCourseList(searchValue) {
    const url = '/courses'
      + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
    console.log(url);

    try {
      const response = await axiosClient.get(url)
      const data = response.data.courses
      return data.map((info) => ({
        label: `${info.id} ${info.name} ${info.major_name}`,
        value: info.id,
      }))
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  }

  async function fetchInstructorList(searchValue) {
    const url = '/instructors'
      + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
    console.log(url);

    try {
      const response = await axiosClient.get(url)
      const data = response.data.instructors
      return data.map((info) => ({
        label: `${info.id} ${info.full_name}`,
        value: info.id,
      }))
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  }

  useEffect(() => {
    setContentLoading(true);
    const fetchClassCourseData = async () => {
      try {
        const url = `/classCourses/edit-classCourse/${class_course_id}`
        const response = await axiosClient.get(url)
        console.log(response);
        const { instructor_id, instructor_name, course_id, course_name, class_id, class_name, major_id, major_name } = response.data.classCourse
        setClassCourseData({ id: class_course_id, instructor_id, course_id, class_id, major_id, class_name, major_name, course_name , instructor_name})
        setIsValidClassCourseId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchClassCourseData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        instructor_id: fields.instructor_id,
        course_id: fields.course_id,
        class_id: fields.class_id,
        major_id: fields.major_id,
      }
      console.log(data);
      await axiosClient.put('/classCourses/update-classCourse/' + class_course_id, data)
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
      {isValidClassCourseId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={classCourseData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Edit Class Course</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="id">Course ID</label>
                <Form.Item
                  name="id"
                  noStyle>
                  <Input id='id' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="class_id">Class Name</label>
                <Form.Item
                  name="class_name"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                  name="class_id"
                  noStyle
                  rules={[
                    { required: true, message: 'Please search & select a class ID' }
                  ]}>
                  <DebounceSelect
                    placeholder="Select Class ID"
                    key='class_id'
                    fetchOptions={fetchClassList} />
                </Form.Item>
              </div>
            </div>
            <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="course_id">Course:</label>
                <Form.Item
                  name="course_name"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                  name="course_id"
                  noStyle
                  rules={[
                    { required: true, message: 'Please search & select a course ID' }
                  ]}>
                  <DebounceSelect
                    placeholder="Select Course ID"
                    key='course_id'
                    fetchOptions={fetchCourseList} />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="instructor_id">Instructor ID</label>
                <Form.Item
                  name="instructor_name"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>

                <Form.Item
                  name="instructor_id"
                  noStyle
                  rules={[
                    { required: true, message: 'Please search & select a instructor ID' }
                  ]}>
                  <DebounceSelect
                    placeholder="Select Instructor ID"
                    key='instructor_id'
                    fetchOptions={fetchInstructorList} />
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

export default ClassCourseEdit