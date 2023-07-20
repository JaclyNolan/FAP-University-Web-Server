import React, { useEffect, useState } from 'react'
import classes from '../Page.module.scss'
import s from './Student.module.scss'
import { Button, Form, Input, Select, Spin } from 'antd'
import axiosClient from '../../../axios-client'
const StudentFeedbackAdd = ({ setModalOpen, fetchList }) => {
    const [form] = Form.useForm();

    const [classCourseData, setClassCourseData] = useState(null);
    const [isClassCourseFetching, setClassCourseFetching] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [isStudentFetching, setStudentFetching] = useState(false);

    const [isSending, setSending] = useState(false);

    useEffect(() => {
        fetchClassCourseData();
        fetchStudentData();
    }, [])

    /**
     * @return
     * "classCourses": [
        {
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
        },
     */

    const fetchClassCourseData = async () => {
        setClassCourseFetching(true);
        const response = await axiosClient.get('/student/classCourse/list');
        setClassCourseData(response.data.classCourses);
        setClassCourseFetching(false);
    }

    /**
     * @return "student": {
        "student_id": "CS001",
        "major_id": 1,
        "full_name": "John Doe",
        "date_of_birth": "1999-05-10",
        "phone_number": 123456789,
        "gender": 1,
        "address": "123 Main St, City",
        "image": "imageCS1.jpg",
        "academic_year": 2,
        "gpa": 3.5,
        "status": 1,
        "user": {
            "student_id": "CS001",
            "email": "ivansally0@gmail.com"
        }
    }
     */

    const fetchStudentData = async () => {
        setStudentFetching(true);
        const response = await axiosClient.get('/student/detail');
        setStudentData(response.data.student);
        setStudentFetching(false);
    }

    const onFinish = (fields) => {
        (async () => {
            setSending(true);
            const data = {
                class_course_id: fields.class_course_id,
                content: fields.content,
            }
            try {
                const response = await axiosClient.post('/student/feedback', { data: data });
                alert("Successfully sent feedback!");
                fetchList();
                setModalOpen(false);
            } catch (error) {
                alert("Something went wrong...");
            }
            setSending(false);
        })()
    }

    const resetField = () => {
        form.resetFields(['class_course_id', 'content'])
    }

    return (
        <div>
            <Spin spinning={isSending}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    className={s['feedback']}>
                    <div>
                        <div className={s['feedback-header-row']}>
                            <label htmlFor="name">Name: </label>
                            <Input value={studentData ? studentData.full_name : ''} readOnly id='name' />
                        </div>
                    </div>
                    <div >
                        <div className={s['feedback-header-row']}>
                            <label htmlFor="course">Class: </label>
                            <Form.Item
                                name='class_course_id'
                                noStyle
                                rules={[
                                    { required: true, message: 'Please select a class' }
                                ]}>
                                <Select
                                    placeholder='Class'
                                    loading={isClassCourseFetching}
                                    style={{ width: '100%' }}
                                    id='course'
                                    options={classCourseData && classCourseData.map((classCourse) =>
                                    ({
                                        value: classCourse.class_course_id,
                                        label: `${classCourse.class.class_name} - ${classCourse.course.course_name} - ${classCourse.instructor.full_name}`
                                    }))}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={s['feedback-main']}>
                        <label htmlFor="feedback">Feedback: </label>
                        <Form.Item
                            name='content'
                            rules={[
                                { required: true, message: 'Please voice your feedback' }
                            ]}>
                            <Input.TextArea id='feedback' rows={4}></Input.TextArea>
                        </Form.Item>

                    </div>
                    <div className={s['feedback-actions']}>
                        <Form.Item>
                            <Button htmlType='submit' type='primary'>Submit</Button>
                            <Button type='default' onClick={resetField}>Clear</Button>
                        </Form.Item>
                    </div>
                </Form></Spin>
        </div>
    )
}

export default StudentFeedbackAdd