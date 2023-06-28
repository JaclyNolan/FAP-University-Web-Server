import React from 'react'
import {Button, Input, DatePicker} from 'antd'
import classes from '../Page.module.scss'
const GradeAdd = () => {
  return (
    <div>
      <p className={classes['page__title']}>Add Grade</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="id">ID</label>
                    <Input id='id' value={'123'} disabled/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="studentName">Student name</label>
                    <Input id='studentName'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="score">Score</label>
                    <Input id='score'/>
                </div>
            </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="courseName">Course Name</label>
              <Input id='courseName'/>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="className">Class Name</label>
              <DatePicker id='className'/>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="status">Status</label>
              <Input id='status'/>
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

export default GradeAdd