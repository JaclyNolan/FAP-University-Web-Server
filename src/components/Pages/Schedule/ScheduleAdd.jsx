import React from 'react'
import {Button, Input, Select, DatePicker} from 'antd'
import classes from '../Page.module.scss'
const ScheduleAdd = () => {
    const handleChange = (value) => {
        console.log(value);
    }
      const onChange = (value) => {

      }
  return (
    <div>
      <p className={classes['page__title']}>Add Schedule</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="cid">Class Course ID</label>
                    <Input id='cid'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="day">Day</label>
                    <DatePicker id='day' onChange={onChange} />
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="slot">Slot:</label>
                    <Select
                        defaultValue="Choose slot"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        id='slot'
                        options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        ]}
                    />
                </div>
            </div>
          <div className={classes['add__form-right']}>
            <div className={classes['add__form-row']}>
                <label htmlFor="status">Status:</label>
                <Select
                    defaultValue="Choose status"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    id='status'
                    options={[
                    { value: 'not started', label: 'not started' },
                    { value: 'ended', label: 'ended' },
                    ]}
                />
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="room">Room: </label>
              <Input id='room'/>
            </div>
          </div>
        </div>
        <div>
          <Button type='primary'>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default ScheduleAdd