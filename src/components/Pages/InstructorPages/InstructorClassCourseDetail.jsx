import React, { useState, useEffect, useRef, useContext } from 'react';
import classes from '../Page.module.scss';
import { Table, Alert, Image, Tag } from 'antd';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const Times = [
    '7:15AM - 9:15AM',
    '9:20AM - 11:20AM',
    '12:10AM - 2:10PM',
    '2:15PM - 4:15PM',
    '4:20PM - 6:20PM',
    '6:25PM - 8:25PM',
];

const findStatusText = (status) => {
    switch (status) {
        case 1:
            return "Not Yet";
        case 2:
            return "In Progress";
        default:
            return "Done";
    }
}
const findStatusColor = (status) => {
    switch (status) {
        case 1:
            return "red";
        case 2:
            return "yellow";
        default:
            return "green";
    }
}

const InstructorClassCourseDetail = () => {
    console.log("Rendering Class.jsx")
    const params = useParams();
    const classCourseId = params.id;

    const [studentData, setstudentData] = useState([]);
    const [classCourseData, setClassCourseData] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [isClassCourseFetching, setClassCourseFetching] = useState(true);
    const [isStudentFetching, setStudentFetching] = useState(true);
    const [isScheduleFetching, setScheduleFetching] = useState(true);
    const { setContentLoading } = useContext(ContentContext)

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

    const studentColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <Image src={text.src} alt={text.alt} width={30} height={30} />
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ]


    /** 
     * @return "classCourse": {
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
        }
    }
    **/
    const fetchClassCourseData = async () => {
        setClassCourseFetching(true);
        const url = `/instructor/classCourse/${classCourseId}`
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                const { classCourse } = response.data;
                setClassCourseData(classCourse);
                setClassCourseFetching(false);
                _setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setClassCourseFetching(false);
            })
    }

    /** 
     * @return "classCourse": [
        {
            "class_course_id": 1,
            "class_id": 1,
            "course_id": 1,
            "instructor_id": "INS001",
            "class_enrollments": [
                {
                    "class_course_id": 1,
                    "class_enrollment_id": 1,
                    "student_id": "CS001",
                    "student": {
                        "student_id": "CS001",
                        "image": "imageCS1.jpg",
                        "full_name": "John Doe",
                        "gender": 1,
                        "user": {
                            "student_id": "CS001",
                            "email": "studentuser1@example.com"
                        }
                    }
                },
    **/

    const fetchClassCourseStudentData = async () => {
        setStudentFetching(true);
        const url = `/instructor/classCourse/${classCourseId}/students`
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                const { class_enrollments } = response.data.classCourse;
                setstudentData(getStudentDataFromClassEnrollmentData(class_enrollments));
                setStudentFetching(false);
                _setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setStudentFetching(false);
            })
    }

    const getStudentDataFromClassEnrollmentData = (classEnrollmentData) => {
        console.log(classEnrollmentData);
        return classEnrollmentData.map((classEnrollment) => ({
            key: classEnrollment.student_id,
            id: classEnrollment.student_id,
            image: {
                scr: classEnrollment.student.image,
                alt: classEnrollment.student.full_name,
            },
            fullName: classEnrollment.student.full_name,
            gender: classEnrollment.student.gender === 1 ? "Male" : "Female",
            email: classEnrollment.student.user ? classEnrollment.student.user.email : "No email",
        }))
    }
    /** 
     * @return "classCourse": {
        "class_course_id": 1,
        "class_id": 1,
        "course_id": 1,
        "instructor_id": "INS001",
        "class_schedules": [
            {
                "class_schedule_id": 1,
                "class_course_id": 1,
                "day": "2023-05-18",
                "slot": 1,
                "room": 101,
                "status": 1
            },
    **/

    const fetchClassCourseScheduleData = async () => {
        setScheduleFetching(true);
        const url = `/instructor/classCourse/${classCourseId}/classSchedules`
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                const { class_schedules } = response.data.classCourse;
                setScheduleData(getScheduleDataFrom(class_schedules));
                setScheduleFetching(false);
                _setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setScheduleFetching(false);
            })
    }

    const getScheduleDataFrom = (classScheduleData) => {
        console.log(classScheduleData);
        return classScheduleData.map((classSchedule) => ({
            key: classSchedule.class_schedule_id,
            date: dayjs(classSchedule.day).format('DD/MM/YYYY'),
            slot: Times[classSchedule.slot],
            room: classSchedule.room,
            status: classSchedule.status,
            detail: classSchedule.class_schedule_id,
        }))
    }

    const scheduleColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            key: 'slot',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <Tag color={findStatusColor(text)}>{findStatusText(text)}</Tag>
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
            render: (text) => <Link to={`/schedule/attendance/${text}`}>Detail</Link>
        },
    ]

    useEffect(() => {
        if (!isClassCourseFetching) setContentLoading(false)
        else setContentLoading(true);

    }, [isClassCourseFetching])

    useEffect(() => {
        fetchClassCourseData();
        fetchClassCourseStudentData();
        fetchClassCourseScheduleData();
    }, []);

    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>Class: {classCourseData && classCourseData.class.class_name}</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>
                        <div className={classes['list__class-name']}>
                            <p><b>Class: </b></p>
                            <p>{classCourseData && classCourseData.class.class_name}</p>
                        </div>
                        <div className={classes['list__class-name']}>
                            <p><b>Course</b></p>
                            <p>{classCourseData && classCourseData.course.course_name}</p>
                        </div>
                    </div>
                    <div className={classes['list__nav-right']}>
                        <div className={classes['list__nav-right__search']}>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div><h3>Student List:</h3></div>
                <div className={classes['list__table']}>
                    <Table columns={studentColumns} loading={isStudentFetching} pagination={false} dataSource={studentData} />
                </div>
                <br />
                <div><h3>Schedule List:</h3></div>
                <div className={classes['list__table']}>
                    <Table columns={scheduleColumns} loading={isScheduleFetching} pagination={false} dataSource={scheduleData} />
                </div>
            </div>
        </div>
    )
}

export default InstructorClassCourseDetail