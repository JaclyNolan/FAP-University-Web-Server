import React, { useContext, useState } from 'react'
import { Button, Input, Select, InputNumber, Upload, message, DatePicker, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';

const AddStaff = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);

  const [staff_id, setStaffId] = useState("");
  const [full_name, setFullName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState(null);
  const [position, setPosition] = useState("");

  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }
  const handleGenderChange = (value) => {
    setGender(value);
  }

  const handleDepartmentChange = (value) => {
    setDepartment(value);
  }

  const handlePositionChange = (value) => {
    setPosition(value);
  }

  const onFinish = () => {
    (async () => {
      setContentLoading(true);
      const data = {
        staff_id: staff_id,
        full_name: full_name,
        image: image,
        gender: gender,
        department: department,
        date_of_birth: date_of_birth,
        phone_number: phone_number,
        address: address,
        position: position,

      }
      console.log(data);
      await axiosClient.post('/staffs/add-staff', data)
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

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors)
    console.log(errorInfo);
  }

  const resetValue = () => {
    form.resetFields(['staff_id']);
    form.resetFields(['full_name']);
    form.resetFields(['image']);
    form.resetFields(['gender']);
    form.resetFields(['date_of_birth']);
    form.resetFields(['phone_number']);
    form.resetFields(['address']);
    form.resetFields(['department']);
    form.resetFields(['position']);
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <div>
        <p className={classes['page__title']}>Add Staff</p>
        {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
        {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
        <div className={classes['add__main']}>
          <div className={classes['add__form-left']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="staff_id">Staff ID</label>
              <Form.Item
                name="staff_id"
                noStyle
                rules={[
                  { required: true, message: 'Please input new staff id' }
                ]}>
                <Input id='staff_id' value={staff_id} onChange={(e) => {
                  setStaffId(e.target.value);
                }} />
              </Form.Item>
            </div>

            <div className={classes['add__form-row']}>
              <label htmlFor="full_name">Full name</label>
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
              <label htmlFor="department">Department</label>
              <Form.Item
                name="department"
                noStyle>
                <Select
                  defaultValue="Choose Department"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    handleDepartmentChange(e)
                  }}
                  id='department'
                  options={[
                    { value: 'Student Services', label: 'Student Services' },
                    { value: 'Finance', label: 'Finance' },
                    { value: 'Admissions', label: 'Admissions' },
                    { value: 'Administration', label: 'Administration' },
                    { value: 'Academic Affairs', label: 'Academic Affairs' },
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
                    { value: '0', label: 'Teacher' },
                    { value: '1', label: 'Trainer' },
                    { value: '2', label: 'HR' },
                    { value: '3', label: 'Marketing' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className={classes['add__form-right']}>

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

export default AddStaff