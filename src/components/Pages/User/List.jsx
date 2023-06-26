import React, { useState, useEffect, useContext } from 'react';
import classes from '../Page.module.scss';
import { Select, Input, Button, Popconfirm, Tag, Table, Spin, Alert } from 'antd';
import Link from 'antd/es/typography/Link';
import Image from '../../common/Image/Image';
import axios from 'axios';
import axiosClient from '../../../axios-client';
import AuthContext from '../../../helpers/Context/AuthContext';

const List = () => {
    const { Search } = Input

    const [userData, setUserData] = useState([]);
    const { setLoading } = useContext(AuthContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        await axiosClient.get('/users')
            .then((response) => {
                const { users } = response.data;
                setUserData(users);
            })
            .catch((error) => {
                setError(error.message);
            })
        setLoading(false);
    }

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

    const tableData = [
        {
            key: '1',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van A',
                id: 1
            },
            email: 'anvbhaf190345@fpt.edu.vn',
            role: {
                text: 'Admin',
                role: 'Admin'
            },
            detail: {
                id: 1,
                text: 'Details'
            },
            actions: {
                id: 1
            }
        }
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