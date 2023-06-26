import React from 'react'
import {Button, Input, Select, DatePicker} from 'antd'
import classes from '../Page.module.scss'
const NewsEdit = () => {
    const handleChange = (value) => {
        console.log(value);
    }
  return (
    <div>
      <p className={classes['page__title']}>Add News</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="id">ID</label>
                    <Input id='id' value={123} disabled/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="title">Title</label>
                    <Input id='title'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="author">Author</label>
                    <Input id='author'/>
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
                        { value: 'active', label: 'active' },
                        { value: 'expire', label: 'expire' },
                        ]}
                    />
                </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="postDate">Post Date</label>
              <DatePicker id='postDate'/>
            </div>
          </div>
        </div>
        <div className={classes['add__details']}>
            <label htmlFor="details">Details</label>
            <Input.TextArea id='details'></Input.TextArea>
        </div>
        <div>
          <Button type='primary'>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default NewsEdit