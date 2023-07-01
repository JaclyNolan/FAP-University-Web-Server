import React from 'react'
import classes from '../Page.module.scss'
import Image from '../../common/Image/Image'
import { useLocation } from 'react-router-dom'
import { StudentNavigation, InstructorNavigation } from '../../common/UserDetailsNavigations'
const Details = () => {
  const location = useLocation()
  console.log(location);
  const sampleData = {
    user: {
      userName: 'Nguyen Van A',
      profileImg: 'https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-hinh-the-dep.jpeg'
    },
    details: [
      {
        label: 'ID',
        value: 'BHAF12345'
      },
      {
        label: 'Full Name',
        value: 'Nguyen Van A'
      },
      {
        label: 'Date Of Birth',
        value: '01/01/2024'
      },
      {
        label: 'Gender',
        value: 'Male'
      },
      {
        label: 'Email',
        value: 'hihi@fpt.edu.vn'
      },
      {
        label: 'Phone Number',
        value: '1234567'
      },
      {
        label: 'Address',
        value: 'Ha Noi - VN'
      },
      {
        label: 'Major',
        value: 'Information'
      }
    ]
  }
  return (
    <div className={classes['details']}>
      <p className={classes['page__title']}>User details</p>
      <div className={classes['details__main']}>
        <div className={classes['details__left']}>
          <p className={classes['details__left-title']}>About <b>{sampleData.user.userName}</b></p>
          <div className={classes['details__left-image']}>
            <Image className={classes['details__left-image-img']} alt="Nguyen Van A" src={sampleData.user.profileImg} width={100} height={100} />
          </div>
        </div>
        <div className={classes['details__right']}>
          {sampleData.details.map((d) => {
            return <div className={classes['details__right-row']}>
              <p className={classes['details__right-title']}>{d.label}</p>
              <p className={classes['details__right-value']}>{d.value}</p>
            </div>
          })}
        </div>
      </div>
      {location.pathname.includes('student') && <StudentNavigation />}
      {location.pathname.includes('instructor') && <InstructorNavigation />}
    </div>
  )
}

export default Details