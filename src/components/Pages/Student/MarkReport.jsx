import React from 'react'
import {Input, Button, Popconfirm, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const MarkReport = () => {
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
            title: 'No',
            dataIndex: 'key',
            key: 'no',
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course'
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class'
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ]
    const tableData = [
        // {
        //     key: '1',
        //     image: {
        //         src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
        //         alt: 'user'
        //     },
        //     fullname: 'Nguyen Van A',
        //     email: 'anvbhaf190345@fpt.edu.vn',
        //     dob: '01/01/2023',
        //     phone: '012345678',
        //     address: 'Ha Noi - Viet Nam',
        //     actions: {
        //         id: 1
        //     }
        // }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Student List</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={classes['list__nav-right__add']}>
                        <Link to='/student/add'>
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

export default MarkReport