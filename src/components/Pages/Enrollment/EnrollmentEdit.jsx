import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, Form, Alert} from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useParams } from 'react-router-dom';
const EnrollmentEdit = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [enrollmentData, setEnrollmentData] = useState({});
  const params = useParams();
  const enrollment_id = params.id;
  const [isValidEnrollmentId, setIsValidEnrollmentId] = useState(false);

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
    const fetchEnrollmentsData = async () => {
      try {
        const url = `/enrollments/edit-enrollment/${enrollment_id}`
        const response = await axiosClient.get(url)
        const { student_id, student_name, email, major_name, course_name, status } = response.data.enrollment
        setEnrollmentData({ id: enrollment_id, student_id, student_name, email, major_name, course_name, status })
        setIsValidEnrollmentId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchEnrollmentsData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        status: fields.status,
      }
      console.log(data);
      await axiosClient.put('/enrollments/update-enrollment/' + enrollment_id, data)
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
      {isValidEnrollmentId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={enrollmentData}
          scrollToFirstError
        >
          <p className={classes['page__title']}>Add Student</p>
          <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="id">Enrollment ID</label>
                <Form.Item
                  name="id"
                  noStyle>
                  <Input id='id' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="student_name">Student name</label>
                <Form.Item
                  name="student_name"
                  noStyle>
                  <Input id='student_name' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="status">Status:</label>
                <Form.Item
                  name="status"
                  noStyle>
                  <Select
                    defaultValue="Choose Status"
                    style={{ width: '100%' }}
                    id='status'
                    options={[
                      { value: 0, label: 'Processing' },
                      { value: 1, label: 'Success' },
                      { value: 2, label: 'Failure' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="sid">Student ID</label>
                <Form.Item
                  name="student_id"
                  noStyle>
                  <Input id='student_id' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="email">Student Email</label>
                <Form.Item
                  name="email"
                  noStyle>
                  <Input id='email' readOnly disabled />
                </Form.Item>
              </div>
              <div className={classes['add__form-row']}>
                <label htmlFor="course_name">Course</label>
                <Form.Item
                  name="course_name"
                  noStyle>
                  <Input id='course_name' readOnly disabled />
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

export default EnrollmentEdit