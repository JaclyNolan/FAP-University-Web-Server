import React from 'react'
import {Input, Button, Popconfirm, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const Courses = () => {
    const {Search} = Input

    const handleChange = () => {
        console.log('changinggg');
    }
    const onSearch = () => {

    }
    const tableColumns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'no',
        },
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            key: 'courseName'
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Tution Fee',
            dataIndex: 'tutionFee',
            key: 'tutionFee'
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (t) => <p>{t}</p>
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (status) => {return status !== 'Passed' && <Link to={`/student/courseregister/1`}><Button>Register</Button></Link>}
        }
    ]
    const tableData = [
        {
            key: '1',
            courseName: 'Programing',
            semester: '1',
            credit: 'ABC',
            tutionFee: '5.000.000vnd',
            address: 'Ha Noi - Viet Nam',
            status: 'Passed',
            actions: 'notPassed'
        }
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
            <div className={classes['list__table']}>
                <Table columns={tableColumns} pagination={{ pageSize: 6 }} dataSource={tableData} />
            </div>
        </div>
    </div>
  )
}

export default Courses