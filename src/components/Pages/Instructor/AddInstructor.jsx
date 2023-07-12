import React, { useContext, useState } from 'react'
import { Button, Input, Select, InputNumber, Upload, message, DatePicker, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';

const AddInstructor = () => {

  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);

  const [instructor_id, setInstructorId] = useState("");
  const [full_name, setFullName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState(null);
  const [major_id, setMajorId] = useState("");

  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  // const handleChange = (value) => {
  //   console.log(value);
  // }

  const handleGenderChange = (value) => {
    setGender(value);
  }

  const handlePositionChange = (value) => {
    setPosition(value);
  }

  const handleMajorChange = (value) => {
    setMajorId(value);
  }

  const onFinish = () => {
    (async () => {
      setContentLoading(true);
      const data = {
        instructor_id: instructor_id,
        full_name: full_name,
        image: image,
        gender: gender,
        date_of_birth: date_of_birth,
        phone_number: phone_number,
        address: address,
        major_id: major_id,
        position: position
      }
      console.log(data);
      await axiosClient.post('/instructors/add-instructor', data)
        .then((response) => {
          setSuccessMessage(response.data.message);
          setContentLoading(false);
          resetValue();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.error);
          setContentLoading(false);
        })
    })()
  }

  const resetValue = () => {
    form.resetFields(['instructor_id']);
    form.resetFields(['image']);
    form.resetFields(['gender']);
    form.resetFields(['date_of_birth']);
    form.resetFields(['phone_number']);
    form.resetFields(['address']);
    form.resetFields(['major_id']);
    form.resetFields(['position']);
  }

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors)
    console.log(errorInfo);
  }
  // const props = {
  //     name: 'file',
  //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //     headers: {
  //       authorization: 'authorization-text',
  //     },
  //     onChange(info) {
  //       if (info.file.status !== 'uploading') {
  //         console.log(info.file, info.fileList);
  //       }
  //       if (info.file.status === 'done') {
  //         message.success(`${info.file.name} file uploaded successfully`);
  //       } else if (info.file.status === 'error') {
  //         message.error(`${info.file.name} file upload failed.`);
  //       }
  //     },
  //   };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <div>
        <p className={classes['page__title']}>Add Instructor</p>
        {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
        {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="instructor_id">Instructor ID</label>
                <Form.Item
                  name="instructor_id"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new instructor id' }
                  ]}>
                  <Input id='instructor_id' value={instructor_id} onChange={(e) => {
                    setInstructorId(e.target.value);
                  }} />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="fullname">Full name</label>
                <Form.Item
                  name="full_name"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new full name' }
                  ]}>
                  <Input id='full_name' value={full_name} onChange={(e) => {
                    setFullName(e.target.value);
                  }} />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="Gender">Gender:</label>
                <Form.Item
                  name="gender"
                  noStyle>
                  <Select
                    defaultValue="Choose Gender"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      handleGenderChange(e)
                    }}
                    id='gender'
                    options={[
                      { value: '0', label: 'Male' },
                      { value: '1', label: 'Female' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="Major">Major:</label>
                <Form.Item
                  name="major_id"
                  noStyle>
                  <Select
                    defaultValue="Choose Major"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      handleMajorChange(e)
                    }}
                    id='major_id'
                    options={[
                      { value: '1', label: 'Business Administration' },
                      { value: '2', label: 'Computer Science' },
                      { value: '3', label: 'Mechanical Engineering' },
                      { value: '4', label: 'Psychology' },
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
                  <Input id='address' value={address} onChange={(e) => {
                    setAddress(e.target.value);
                  }} />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="position">Position</label>
                <Form.Item
                  name="position"
                  noStyle>
                  <Select
                    defaultValue="Choose Position"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      handlePositionChange(e)
                    }}
                    id='position'
                    options={[
                      { value: '0', label: 'Lecturers' },
                      { value: '1', label: 'Associate Professor' },
                      { value: '2', label: 'Lecturer Dr' },
                      { value: '3', label: 'Master of Instructors' },
                      { value: '4', label: 'Professor' },
                      { value: '5', label: 'Visiting Lecturer' },
                      { value: '6', label: 'Research Lecturer' },
                      { value: '7', label: 'Practical Instructor' },
                      { value: '8', label: 'Tutors' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={classes['add__form-right']}>
              {/* <div className={classes['add__form-row']}>
                <label htmlFor="email">Email</label>
                <Input id='email' disabled />
              </div> */}
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
                    value={date_of_birth}
                    onChange={(date, dateString) => { // Sửa onChange handler
                      setDateOfBirth(dateString); // Cập nhật giá trị vào state
                    }}
                  />
                </Form.Item>
              </div>
              {/* <div className={classes['add__form-row']}>
                <label htmlFor="img" style={{
                  marginRight: '10px'
                }}>Image</label>
                <Upload {...props} id='img'>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div> */}
              <div className={classes['add__form-row']}>
                <label htmlFor="phone">Phone number</label>
                <Form.Item
                  name="phone_number"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new phone number' }
                  ]}>
                  <InputNumber id='phone_number' value={phone_number} onChange={(value) => {
                    setPhoneNumber(value);
                  }} />
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
          <Form.Item noStyle>
            <Button type='primary' htmlType="submit">Submit</Button>
          </Form.Item>
          </div>
      </div>
    </Form>
  )
}

export default AddInstructor