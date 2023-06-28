import React from 'react'
import {Input, Button, Popconfirm, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const EnrollmentList = () => {
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
            title: 'Student ID',
            dataIndex: 'studentId',
            key: 'studentId'
        },
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major'
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
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
                <Link to={`/enrollment/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the enrollment"
                    description="Are you sure to delete this this enrollment?"
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
            student: 'Nguyen Van A',
            studentId: 'bhaf123',
            email: 'anvbhaf190345@fpt.edu.vn',
            major: 'IT',
            course: 'Programing',
            gpa: '4.0',
            status: 'In progress',
            actions: {
                id: 1
            }
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Enrollment List</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={classes['list__nav-right__add']}>
                        <Link to='/enrollment/add'>
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

export default EnrollmentList