import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Button, Popconfirm, Select, Table, Alert } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';

const ClassList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [major, setMajor] = useState(searchParams.get('major') ? searchParams.get('major') : 'all');

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

    const getTableDataFromClassData = (classData) => {
        console.log(classData);
        return classData.map((classes) => ({
            key: classes.id,
            name: classes.name,
            major_id: classes.major_id,
            major_name: classes.major_name,
            detail: {
                id: classes.id,
                text: 'Details'
            },
            actions: {
                id: classes.id
            }
        }))
    }

    const fetchClassData = async (currentPage, search, major) => {
        setFetching(true);
        const url = `/class?page=${currentPage}`
            + (major !== 'all' ? `&major=${major}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { classes, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromClassData(classes));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchClassData(currentPage, search, major)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, major]);

    const handleMajorChange = (value) => {
        setMajor(value);
        setCurrentPage(1);
    }

    const deleteClassHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/class/delete-class/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete class with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchClassData(currentPage, search, major);
                } else {
                    setCurrentPage(1);
                }
            }
        })()
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
            dataIndex: 'major_name',
            key: 'major_name',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/class/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the class"
                    description="Are you sure to delete this class?"
                    onConfirm={() => deleteClassHandler(text.id)}
                    okText="Confirm"
                    cancelText="Cancel"
                >
                    <Button danger type='primary'>
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </Popconfirm>
            </div>
        }
    ]
    // const tableData = [
    //     {
    //         key: '1',
    //         name: 'BHAF1234',
    //         major: 'Information and Technology',
    //         actions: {
    //             id: 1
    //         }
    //     }
    // ]
    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>Class List</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>

                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                            <Input
                                prefix={isFetching ? <LoadingOutlined /> : <SearchOutlined />}
                                placeholder="input search text"
                                allowClear
                                onChange={debounceSetter}
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes['list__nav-right__add']}>
                            <Link to='/class/add'>
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
                        defaultValue={major}
                        style={{ width: 120 }}
                        onChange={handleMajorChange}
                        options={[
                            { value: 'all', label: 'Majors' },
                            { value: '1', label: 'Computer Science' },
                            { value: '2', label: 'Business Administration' },
                            { value: '3', label: 'Mechanical Engineering' },
                            { value: '4', label: 'Psychology' },
                            // { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
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

export default ClassList