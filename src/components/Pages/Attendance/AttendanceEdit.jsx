import React, { useContext, useEffect, useState } from 'react'
import {Button, Input, Form,Alert, DatePicker, Select} from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
const EditStudent = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [attendanceData, setAttendanceData] = useState({});
  const params = useParams();
  const attendance_id = params.id;
  const [isValidAttendanceId, setIsValidAttendanceId] = useState(false);

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
    const fetchAttendanceData = async () => {
      try {
        const url = `/attendances/edit-attendance/${attendance_id}`
        const response = await axiosClient.get(url)
        const { student_name, class_name, course_name, day, slot, room, attendance_comment, status} = response.data.attendance
        setAttendanceData({ id: attendance_id, student_name, class_name, course_name, status, day: dayjs(day), slot, room, attendance_comment })
        setIsValidAttendanceId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchAttendanceData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        attendance_status: fields.status,
      }
      console.log(data);
      await axiosClient.put('/attendances/update-attendance/' + attendance_id, data)
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
      {isValidAttendanceId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={attendanceData}
          scrollToFirstError
        >
      <p className={classes['page__title']}>Edit Attendance</p>
        <div className={classes['edit__main']}>
            <div className={classes['edit__form-left']}>
                <div className={classes['edit__form-row']}>
                    <label htmlFor="id">Attendance ID</label>
                    <Form.Item
                  name="id"
                  noStyle>
                  <Input id='id' readOnly disabled />
                </Form.Item>
                </div>
                <div className={classes['edit__form-row']}>
                    <label htmlFor="class_name">Class</label>
                    <Form.Item
                  name="class_name"
                  noStyle>
                  <Input id='class_name' readOnly disabled />
                </Form.Item>
                </div>
            </div>
            <div className={classes['edit__form-right']}>
                <div className={classes['edit__form-row']}>
                    <label htmlFor="student_name">Student</label>
                    <Form.Item
                  name="student_name"
                  noStyle>
                  <Input id='student_name' readOnly disabled />
                </Form.Item>
                </div>
                <div className={classes['edit__form-row']}>
                    <label htmlFor="course_name">Course</label>
                    <Form.Item
                  name="course_name"
                  noStyle>
                  <Input id='course_name' readOnly disabled />
                </Form.Item>
                </div>
            </div>
        </div>
        <div className={classes['edit__group']}>
            <div className={classes['edit__group-row']}>
                <label htmlFor="day">Day</label>
                <Form.Item
                  name="day" // Thay đổi name thành "date_of_birth"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new day' }
                  ]}
                >
                  <DatePicker
                    id="day"  readOnly disabled
                  />
                </Form.Item>
            </div>
            <div className={classes['edit__group-row']}>
                <label htmlFor="slot">Slot</label>
                <Form.Item
                  name="slot"
                  noStyle>
                  <Input id='slot' readOnly disabled />
                </Form.Item>
            </div>
            <div className={classes['edit__group-row']}>
                <label htmlFor="room">Room</label>
                <Form.Item
                  name="room"
                  noStyle>
                  <Input id='room' readOnly disabled />
                </Form.Item>
            </div>
            <div className={classes['edit__group-row']}>
                <label htmlFor="status">Attendance Status</label>
                <Form.Item
                  name="status"
                  noStyle>
                  <Select
                    defaultValue="Choose Attendance"
                    style={{ width: '100%' }}
                    id='status'
                    options={[
                      { value: 0, label: 'Attended' },
                      { value: 1, label: 'Absent' },
                      { value: 2, label: 'Null' },
                    ]}
                  />
                </Form.Item>
            </div>
            {/* <div className={classes['edit__group-row']}>
                <label htmlFor="time">Attendance time</label>
                <DatePicker id='time'/>
            </div> */}
            <div className={classes['edit__group-row']}>
                <label htmlFor="attendance_comment">Teacher's comment</label>
                <Form.Item
                  name="attendance_comment"
                  noStyle>
                  <Input id='attendance_comment' readOnly disabled />
                </Form.Item>
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

export default EditStudent