import React, { useContext, useState } from 'react'
import classes from '../Page.module.scss'
import { Alert, Button, Form, Input, Select } from 'antd'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
const Add = () => {
  const [roleId, setRoleId] = useState(2);
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [staffId, setStaffId] = useState(null);
  // const [instructorId, setInstructorId] = useState(null);
  // const [studentId, setStudentId] = useState(null);
  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  async function fetchStaffList(searchValue) {
    const url = '/staffs'
      + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '') 
    console.log(url);

    try {
      const response = await axiosClient.get(url)
      const data = response.data.staffs
      return data.map((info) => ({
        label: `${info.id} ${info.full_name} ${info.email} ${info.phone_number}`,
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
        label: `${info.id} ${info.full_name} ${info.email} ${info.phone_number}`,
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
        label: `${info.id} ${info.full_name} ${info.email} ${info.phone_number}`,
        value: info.id,
      }))
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  }

  const getInfoInputFromRole = () => {
    switch (roleId) {
      case 1:
        return
      case 2:
        return (

          <div className={classes['add__form-row']}>
            <label htmlFor="staff_id">Staff ID</label>
            <Form.Item
              name="staff_id"
              noStyle
              rules={[
                { required: true, message: 'Please search & select a staff ID' }
              ]}>
              <DebounceSelect
                placeholder="Select Staff ID"
                fetchOptions={fetchStaffList}
                key='staff_id'/>
            </Form.Item >
          </div >
        )
      case 3:
        return (

          <div className={classes['add__form-row']}>
            <label htmlFor="instructor_id">Instructor ID</label>
            <Form.Item
              name="instructor_id"
              noStyle
              rules={[
                { required: true, message: 'Please search & select a instructor ID' }
              ]}>
              <DebounceSelect
                placeholder="Select Instructor ID"
                key='instructor_id'
                fetchOptions={fetchInstructorList}/>
            </Form.Item>
          </div>
        )
      case 4:
        return (

          <div className={classes['add__form-row']}>
            <label htmlFor="student_id">Student ID</label>
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
                fetchOptions={fetchStudentList}/>
            </Form.Item>
          </div>
        )
      default:
        return;
    }
  }

  const handleRoleChange = (value) => {
    setRoleId(value);
  }

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        username: fields.username,
        email: fields.email,
        role_id: roleId,
        staff_id: (roleId === 2 ? fields.staff_id : null),
        instructor_id: (roleId === 3 ? fields.instructor_id : null),
        student_id: (roleId === 4 ? fields.student_id : null),
      }
      console.log(data);
      await axiosClient.post('/users/add-user', data)
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
    form.resetFields(['username']);
    form.resetFields(['email']);
    form.resetFields(['staff_id']);
    form.resetFields(['instructor_id']);
    form.resetFields(['student_id']);
  }

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors)
    console.log(errorInfo);
  }
  return (
    <Form
      form={form}
      name="addUserForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      <p className={classes['page__title']}>Add user</p>
      <div className={classes['add__main']}>
        <div className={classes['add__form-left']}>
          <div className={classes['add__form-row']}>
            <label htmlFor="username">User name</label>
            <Form.Item
              name="username"
              noStyle
              rules={[
                { required: true, message: 'Please input new username' }
              ]}>
              <Input id='username' />
            </Form.Item>
          </div>
          <Form.Item
            name="role"
            noStyle>
            <div className={classes['add__form-row']}>
              <label htmlFor="role">Role:</label>
              <Select
                value={roleId}
                style={{ width: '100%' }}
                onChange={(e) => {
                  handleRoleChange(e)
                }}
                id='role'
                options={[
                  { value: 1, label: 'Admin' },
                  { value: 2, label: 'Staff' },
                  { value: 3, label: 'Instructor' },
                  { value: 4, label: 'Student' },
                ]}
              />
            </div>
          </Form.Item>
        </div>
        <div className={classes['add__form-right']}>
          <div className={classes['add__form-row']}>
            <label htmlFor="email">Email</label>
            <Form.Item
              name="email"
              noStyle
              rules={[
                { type: 'email', message: 'Please enter a valid email', },
                { required: true, message: 'Please enter a new email', }
              ]}>
              <Input id='email'/>
            </Form.Item>
          </div>
          {getInfoInputFromRole()}
        </div>
      </div>
      <div>
        <Form.Item>
          <Button type='primary' htmlType="submit">Submit</Button>
          <Button type="default" onClick={resetForm}>Reset</Button>
        </Form.Item>
      </div>
    </Form >
  )
}

export default Add