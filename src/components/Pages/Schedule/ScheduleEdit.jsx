import React, { useContext, useEffect, useState } from 'react'
import {Button, Input, Select, DatePicker, Form,Alert, InputNumber } from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
const ScheduleAdd = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [classScheduleData, setClassScheduleData] = useState({});
  const params = useParams();
  const class_schedule_id = params.id;
  const [isValidClassScheduleId, setIsValidClassScheduleId] = useState(false);

  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }
  async function fetchClassCourseList(searchValue) {
    const url = '/classCourses'
      + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
    console.log(url);

    try {
      const response = await axiosClient.get(url)
      const data = response.data.classCourses
      return data.map((info) => ({
        label: `${info.id} ${info.class_name} ${info.course_name} ${info.instructor_name}`,
        value: info.id,
      }))
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  }
  useEffect(() => {
    setContentLoading(true);
    const fetchClassScheduleData = async () => {
      try {
        const url = `/classSchedules/edit-classSchedule/${class_schedule_id}`
        const response = await axiosClient.get(url)
        console.log(response);
        const { day, slot, room, status, class_course_id } = response.data.classSchedule
        setClassScheduleData({ id: class_schedule_id, day: dayjs(day), slot, room, status, class_course_id})
        setIsValidClassScheduleId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchClassScheduleData();
  }, [])

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        class_course_id: fields.class_course_id,
        day: dayjs(fields.day).format('YYYY-MM-DD'),
        slot: fields.slot,
        room: fields.room,
        status: fields.status,
      }
      console.log(data);
      await axiosClient.put('/classSchedules/update-classSchedule/' + class_schedule_id, data)
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
      {isValidClassScheduleId &&
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={classScheduleData}
          scrollToFirstError
        >
      <p className={classes['page__title']}>Edit Schedule</p>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="id">Class Schedule ID</label>
                    <Form.Item
                  name="id"
                  noStyle>
                  <Input id='id' readOnly disabled />
                </Form.Item>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="class_course_id">Class Course ID</label>
                    <Form.Item
                  name="class_course_id"
                  noStyle>
                  <Input readOnly disabled />
                </Form.Item>

                <Form.Item
                  name="class_course_id"
                  noStyle
                  rules={[
                    { required: true, message: 'Please search & select a class course ID' }
                  ]}>
                  <DebounceSelect
                    placeholder="Select Class Course ID"
                    key='class_course_id'
                    fetchOptions={fetchClassCourseList} 
                    />
                </Form.Item>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="slot">Slot:</label>
                    <Form.Item
                  name="slot"
                  noStyle
                >
                  <Select
                    style={{ width: '100%' }}
                    id='slot'
                    options={[
                      { value: 1, label: 'Slot 1 (7:15-9:15)' },
                    { value: 2, label: 'Slot 2 (9:25-11:25)' },
                    { value: 3, label: 'Slot 3 (12:00-14:00)' },
                    { value: 4, label: 'Slot 4 (14:10-16:10)' },
                    { value: 5, label: 'Slot 5 (16:20-18:20)' },
                    { value: 6, label: 'Slot 6 (18:30-20:30)' },
                    ]}
                  >
                  </Select>
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
                      { value: 0, label: 'Not Started' },
                    { value: 1, label: 'Ongoing' },
                    { value: 2, label: 'Completed' },
                    ]}
                  >
                  </Select>
                </Form.Item>
            </div>
            <div className={classes['add__form-row']}>
                    <label htmlFor="day">Day</label>
                    <Form.Item
                  name="day" // Thay đổi name thành "date_of_birth"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new day' }
                  ]}
                >
                  <DatePicker
                    id="day"
                  />
                </Form.Item>
                </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="room">Room: </label>
              <Form.Item
                  name="room"
                  noStyle
                  rules={[
                    { required: true, message: 'Please input new room' }
                  ]}>
                  <InputNumber id='room' />
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

export default ScheduleAdd