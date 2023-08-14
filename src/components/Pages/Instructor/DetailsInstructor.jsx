import React, { useContext, useEffect, useState } from 'react'
import classes from '../Page.module.scss'
import Image from '../../common/Image/Image'
import { InstructorNavigation } from '../../common/UserDetailsNavigations'
import { useParams } from 'react-router-dom'
import ContentContext from '../../../helpers/Context/ContentContext'
import axiosClient from '../../../axios-client'
import { Alert } from 'antd'
import BACKEND_SERVER_URL from '../../../helpers/constants/config';

const DetailsInstructor = () => {
  const params = useParams();
  const instructor_id = params.id;
  const { setContentLoading } = useContext(ContentContext);
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const [tableData, setTableData] = useState({});
  const [isValidInstructorId, setIsValidInstructorId] = useState(false);

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  const positionLabels = {
    0: 'Lecturers',
    1: 'Associate Professor',
    2: 'Lecturer Dr',
    3: 'Master of Instructors',
    4: 'Professor',
    5: 'Visiting Lecturer',
    6: 'Research Lecturer',
    7: 'Practical Instructor',
    8: 'Tutors',
  };

  useEffect(() => {
    setContentLoading(true);
    const fetchInstructorData = async () => {
      try {
        const url = `/instructors/edit-instructor/${instructor_id}`;
        console.log(url);
        const response = await axiosClient.get(url);
        setTableData(getTableDataFromInstructorData(response.data.instructor));
        setIsValidInstructorId(true);
        setContentLoading(false);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setContentLoading(false);
      }
    }

    fetchInstructorData();
  }, [])

  const getTableDataFromInstructorData = (instructor) => {
    return {
      user: {
        userID: instructor.id,
        alt: instructor.full_name,
        profileImg: instructor.image,
      },
      details: [
        {
          label: 'ID',
          value: instructor.id
        },
        {
          label: 'Full Name',
          value: instructor.full_name
        },
        {
          label: 'Date Of Birth',
          value: instructor.Dob
        },
        {
          label: 'Gender',
          value: instructor.gender === 0 ? 'Male' : 'Female'
        },
        {
          label: 'Email',
          value: instructor.email || "N/A",
        },
        {
          label: 'Phone Number',
          value: instructor.phone
        },
        {
          label: 'Address',
          value: instructor.address
        },
        {
          label: 'Major',
          value: instructor.major_name
        },
        {
          label: 'Position',
          value: positionLabels[instructor.position] || 'N/A',
        },
      ]
    }
  }

  return (
    <>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      {isValidInstructorId &&
        <div className={classes['details']}>
          <p className={classes['page__title']}>Instructor details</p>
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
          {<InstructorNavigation instructor_id={instructor_id} />}
        </div>
      }
    </>
  )
}

export default DetailsInstructor