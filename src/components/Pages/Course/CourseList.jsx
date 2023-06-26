import React from 'react'
import {Input, Button, Popconfirm, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const CourseList = () => {
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Tution fee',
            dataIndex: 'tutionfee',
            key: 'tutionfee'
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/course/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the course"
                    description="Are you sure to delete this course?"
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
            name: 'programing',
            major: 'Information and Technology',
            credit: 'credit 1',
            tutionfee: '123.234vnd',
            actions: {
                id: 1
            }
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Course List</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={classes['list__nav-right__add']}>
                        <Link to='/course/add'>
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
                        defaultValue="Major"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'IT', label: 'IT' },
                            { value: 'Design', label: 'Design' },
                            { value: 'Business', label: 'Business' }
                        ]}
                    />
                    <Select
                        defaultValue="Credit"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'Credit 1', label: 'Credit 1' },
                            { value: 'Credit 2', label: 'Credit 2' },
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

export default CourseList