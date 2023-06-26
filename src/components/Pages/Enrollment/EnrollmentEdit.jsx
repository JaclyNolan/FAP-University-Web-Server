import React from 'react'
import {Button, Input, Select, InputNumber, Upload, message, DatePicker} from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
const EnrollmentEdit = () => {
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
      <p className={classes['page__title']}>Add Student</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="id">Enrollment ID</label>
                    <Input id='id' disabled value={'e43'}/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="sname">Student name</label>
                    <Input id='sname' value={'Nguyen Van A'} disabled/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="status">Status:</label>
                    <Select
                        defaultValue="Choose status"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        id='status'
                        options={[
                        { value: 'In Progress', label: 'In Progress' },
                        { value: 'Closed', label: 'Closed' },
                        ]}
                    />
                </div>
            </div>
          <div className={classes['add__form-right']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="sid">Student ID</label>
                    <Input id='sid' disabled value={'bhaf1234'}/>
                </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="semail">Student Email</label>
              <Input id='semail' disabled value={'nabhaf123@fpt.edu.vn'}/>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="course">Course</label>
              <Input value={'Programing'} id='course' disabled/>
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

export default EnrollmentEdit