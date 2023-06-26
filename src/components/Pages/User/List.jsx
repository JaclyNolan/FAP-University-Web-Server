import React, { useState, useEffect, useContext } from 'react';
import classes from '../Page.module.scss';
import { Select, Input, Button, Popconfirm, Tag, Table, Spin, Alert } from 'antd';
import Link from 'antd/es/typography/Link';
import Image from '../../common/Image/Image';
import axiosClient from '../../../axios-client';
import AuthContext from '../../../helpers/Context/AuthContext';

const List = () => {
    const { Search } = Input

    const [userData, setUserData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const { setLoading } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const fetchUserData = async (page) => {
        setLoading(true);
        await axiosClient.get('/users?page='.concat(page))
            .then((response) => {
                const { users, total_pages } = response.data;
                setTotalPages(total_pages);
                setUserData(users);
            })
            .catch((error) => {
                setError(error.message);
            })
        setLoading(false);
    }

    useEffect(() => {
        fetchUserData(1);
    }, []);

    useEffect(() => {
        console.log(userData);
        const arr = [];
        userData.forEach((user, index) => {
            const row = {
                key: index + 1,
                image: {
                    src: user.image,
                    alt: user.username
                },
                username: {
                    text: user.username,
                    id: user.id
                },
                email: user.email,
                role: {
                    text: user.role_name,
                    role: user.role_name
                },
                detail: {
                    id: user.id,
                    text: 'Details'
                },
                actions: {
                    id: user.id
                }
            };
            arr.push(row);
        });
        setTableData(arr);
        console.log(arr);
    }, [userData])

    

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

    // const tableData = [
    //     {
    //         key: '1',
    //         image: {
    //             src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
    //             alt: 'user'
    //         },
    //         username: {
    //             text: 'Nguyen Van A',
    //             id: 1
    //         },
    //         email: 'anvbhaf190345@fpt.edu.vn',
    //         role: {
    //             text: 'Admin',
    //             role: 'Admin'
    //         },
    //         detail: {
    //             id: 1,
    //             text: 'Details'
    //         },
    //         actions: {
    //             id: 1
    //         }
    //     }
    // ]

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
                    {!error
                        ? <Table columns={tableColumns} pagination={{ total: totalPages }} dataSource={tableData} />
                        : <span>{error}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default List