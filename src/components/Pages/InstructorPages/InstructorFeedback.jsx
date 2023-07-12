import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, Table } from 'antd'
import { Link } from 'react-router-dom'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import dayjs from 'dayjs';
import ContentContext from '../../../helpers/Context/ContentContext';
const InstructorFeedback = () => {
    const [classCourseId, setClassCourseId] = useState('all');
    const [tableData, setTableData] = useState(null);
    const [classCourseData, setClassCourseData] = useState(null);
    const [isFeedbackfetching, setFeedbackFetching] = useState(true);
    const [isClassCoursefetching, setClassCourseFetching] = useState(true);
    const {setContentLoading} = useContext(ContentContext);

    useEffect(() => {
        fetchFeedbackData();
        fetchClassCourseData();
    }, [])

    useEffect(() => {  
        fetchFeedbackData();
    }, [classCourseId])

    useEffect(() => {
        if (!isFeedbackfetching && !isClassCoursefetching) setContentLoading(false);
        else setContentLoading(true);
    }, [isFeedbackfetching, isClassCoursefetching])

    /**
     * @return     "feedbacks": [
        {
            "feedback_id": 2,
            "class_enrollment_id": 2,
            "feedback_content": "Sample feedback 2",
            "created_at": "2023-06-08T10:02:34.000000Z",
            "class_enrollment": {
                "class_enrollment_id": 2,
                "class_course_id": 1,
                "student_id": "CS002",
                "student": {
                    "student_id": "CS002",
                    "full_name": "Jane Smith"
                },
                "class_course": {
                    "class_course_id": 1,
                    "class_id": 1,
                    "course_id": 1,
                    "class": {
                        "class_id": 1,
                        "class_name": "CS001"
                    },
                    "course": {
                        "course_id": 1,
                        "course_name": "Introduction to Programming"
                    }
                }
            }
        },
     */

    const fetchFeedbackData = async () => {
        setFeedbackFetching(true);
        const url = `/instructor/feedback`
            + (classCourseId !== 'all' ? `?class_course_id=${classCourseId}` : '');
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                const { feedbacks } = response.data;
                setTableData(getTableDataFromFeedbackData(feedbacks));
                setFeedbackFetching(false);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const getTableDataFromFeedbackData = (feedbacks) => {
        return feedbacks.map((feedback) => ({
            key: feedback.feedback_id,
            classCourse: {
                id: feedback.class_enrollment.class_course.class_course_id,
                text: `${feedback.class_enrollment.class_course.class.class_name} - ${feedback.class_enrollment.class_course.course.course_name}`,
            },
            student: feedback.class_enrollment.student.full_name,
            dateCreated: dayjs(feedback.created_at).format('HH:mm:ss DD/MM/YYYY'),
            actions: {
                id: feedback.feedback_id,
            }
        }));
    }

    const tableColumns = [
        {
            title: 'Class - Course',
            dataIndex: 'classCourse',
            key: 'classCourse',
            render: (text) => <Link to={`/class/${text.id}`}>
                <p>{text.text}</p>
            </Link>,
        },
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student',
        },
        {
            title: 'Date Created',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/feedback/${text.id}`} style={{ marginRight: '10px' }}>
                    <Button>View Details</Button>
                </Link>
            </div>
        },
    ]

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
                "class_name": "CS001",
                "major": {
                    "major_id": 1,
                    "major_name": "Computer Science"
                }
            },
            "course": {
                "course_id": 1,
                "course_name": "Introduction to Programming"
            }
        },
     */

    const fetchClassCourseData = async () => {
        setClassCourseFetching(true);
        const url = `/instructor/classCourse`;
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                const { classCourses } = response.data;
                setClassCourseData(classCourses);
                setClassCourseFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setClassCourseFetching(false);
            })
    }

    const handleClassCourseChange = (value) => {
        setClassCourseId(value);
    }

    return (
        <div className={classes['list']}>
            <p className={classes['page__title']}>Feedback List</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>

                    </div>
                    <div className={classes['list__nav-right']}>
                    </div>
                </div>
                <div className={classes['list__filters']}>
                    <Select
                        defaultValue="all"
                        style={{ width: 250 }}
                        onChange={handleClassCourseChange}
                        options={classCourseData ? [
                            { value: 'all', label: 'Class' },
                            ...classCourseData.map((classCourse) => ({
                                value: classCourse.class_course_id,
                                label: `${classCourse.class.class_name} - ${classCourse.course.course_name}`
                            })),
                        ] : [{ value: 'all', label: 'Class' }]}
                    />
                </div>
                <div className={classes['list__table']}>
                    <Table columns={tableColumns} pagination={{ pageSize: 6 }} dataSource={tableData} />
                </div>
            </div>
        </div>
    )
}

export default InstructorFeedback