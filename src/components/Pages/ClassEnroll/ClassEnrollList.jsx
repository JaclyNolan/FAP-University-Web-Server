import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import classes from '../Page.module.scss';
import { Select, Input, Button, Popconfirm, Table, Alert, Space } from 'antd';
import axiosClient from '../../../axios-client';
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import ContentContext from '../../../helpers/Context/ContentContext';

const ClassEnrollList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);
    const { setContentLoading } = useContext(ContentContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [majorId, setMajorId] = useState(searchParams.get('major_id') ? searchParams.get('major') : 'all');
    const [courseId, setCourseId] = useState(searchParams.get('course_id') ? searchParams.get('course') : 'all');
    const [studentId, setStudentId] = useState(searchParams.get('student_id') ? searchParams.get('student_id') : 'all');

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

    const getTableDataFromClassEnrollData = (classEnrollData) => {
        console.log(classEnrollData);
        return classEnrollData.map((classEnroll) => ({
            key: classEnroll.id,
            instructor: classEnroll.instructor_name,
            course: classEnroll.course_name,
            className: classEnroll.class_name,
            major: classEnroll.major_name,
            student: classEnroll.student_name,
            actions: {
                id: classEnroll.id
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

    async function fetchStudentList(searchValue) {
        setContentLoading(true);
        const url = '/students'
            + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
        console.log(url);

        try {
            const response = await axiosClient.get(url)
            const data = response.data.students
            setContentLoading(false);
            return data.map((info) => ({
                label: `${info.id} ${info.full_name}`,
                value: info.id,
            }))
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message);
            setContentLoading(false);
        }
    }

    const fetchClassEnrollData = async (currentPage, search, majorId, courseId, studentId) => {
        setFetching(true);
        const url = `/classEnrollments?page=${currentPage}`
            + (majorId !== 'all' ? `&major_id=${majorId}` : '')
            + (courseId !== 'all' ? `&course_id=${courseId}` : '')
            + (studentId !== 'all' ? `&student_id=${studentId}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { classEnrollments, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromClassEnrollData(classEnrollments));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchClassEnrollData(currentPage, search, majorId, courseId, studentId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, majorId, courseId, studentId]);

    const handleMajorChange = (value) => {
        setMajorId(value);
        setCurrentPage(1);
    }

    const handleCourseChange = (value) => {
        setCourseId(value);
        setCurrentPage(1);
    }

    const handleStudentChange = (value) => {
        setStudentId(value);
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

    const deleteClassEnrollHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/classEnrollments/delete-classEnrollment/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete class enrollment with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchClassEnrollData(currentPage, search, majorId, courseId, studentId)
                } else {
                    setCurrentPage(1);
                }
            }
        })()
    }

    const tableColumns = [
        {
            title: 'Class Enroll ID',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major'
        },
        {
            title: 'Class Name',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Instructor',
            dataIndex: 'instructor',
            key: 'instructor'
        },
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student'
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/classenroll/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the class enroll"
                    description="Are you sure to delete this class enrollment?"
                    onConfirm={() => deleteClassEnrollHandler(text.id)}
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
            <p className={classes['page__title']}>Class Enroll List</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>
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
                            <DebounceSelect
                                defaultValue={studentId}
                                key='student'
                                style={{ width: 200 }}
                                onChange={handleStudentChange}
                                fetchOptions={fetchStudentList}
                                presetOptions={[
                                    { value: 'all', label: 'Student' },
                                ]}
                            />
                        </Space>
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
                            <Link to='/classenroll/add'>
                                <Button type='primary'>
                                    <i className="fas fa-plus"></i>
                                    <span>Add class enrollment</span>
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

export default ClassEnrollList