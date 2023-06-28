import React from 'react'
import {Input, Button, Popconfirm, Select, Table} from 'antd'
import { Link } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const StaffList = () => {
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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render : (text) => <Image src={text.src} alt={text.alt} width = {30} height = {30}/>
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname'
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/staff/details/${text.id}`} style={{marginRight: '10px'}}>Details</Link>
                <Link to={`/staff/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete staff"
                    description="Are you sure to delete this staff?"
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
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            fullname: 'Nguyen Van A',
            email: 'anvbhaf190345@fpt.edu.vn',
            dob: '01/01/2023',
            phone: '012345678',
            address: 'Ha Noi - Viet Nam',
            actions: {
                id: 1
            }
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Staff List Test</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={classes['list__nav-right__add']}>
                        <Link to='/staff/add'>
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
                        defaultValue="Department"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'Ha Noi', label: 'Ha Noi' },
                            { value: 'Da Nang', label: 'Da Nang' },
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
                        defaultValue="Position"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'Teacher', label: 'Teacher' },
                            { value: 'Trainer', label: 'Trainer' },
                            { value: 'HR', label: 'HR' },
                            { value: 'Marketing', label: 'Marketing' }
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

export default StaffList