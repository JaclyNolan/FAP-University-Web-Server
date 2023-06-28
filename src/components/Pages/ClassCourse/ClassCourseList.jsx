import React from 'react'
import {Input, Button, Popconfirm, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import classes from '../Page.module.scss'
const ClassCourseList = () => {
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
            title: 'Class Course ID',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher'
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major'
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/classcourse/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the class course"
                    description="Are you sure to delete this this class course?"
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
            teacher: 'Nguyen Van A',
            course: 'Programing',
            class: 'bhaf12345',
            major: 'Information and Technology',
            actions: {
                id: 1
            }
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Class course List</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={classes['list__nav-right__add']}>
                        <Link to='/classcourse/add'>
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
                            { value: 'Information and Technology', label: 'Information and Technology' },
                            { value: 'Design', label: 'Design' },
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
                    <Select
                        defaultValue="Class"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'BHAF1234', label: 'BHAF1234' },
                        ]}
                    />
                    <Select
                        defaultValue="Teacher"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'Nguyen Thai Cuong', label: 'Nguyen Thai Cuong' },
                            { value: 'Ngo Thi Mai Loan', label: 'Ngo Thi Mai Loan' },
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

export default ClassCourseList