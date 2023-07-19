import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { Input, Button, Popconfirm, Select, Table, Alert, Space } from 'antd'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import ContentContext from '../../../helpers/Context/ContentContext';

const EnrollmentList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);
    const { setContentLoading } = useContext(ContentContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [majorId, setMajorId] = useState(searchParams.get('major') ? searchParams.get('major') : 'all');
    const [courseId, setCourseId] = useState(searchParams.get('course') ? searchParams.get('course') : 'all');
    const [status, setStatus] = useState(searchParams.get('status') ? searchParams.get('status') : 'all');

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

    const getTableDataFromEnrollmentData = (enrollmentData) => {
        console.log(enrollmentData);
        return enrollmentData.map((enrollment) => ({
            key: enrollment.id,
            student_id: enrollment.student_id,
            student_name: enrollment.student_name,
            email: enrollment.email,
            major_name: enrollment.major_name,
            course_name: enrollment.course_name,
            gpa: enrollment.gpa,
            status: enrollment.status,
            actions: {
                id: enrollment.id
            }
        }))
    }

    async function fetchCourseList(searchValue) {
        setContentLoading(true);
        const url = '/courses'
            + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
        console.log(url);

        try {
            const response = await axiosClient.get(url)
            // console.log(response)
            const data = response.data.courses
            // console.log(data);
            setContentLoading(false);
            return data.map((info) => ({
                label: `${info.id} ${info.name}`,
                value: info.id,
            }))
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message);
            setContentLoading(false);
        }
    }
    async function fetchClassList(searchValue) {
        setContentLoading(true);
        const url = '/class'
            + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
        console.log(url);

        try {
            const response = await axiosClient.get(url)
            // console.log(response)
            const data = response.data.classes
            // console.log(data);
            setContentLoading(false);
            return data.map((info) => ({
                label: `${info.id} ${info.name}`,
                value: info.id,
            }))
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message);
            setContentLoading(false);
        }
    }

    const fetchEnrollmentData = async (currentPage, search, majorId, courseId, status) => {
        setFetching(true);
        const url = `/enrollments?page=${currentPage}`
            + (majorId !== 'all' ? `&major=${majorId}` : '')
            + (courseId !== 'all' ? `&course=${courseId}` : '')
            + (status !== 'all' ? `&status=${status}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { enrollments, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromEnrollmentData(enrollments));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchEnrollmentData(currentPage, search, majorId, courseId, status)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, majorId, courseId, status]);

    const handleMajorChange = (value) => {
        setMajorId(value);
        setCurrentPage(1);
    }

    const handleCourseChange = (value) => {
        setCourseId(value);
        setCurrentPage(1);
    }

    const handleStatusChange = (value) => {
        setStatus(value);
        setCurrentPage(1);
    }

    const debounceSetter = useMemo(() => {
        const handleSearch = (e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return debounce(handleSearch, 700);
    })

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    }

    const statusLabels = {
        0: 'Processing',
        1: 'Success',
        2: 'Failure',
    };

    const tableColumns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Student ID',
            dataIndex: 'student_id',
            key: 'student_id'
        },
        {
            title: 'Student',
            dataIndex: 'student_name',
            key: 'student_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Major',
            dataIndex: 'major_name',
            key: 'major_name'
        },
        {
            title: 'Course',
            dataIndex: 'course_name',
            key: 'course_name',
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => statusLabels[status] || '', // Sử dụng đối tượng
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/enrollment/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                {/* <Popconfirm
                    title="Delete the enrollment"
                    description="Are you sure to delete this this enrollment?"
                    onConfirm={() => deleteUserHandler(text.id)}
                    okText="Confirm"
                    cancelText="Cancel"
                >
                    <Button danger type='primary'>
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </Popconfirm> */}
            </div>
        },

    ]
    // const tableData = [
    //     {
    //         key: '1',
    //         student: 'Nguyen Van A',
    //         studentId: 'bhaf123',
    //         email: 'anvbhaf190345@fpt.edu.vn',
    //         major: 'IT',
    //         course: 'Programing',
    //         gpa: '4.0',
    //         status: 'In progress',
    //         actions: {
    //             id: 1
    //         }
    //     }
    // ]
    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>Enrollment List</p>
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
                            <Link to='/enrollment/add'>
                                <Button type='primary'>
                                    <i className="fas fa-plus"></i>
                                    <span>Add</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={classes['list__filters']}>
                    <Space>
                        <Select
                            defaultValue={majorId}
                            style={{ width: 120 }}
                            onChange={handleMajorChange}
                            options={[
                                { value: 'all', label: 'Major' },
                                { value: '1', label: 'Computer Science' },
                                { value: '2', label: 'Business Administration' },
                                { value: '3', label: 'Mechanical Engineering' },
                                { value: '4', label: 'Psychology' },
                                // { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                        <DebounceSelect
                            defaultValue={courseId}
                            key='course'
                            style={{ width: 200 }}
                            onChange={handleCourseChange}
                            fetchOptions={fetchCourseList}
                            presetOptions={[
                                { value: 'all', label: 'Course' },
                            ]}
                        />
                        <Select
                            defaultValue="Status"
                            style={{ width: 120 }}
                            onChange={handleStatusChange}
                            options={[
                                { value: 'all', label: 'Status' },
                                { value: '0', label: 'Processing' },
                                { value: '1', label: 'Success' },
                                { value: '2', label: 'Failure' },
                            ]}
                        />
                    </Space>
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

export default EnrollmentList