import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import axiosClient from '../../../axios-client';
import { Input, Table, Tag, Select, Button, Modal } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import classes from '../Page.module.scss'
import StudentCourseRegister from './StudentCourseRegister';
const findStatusColor = (status) => {
    switch (status) {
        case 1:
            return 'black'
        case 2:
            return "orange"
        case 2:
            return "dark green"
        case 4:
            return "yellow"
        case 5:
            return "blue"
        case 6:
            return "red"
        default:
            return "green"
    }
}

const StudentCourseList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [isModalOpen, setModalOpen] = useState(false);
    const [registerData, setRegisterData] = useState(null);
    const [enrollmentData, setEnrollmentData] = useState(null);
    const [enrollmentStatusData, setEnrollmentStatusData] = useState(null);
    const [isEnrollmentStatusFetching, setEnrollmentStatusFetching] = useState(false);
    const [isEnrollmentFetching, setEnrollmentFetching] = useState(false);
    const fetchRef = useRef(0);

    const [status, setStatus] = useState('all')
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');

    useEffect(() => {
        fetchEnrollmentStatusData();
    }, [])

    useEffect(() => {
        fetchEnrollmentsData();
    }, [search, status])

    /**
     * @return "enrollments": [
        {
            "enrollment_id": 37,
            "student_id": "CS001",
            "course_id": 1,
            "status": 1,
            "status_name": "Not Registered",
            "course": {
                "course_id": 1,
                "course_name": "Introduction to Programming",
                "credits": 3,
                "description": "Introduction to Programming",
                "tuition_fee": "5.000.000vnd"
            }
        },
     */

    const getTableDataFromEnrollmentData = (enrollments) => {
        return enrollments.map((enrollment, index) => {
            return {
                key: index + 1,
                courseName: enrollment.course.course_name,
                credit: enrollment.course.credits,
                tuitionFee: enrollment.course.tuition_fee,
                status: {
                    id: enrollment.status,
                    name: enrollment.status_name,
                },
                actions: {
                    status: enrollment.status,
                    courseName: enrollment.course.course_name,
                    enrollmentId: enrollment.enrollment_id,
                }
            }
        });
    }

    const fetchEnrollmentsData = async () => {
        setEnrollmentFetching(true);
        const url = '/student/enrollment'
            + ((search !== "" || status !== "all") ? '?' : '')
            + (search !== "" ? `keyword=${search}` : ``)
            + (status !== "all" ? `enrollment_status=${status}` : ``);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { enrollments } = response.data;
                setEnrollmentData(getTableDataFromEnrollmentData(enrollments));
                setEnrollmentFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setEnrollmentFetching(false);
            })
    }

    /**
     * @return "enrollmentStatus": [
        {
            "status": 1,
            "name": "Not Register"
        },
     */

    const fetchEnrollmentStatusData = async () => {
        setEnrollmentStatusFetching(true);
        const url = '/enrollment/status';
        await axiosClient.get(url)
            .then((response) => {
                const { enrollmentStatus } = response.data;
                setEnrollmentStatusData(enrollmentStatus);
                setEnrollmentStatusFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setEnrollmentStatusFetching(false);
            })
    }

    const courseColumns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'no',
        },
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            key: 'courseName',
        },
        // {
        //     title: 'Semester',
        //     dataIndex: 'semester',
        //     key: 'semester',
        // },
        {
            title: 'Credit',
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Tuition Fee',
            dataIndex: 'tuitionFee',
            key: 'tuitionFee'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <Tag color={findStatusColor(text.id)}>{text.name}</Tag>
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => (text.status === 1
                && <Button onClick={() => {
                    setRegisterData({
                        courseName: text.courseName,
                        enrollmentId: text.enrollmentId
                    });
                    setModalOpen(true);
                }}>Register</Button>)
        }
    ]

    const debounceSetter = useMemo(() => {
        const handleSearch = (e) => {
            setSearch(e.target.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return debounce(handleSearch, 700);
    })

    const handleStatus = (value) => {
        setStatus(value);
    }

    return (
        <div className={classes['list']}>
            <p className={classes['page__title']}>Course List</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>
                        <Select
                            value={status}
                            loading={isEnrollmentStatusFetching}
                            onChange={handleStatus}
                            style={{ width: 200 }}
                            options={enrollmentData ? [
                                { value: 'all', label: 'Status' },
                                ...enrollmentStatusData.map((status) => ({
                                    value: status.status, label: status.name
                                }))
                            ] : [{ value: 'all', label: 'Status' }]}
                        ></Select>
                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                            <Input
                                prefix={isEnrollmentFetching ? <LoadingOutlined /> : <SearchOutlined />}
                                placeholder="input search text"
                                allowClear
                                onChange={debounceSetter}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes['list__table']}>
                    <Table columns={courseColumns} loading={isEnrollmentFetching} pagination={{ pageSize: 6 }} dataSource={enrollmentData} />
                </div>
            </div>
            {isModalOpen && <Modal
                open={isModalOpen}
                title={`Register Course ${registerData.courseName}`}
                onCancel={() => { setModalOpen(false) }}
                footer={null}>
                <StudentCourseRegister
                    enrollmentId={registerData.enrollmentId}
                    setModalOpen={setModalOpen}
                    fetchListData={fetchEnrollmentsData} />
            </Modal>}
        </div>
    )
}

export default StudentCourseList