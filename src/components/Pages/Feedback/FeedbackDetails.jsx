import React from 'react'
import classes from './Feedback.module.scss'
import { Input } from 'antd'
const FeedbackDetails = () => {
  return (
    <div className={classes['feedback__details']}>
        <div className={classes['feedback__details-row']}>
            <div className={classes['feedback__details-detail']}>
                <p className={classes['feedback__details-title']}>ID:</p>
                <b className={classes['feedback__details-value']}>ID-1</b>
            </div>
            <div className={classes['feedback__details-detail']}>
                <p className={classes['feedback__details-title']}>Course:</p>
                <b className={classes['feedback__details-value']}>Programing</b>
            </div>
            <div className={classes['feedback__details-detail']}>
                <p className={classes['feedback__details-title']}>Class:</p>
                <b className={classes['feedback__details-value']}>BHAF123</b>
            </div>
            <div className={classes['feedback__details-detail']}>
                <p className={classes['feedback__details-title']}>Student:</p>
                <b className={classes['feedback__details-value']}>Nguyen Van A</b>
            </div>
            <div className={classes['feedback__details-detail']}>
                <p className={classes['feedback__details-title']}>Teacher:</p>
                <b className={classes['feedback__details-value']}>Nguyen Thi B</b>
            </div>
        </div>
        <div className={classes['feedback__details-details']}>
            <p>Feedback Details:</p>
            <div className={classes['feedback__details-content']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
        </div>
    </div>
  )
}

export default FeedbackDetails