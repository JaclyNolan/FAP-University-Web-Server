import React from 'react'
import {Button, Input, Select, InputNumber, Upload, message, DatePicker} from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import Image from '../../common/Image/Image';
const EditStudent = () => {
  const handleChange = () => {

  }
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <p className={classes['page__title']}>Edit student</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="sid">Student ID</label>
                    <Input id='sid' disabled value={'bhaf12345'}/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="Gender">Gender:</label>
                    <Select
                        defaultValue="Choose Gender"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        id='Gender'
                        options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        ]}
                    />
                </div>
                <div className={classes['add__form-row']}>
                  <label htmlFor="email">Email</label>
                  <Input id='email' value={'nvh@fpt.edu.vn'} disabled/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="address">Address</label>
                    <Input id='address'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="status">Status</label>
                    <Input id='status'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="gpa">GPA</label>
                    <Input id='gpa' value={1.2} disabled/>
                </div>
            </div>
          <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="fullname">Full name</label>
                <Input id='fullname'/>
              </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="dob">Date Of Birth</label>
              <DatePicker id='dob'/>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="img" style={{
                marginRight: '10px'
              }}>Image</label>
                <div  className={classes['add__form-row-row']}>
                    <Upload {...props} id='img'>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Image alt='user' src='https://img.freepik.com/free-icon/user_318-159711.jpg' width={50} height={50}/>
                </div>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="phone">Phone number</label>
              <InputNumber id='phone' min={0}/>
            </div>
            <div className={classes['add__form-row']}>
                <label htmlFor="Major">Major:</label>
                <Select
                    defaultValue="Choose Major"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    id='Major'
                    options={[
                    { value: 'Information and Technology', label: 'Information and Technology' },
                    { value: 'Design', label: 'Design' },
                    ]}
                />
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="academicyear">Academic Year</label>
              <InputNumber id='academicyear' min={2018}/>
            </div>
          </div>
        </div>
        <div>
          <Button type='primary'>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default EditStudent