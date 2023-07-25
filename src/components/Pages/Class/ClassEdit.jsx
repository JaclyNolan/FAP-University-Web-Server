import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, message, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useParams } from 'react-router-dom';

const ClassEdit = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [classData, setClassData] = useState({});

  const params = useParams();
  const class_id = params.id;
  const [isValidClassId, setIsValidClassId] = useState(false);

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
    const fetchClassData = async () => {
      try {
        const url = `/class/edit-class/${class_id}`
        const response = await axiosClient.get(url)
        console.log(response.data.class);
        const { id, name, major_id } = response.data.class
        setClassData({
          id: id,
          name,
          major_id,
        })
        setIsValidClassId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchClassData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        class_name: fields.name,
        major_id: fields.major_id,
      }

      await axiosClient.put('/class/update-class/' + class_id, data)
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
    <div>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
      {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
      {isValidClassId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={classData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Add Class</p>
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
                <label htmlFor="major_id">Major:</label>
                <Form.Item
                  name="major_id"
                  noStyle>
                  <Select
                    style={{ width: '100%' }}
                    id='major_id'
                    options={[
                      { value: 1, label: 'Business Administration' },
                      { value: 2, label: 'Computer Science' },
                      { value: 3, label: 'Mechanical Engineering' },
                      { value: 4, label: 'Psychology' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="name">Name</label>
                <Form.Item
                  name="name"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new name' }
                  ]}>
                  <Input id='name' />
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
            <Form.Item>
              <Button type='primary' htmlType="submit">Submit</Button>
            </Form.Item>
          </div>
        </Form>
      }
    </div>
  )
}

export default ClassEdit