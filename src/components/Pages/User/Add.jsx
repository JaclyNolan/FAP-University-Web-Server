import React, { useContext, useEffect, useRef, useState } from 'react'
import classes from '../Page.module.scss'
import { Alert, Button, Input, Select } from 'antd'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
const Add = () => {
  const [roleId, setRoleId] = useState('2');
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const {setContentLoading} = useContext(ContentContext);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const staff_idRef = useRef(null);
  const instructor_idRef = useRef(null);
  const student_idRef = useRef(null);

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  const getInfoInputFromRole = () => {
    switch (roleId) {
      case '1':
        return
      case '2':
        return (
          <div className={classes['add__form-row']}>
            <label htmlFor="staff_id">Staff ID</label>
            <Input id='staff_id' ref={staff_idRef} />
          </div>
        )
      case '3':
        return (
          <div className={classes['add__form-row']}>
            <label htmlFor="instructor_id">Instructor ID</label>
            <Input id='instructor_id' ref={instructor_idRef} />
          </div>
        )
      case '4':
        return (
          <div className={classes['add__form-row']}>
            <label htmlFor="student_id">Student ID</label>
            <Input id='student_id' ref={student_idRef} />
          </div>
        )
    }
  }

  const handleRoleChange = (value) => {
    setRoleId(value);
  }

  const onSubmit = () => {
    (async () => {
      setContentLoading(true);
      const data = {
        username: usernameRef.current.input.value,
        email: emailRef.current.input.value,
        role_id: roleId,
        staff_id: staff_idRef.current ? staff_idRef.current.input.value : null,
        instructor_id: instructor_idRef.current ? instructor_idRef.current.input.value : null,
        student_id: student_idRef.current ? student_idRef.current.input.value : null
      }
      await axiosClient.post('/users/add-user', data)
        .then((response) => {
          setSuccessMessage(response.data.message);
          setContentLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setContentLoading(false);
        })
    })()
  }
  return (
    <div>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" &&  <Alert type='error' banner message={errorMessage} />}
      <p className={classes['page__title']}>Add user</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
          <div className={classes['add__form-left']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="username">User name</label>
              <Input id='username' ref={usernameRef} />
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="role">Role:</label>
              <Select
                value={roleId}
                style={{ width: '100%' }}
                onChange={handleRoleChange}
                id='role'
                options={[
                  { value: '1', label: 'Admin' },
                  { value: '2', label: 'Staff' },
                  { value: '3', label: 'Instructor' },
                  { value: '4', label: 'Student' },
                ]}
              />
            </div>
          </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="email">Email</label>
              <Input id='email' ref={emailRef} />
            </div>
            {getInfoInputFromRole()}
          </div>
        </div>
        <div>
          <Button type='primary' onClick={onSubmit}>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default Add