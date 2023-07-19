import React, { useContext, useState } from 'react'
import { Button , Alert, Form,} from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
const ClassCourseAdd = () => {
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

  async function fetchIntructorList(searchValue) {
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

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        class_id: fields.class_id,
        course_id: fields.course_id,
        instructor_id: fields.instructor_id,
      }
      console.log(data);
      await axiosClient.post('/classCourses/add-classCourse', data)
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
    form.resetFields(['class_id']);
    form.resetFields(['course_id']);
    form.resetFields(['instructor_id']);
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
              <label htmlFor="class_id">Class</label>
              <Form.Item
                name="class_id"
                noStyle
                rules={[
                  { required: true, message: 'Please search & select a class ID' }
                ]}>
                <DebounceSelect
                  // value={null}
                  placeholder="Select Class ID"
                  key='class_id'
                  fetchOptions={fetchClassList} />
              </Form.Item>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="instructor">Teacher:</label>
              <Form.Item
                name="instructor_id"
                noStyle
                rules={[
                  { required: true, message: 'Please search & select a teacher ID' }
                ]}>
                <DebounceSelect
                  // value={null}
                  placeholder="Select Teacher ID"
                  key='instructor_id'
                  fetchOptions={fetchIntructorList} />
              </Form.Item>
            </div>
          </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="course_id">Course:</label>
              <Form.Item
                name="course_id"
                noStyle
                rules={[
                  { required: true, message: 'Please search & select a course ID' }
                ]}>
                <DebounceSelect
                  // value={null}
                  placeholder="Select Course ID"
                  key='course_id'
                  fetchOptions={fetchCourseList} />
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

export default ClassCourseAdd