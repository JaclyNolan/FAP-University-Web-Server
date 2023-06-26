import React from 'react'
import classes from '../../Pages/Page.module.scss'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
const TeacherNavigation = () => {
  return (
    <div className={classes['details__actions']}>
        <Link className={classes['details__actions-btn']} to='/student/attendance'>
          <Button size='large'>Attendance report</Button>
        </Link>
        <Link className={classes['details__actions-btn']} to='/student/mark'>
          <Button size='large'>Mark report</Button>
        </Link>
        <Link className={classes['details__actions-btn']} to='/student/transcript'>
          <Button size='large'>Transcript</Button>
        </Link>
        <Link className={classes['details__actions-btn']} to='/student/tuitions'>
          <Button size='large'>Tuition fees history</Button>
        </Link>
      </div>
  )
}

export default TeacherNavigation