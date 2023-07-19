import React, { useState, useEffect, useMemo, useRef } from 'react';
import classes from '../Page.module.scss';
import { Select, Input, Button, Popconfirm, Tag, Table, Alert } from 'antd';
import Image from '../../common/Image/Image';
import axiosClient from '../../../axios-client';
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';

const List = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [ isFetching, setFetching ] = useState(false);
    const fetchRef = useRef(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [role, setRole] = useState(searchParams.get('role') ? searchParams.get('role') : 'all');

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

    const getTableDataFromUserData = (userData) => {
        console.log(userData);
        return userData.map((user) => ({
            key: user.id,
            image: {
                src: user.image,
                alt: user.username
            },
            username: {
                text: user.username,
                role: user.role_name,
                info_id: (user.role_id === 2 ? user.staff_id : 
                    user.role_id === 3 ? user.instructor_id :
                    user.role_id === 4 ? user.student_id :
                    null ),
            },
            email: user.email,
            role: {
                text: user.role_name,
                role: user.role_name
            },
            detail: {
                info_id: (user.role_id === 2 ? user.staff_id : 
                    user.role_id === 3 ? user.instructor_id :
                    user.role_id === 4 ? user.student_id :
                    null ),
                role: user.role_name,
                text: 'Details'
            },
            actions: {
                id: user.id
            }
        }))
    }

    const fetchUserData = async(currentPage, search, role) => {
        setFetching(true);
        const url = `/users?page=${currentPage}` 
        + (role !== 'all' ? `&role_id=${role}` : '') 
        + (search !== "" ? `&keyword=${search}` : ``);
        
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { users, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromUserData(users));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchUserData(currentPage, search, role)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, role]);

    const handleRoleChange = (value) => {
        setRole(value);
        setCurrentPage(1);
    }

    const debounceSetter = useMemo(() => {
        const handleSearch = (e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
        }
        return debounce(handleSearch, 700);
    })

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    }
    
    const deleteUserHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/users/delete-user/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete user with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchUserData(currentPage, search, role);
                } else {
                    setCurrentPage(1);
                }
            }
        })()
    }
    const findTagColor = (role) => {
        let color = ''
        switch (role) {
            case 'Admin':
                color = 'red'
                break
            case 'Staff':
                color = 'magenta'
                break
            case 'Instructor':
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
            render: (text) => text.role !== "Admin" ? <Link to={`/${text.role.toLowerCase()}/details/${text.info_id}`}>{text.text}</Link> : text.text,
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
            render: (text) => text.role !== "Admin" && <Link to={`/${text.role.toLowerCase()}/details/${text.info_id}`}>{text.text}</Link>,
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/user/edit/${text.id}`}>
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
                            defaultValue={role}
                            style={{ width: 120 }}
                            onChange={handleRoleChange}
                            options={[
                                { value: 'all', label: 'Role' },
                                { value: '1', label: 'Admin' },
                                { value: '2', label: 'Staff' },
                                { value: '3', label: 'Instructor' },
                                { value: '4', label: 'Student' },
                                // { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                            <Input
                                prefix={isFetching ? <LoadingOutlined/> : <SearchOutlined/>}
                                placeholder="input search text"
                                allowClear
                                onChange={debounceSetter}
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
                    <Table columns={tableColumns} loading={isFetching} pagination={{
                        current: currentPage,
                        total: totalPages * tableData.length,
                        pageSize: tableData.length,
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