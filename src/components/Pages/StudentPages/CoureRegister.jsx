import React from 'react'
import classes from '../Page.module.scss'
import {Button, Input, Select} from 'antd'
const CoureRegister = () => {
    const handleChange = () => {

    }
  return (
    <div>
        <p className={classes['page__title']}>Add Student</p>
        <form className={classes['form']}>
            <div className={classes['form-row']}>
                <label htmlFor="ID">Coure ID</label>
                <Input id='ID'/>
            </div>
            <div className={classes['form-row']}>
                <label htmlFor="class">Classes</label>
                <Select
                    defaultValue="Choose Gender"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    id='Gender'
                    options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    ]}
                />
            </div>
            <div className={classes['form-row']}>
                <label htmlFor="fee">Coure Fee</label>
                <Input id='fee'/>
            </div>
            <div className={classes['form-row']}>
                <label htmlFor="schedule">Schedule</label>
                <Input id='schedule'/>
            </div>
            <div className={classes['form-row']}>
                <label htmlFor="desc">Description</label>
                <Input.TextArea id='desc'/>
            </div>
            <div className={classes['form-actions']}>
                <Button type='primary'>Submit</Button>
                <Button>Cancel</Button>
            </div>
        </form>
    </div>
  )
}

export default CoureRegister