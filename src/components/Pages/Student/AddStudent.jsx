import React, { useContext, useState } from 'react'
import { Button, Input, Select, InputNumber, Upload, message, DatePicker, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';

const AddStudent = () => {

  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);

  const [student_id, setStudentId] = useState("");
  const [full_name, setFullName] = useState("");
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("");
  const [academic_year, setAcademicYear] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(null);
  const [major_id, setMajorId] = useState("");

  const [form] = Form.useForm();

  const customRequest = async ({ file, onError, onSuccess }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosClient.post('/files/save-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Trích xuất giá trị filename từ phản hồi API
      const { filename } = response.data;

      // Cập nhật giá trị trường image
      setImage(filename);

      onSuccess(response.data, file);
      // console.log(JSON.stringify(response.data));
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      onError(error);
      message.success(`${file.name} file upload failed.`);
    }
  };

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

  const handleAcademicYearChange = (value) => {
    setAcademicYear(value);
  }

  const handleStatusChange = (value) => {
    setStatus(value);
  }

  const handleMajorChange = (value) => {
    setMajorId(value);
  }

  const onFinish = () => {
    (async () => {
      setContentLoading(true);
      const data = {
        student_id: student_id,
        full_name: full_name,
        image: image,
        gender: gender,
        academic_year: academic_year,
        date_of_birth: date_of_birth,
        phone_number: phone_number,
        address: address,
        major_id: major_id,
        status: status
      }
      console.log(data);
      await axiosClient.post('/students/add-student', data)
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
    form.resetFields(['student_id']);
    form.resetFields(['image']);
    form.resetFields(['gender']);
    form.resetFields(['academic_year']);
    form.resetFields(['date_of_birth']);
    form.resetFields(['phone_number']);
    form.resetFields(['address']);
    form.resetFields(['major_id']);
    form.resetFields(['status']);
  }

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors)
    console.log(errorInfo);
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <div>
        <p className={classes['page__title']}>Add Student</p>
        {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
        {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
        <div className={classes['add__main']}>
          <div className={classes['add__form-left']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="student_id">Student ID</label>
              <Form.Item
                name="student_id"
                noStyle
                rules={[
                  { required: true, message: 'Please input new student id' }
                ]}
                >
                <Input id='student_id' value={student_id} onChange={(e) => {
                  setStudentId(e.target.value);
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
              <label htmlFor="gender">Gender:</label>
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
              <label htmlFor="status">Status</label>
              <Form.Item
                name="status"
                noStyle>
                <Select
                  defaultValue="Choose Status"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    handleStatusChange(e)
                  }}
                  id='status'
                  options={[
                    { value: '0', label: 'Dropout' },
                    { value: '1', label: 'In Progress' },
                    { value: '2', label: 'Reserve' },
                    { value: '3', label: 'Completed' },
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
                  onChange={(e) => {
                    handleAcademicYearChange(e)
                  }}
                  id='academic_year'
                  options={[
                    { value: '2018', label: '2018' },
                    { value: '2019', label: '2019' },
                    { value: '2020', label: '2020' },
                    { value: '2021', label: '2021' },
                    { value: '2022', label: '2022' },
                    { value: '2023', label: '2023' },
                    { value: '2024', label: '2024' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className={classes['add__form-right']}>

            <div className={classes['add__form-row']}>
              <label htmlFor="date_of_birth">Date Of Birth</label>
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

            {/* image */}
            <div className={classes['add__form-row']}>
              <label htmlFor="image" style={{ marginRight: '10px' }}>Image</label>

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
                <InputNumber id='phone_number' value={phone_number} onChange={(value) => {
                  setPhoneNumber(value);
                }} />
              </Form.Item>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="major_id">Major:</label>
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

export default AddStudent