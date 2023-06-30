import React, { useContext, useState } from 'react'
import { Button, Input, Select, InputNumber, Upload, message, DatePicker, Form } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';

const AddStudent = () => {

  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);

  const [student_id, setStudentId] = useState("");
  const [full_name, setFullName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [academic_year, setAcademicYear] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(null);
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

  const handleMajorChange = (value) => {
    setMajorId(value);
  }

  const onFinish = () => {
    (async () => {
      setContentLoading(true);
      const data = {
        student_id: student_id,
        full_name: full_name,
        //image: image,
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
    form.resetFields(['email']);
    //form.resetFields(['image']);
    form.resetFields(['gender']);
    form.resetFields(['academic_year']);
    form.resetFields(['date_of_birth']);
    form.resetFields(['phone_number']);
    form.resetFields(['address']);
    form.resetFields(['major_id']);
    form.resetFields(['status']);
  }

  // const props = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  // const handleImageUpload = (info) => {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //     // Lưu trữ thông tin hình ảnh đã tải lên vào state hoặc làm xử lý khác
  //     setImage(info.file);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };
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
        <form className={classes['add__form']}>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="student_id">Student ID</label>
                <Form.Item
                  name="student_id"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new student id' }
                  ]}>
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
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new status' }
                  ]}>
                  <Input id='status' value={status} onChange={(e) => {
                    setStatus(e.target.value);
                  }} />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="academic_year">Academic Year</label>
                <Form.Item
                  name="academic_year"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new academic_year' }
                  ]}>
                  <InputNumber id='academic_year' value={academic_year} onChange={(value) => {
                    setAcademicYear(value);
                  }} />
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

              {/* <div className={classes['add__form-row']}>
                <label htmlFor="image" style={{
                  marginRight: '10px'
                }}>Image</label>
                <Upload {...props} id='image'>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div> */}

              {/* <div className={classes['add__form-row']}>
                <label htmlFor="image" style={{ marginRight: '10px' }}>Image</label>
                <Form.Item
                  name="image"
                  noStyle
                  rules={[{ required: true, message: 'Please upload an image' }]}
                >
                  <Upload
                    id="image"
                    showUploadList={false}
                    onChange={handleImageUpload}
                    beforeUpload={() => false} // Ngăn chặn việc tự động tải lên
                    {...props} // Truyền props của Upload vào
                  >
                    {image ? (
                      <img src={URL.createObjectURL(image)} alt="Uploaded Image" style={{ maxWidth: '100px' }} />
                    ) : (
                      <Button icon={<UploadOutlined />} style={{ marginLeft: '10px' }}>
                        Click to Upload
                      </Button>
                    )}
                  </Upload>
                </Form.Item>
              </div> */}

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
        </form>
      </div>
    </Form>
  )
}

export default AddStudent