import React from 'react'
import {Input, Table} from 'antd'
import { Link } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const Class = () => {
    const {Search} = Input

    const onSearch = () => {

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
            title: 'Account Name',
            dataIndex: 'accountName',
            key: 'accountName'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ]
    const tableData = [
        {
            key: '1',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            accountName: 'ABC',
            email: 'anvbhaf190345@fpt.edu.vn',
            gender: 'Male',
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Student List</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    <div className={classes['list__class-name']}>
                      <p><b>Name Class</b></p>
                      <p>Programing</p>
                    </div>
                    <div className={classes['list__class-name']}>
                      <p><b>Course</b></p>
                      <p><Link>It Fundermental</Link></p>
                    </div>
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
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

export default Class