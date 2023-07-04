import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Button, Popconfirm, Select, Table, Alert } from 'antd'
import { Link, useLocation } from 'react-router-dom';
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';

const CourseList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [major, setMajor] = useState(searchParams.get('major') ? searchParams.get('major') : 'all');
    const [credit, setCredit] = useState(searchParams.get('credit') ? searchParams.get('credit') : 'all');

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

    const getTableDataFromCourseData = (courseData) => {
        console.log(courseData);
        return courseData.map((course) => ({
            key: course.id,
            name: course.name,
            major_id: course.major_id,
            major_name: course.major_name,
            credits: course.credits,
            tuition_fee: course.tuition_fee,
            detail: {
                id: course.id,
                text: 'Details'
            },
            actions: {
                id: course.id
            }
        }))
    }

    const fetchCourseData = async (currentPage, search, major, credit) => {
        setFetching(true);
        const url = `/courses?page=${currentPage}`
            + (major !== 'all' ? `&major=${major}` : '')
            + (credit !== 'all' ? `&credit=${credit}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { courses, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromCourseData(courses));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchCourseData(currentPage, search, major, credit)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, major, credit]);

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

    const handleMajorChange = (value) => {
        setMajor(value);
        setCurrentPage(1);
    }

    const handleCreditChange = (value) => {
        setCredit(value);
        setCurrentPage(1);
    }

    const deleteCourseHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/courses/delete-course/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete course with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchCourseData(currentPage, search, major, credit);
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
            title: 'Credit',
            dataIndex: 'credits',
            key: 'credits',
        },
        {
            title: 'Tution fee',
            dataIndex: 'tuition_fee',
            key: 'tuition_fee'
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/course/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the course"
                    description="Are you sure to delete this course?"
                    onConfirm={() => deleteCourseHandler(text.id)}
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
    //         name: 'programing',
    //         major: 'Information and Technology',
    //         credit: 'credit 1',
    //         tutionfee: '123.234vnd',
    //         actions: {
    //             id: 1
    //         }
    //     }
    // ]
    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>Course List</p>
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
                            <Link to='/course/add'>
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
                    <Select
                        defaultValue={credit}
                        style={{ width: 120 }}
                        onChange={handleCreditChange}
                        options={[
                            { value: 'all', label: 'Credits' },
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                            { value: '4', label: '4' },
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

export default CourseList