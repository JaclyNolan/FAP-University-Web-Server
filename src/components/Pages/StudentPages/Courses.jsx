import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import axiosClient from '../../../axios-client';
import { Input, Table, Alert, Tag, Select, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
const findStatusColor = (status) => {
    switch (status) {
        case 1:
            return 'black'
        case 2:
            return "yellow"
        case 3:
            return "blue"
        case 4:
            return "red"
        default:
            return "green"
    }
}

const Courses = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [courseData, setCourseData] = useState(null);
    const [isCourseFetching, setCourseFetching] = useState(false);
    const fetchRef = useRef(0);

    const [status, setStatus] = useState('all')
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');

    useEffect(() => {
        fetchCourseData();
    }, [search, status])

    /**
     * @return "courses": [
        {
            "course_id": 1,
            "course_name": "Introduction to Programming",
            "credits": 3,
            "major_id": 1,
            "tuition_fee": "5.000.000vnd",
            "enrollments": [
                {
                    "enrollment_id": 1,
                    "student_id": "CS001",
                    "course_id": 1,
                    "status": 1,
                    "status_name": "Not Register",
                }
            ]
        },
        {
            "course_id": 2,
            "course_name": "Data Structures and Algorithms",
            "credits": 4,
            "major_id": 1,
            "tuition_fee": "4.000.000vnd",
            "enrollments": []
        },
     */

    const getTableDataFromCourseData = (coursesData) => {
        return coursesData.map((course, index) => {
            return {
                key: index + 1,
                courseName: course.course_name,
                credit: course.credits,
                tuitionFee: course.tuition_fee,
                status: {
                    id: course.enrollments[0].status,
                    name: course.enrollments[0].status_name,
                },
                actions: {
                    status: course.enrollments[0].status,
                    enrollmentId: course.enrollments[0].enrollment_id,
                }
            }
        });
    }

    const fetchCourseData = async () => {
        setCourseFetching(true);
        const url = '/student/course'
            + ((search !== "" || status !== "all") ? '?' : '')
            + (search !== "" ? `keyword=${search}` : ``)
            + (status !== "all" ? `enrollment_status=${status}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { courses } = response.data;
                setCourseData(getTableDataFromCourseData(courses));
                setCourseFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setCourseFetching(false);
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
            // render: (text) => <Link to={`/course/${text.id}`}>{text.name}</Link>
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
                && <Link to={`/course/register/${text.enrollmentId}`}><Button>Register</Button></Link>)
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
                            onChange={handleStatus}
                            style={{ width: 200 }}
                            options={[
                                { value: 'all', label: 'Status' },
                                { value: '1', label: 'Not Registered' },
                                { value: '2', label: 'In Progress' },
                                { value: '3', label: 'Reserved' },
                                { value: '4', label: 'Failed' },
                                { value: '5', label: 'Passed' },
                            ]}
                        ></Select>
                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                            <Input
                                prefix={isCourseFetching ? <LoadingOutlined /> : <SearchOutlined />}
                                placeholder="input search text"
                                allowClear
                                onChange={debounceSetter}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes['list__table']}>
                    <Table columns={courseColumns} loading={isCourseFetching} pagination={{ pageSize: 6 }} dataSource={courseData} />
                </div>
            </div>
        </div>
    )
}

export default Courses