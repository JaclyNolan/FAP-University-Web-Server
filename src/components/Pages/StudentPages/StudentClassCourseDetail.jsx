import React, { useState, useEffect, useRef, useContext } from 'react';
import classes from '../Page.module.scss';
import { Table, Alert, Image, Tag } from 'antd';
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { findAttendanceColor, findAttendanceText, findStatusColor, findStatusText } from '../CommonFunctions';

const StudentClassCourseDetail = () => {
    const params = useParams();
    const classCourseId = params.id;

    const [slotTimes, setSlotTimes] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [classCourseData, setClassCourseData] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [isSlotTimesFetching, setSlotTimesFetching] = useState(true);
    const [isClassCourseFetching, setClassCourseFetching] = useState(true);
    const [isStudentFetching, setStudentFetching] = useState(true);
    const [isScheduleFetching, setScheduleFetching] = useState(true);

    const studentColumns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'no',
        },
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
            title: 'Date of birth',
            dataIndex: 'dob',
            key: 'dob'
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
        },
        "instructor": {
            "instructor_id": "INS001",
            "full_name": "John Smith"
        }
    }
    **/

    const fetchClassCourseData = async () => {
        setClassCourseFetching(true);
        await axiosClient.get(`/student/classCourse/${classCourseId}`)
            .then((response) => {
                setClassCourseData(response.data.classCourse);
                setClassCourseFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setClassCourseFetching(false);
            })
    }

    /** 
     * @return "classCourse": {
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
                    "date_of_birth": "1999-05-10"
                }
            },
    **/

    const fetchClassCourseStudentData = async () => {
        setStudentFetching(true);
        await axiosClient.get(`/student/classCourse/${classCourseId}/students`)
            .then((response) => {
                setStudentData(getStudentDataFromClassCourseData(response.data.classCourse));
                setStudentFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setStudentFetching(false);
            })
    }

    const getStudentDataFromClassCourseData = (classCourseData) => {
        return classCourseData.class_enrollments.map((classEnrollment, index) => ({
            key: index + 1,
            id: classEnrollment.student_id,
            image: {
                scr: classEnrollment.student.image,
                alt: classEnrollment.student.full_name,
            },
            fullName: classEnrollment.student.full_name,
            gender: classEnrollment.student.gender === 1 ? "Male" : "Female",
            dob: classEnrollment.student.date_of_birth,
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
                "class_schedule_id": 11,
                "class_course_id": 1,
                "day": "2023-08-23",
                "slot": 3,
                "room": 105,
                "status": 1,
                "submit_time": null,
                "attendances": [
                    {
                        "attendance_id": 41,
                        "class_schedule_id": 11,
                        "class_enrollment_id": 1,
                        "attendance_status": 0,
                        "attendance_time": null
                    }
                ]
            },
    **/

    const fetchClassCourseScheduleData = async () => {
        setScheduleFetching(true);
        await axiosClient.get(`/student/classCourse/${classCourseId}/classSchedules`)
            .then((response) => {
                setScheduleData(getScheduleDataFrom(response.data.classCourse));
                setScheduleFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setScheduleFetching(false);
            })
    }

    const getScheduleDataFrom = (classCourseData) => {
        return classCourseData.class_schedules.map((classSchedule) => ({
            key: classSchedule.class_schedule_id,
            date: dayjs(classSchedule.day).format('DD/MM/YYYY'),
            slot: classSchedule.slot,
            room: classSchedule.room,
            schedule_status: classSchedule.status,
            attendance: {
                status: classSchedule.attendances[0].attendance_status,
                time: classSchedule.attendances[0].attendance_time,
            },
            comment: classSchedule.attendances[0].attendance_comment,
        }))
    }

    /**
    * @return "slotTimes": [
       {
           "slot": 1,
           "start_time": "7:15:00",
           "end_time": "9:15:00"
       },
    */

    const fetchSlotTimeData = async () => {
        setSlotTimesFetching(true);
        const url = `/classSchedule/slotTimes`;

        await axiosClient.get(url)
            .then((response) => {
                setSlotTimes(getSlotTimesFromData(response.data.slotTimes));
                setSlotTimesFetching(false);
            })
            .catch((error) => {
                console.error('Error fetching slot time data:', error);
                setSlotTimesFetching(false);
            })
    }

    const getSlotTimesFromData = (slotTimesData) => {
        return slotTimesData.map((slotTime) => {
            const Time = dayjs(slotTime.start_time, 'HH:mm:ss').format('h:mmA') + ' - ' + dayjs(slotTime.end_time, 'HH:mm:ss').format('h:mmA')
            return <div><h4>Slot {slotTime.slot}</h4><p>{Time}</p></div>
        })
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
            render: (text) => (slotTimes ? slotTimes[text - 1] : <h4>Slot: {text}</h4>)
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'Class Status',
            dataIndex: 'schedule_status',
            key: 'schedule_status',
            render: (text) => <Tag color={findStatusColor(text)}>{findStatusText(text)}</Tag>
        },
        {
            title: 'Attendance',
            dataIndex: 'attendance',
            key: 'attendance',
            render: (text) => <Tag color={findAttendanceColor(text.status)}>{findAttendanceText(text.status, text.time)}</Tag>
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
    ]

    useEffect(() => {
        fetchClassCourseData();
        fetchClassCourseStudentData();
        fetchClassCourseScheduleData();
        fetchSlotTimeData();
    }, []);

    return (
        <div className={classes['list']}>
            <p className={classes['page__title']}>Class: {classCourseData && classCourseData.class.class_name}</p>
            <div className={classes['list__main']}>
                <div className={classes['list__nav']}>
                    <div className={classes['list__nav-left']}>
                        <div className={classes['list__class-name']}>
                            <p><b>Class: </b></p>
                            <p>{classCourseData && classCourseData.class.class_name}</p>
                            <p><b>Instructor</b></p>
                            <p>{classCourseData && classCourseData.instructor.full_name}</p>
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

export default StudentClassCourseDetail