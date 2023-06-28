import React from 'react'
import {Button, Input, Select, InputNumber, Upload, message, DatePicker} from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
const NewsAdd = () => {
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
      <p className={classes['page__title']}>Add News</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="title">Title</label>
                    <Input id='title'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="author">Author</label>
                    <Input id='author'/>
                </div>
            </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
                    <label htmlFor="status">Status:</label>
                    <Select
                        defaultValue="Choose status"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        id='status'
                        options={[
                        { value: 'active', label: 'active' },
                        { value: 'expire', label: 'expire' },
                        ]}
                    />
                </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="postDate">Post Date</label>
              <DatePicker id='postDate'/>
            </div>
          </div>
        </div>
        <div className={classes['add__details']}>
            <label htmlFor="details">Details</label>
            <Input.TextArea id='details'></Input.TextArea>
        </div>
        <div>
          <Button type='primary'>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default NewsAdd