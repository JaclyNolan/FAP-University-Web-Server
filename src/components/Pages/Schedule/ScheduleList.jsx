import React from 'react'
import {Input, Button, Popconfirm, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const ScheduleList = () => {
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
            title: 'Id',
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
            key: 'course',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
                <Link to={`/schedule/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the schedule"
                    description="Are you sure to delete this this schedule?"
                    onConfirm={() => deleteUserHandler(text.id)}
                    okText="Confirm"
                    cancelText="Cancel"
                >
                    <Button danger type='primary'>
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </Popconfirm>
            </div>
        },

    ]
    const tableData = [
        {
            key: '1',
            class: 'BHAF12345',
            course: 'IT fundermental',
            email: 'anvbhaf190345@fpt.edu.vn',
            day: 'Tuesday',
            slot: '2',
            room: 'B01',
            status: 'Not started',
            actions: {
                id: 1
            }
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>schedule List Test</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={classes['list__nav-right__add']}>
                        <Link to='/schedule/add'>
                            <Button type='primary'>
                                <i className="fas fa-plus"></i>
                                <span>Add</span>
                            </Button>
                        </Link>
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
                        defaultValue="Gender"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                        ]}
                    />
                    <Select
                        defaultValue="Admission Year"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: '2019', label: '2019' },
                            { value: '2020', label: '2020' },
                            { value: '2019', label: '2019' },
                            { value: '2021', label: '2021' },
                            { value: '2022', label: '2022' },
                            { value: '2023', label: '2023' },
                        ]}
                    />
                    <Select
                        defaultValue="Status"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'In Progress', label: 'In Progress' },
                            { value: 'Completed', label: 'Completed' },
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

export default ScheduleList