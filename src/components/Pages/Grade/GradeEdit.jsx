import React, { useContext, useEffect, useState } from 'react'
import {Button, Input, Select, Form,Alert, InputNumber } from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useParams } from 'react-router-dom';

const GradeEdit = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [gradeData, setGradeData] = useState({});
  const params = useParams();
  const grade_id = params.id;
  const [isValidGradeId, setIsValidGradeId] = useState(false);

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
    const fetchGradeData = async () => {
      try {
        const url = `/grades/edit-grade/${grade_id}`
        const response = await axiosClient.get(url)
        console.log(response);
        const { student_id, class_name, course_name, status, score} = response.data.grade
        setGradeData({ id: grade_id, student_id, class_name, course_name, status, score })
        setIsValidGradeId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchGradeData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        class_enrollment_id: fields.class_enrollment_id,
        score: fields.score,
        status: fields.status,
      }
      console.log(data);
      await axiosClient.put('/grades/update-grade/' + grade_id, data)
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
      {isValidGradeId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={gradeData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Add Grade</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="student_id">Student ID</label>
                <Form.Item
                  name="student_id"
                  noStyle>
                  <Input id='student_id' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="score">Score</label>
                <Form.Item
                  name="score"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new score' }
                  ]}>
                  <InputNumber id='score' />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="class_enrollment_id">Class Enrollment ID</label>
                <Form.Item
                  name="class_enrollment_id"
                  noStyle>
                  <Input id='class_enrollment_id' readOnly disabled />
                </Form.Item>
              </div>
            </div>

            <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="course_name">Course Name</label>
                <Form.Item
                  name="course_name"
                  noStyle>
                  <Input id='course_name' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="class_name">Class Name</label>
                <Form.Item
                  name="class_name"
                  noStyle>
                  <Input id='class_name' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="status">Status</label>
                <Form.Item
                  name="status"
                  noStyle>
                  <Select
                    defaultValue="Choose Status"
                    style={{ width: '100%' }}
                    id='status'
                    options={[
                      { value: 'Failed', label: 'Failed' },
                      { value: 'Passed', label: 'Passed' },
                      { value: 'Merit', label: 'Merit' },
                      { value: 'Distiction', label: 'Distiction' },
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

export default GradeEdit