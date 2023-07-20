import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axios-client';
import { Input, Table, Select, Button, Modal, Popover } from 'antd';
import {  useLocation } from 'react-router-dom';
import classes from '../Page.module.scss'
import StudentFeedbackAdd from './StudentFeedbackAdd';

const StudentFeedbackList = () => {
    const {TextArea} = Input;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const [isModalOpen, setModalOpen] = useState(false);

    const [feedbackData, setFeedbackData] = useState(null);
    const [isFeedbackFetching, setFeedbackFetching] = useState(false);
    const [classData, setClassData] = useState(null);
    const [isClassFetching, setClassFetching] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [isInstructorFetching, setInstructorFetching] = useState(false);
    const [courseData, setCourseData] = useState(null);
    const [isCourseFetching, setCourseFetching] = useState(false);
    const fetchRef = useRef(0);

    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : null);
    const [course, setCourse] = useState(searchParams.get('courseId') ? searchParams.get('courseId') : null);
    const [classFilter, setClassFilter] = useState(searchParams.get('classId') ? searchParams.get('classId') : null);
    const [instructor, setInstructor] = useState(searchParams.get('instructorId') ? searchParams.get('instructorId') : null);

    useEffect(() => {
        fetchFeedbackData();
    }, [search, course, classFilter, instructor])

    useEffect(() => {
        fetchCoursesData();
        fetchClassesData();
        fetchInstructorsData();
    }, [])

    /**
     * @return "feedbacks": [
        {
            "feedback_id": 1,
            "class_enrollment_id": 1,
            "feedback_content": "Sample feedback 1",
            "created_at": "2023-07-19 00:00:00",
            "class_enrollment": {
                "class_enrollment_id": 1,
                "class_course_id": 1,
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
        },
     */

    const getTableDataFromFeedbackData = (feedbacks) => {
        return feedbacks.map((feedback, index) => {
            return {
                key: index + 1,
                courseName: feedback.class_enrollment.class_course.course.course_name,
                className: feedback.class_enrollment.class_course.class.class_name,
                instructorName: feedback.class_enrollment.class_course.instructor.full_name,
                content: feedback.feedback_content,
            }
        });
    }

    const fetchFeedbackData = async () => {
        setFeedbackFetching(true);
        const params = {
            keyword: search,
            course_id: course,
            class_id: classFilter,
            instructor_id: instructor,
        }
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        const response = await axiosClient.get(`student/feedback`, { params })
        if (fetchId !== fetchRef.current) return
        setFeedbackData(getTableDataFromFeedbackData(response.data.feedbacks));
        setFeedbackFetching(false);
    }

    const fetchCoursesData = async () => {
        setCourseFetching(true);
        const response = await axiosClient.get('/student/course/list')
        setCourseData(response.data.courses);
        setCourseFetching(false);
    }
    const fetchClassesData = async () => {
        setClassFetching(true);
        const response = await axiosClient.get('/student/class/list')
        setClassData(response.data.classes);
        setClassFetching(false);
    }
    const fetchInstructorsData = async () => {
        setInstructorFetching(true);
        const response = await axiosClient.get('/student/instructor/list')
        setInstructorData(response.data.instructors);
        setInstructorFetching(false);
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
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (text) => <div>
                <Popover style={{ marginRight: '10px' }} title={<span>Comment</span>}
                    content={(
                        <TextArea style={{ width: 300 }} rows={4} readOnly value={text}></TextArea>
                    )} placement='topRight' trigger='click'>
                    <Button>Feedback</Button>
                </Popover>
            </div>
        }
    ]

    const handleCourseChange = (value) => {
        setCourse(value);
    }
    const handleClassChange = (value) => {
        setClassFilter(value);
    }
    const handleInstructorChange = (value) => {
        setInstructor(value);
    }
    const handleAddClick = () => {
        setModalOpen(true);
    }

    return (
        <div className={classes['list']}>
            <p className={classes['page__title']}>Feedback List</p>
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
                        <div className={classes['list__nav-right__add']}>
                            <Button type='primary' onClick={handleAddClick}>
                                <i className="fas fa-plus"></i>
                                <span>Make a new feedback</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes['list__table']}>
                    <Table columns={classEnrollmentColumns} loading={isFeedbackFetching} pagination={{ pageSize: 6 }} dataSource={feedbackData} />
                </div>
            </div>
            {isModalOpen && <Modal
                open={isModalOpen}
                title={`Submit Feedback`}
                onCancel={() => { setModalOpen(false) }}
                footer={null}>
                <StudentFeedbackAdd setModalOpen={setModalOpen} fetchList={fetchFeedbackData} />
            </Modal>}
        </div>
    )
}

export default StudentFeedbackList