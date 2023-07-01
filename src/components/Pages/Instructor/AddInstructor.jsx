import React from 'react'
import {Button, Input, Select, InputNumber, Upload, message, DatePicker} from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
const AddInstructor= () => {
    const handleChange = (value) => {
        console.log(value);
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
      <p className={classes['page__title']}>Add Instructor</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="fullname">Full name</label>
                    <Input id='fullname'/>
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
                    <label htmlFor="address">Address</label>
                    <Input id='address'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="position">Position</label>
                    <Input id='position'/>
                </div>
            </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="email">Email</label>
              <Input id='email' disabled/>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="dob">Date Of Birth</label>
              <DatePicker id='dob'/>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="img" style={{
                marginRight: '10px'
              }}>Image</label>
                <Upload {...props} id='img'>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="phone">Phone number</label>
              <InputNumber id='phone' min={0}/>
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

export default AddInstructor