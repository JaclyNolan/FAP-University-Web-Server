import React, { useContext, useState } from 'react'
import { Button, Input, Select, message, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
const AddCourse = () => {
  // const handleChange = (value) => {
  //     console.log(value);
  // }
  // const props = {
  //     name: 'file',
  //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //     headers: {
  //       authorization: 'authorization-text',
  //     },
  //     onChange(info) {
  //       if (info.file.status !== 'uploading') {
  //         console.log(info.file, info.fileList);
  //       }
  //       if (info.file.status === 'done') {
  //         message.success(`${info.file.name} file uploaded successfully`);
  //       } else if (info.file.status === 'error') {
  //         message.error(`${info.file.name} file upload failed.`);
  //       }
  //     },
  //   };

  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);

  const [course_name, setCourseName] = useState("");
  const [credits, setCredits] = useState("");
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

  const handleCreditsChange = (value) => {
    setCredits(value);
  }

  const handleMajorChange = (value) => {
    setMajorId(value);
  }

  const onFinish = () => {
    (async () => {
      setContentLoading(true);
      const data = {
        course_name: course_name,
        credits: credits,
        major_id: major_id,
      }
      console.log(data);
      await axiosClient.post('/courses/add-course', data)
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
    form.resetFields(['course_name']);
    form.resetFields(['credits']);
    form.resetFields(['major_id']);
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
        <p className={classes['page__title']}>Add Course</p>
        {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
        {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
        <div className={classes['add__main']}>
          <div className={classes['add__form-left']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="course_name">Course Name</label>
              <Form.Item
                name="course_name"
                noStyle
                rules={[
                  { required: true, message: 'Please input new course name' }
                ]}>
                <Input id='course_name' value={course_name} onChange={(e) => {
                  setCourseName(e.target.value);
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
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="credits">Credit</label>
              <Form.Item
                name="credits"
                noStyle>
                <Select
                  defaultValue="Choose Credit"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    handleCreditsChange(e)
                  }}
                  id='credits'
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
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
      </div>
    </Form>
  )
}

export default AddCourse