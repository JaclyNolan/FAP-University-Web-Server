import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useParams } from 'react-router-dom';

const CourseEdit = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [courseData, setCourseData] = useState({});

  const params = useParams();
  const course_id = params.id;
  const [isValidCourseId, setIsValidCourseId] = useState(false);

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
    const fetchCourseData = async () => {
      try {
        const url = `/courses/edit-course/${course_id}`
        const response = await axiosClient.get(url)
        console.log(response.data.course);
        const { id, name, major_id, credits, tuition_fee } = response.data.course
        setCourseData({
          id: id,
          name,
          major_id,
          credits,
          tuition_fee,
        })
        setIsValidCourseId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchCourseData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        course_name: fields.name,
        major_id: fields.major_id,
        credits: fields.credits
      }

      await axiosClient.put('/courses/update-course/' + course_id, data)
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
      {isValidCourseId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={courseData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Add Course</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="id">Course ID</label>
                <Form.Item
                  name="id"
                  noStyle>
                  <Input id='id' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="tuition_fee">Tution fee</label>
                <Form.Item
                  name="tuition_fee"
                  noStyle>
                  <Input id='tuition_fee' readOnly disabled/>
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
              <div className={classes['add__form-row']}>
                <label htmlFor="credits">Credit</label>
                <Form.Item
                  name="credits"
                  noStyle>
                  <Select
                    defaultValue="Choose Credit"
                    style={{ width: '100%' }}
                    id='credits'
                    options={[
                      { value: 1, label: '1' },
                      { value: 2, label: '2' },
                      { value: 3, label: '3' },
                      { value: 4, label: '4' },
                      { value: 5, label: '5' },
                    ]}
                  />
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

export default CourseEdit