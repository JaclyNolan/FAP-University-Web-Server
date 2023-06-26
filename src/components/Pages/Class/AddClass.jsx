import React from 'react'
import {Button, Input, Select, InputNumber, Upload, message, DatePicker} from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
const AddClass = () => {
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
                    <label htmlFor="name">Name</label>
                    <Input id='name'/>
                </div>
            </div>
          <div className={classes['add__form-right']}>
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
          </div>
        </div>
        <div>
          <Button type='primary'>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default AddClass