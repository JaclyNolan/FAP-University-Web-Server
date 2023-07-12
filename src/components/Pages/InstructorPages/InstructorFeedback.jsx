import React from 'react'
import {Button, Input, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import classes from '../Page.module.scss'
const InstructorFeedback = () => {
    const {Search} = Input

    const handleChange = () => {
        console.log('changinggg');
    }
    const onSearch = () => {

    }
    const tableColumns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class'
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course'
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/feedback/${text.id}`} style={{marginRight: '10px'}}>
                    <Button>View Details</Button>
                </Link>
            </div>
        },

    ]
    const tableData = [
        {
            key: '1',
            class: 'BHAF123',
            course: 'Programing',
            actions: {
                id: 1
            }
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Feedback List</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                </div>
            </div>
            <div className={classes['list__filters']}>
                    <Select
                        defaultValue="Class"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'BHAF123', label: 'BHAF123' },
                            { value: 'BHAF124', label: 'BHAF124' },
                        ]}
                    />
                    <Select
                        defaultValue="Course"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'Programing', label: 'Programing' },
                            { value: 'Networking', label: 'Networking' },
                            { value: 'DSA', label: 'DSA' },
                            { value: 'Software lifecycle', label: 'Software lifecycle' },
                        ]}
                    />
            </div>
            <div className={classes['list__table']}>
                <Table columns={tableColumns} pagination={{ pageSize: 6 }} dataSource={tableData} />
            </div>
        </div>
    </div>
  )
}

export default InstructorFeedback