import React from 'react'
import classes from '../../Pages/Page.module.scss'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
const StudentNavigation = (params) => {
  const { student_id } = params;

  return (
    <div className={classes['details__actions']}>
      <Link className={classes['details__actions-btn']} to={`/attendance/list?student_id=${student_id}`}>
        <Button size='large'>Attendance report</Button>
      </Link>
      <Link className={classes['details__actions-btn']} to={`/grade/list?student_id=${student_id}`}>
        <Button size='large'>Mark report</Button>
      </Link>
      <Link className={classes['details__actions-btn']} to={`/enroll/list?student_id=${student_id}`}>
        <Button size='large'>Transcript</Button>
      </Link>
      <Link className={classes['details__actions-btn']} to={`/classenroll/list?student_id=${student_id}`}>
        <Button size='large'>Enrolled Classes</Button>
      </Link>
      <Link className={classes['details__actions-btn']} to={`/fee/list?student_id=${student_id}`}>
        <Button size='large'>Tuition fees history</Button>
      </Link>
    </div>
  )
}

export default StudentNavigation