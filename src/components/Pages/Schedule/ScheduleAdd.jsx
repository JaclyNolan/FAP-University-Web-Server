import React, { useContext, useState } from 'react'
import { Button, Select, InputNumber, DatePicker, Form, Alert } from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';

const ScheduleAdd = () => {
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [slot, setSlot] = useState("");
  const [status, setStatus] = useState(null);
  const [day, setDay] = useState("");
  const [room, setRoom] = useState("");
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

  const handleSlotChange = (value) => {
    setSlot(value);
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

  const onFinish = (fields) => {
    (async () => {
      setContentLoading(true);
      const data = {
        class_course_id: fields.class_course_id,
        day: day,
        slot: slot,
        room: room,
        status: status,
      }
      console.log(data);
      await axiosClient.post('/classSchedules/add-classSchedule', data)
        .then((response) => {
          setSuccessMessage(response.data.message);
          setContentLoading(false);
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.error);
          setContentLoading(false);
        })
    })()
  }

  const resetForm = () => {
    form.resetFields(['class_course_id']);
    form.resetFields(['day']);
    form.resetFields(['room']);
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
      <p className={classes['page__title']}>Add Schedule</p>
      {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
        {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
        <div className={classes['add__main']}>
          <div className={classes['add__form-left']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="class_course_id">Class Course ID</label>
              <Form.Item
                name="class_course_id"
                noStyle
                rules={[
                  { required: true, message: 'Please search & select a class course ID' }
                ]}>
                <DebounceSelect
                  // value={null}
                  placeholder="Select Class Course ID"
                  key='class_course_id'
                  fetchOptions={fetchClassCourseList} />
              </Form.Item>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="day">Day</label>
              <Form.Item
                name="day" // Thay đổi name thành "date_of_birth"
                noStyle
                rules={[
                  { required: true, message: 'Please input new date_of_birth' }
                ]}
              >
                <DatePicker
                  id="day"
                  value={day}
                  onChange={(date, dayString) => { // Sửa onChange handler
                    setDay(dayString); // Cập nhật giá trị vào state
                  }}
                />
              </Form.Item>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="slot">Slot:</label>
              <Form.Item
                name="slot"
                noStyle>
                <Select
                  defaultValue="Choose Slot"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    handleSlotChange(e)
                  }}
                  id='slot'
                  options={[
                    { value: '1', label: 'Slot 1 (7:15-9:15)' },
                    { value: '2', label: 'Slot 2 (9:25-11:25)' },
                    { value: '3', label: 'Slot 3 (12:00-14:00)' },
                    { value: '4', label: 'Slot 4 (14:10-16:10)' },
                    { value: '5', label: 'Slot 5 (16:20-18:20)' },
                    { value: '6', label: 'Slot 6 (18:30-20:30)' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
              <label htmlFor="status">Status:</label>
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
                    { value: '0', label: 'Not Started' },
                    { value: '1', label: 'Ongoing' },
                    { value: '2', label: 'Completed' },
                  ]}
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
                <InputNumber id='room' value={room} onChange={(value) => {
                  setRoom(value);
                }} />
              </Form.Item>
            </div>
          </div>
        </div>
        <div>
        <Form.Item>
          <Button type='primary' htmlType="submit">Submit</Button>
          <Button type="default" onClick={resetForm}>Reset</Button>
        </Form.Item>
        </div>
    </div>
    </Form>
  )
}

export default ScheduleAdd