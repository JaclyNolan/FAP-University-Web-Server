import React, {useContext} from 'react'
import classes from '../Page.module.scss'
import Image from '../../common/Image/Image'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import AuthContext from '../../../helpers/Context/AuthContext'
const Details = () => {
  const ctx = useContext(AuthContext)
  return (
    <div className={classes['details']}>
      <p className={classes['page__title']}>Student details</p>
      <div className={classes['details__main']}>
        <div className={classes['details__left']}>
          <p className={classes['details__left-title']}>About <b>Nguyen Van A</b></p>
          <div className={classes['details__left-image']}>
            <Image className={classes['details__left-image-img']} alt="Nguyen Van A" src="https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-hinh-the-dep.jpeg" width={100} height={100}/>
          </div>
        </div>
        <div className={classes['details__right']}>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>ID</p>
            <p className={classes['details__right-value']}>BHAF12345</p>
          </div>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>Full Name</p>
            <p className={classes['details__right-value']}>Nguyen Van A</p>
          </div>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>Date Of Birth</p>
            <p className={classes['details__right-value']}>01/01/2024</p>
          </div>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>Gender</p>
            <p className={classes['details__right-value']}>Male</p>
          </div>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>Email</p>
            <p className={classes['details__right-value']}>hihi@fpt.edu.vn</p>
          </div>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>Phone Number</p>
            <p className={classes['details__right-value']}>1234567</p>
          </div>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>Address</p>
            <p className={classes['details__right-value']}>Ha Noi - VN</p>
          </div>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>Major</p>
            <p className={classes['details__right-value']}>IT</p>
          </div>
          <div className={classes['details__right-row']}>
            <p className={classes['details__right-title']}>Admission Year</p>
            <p className={classes['details__right-value']}>2024</p>
          </div>
        </div>
      </div>
      {ctx.user.user.role === 'student' && <div className={classes['details__actions']}>
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
      </div>}
    </div>
  )
}

export default Details