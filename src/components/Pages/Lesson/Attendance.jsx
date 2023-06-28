import React from 'react'
import {Input, Table, Radio} from 'antd'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const Attendance = () => {
    const tableColumns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render : (text) => <Image src={text.src} alt={text.alt} width = {30} height = {30}/>
        },
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            key: 'studentName'
        },
        {
            title: 'Student ID',
            dataIndex: 'studentid',
            key: 'studentid'
        },
        {
            title: '',
            dataIndex: 'attendance',
            key: 'attendance',
            render: (t) => <div><Radio checked = {t}/> <span>attended</span></div>
        },
        {
            title: '',
            dataIndex: 'absent',
            key: 'absent',
            render: (t) => <div><Radio checked = {t}/> <span>absent</span></div>
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            render: (t) => <Input value={t} disabled/>
        },
    ]
    const tableData = [
        {
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            studentName: 'Nguyen Van A',
            attendance: true,
            absent: false,
            note: 'Nothing'
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['page__title']}>Attendance for <b>BHAF123</b></p>
        <div className={classes['list__main']}>
            <div className={classes['list__table']}>
                <Table columns={tableColumns} pagination={{ pageSize: 6 }} dataSource={tableData} />
            </div>
        </div>
    </div>
  )
}

export default Attendance