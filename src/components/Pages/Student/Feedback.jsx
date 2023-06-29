import React from 'react'
import classes from '../Page.module.scss'
import s from './Student.module.scss'
import {Button, Input, Select} from 'antd'
const Feedback = () => {
    const handleChange = () => {

    }
  return (
    <div>
        <p className={classes['page__title']}>Feedback List</p>
        <form className={s['feedback']}>
            <div className={s['feedback-header']}>
                <div className={s['feedback-header-left']}>
                    <div className={s['feedback-header-row']}>
                        <label htmlFor="name">Name: </label>
                        <Input id='name'/>
                    </div>
                    <div className={s['feedback-header-row']}>
                        <label htmlFor="course">Course: </label>
                        <Select
                            defaultValue="Course"
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            id='course'
                            options={[
                                { value: 'Programing', label: 'Programing' },
                                { value: 'Networking', label: 'Networking' },
                                { value: 'DSA', label: 'DSA' },
                                { value: 'Software lifecycle', label: 'Software lifecycle' },
                            ]}
                        />
                    </div>
                </div>
                <div className={s['feedback-header-left']}>
                    <div className={s['feedback-header-row']}>
                        <label htmlFor="class">Class: </label>
                        <Select
                            defaultValue="Choose Class"
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            options={[
                                { value: 'BHAF123', label: 'BHAF123' },
                                { value: 'BHAF1234', label: 'BHAF1234' },
                            ]}
                        />
                    </div>
                    <div className={s['feedback-header-row']}>
                        <label htmlFor="teacher">Teacher: </label>
                        <Select
                            defaultValue="Select Teacher"
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            options={[
                                { value: 'Nguyen Van A', label: 'Nguyen Van A' },
                                { value: 'Nguyen Van B', label: 'Nguyen Van B' },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className={s['feedback-main']}>
                <label htmlFor="feedback">Feedback: </label>
                <Input.TextArea id='feedback'></Input.TextArea>
            </div>
            <div className={s['feedback-actions']}>
                <Button htmlType='submit' type='primary'>Sbumit</Button>
                <Button htmlType='reset'>Clear</Button>
            </div>
        </form>
    </div>
  )
}

export default Feedback