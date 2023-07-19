import React from 'react'
import {Button,  Select, Input} from 'antd'
import classes from '../Page.module.scss'
const ClassEnrollAdd = () => {
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
                    <label htmlFor="id">Student ID</label>
                    <Input id='id'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="class">Class Name</label>
                    <Select
                        defaultValue="Choose class"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        id='class'
                        options={[
                        { value: 'BHAF1234', label: 'BHAF1234' },
                        { value: 'BHAF12345', label: 'BHAF12345' },
                        ]}
                    />
                </div>
            </div>
          <div className={classes['add__form-right']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="teacher">Teacher:</label>
                    <Select
                        defaultValue="Choose teacher"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        id='teacher'
                        options={[
                        { value: 'Nguyen Thai Cuong', label: 'Nguyen Thai Cuong' },
                        { value: 'Ngo Thi Mai Loan', label: 'Ngo Thi Mai Loan' },
                        ]}
                    />
                </div>
            <div className={classes['add__form-row']}>
                <label htmlFor="course">Course:</label>
                <Select
                    defaultValue="Choose course"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    id='course'
                    options={[
                    { value: 'Course 1', label: 'Course 1' },
                    { value: 'Course 2', label: 'Course 2' },
                    ]}
                />
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

export default ClassEnrollAdd