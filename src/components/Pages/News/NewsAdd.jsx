import React, { useContext, useState } from 'react'
import { Button, Input, Select, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
const NewsAdd = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");


  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  const handleStatusChange = (value) => {
    setStatus(value);
  }

  const onFinish = () => {
    (async () => {
      setContentLoading(true);
      const data = {
        title: title,
        content: content,
        author: author,
        status: status,
      }
      console.log(data);
      await axiosClient.post('/newContents/add-newContent', data)
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
    form.resetFields(['title']);
    form.resetFields(['content']);
    form.resetFields(['author']);
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
        <p className={classes['page__title']}>Add News</p>
        {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
        {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
        <div className={classes['add__main']}>
          <div className={classes['add__form-left']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="title">Title</label>
              <Form.Item
                name="title"
                noStyle
                rules={[
                  { required: true, message: 'Please input title' }
                ]}>
                <Input id='title' value={author} onChange={(e) => {
                  setTitle(e.target.value);
                }} />
              </Form.Item>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="author">Author</label>
              <Form.Item
                name="author"
                noStyle
                rules={[
                  { required: true, message: 'Please input news' }
                ]}>
                <Input id='author' value={author} onChange={(e) => {
                  setAuthor(e.target.value);
                }} />
              </Form.Item>
            </div>
          </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>

              <label htmlFor="status">status:</label>
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
                    { value: 0, label: 'active' },
                    { value: 1, label: 'expire' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={classes['add__details']}>
          <label htmlFor="content">Details</label>
          <Form.Item
            name="content"
            noStyle
            rules={[
              { required: true, message: 'Please input new content' }
            ]}>
            <Input id='content' value={content} onChange={(e) => {
              setContent(e.target.value);
            }} />
          </Form.Item>
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

export default NewsAdd