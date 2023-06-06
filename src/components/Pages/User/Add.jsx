import React from 'react'
import classes from '../Page.module.scss'
import {Button, Input, Select} from 'antd'
const Add = () => {
  const handleChange = (value) => {
    console.log(value);
  }
  return (
    <div>
      <p className={classes['page__title']}>Add user</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
          <div className={classes['add__form-left']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="username">User name</label>
              <Input id='username'/>
            </div>
            <div className={classes['add__form-row']}>
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
          </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="email">Email</label>
              <Input id='email'/>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="sid">Student ID</label>
              <Input id='sid'/>
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

export default Add