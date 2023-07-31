import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, InputNumber, Upload, message, DatePicker, Form, Alert, Image } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import BACKEND_SERVER_URL from '../../../helpers/constants/config';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import ContentContext from '../../../helpers/Context/ContentContext';

const EditInstructor = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [instructorData, setInstructorData] = useState({});
  const [image, setImage] = useState(null);

  const params = useParams();
  const instructor_id = params.id;
  const [isValidInstructorId, setIsValidInstructorId] = useState(false);

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
    const fetchIntructorData = async () => {
      try {
        const url = `/instructors/edit-instructor/${instructor_id}`
        const response = await axiosClient.get(url)
        console.log(response.data.instructor);
        const { full_name, date_of_birth, gender, address, phone_number, position, major_id, image, email } = response.data.instructor
        setInstructorData({
          instructor_id,
          full_name,
          date_of_birth: dayjs(date_of_birth),
          gender,
          address,
          phone_number,
          email,
          major_id,
          image,
          position
        })
        setIsValidInstructorId(true);
        setContentLoading(false);
        setImage(image);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchIntructorData();
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
        major_id: fields.major_id,
        status: fields.status,
        position: fields.position
      }
      await axiosClient.put('/instructors/update-instructor/' + instructor_id, data)
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
      {isValidInstructorId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={instructorData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Edit Instructor</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="id">ID</label>
                <Form.Item
                  name="instructor_id"
                  noStyle>
                  <Input id='instructor_id' readOnly disabled />
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
                <label htmlFor="Major">Major:</label>
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
                <Image src={`${BACKEND_SERVER_URL}/api/files/get-file/${instructorData.image}`}  width = {100} height = {100}/>
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
                <label htmlFor="position">Position</label>
                <Form.Item
                  name="position"
                  noStyle>
                  <Select
                    style={{ width: '100%' }}
                    id='position'
                    options={[
                      { value: 0, label: 'Lecturers' },
                      { value: 1, label: 'Associate Professor' },
                      { value: 2, label: 'Lecturer Dr' },
                      { value: 3, label: 'Master of Instructors' },
                      { value: 4, label: 'Professor' },
                      { value: 5, label: 'Visiting Lecturer' },
                      { value: 6, label: 'Research Lecturer' },
                      { value: 7, label: 'Practical Instructor' },
                      { value: 8, label: 'Tutors' },
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

export default EditInstructor