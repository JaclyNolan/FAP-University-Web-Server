import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, InputNumber, Upload, message, DatePicker, Form, Alert, Image } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useParams } from 'react-router-dom';
import BACKEND_SERVER_URL from '../../../helpers/constants/config';
import dayjs from 'dayjs';

const EditStaff = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [staffData, setStaffData] = useState({});
  const [image, setImage] = useState(null);

  const params = useParams();
  const staff_id = params.id;
  const [isValidStaffId, setIsValidStaffId] = useState(false);

  const [form] = Form.useForm();

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
    const fetchStaffData = async () => {
      try {
        const url = `/staffs/edit-staff/${staff_id}`
        const response = await axiosClient.get(url)
        const { full_name, date_of_birth, gender, address, phone_number, position, department, image, email } = response.data.staff
        setStaffData({
          student_id: staff_id,
          full_name,
          date_of_birth: dayjs(date_of_birth),
          gender,
          address,
          phone_number,
          email,
          image,
          position,
          department,
        })
        setIsValidStaffId(true);
        setContentLoading(false);
        setImage(image);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchStaffData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        full_name: fields.full_name,
        image: image,
        gender: fields.gender,
        date_of_birth: dayjs(fields.date_of_birth).format('YYYY-MM-DD'),
        phone_number: fields.phone_number,
        address: fields.address,
        position: fields.position,
        department: fields.department,
      }

      await axiosClient.put('/staffs/update-staff/' + staff_id, data)
        .then((response) => {
          setSuccessMessage(response.data.message);
          setContentLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.error);
          setContentLoading(false);
        })
    })()
  }

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors)
    console.log(errorInfo);
  }

  const customRequest = async ({ file, onError, onSuccess }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosClient.post('/files/save-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { filename } = response.data;
      setImage(filename);

      onSuccess(response.data, file);
      // console.log(JSON.stringify(response.data));
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      onError(error);
      message.success(`${file.name} file upload failed.`);
    }
  };
  return (
    <div>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      {isValidStaffId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={staffData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Edit Staff</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="id">Staff ID</label>
                <Form.Item
                  name="student_id"
                  noStyle>
                  <Input id='student_id' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="Gender">Gender:</label>
                <Form.Item
                  name="gender"
                  noStyle
                >
                  <Select
                    style={{ width: '100%' }}
                    id='gender'
                    options={[
                      { value: 0, label: 'Male' },
                      { value: 1, label: 'Female' },
                    ]}
                  >
                  </Select>
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="email">Email</label>
                <Form.Item
                  name="email"
                  noStyle>
                  <Input id='email' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="address">Address</label>
                <Form.Item
                  name="address"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new address' }
                  ]}>
                  <Input id='address' />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="department">Department</label>
                <Form.Item
                  name="department"
                  noStyle
                >
                  <Select
                    style={{ width: '100%' }}
                    id='department'
                    options={[
                      { value: 'Student Services', label: 'Student Services' },
                      { value: 'Finance', label: 'Finance' },
                      { value: 'Admissions', label: 'Admissions' },
                      { value: 'Administration', label: 'Administration' },
                      { value: 'Academic Affairs', label: 'Academic Affairs' },
                    ]}
                  >
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="fullname">Full name</label>
                <Form.Item
                  name="full_name"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new full name' }
                  ]}>
                  <Input id='full_name' />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="dob">Date Of Birth</label>
                <Form.Item
                  name="date_of_birth" // Thay đổi name thành "date_of_birth"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new date_of_birth' }
                  ]}
                >
                  <DatePicker
                    id="date_of_birth"
                  />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="image" style={{ marginRight: '10px' }}>Image</label>
                <Image src={`${BACKEND_SERVER_URL}/api/files/get-file/${staffData.image}`} width={100} height={100} />
                <br></br>
                <Form.Item
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  }}
                >
                  <Upload name="file" customRequest={customRequest} >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="phone">Phone number</label>
                <Form.Item
                  name="phone_number"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new phone number' }
                  ]}>
                  <InputNumber id='phone_number' />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="position">Position</label>
                <Form.Item
                  name="position"
                  noStyle
                >
                  <Select
                    style={{ width: '100%' }}
                    id='position'
                    options={[
                      { value: 0, label: 'Teacher' },
                      { value: 1, label: 'Trainer' },
                      { value: 2, label: 'HR' },
                      { value: 3, label: 'Marketing' },
                    ]}
                  >
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
            <Form.Item>
              <Button type='primary' htmlType="submit">Submit</Button>
            </Form.Item>
          </div>
        </Form>
      }
    </div>
  )
}

export default EditStaff