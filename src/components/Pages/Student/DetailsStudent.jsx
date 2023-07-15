import React, { useContext, useEffect, useState } from 'react'
import classes from '../Page.module.scss'
import Image from '../../common/Image/Image'
import { StudentNavigation } from '../../common/UserDetailsNavigations'
import { useParams } from 'react-router-dom'
import ContentContext from '../../../helpers/Context/ContentContext'
import axiosClient from '../../../axios-client'
import { Alert, Tag } from 'antd'
import BACKEND_SERVER_URL from '../../../helpers/constants/config';
const DetailsStudent = () => {
  const params = useParams();
  const student_id = params.id;
  const { setContentLoading } = useContext(ContentContext);
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const [tableData, setTableData] = useState({});
  const [isValidStudentId, setIsValidStudentId] = useState(false);
  const dayjs = require('dayjs')

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  useEffect(() => {
    setContentLoading(true);
    const fetchStudentData = async () => {
      try {
        const url = `/students/edit-student/${student_id}`;
        console.log(url);
        const response = await axiosClient.get(url);
        setTableData(getTableDataFromStudentData(response.data.student));
        setIsValidStudentId(true);
        setContentLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setContentLoading(false);
      }
    }

    fetchStudentData();
  }, [])

  const getStatusName = (status) => {
    switch (status) {
      case 0:
        return "Dropout"
      case 1:
        return "In Progress"
      case 2:
        return "Reverse"
      default:
        return "Completed"
    }
  }

  const findTagColor = (status_name) => {
    switch (status_name) {
      case "Dropout":
        return "red"
      case "In Progress":
        return "yellow"
      case "Reverse":
        return "orange"
      case "Completed":
        return "green"
    }
  } 

  const getTableDataFromStudentData = (student) => {
    return {
      user: {
        userID: student.id,
        alt: student.full_name,
        profileImg: student.image,
      },
      details: [
        {
          label: 'ID',
          value: student.id
        },
        {
          label: 'Full Name',
          value: student.full_name
        },
        {
          label: 'Status',
          value: <Tag color={findTagColor(getStatusName(student.status))}>{getStatusName(student.status)}</Tag>
        },
        {
          label: 'Date Of Birth',
          value: dayjs(student.Dob).format('DD-MM-YYYY')
        },
        {
          label: 'Gender',
          value: student.gender === 0 ? 'Male' : 'Female'
        },
        {
          label: 'Email',
          value: student.email
        },
        {
          label: 'Phone Number',
          value: student.phone
        },
        {
          label: 'Address',
          value: student.address
        },
        {
          label: 'Major',
          value: student.major_name
        },
        {
          label: 'Academic Year',
          value: student.academic_year
        },
        {
          label: 'GPA',
          value: student.gpa
        },
      ]
    }
  }

  return (
    <>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      {isValidStudentId &&
        <div className={classes['details']}>
          <p className={classes['page__title']}>User details</p>
          <div className={classes['details__main']}>
            <div className={classes['details__left']}>
              <p className={classes['details__left-title']}>About <b>{tableData.user.userID}</b></p>
              <div className={classes['details__left-image']}>
                <Image className={classes['details__left-image-img']} src={`${BACKEND_SERVER_URL}/api/files/get-file/${tableData.user.profileImg}`} width={350} height={350} />
              </div>
            </div>
            <div className={classes['details__right']}>
              {tableData.details.map((d) => {
                return <div className={classes['details__right-row']}>
                  <p className={classes['details__right-title']}>{d.label}</p>
                  <p className={classes['details__right-value']}>{d.value}</p>
                </div>
              })}
            </div>
          </div>
          {<StudentNavigation student_id={student_id}/>}
        </div>
      }
    </>
  )
}

export default DetailsStudent