import React from 'react'
import classes from './User.module.scss'
import {Input, Select, Button} from 'antd'
const Edit = () => {
  const handleChange = (value) => {
    console.log(value);
  }
  return (
    <div>
      <p className={classes['user__title']}>Add user</p>
      <form className={classes['edit__form']}>
        <div className={classes['edit__main']}>
          <div className={classes['edit__form-left']}>
            <div className={classes['edit__form-row']}>
              <label htmlFor="uid">User ID</label>
              <Input id='uid' readOnly value="user 1"/>
            </div>
            <div className={classes['edit__form-row']}>
              <label htmlFor="role">Role:</label>
              <Select
                defaultValue="Choose role"
                style={{ width: '100%' }}
                onChange={handleChange}
                id='role'
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
            />
            </div>
            <div className={classes['edit__form-row']}>
              <label htmlFor="sid">Student ID</label>
              <Input id='sid'/>
            </div>
          </div>
          <div className={classes['edit__form-right']}>
            <div className={classes['edit__form-row']}>
              <label htmlFor="username">User name</label>
              <Input id='username'/>
            </div>
            <div className={classes['edit__form-row']}>
              <label htmlFor="email">Email</label>
              <Input readOnly value='anvbhaf1234@fpt.edu.vn' id='email'/>
            </div>
          </div>
        </div>
        <div>
          <Button type='primary'>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default Edit