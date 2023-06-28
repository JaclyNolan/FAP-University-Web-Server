import React from 'react'
import {Button, Input, Select, message} from 'antd'
import classes from '../Page.module.scss'
const ClassEdit = () => {
    const handleChange = (value) => {
        console.log(value);
    }
  return (
    <div>
      <p className={classes['page__title']}>Add Student</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="id">ID</label>
                    <Input id='id' value={'1234'} readOnly disabled/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="Major">Major:</label>
                    <Select
                        defaultValue="Choose Major"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        id='Major'
                        options={[
                        { value: 'Information and Technology', label: 'Information and Technology' },
                        { value: 'Design', label: 'Design' },
                        ]}
                    />
                </div>
            </div>
            <div className={classes['add__form-right']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="name">Name</label>
                    <Input id='name'/>
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

export default ClassEdit