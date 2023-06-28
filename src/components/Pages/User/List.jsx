import React, { useState, useEffect, useContext } from 'react';
import classes from '../Page.module.scss';
import { Select, Input, Button, Popconfirm, Tag, Table, Alert } from 'antd';
import Image from '../../common/Image/Image';
import axiosClient from '../../../axios-client';
import { Link } from 'react-router-dom';
import ContentContext from '../../../helpers/Context/ContentContext';

const List = () => {
    const { Search } = Input

    const [userData, setUserData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const { setContentLoading } = useContext(ContentContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState('all');

    const [errorMessage, _setErrorMessage] = useState("");
    const [successMessage, _setSuccessMessage] = useState("");

    const setErrorMessage = (value) => {
        _setErrorMessage(value);
        _setSuccessMessage("");
    }
    const setSuccessMessage = (value) => {
        _setErrorMessage("");
        _setSuccessMessage(value);
    }

    useEffect(() => {
        (async () => {
            setContentLoading(true);
            const url = `/users?page=${currentPage}` + (role !== 'all' ? `&role_id=${role}` : '') + (search !== "" ? `&keyword=${search}` : ``);
            console.log(url);
            await axiosClient.get(url)
                .then((response) => {
                    const { users, total_pages } = response.data;
                    setTotalPages(total_pages);
                    setUserData(users);
                    setContentLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage(error.message);
                    setContentLoading(false);
                })
        })()
    }, [currentPage, search, role]);

    useEffect(() => {
        console.log(userData);
        const arr = [];
        userData.forEach((user, index) => {
            const row = {
                key: user.id,
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

    const handleRoleChange = (value) => {
        setRole(value);
        setCurrentPage(1);
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    }
    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    }
    const deleteUserHandler = (id) => {
        (async () => {
            setContentLoading(true);
            await axiosClient.put(`/users/delete-user/${id}`)
                .then((response) => {
                    setContentLoading(false);
                    setSuccessMessage('Successfully delete user with id ' + id)
                })
                .catch((error) => {
                    setContentLoading(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                setCurrentPage(1);
            }
        })()
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
            render: (text) => <Link to={`/user/details?id=${text.id}`}>{text.text}</Link>,
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
            render: (text) => <Link to={`/user/details?id=${text.id}`}>{text.text}</Link>,
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/user/edit?id=${text.id}`}>
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
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>User List</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>
                        <Select
                            defaultValue={'all'}
                            style={{ width: 120 }}
                            onChange={handleRoleChange}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: '1', label: 'Admin' },
                                { value: '2', label: 'Staff' },
                                { value: '3', label: 'Student' },
                                { value: '4', label: 'Teacher' },
                                // { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                            <Search
                                placeholder="input search text"
                                allowClear
                                onChange={(e) => {
                                    handleSearch(e.target.value)
                                }}
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes['list__nav-right__add']}>
                            <Link to='/user/add'>
                                <Button type='primary'>
                                    <i className="fas fa-plus"></i>
                                    <span>Add</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={classes['list__table']}>
                    <Table columns={tableColumns} pagination={{
                        current: currentPage,
                        total: totalPages * 5,
                        pageSize: 5,
                        defaultCurrent: 1,
                        showQuickJumper: true,
                        onChange: handlePageChange
                    }} dataSource={tableData} />
                </div>
            </div>
        </div>
    )
}

export default List