import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useParams } from 'react-router-dom';
const NewsEdit = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [newData, setNewData] = useState({});

  const params = useParams();
  const news_id = params.id;
  const [isValidNewId, setIsValidNewId] = useState(false);

  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  useEffect(() => {
    setContentLoading(true);
    const fetchNewData = async () => {
      try {
        const url = `/newContents/edit-newContent/${news_id}`
        const response = await axiosClient.get(url)
        console.log(response.data.newsContent);
        const { id, title, content, author, status } = response.data.newsContent
        setNewData({
          id,
          title,
          content,
          author,
          status
        })
        setIsValidNewId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchNewData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        title: fields.title,
        content: fields.content,
        author: fields.author,
        status: fields.status,
      }

      await axiosClient.put('/newContents/update-newContent/' + news_id, data)
        .then((response) => {
          setSuccessMessage(response.data.message);
          setContentLoading(false);
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

  return (
    <>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      {isValidNewId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={newData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Add News</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="id">ID</label>
                <Form.Item
                  name="id"
                  noStyle>
                  <Input id='id' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="title">Title</label>
                <Form.Item
                  name="title"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new title' }
                  ]}>
                  <Input id='title' />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="author">Author</label>
                <Form.Item
                  name="author"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new author' }
                  ]}>
                  <Input id='author' />
                </Form.Item>
              </div>
            </div>
            <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="status">Status:</label>
                <Form.Item
                  name="status"
                  noStyle
                >
                  <Select
                    style={{ width: '100%' }}
                    id='status'
                    options={[
                      { value: 0, label: 'Active' },
                      { value: 1, label: 'Expire' },
                    ]}
                  >
                  </Select>
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
                  <Input id='content' />
                </Form.Item>
          </div>
          <div>
            <Form.Item>
              <Button type='primary' htmlType="submit">Submit</Button>
            </Form.Item>
          </div>
        </Form>
      }
    </>
  )
}

export default NewsEdit