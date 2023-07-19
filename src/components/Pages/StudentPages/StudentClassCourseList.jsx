import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import axiosClient from '../../../axios-client';
import { Input, Table, Tag, Select, Button, Modal } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import classes from '../Page.module.scss'

const StudentClassCourseList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [courseData, setCourseData] = useState(null);
    const [isCourseFetching, setCourseFetching] = useState(false);
    const [classData, setClassData] = useState(null);
    const [isClassFetching, setClassFetching] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [isInstructorFetching, setInstructorFetching] = useState(false);
    const [classCourseData, setClassCourseData] = useState(null);
    const [isClassCourseFetching, setClassCourseFetching] = useState(false);
    const fetchRef = useRef(0);

    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : null);
    const [course, setCourse] = useState(searchParams.get('course') ? searchParams.get('course') : null);
    const [classFilter, setClassFilter] = useState(searchParams.get('course') ? searchParams.get('course') : null);
    const [instructor, setInstructor] = useState(searchParams.get('course') ? searchParams.get('course') : null);

    useEffect(() => {
        fetchClassCoursesData();
    }, [search, course, classFilter, instructor])

    useEffect(() => {
        fetchCoursesData();
        fetchClassesData();
        fetchInstructorsData();
    }, [])

    /**
     * @return "classCourses": [
        {
            "class_course_id": 1,
            "class_id": 1,
            "course_id": 1,
            "instructor_id": "INS001",
            "class": {
                "class_id": 1,
                "major_id": 1,
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
    ]
     */

    const getTableDataFromClassCourseData = (classCourses) => {
        return classCourses.map((classCourse, index) => {
            return {
                key: index + 1,
                courseName: classCourse.course.course_name,
                className: classCourse.class.class_name,
                instructorName: classCourse.instructor.full_name,
                actions: {
                    id: classCourse.class_course_id,
                }
            }
        });
    }

    const fetchClassCoursesData = async () => {
        setClassCourseFetching(true);
        const params = {
            keyword: search,
            course_id: course,
            class_id: classFilter,
            instructor_id: instructor,
        }
        const url = '/student/classCourse'
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url, { params })
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                setClassCourseData(getTableDataFromClassCourseData(response.data.classCourses));
                setClassCourseFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setClassCourseFetching(false);
            })
    }

    const fetchCoursesData = async () => {
        setCourseFetching(true);
        const url = '/student/course/list';
        
        await axiosClient.get(url)
            .then((response) => {
                setCourseData(response.data.courses);
                setCourseFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setCourseFetching(false);
            })
    }
    const fetchClassesData = async () => {
        setClassFetching(true);
        const url = '/student/class/list';
        
        await axiosClient.get(url)
            .then((response) => {
                setClassData(response.data.classes);
                setClassFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setClassFetching(false);
            })
    }
    const fetchInstructorsData = async () => {
        setInstructorFetching(true);
        const url = '/student/instructor/list';
        
        await axiosClient.get(url)
            .then((response) => {
                setInstructorData(response.data.instructors);
                setInstructorFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setInstructorFetching(false);
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

    const handleCourseChange = (value) => {
        setCourse(value);
    }
    const handleClassChange = (value) => {
        setClassFilter(value);
    }
    const handleInstructorChange = (value) => {
        setInstructor(value);
    }

    return (
        <div className={classes['list']}>
            <p className={classes['page__title']}>Course List</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>
                        <Select
                            defaultValue={course}
                            key={'course'}
                            loading={isCourseFetching}
                            style={{ width: 120, margin: 3 }}
                            onChange={handleCourseChange}
                            options={courseData
                                ? [
                                    { value: null, label: 'Course' },
                                    ...courseData.map((course) => ({ value: course.course_id, label: course.course_name }))
                                ] : [{ value: null, label: 'Course' },]}
                        />
                        <Select
                            defaultValue={classFilter}
                            key={'class'}
                            loading={isClassFetching}
                            style={{ width: 120, margin: 3 }}
                            onChange={handleClassChange}
                            options={classData
                                ? [
                                    { value: null, label: 'Class' },
                                    ...classData.map((classData) => ({ value: classData.class_id, label: classData.class_name }))
                                ] : [{ value: null, label: 'Class' },]}
                        />
                        <Select
                            defaultValue={instructor}
                            key={'instructor'}
                            loading={isInstructorFetching}
                            style={{ width: 120, margin: 3 }}
                            onChange={handleInstructorChange}
                            options={instructorData
                                ? [
                                    { value: null, label: 'Instructor' },
                                    ...instructorData.map((instructor) => ({ value: instructor.instructor_id, label: instructor.full_name }))
                                ] : [{ value: null, label: 'Instructor' },]}
                        />
                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                            <Input
                                prefix={isClassCourseFetching ? <LoadingOutlined /> : <SearchOutlined />}
                                placeholder="input search text"
                                allowClear
                                onChange={debounceSetter}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes['list__table']}>
                    <Table columns={classEnrollmentColumns} loading={isClassCourseFetching} pagination={{ pageSize: 6 }} dataSource={classCourseData} />
                </div>
            </div>
        </div>
    )
}

export default StudentClassCourseList