import React, { useState, useEffect } from 'react';
import classes from '../Page.module.scss';
import { Select, Input, Button, Popconfirm, Tag, Table, Spin, Alert } from 'antd';
import Link from 'antd/es/typography/Link';
import Image from '../../common/Image/Image';
import axios from 'axios';

const List = () => {
    const { Search } = Input

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users', {
                headers: {
                    Authorization: 'Bearer 4|7HBDxuzXMwqobkHDqzN16dhsoJ3PcK8hC9NJpJWa',
                },
            });
            const { status, message, users } = response.data;

            if (status === 200) {
                setUserData(users);
            } else {
                setError(message);
            }
        } catch (error) {
            setError('Error fetching user data');
        }
        setIsLoading(false);
    };

    const handleChange = () => {

    }
    const onSearch = () => {

    }
    const deleteUserHandler = (id) => {
        alert(`Deleted ${id}`)
    }
    const findTagColor = (role) => {
        let color = ''
        switch (role) {
            case 'Admin':
                color = 'red'
                break
            case 'student':
                color = 'magenta'
                break
            case 'staff':
                color = 'purple'
                break
            default:
                color = 'cyan'
                break

        }
        return color
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
            render: (text) => <Image src={text.src} alt={text.alt} width={30} height={30} />
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <Link href={`/user/details?id=${text.id}`}>{text.text}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text) => <Tag color={findTagColor(text.role)}>{text.text}</Tag>
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
            render: (text) => <Link href={`/user/details?id=${text.id}`}>{text.text}</Link>,
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link href={`/user/edit?id=${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the user"
                    description="Are you sure to delete this user?"
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

    return (
        <div className={classes['list']}>
            <p className={classes['page__title']}>User List</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>
                        <Select
                            defaultValue="All"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={[
                                { value: 'Admin', label: 'Admin' },
                                { value: 'Staff', label: 'Staff' },
                                { value: 'Student', label: 'Student' },
                                { value: 'Teacher', label: 'Teacher' },
                                // { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                        </div>
                        <div className={classes['list__nav-right__add']}>
                            <Link href='/user/add'>
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

export default List