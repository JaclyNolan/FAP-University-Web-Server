import React, { useContext, useEffect, useState } from 'react'
import { Input, Table, Radio, Form, Button } from 'antd'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../../../axios-client'
import ContentContext from '../../../helpers/Context/ContentContext'
import dayjs from 'dayjs'
const InstructorWeeklyScheduleAttendance = () => {
    const [editMode, setEditMode] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [scheduleAttendanceData, setScheduleAttendanceData] = useState(null);
    const [classCourseData, setClassCourseData] = useState(null);
    const [isClassCourseFetching, setClassCourseFetching] = useState(true);
    const [isScheduleAttendanceFetching, setScheduleAttendanceFetching] = useState(true);
    const { setContentLoading } = useContext(ContentContext);
    const [form] = Form.useForm();
    const params = useParams();
    const classScheduleId = params.id;

    useEffect(() => {
        fetchScheduleAttendancesData();
        fetchClassCourseData();
    }, [])

    useEffect(() => {
        if (!isClassCourseFetching && !isScheduleAttendanceFetching) setContentLoading(false);
        else setContentLoading(true);
    }, [isClassCourseFetching, isScheduleAttendanceFetching])

    /**
     * @return "classSchedule": [
        {
            "class_schedule_id": 1,
            "class_course_id": 1,
            "attendances": [
                {
                    "attendance_id": 1,
                    "class_schedule_id": 1,
                    "class_enrollment_id": 1,
                    "attendance_status": "1",
                    "attendance_comment": null,
                    "class_enrollment": {
                        "class_enrollment_id": 1,
                        "student_id": "CS001",
                        "student": {
                            "student_id": "CS001",
                            "full_name": "John Doe",
                            "image": "imageCS1.jpg"
                        }
                    }
                },
     */
    const fetchScheduleAttendancesData = async () => {
        setScheduleAttendanceFetching(true);
        const url = `/instructor/classSchedule/${classScheduleId}/attendances`
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                const { classSchedule } = response.data;
                setScheduleAttendanceData(classSchedule);
                setTableData(getTableDataFromScheduleAttendances(classSchedule));
                setScheduleAttendanceFetching(false);
            })
            .catch((error) => {
                console.error("There was error in fetching schedule attendances data" + error);
                setScheduleAttendanceFetching(false);
            })
    }

    /**
     * @return "classSchedule": {
        "class_schedule_id": 1,
        "class_course_id": 1,
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
     */

    const fetchClassCourseData = async () => {
        setClassCourseFetching(true);
        const url = `/instructor/classSchedule/${classScheduleId}/classCourse`
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                const { class_course } = response.data.classSchedule;
                setClassCourseData(class_course);
                setClassCourseFetching(false);
            })
            .catch((error) => {
                console.error("There was error in fetching schedule attendances data" + error);
                setClassCourseFetching(false);
            })
    }

    const getTableDataFromScheduleAttendances = (classSchedule) => {
        // console.log(classSchedule); 
        return classSchedule.attendances.map((attendance) => ({
            key: attendance.attendance_id,
            image: {
                src: attendance.class_enrollment.student.image,
                alt: attendance.class_enrollment.student.full_name,
            },
            studentName: attendance.class_enrollment.student.full_name,
            studentId: attendance.class_enrollment.student.student_id,
            attendanceTime: attendance.attendance_time,
            status: {
                status: attendance.attendance_status,
                attendanceId: attendance.attendance_id,
            },
            note: {
                comment: attendance.attendance_comment ? attendance.attendance_comment : '',
                attendanceId: attendance.attendance_id,
            },
        }))
    }

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <Image src={text.src} alt={text.alt} width={30} height={30} />
        },
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            key: 'studentName'
        },
        {
            title: 'Student ID',
            dataIndex: 'studentId',
            key: 'studentId'
        },
        {
            title: 'Present at',
            dataIndex: 'attendanceTime',
            key: 'attendanceTime',
            render: (text) => (text ? dayjs(text).format('HH:mm:ss') : 'Not yet')
        },
        {
            title: '',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <Form.Item name={`status_${text.attendanceId}`} initialValue={text.status}
                rules={[{ required: true, message: "Please select status" }]}>
                <Radio.Group disabled={!editMode}>
                    <Radio value={0}>Absent</Radio>
                    <Radio value={1}>Attended</Radio>
                </Radio.Group>
            </Form.Item>
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            render: (text) => <Form.Item name={`comment_${text.attendanceId}`} initialValue={text.comment}>
                <Input placeholder='Comment' disabled={!editMode}></Input>
            </Form.Item>
        },
    ]

    const onFinish = (fields) => {
        (async () => {
            setContentLoading(true);
            const data = scheduleAttendanceData.attendances.map((attendance) => ({
                attendance_id: attendance.attendance_id,
                attendance_status: fields[`status_${attendance.attendance_id}`],
                attendance_comment: fields[`comment_${attendance.attendance_id}`],
            }))
            console.log({ data: data });
            const url = `/instructor/classSchedule/${classScheduleId}/attendances`
            await axiosClient.put(url, { data: data })
                .then((response) => {
                    fetchScheduleAttendancesData();
                    alert("Saved attendance successfully");
                    setContentLoading(false);
                })
                .catch((error) => {
                    console.error("There was an error with sending request" + error);
                    setContentLoading(false);
                })
        })()
    }

    const handleEdit = () => {
        setEditMode(true);
    }
    const handleSave = () => {
        setEditMode(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setEditMode(false);
    }

    const onFinishFail = (errorInfo) => {
        console.error(errorInfo);
    }

    return (
        <div className={classes['list']}>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFail}
                scrollToFirstError>
                <p className={classes['page__title']}>Attendance for {classCourseData
                    && <Link to={`/class/${classCourseData.class_course_id}`}>
                        <b>{`${classCourseData.class.class_name} - ${classCourseData.course.course_name}`}</b>
                    </Link>}
                </p>
                <div className={classes['list__main']}>
                    <div className={classes['list__table']}>
                        <Table columns={columns} pagination={false} dataSource={tableData} />
                    </div>
                </div>
                <br />
                {editMode ? (
                    <Form.Item name='editMode'>
                        <Button type="primary" htmlType="button" onClick={handleSave}>
                            Save
                        </Button>
                        <span> </span>
                        <Button htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                ) : (
                    <Form.Item name='viewMode'>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <span> </span>
                        <Button htmlType="button" onClick={handleEdit}>
                            Edit
                        </Button>
                    </Form.Item>
                )}
                <p><b>Last Update: </b>{(scheduleAttendanceData && scheduleAttendanceData.submit_time) ? dayjs(scheduleAttendanceData.submit_time).format('HH:mm:ss DD/MM/YYYY') : 'None'}</p>
            </Form>
        </div>
    )
}

export default InstructorWeeklyScheduleAttendance