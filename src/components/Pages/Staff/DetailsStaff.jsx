import React, { useContext, useEffect, useState } from 'react'
import classes from '../Page.module.scss'
import Image from '../../common/Image/Image'
import { useParams } from 'react-router-dom'
import ContentContext from '../../../helpers/Context/ContentContext'
import axiosClient from '../../../axios-client'
import { Alert } from 'antd'
import BACKEND_SERVER_URL from '../../../helpers/constants/config';

const DetailsStaff = () => {
  const params = useParams();
  const staff_id = params.id;
  const { setContentLoading } = useContext(ContentContext);
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const [tableData, setTableData] = useState({});
  const [isValidStaffId, setIsValidStaffId] = useState(false);

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  const positionLabels = {
    0: 'Teacher',
    1: 'Trainer',
    2: 'HR',
    3: 'Marketing',
  };

  useEffect(() => {
    setContentLoading(true);
    const fetchStaffData = async () => {
      try {
        const url = `/staffs/edit-staff/${staff_id}`;
        console.log(url);
        const response = await axiosClient.get(url);
        setTableData(getTableDataFromStaffData(response.data.staff));
        setIsValidStaffId(true);
        setContentLoading(false);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setContentLoading(false);
      }
    }

    fetchStaffData();
  }, [])

  const getTableDataFromStaffData = (staff) => {
    return {
      user: {
        userName: staff.id,
        alt: staff.full_name,
        profileImg: staff.image,
      },
      details: [
        {
          label: 'ID',
          value: staff.id
        },
        {
          label: 'Full Name',
          value: staff.full_name
        },
        {
          label: 'Date Of Birth',
          value: staff.Dob
        },
        {
          label: 'Gender',
          value: staff.gender === 0 ? 'Male' : 'Female'
        },
        {
          label: 'Email',
          value: staff.email || "N/A",
        },
        {
          label: 'Phone Number',
          value: staff.phone_number
        },
        {
          label: 'Address',
          value: staff.address
        },
        {
          label: 'Department',
          value: staff.department
        },
        {
          label: 'Position',
          value: positionLabels[staff.position] || 'N/A',
        },
      ]
    }
  }

  return (
    <>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      {isValidStaffId &&
        <div className={classes['details']}>
          <p className={classes['page__title']}>User details</p>
          <div className={classes['details__main']}>
            <div className={classes['details__left']}>
              <p className={classes['details__left-title']}>About <b>{tableData.user.userName}</b></p>
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
        </div>
      }
    </>
  )
}

export default DetailsStaff