import React from 'react'
import {Input, Button, Popconfirm, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const AttendanceList = () => {
    const {Search} = Input

    const handleChange = () => {
        console.log('changinggg');
    }
    const onSearch = () => {

    }
    const deleteUserHandler = (id) => {
        alert(`Deleted ${id}`)
    }
    const tableColumns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student'
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day'
        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            key: 'slot',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/attendance/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
            </div>
        },

    ]
    const tableData = [
        {
            key: '1',
            student: 'Nguyen Van A',
            class: 'BHAF123',
            course: 'Programing',
            day: 'Tuesday',
            slot: '1',
            room: 'B01',
            status: 'In progress',
            actions: {
                id: 1
            }
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Attendance List</p>
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
                    <Select
                        defaultValue="Class"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'BHAF123', label: 'BHAF123' },
                            { value: 'BHAF1234', label: 'BHAF1234' },
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

export default AttendanceList