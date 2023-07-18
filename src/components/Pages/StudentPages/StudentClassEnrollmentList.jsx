import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import axiosClient from '../../../axios-client';
import { Input, Table, Tag, Select, Button, Modal } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import classes from '../Page.module.scss'

const StudentClassEnrollmentList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [isModalOpen, setModalOpen] = useState(false);
    const [classEnrollmentData, setClassEnrollmentData] = useState(null);
    const [isClassEnrollmentFetching, setClassEnrollmentFetching] = useState(false);
    const fetchRef = useRef(0);

    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');

    useEffect(() => {
        fetchEnrollmentsData();
    }, [search])

    /**
     * @return "classEnrollments": [
        {
            "class_course_id": 1,
            "class_enrollment_id": 1,
            "student_id": "CS001",
            "class_course": {
                "class_course_id": 1,
                "class_id": 1,
                "course_id": 1,
                "instructor_id": "INS001",
                "class": {
                    "class_id": 1,
                    "class_name": "CS001"
                },
                "course": {
                    "course_id": 1,
                    "course_name": "Introduction to Programming"
                },
                "instructor": {
                    "instructor_id": "INS001",
                    "full_name": "John Smith"
                }
            }
        }
    ]
     */

    const getTableDataFromClassEnrollmentData = (classEnrollments) => {
        return classEnrollments.map((classEnrollment, index) => {
            return {
                key: index + 1,
                courseName: classEnrollment.class_course.course.course_name,
                className: classEnrollment.class_course.class.class_name,
                instructorName: classEnrollment.class_course.instructor.full_name,
                actions: {
                    id: classEnrollment.class_enrollment_id,
                }
            }
        });
    }

    const fetchEnrollmentsData = async () => {
        setClassEnrollmentFetching(true);
        const url = '/student/classEnrollment?'
            + (search !== "" ? `keyword=${search}` : ``)
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { classEnrollments } = response.data;
                setClassEnrollmentData(getTableDataFromClassEnrollmentData(classEnrollments));
                setClassEnrollmentFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setClassEnrollmentFetching(false);
            })
    }

    const classEnrollmentColumns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'no',
        },
        {
            title: 'Class',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: 'Course',
            dataIndex: 'courseName',
            key: 'courseName',
        },
        {
            title: 'Instructor',
            dataIndex: 'instructorName',
            key: 'instructorName',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => (<Link to={`/class/${text.id}`}><Button>Detail</Button></Link>)
        }
    ]

    const debounceSetter = useMemo(() => {
        const handleSearch = (e) => {
            setSearch(e.target.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return debounce(handleSearch, 700);
    })


    return (
        <div className={classes['list']}>
            <p className={classes['page__title']}>Course List</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>
                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                            <Input
                                prefix={isClassEnrollmentFetching ? <LoadingOutlined /> : <SearchOutlined />}
                                placeholder="input search text"
                                allowClear
                                onChange={debounceSetter}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes['list__table']}>
                    <Table columns={classEnrollmentColumns} loading={isClassEnrollmentFetching} pagination={{ pageSize: 6 }} dataSource={classEnrollmentData} />
                </div>
            </div>
        </div>
    )
}

export default StudentClassEnrollmentList