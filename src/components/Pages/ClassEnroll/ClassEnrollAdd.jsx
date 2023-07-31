import React, { useContext, useState } from 'react'
import { Button, Alert, Form, } from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';

const ClassEnrollAdd = () => {
  // const handleChange = (value) => {
  //     console.log(value);
  // }

  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
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

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        class_course_id: fields.class_course_id,
        student_id: fields.student_id,
      }
      console.log(data);
      await axiosClient.post('/classEnrollments/add-classEnrollment', data)
        .then((response) => {
          setSuccessMessage(response.data.message);
          setContentLoading(false);
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.error);
          setContentLoading(false);
        })
    })()
  }

  const resetForm = () => {
    form.resetFields(['class_course_id']);
    form.resetFields(['student_id']);
  }

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors)
    console.log(errorInfo);
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <div>
        <p className={classes['page__title']}>Add Student</p>
        {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
        {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
        <div className={classes['add__main']}>
          <div className={classes['add__form-left']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="id">Student ID</label>
              <Form.Item
                name="student_id"
                noStyle
                rules={[
                  { required: true, message: 'Please search & select a student ID' }
                ]}>
                <DebounceSelect
                  // value={null}
                  placeholder="Select Student ID"
                  key='student_id'
                  fetchOptions={fetchStudentList} />
              </Form.Item>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="class_course_id">Class Course</label>
              <Form.Item
                name="class_course_id"
                noStyle
                rules={[
                  { required: true, message: 'Please search & select a class course ID' }
                ]}>
                <DebounceSelect
                  // value={null}
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
          <Button type="default" onClick={resetForm}>Reset</Button>
        </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default ClassEnrollAdd