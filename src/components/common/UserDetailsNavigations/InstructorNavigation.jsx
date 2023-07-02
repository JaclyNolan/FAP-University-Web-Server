import React from 'react'
import classes from '../../Pages/Page.module.scss'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
const InstructorNavigation = (params) => {
  const { instructor_id } = params

  return (
    <div className={classes['details__actions']}>
      <Link className={classes['details__actions-btn']} to={`/feedback/list?student_id=${instructor_id}`}>
        <Button size='large'>Feedback</Button>
      </Link>
      <Link className={classes['details__actions-btn']} to={`/class/list?student_id=${instructor_id}`}>
        <Button size='large'>Teaching Class</Button>
      </Link>
    </div>
  )
}

export default InstructorNavigation