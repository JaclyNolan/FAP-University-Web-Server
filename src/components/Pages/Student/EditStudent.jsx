import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, InputNumber, Upload, message, DatePicker, Form, Alert, Image } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useParams } from 'react-router-dom';
import BACKEND_SERVER_URL from '../../../helpers/constants/config';
import dayjs from 'dayjs';

const EditStudent = () => {

  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [studentData, setStudentData] = useState({});
  const [image, setImage] = useState(null);

  const params = useParams();
  const student_id = params.id;
  const [isValidStudentId, setIsValidStudentId] = useState(false);

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
    const fetchStudentData = async () => {
      try {
        const url = `/students/edit-student/${student_id}`
        const response = await axiosClient.get(url)
        console.log(response.data.student);
        const { full_name, date_of_birth, gender, address, phone_number, status, major_id, academic_year, image, email } = response.data.student
        setStudentData({ 
          student_id, 
          full_name, 
          date_of_birth: dayjs(date_of_birth), 
          gender, 
          address, 
          phone_number, 
          email, 
          status, 
          academic_year, 
          major_id, 
          image })
        setIsValidStudentId(true);
        setContentLoading(false);
        setImage(image);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchStudentData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        full_name: fields.full_name,
        image: image,
        gender: fields.gender,
        academic_year: fields.academic_year,
        date_of_birth: dayjs(fields.date_of_birth).format('YYYY-MM-DD'),
        phone_number: fields.phone_number,
        address: fields.address,
        major_id: fields.major_id,
        status: fields.status
      }

      await axiosClient.put('/students/update-student/' + student_id, data)
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
    <>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      {isValidStudentId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={studentData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Edit student</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="sid">Student ID</label>
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
                <label htmlFor="status">Status</label>
                <Form.Item
                  name="status"
                  noStyle>
                  <Select
                    defaultValue="Choose Status"
                    style={{ width: '100%' }}
                    id='status'
                    options={[
                      { value: 0, label: 'Dropout' },
                      { value: 1, label: 'In Progress' },
                      { value: 2, label: 'Reserve' },
                      { value: 3, label: 'Completed' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="full_name">Full name</label>
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
                <Image src={`${BACKEND_SERVER_URL}/api/files/get-file/${studentData.image}`}  width = {100} height = {100}/>
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
                <label htmlFor="phone_number">Phone number</label>
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
                <label htmlFor="major_id">Major:</label>
                <Form.Item
                  name="major_id"
                  noStyle>
                  <Select
                    style={{ width: '100%' }}
                    id='major_id'
                    options={[
                      { value: 1, label: 'Business Administration' },
                      { value: 2, label: 'Computer Science' },
                      { value: 3, label: 'Mechanical Engineering' },
                      { value: 4, label: 'Psychology' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="academic_year">Academic Year</label>
                <Form.Item
                  name="academic_year"
                  noStyle>
                  <Select
                    defaultValue="Choose Academic Year"
                    style={{ width: '100%' }}
                    id='academic_year'
                    options={[
                      { value: 2018, label: '2018' },
                      { value: 2019, label: '2019' },
                      { value: 2020, label: '2020' },
                      { value: 2021, label: '2021' },
                      { value: 2022, label: '2022' },
                      { value: 2023, label: '2023' },
                      { value: 2024, label: '2024' },
                    ]}
                  />
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
    </>
  )
}

export default EditStudent