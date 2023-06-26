import React from 'react'
import {Button, Input, message, Radio, DatePicker} from 'antd'
import classes from '../Page.module.scss'
const EditStudent = () => {
  const handleChange = () => {

  }
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <p className={classes['page__title']}>Edit Attendance</p>
      <form className={classes['edit__form']}>
        <div className={classes['edit__main']}>
            <div className={classes['edit__form-left']}>
                <div className={classes['edit__form-row']}>
                    <label htmlFor="id">Attendance ID</label>
                    <Input id='id' disabled value={'2345'}/>
                </div>
                <div className={classes['edit__form-row']}>
                    <label htmlFor="cid">Class ID</label>
                    <Input id='cid' disabled value={'bhaf12345'}/>
                </div>
            </div>
            <div className={classes['edit__form-right']}>
                <div className={classes['edit__form-row']}>
                    <label htmlFor="sid">Student ID</label>
                    <Input id='sid' disabled value={'bhaf12345'}/>
                </div>
                <div className={classes['edit__form-row']}>
                    <label htmlFor="courseId">Course ID</label>
                    <Input id='courseId' disabled value={'bhaf12345'}/>
                </div>
            </div>
        </div>
        <div className={classes['edit__group']}>
            <div className={classes['edit__group-row']}>
                <label htmlFor="day">Day</label>
                <Input id='day' disabled value={'Tuesday'}/>
            </div>
            <div className={classes['edit__group-row']}>
                <label htmlFor="slot">Slot</label>
                <Input id='slot' disabled value={'1'}/>
            </div>
            <div className={classes['edit__group-row']}>
                <label htmlFor="room">Room</label>
                <Input id='room' disabled value={'B01'}/>
            </div>
            <div className={classes['edit__group-row']}>
                <label htmlFor="status">Attendance Status</label>
                <Radio id='status'>Checked</Radio>
            </div>
            <div className={classes['edit__group-row']}>
                <label htmlFor="time">Attendance time</label>
                <DatePicker id='time'/>
            </div>
            <div className={classes['edit__group-row']}>
                <label htmlFor="comment">Teacher's comment</label>
                <Input id='room' disabled value={'He is late'}/>
            </div>
        </div>
        <div>
          <Button type='primary'>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default EditStudent