import React, { useEffect, useState } from 'react'
import classes from '../Page.module.scss'
import { Button, Form, Input, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import axiosClient from '../../../axios-client';
const StudentCourseRegister = ({ enrollmentId, setModalOpen, fetchListData }) => {
    const [form] = Form.useForm();
    const [enrollmentData, setEnrollmentData] = useState(null);
    const [isEnrollmentFetching, setEnrollmentFetching] = useState(false);

    useEffect(() => {
        fetchEnrollmentData()
    }, [])

    useEffect(() => form.resetFields(), [enrollmentData]);


    /**
     * @return "enrollment": {
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
    }
     */

    const fetchEnrollmentData = async () => {
        setEnrollmentFetching(true);
        const url = `/student/enrollment/${enrollmentId}`
        console.log(url);
        await axiosClient(url)
            .then((response) => {
                const { course_name, credits, description, tuition_fee } = response.data.enrollment.course;
                setEnrollmentData({
                    course_name,
                    credits,
                    description,
                    tuition_fee
                });
                setEnrollmentFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setEnrollmentFetching(false);
            })
    }

    const onFinish = (field) => {
        (async () => {
            setEnrollmentFetching(true);
            const url = `/student/enrollment/${enrollmentId}`
            console.log(url);
            await axiosClient.post(url)
                .then((response) => {
                    alert("Registered successfully. Please head to the student department to pay the tuition fee.")
                    fetchListData();
                    setModalOpen(false);
                })
                .catch((error) => {
                    console.error(error);
                })
        })()
    }

    console.log(enrollmentData);
    return (
        <Spin spinning={isEnrollmentFetching}>
            <Form
                form={form}
                name='a'
                onFinish={onFinish}
                initialValues={enrollmentData}
            >
                <div className={classes['form-row']}>
                    <label htmlFor="course_name">Name</label>
                    <Form.Item
                        name="course_name"
                        noStyle>
                        <Input id='course_name' />
                    </Form.Item>
                </div>
                <div className={classes['form-row']}>
                    <label htmlFor="credits">Credit</label>
                    <Form.Item
                        name='credits'
                        noStyle>
                        <Input id='credits' readOnly />
                    </Form.Item>
                </div>
                <div className={classes['form-row']}>
                    <label htmlFor="tuition_fee">Tuition Fee</label>
                    <Form.Item
                        name='tuition_fee'
                        noStyle>
                        <Input id='tuition_fee' readOnly />
                    </Form.Item>
                </div>
                <div className={classes['form-row']}>
                    <label htmlFor="description">Description</label>
                    <Form.Item
                        name='description'
                        noStyle>
                        <TextArea rows={4} id='description' readOnly />
                    </Form.Item>
                </div>
                <div className={classes['form-actions']}>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Register</Button>
                        <Button onClick={() => { setModalOpen(false) }}>Cancel</Button>
                    </Form.Item>
                </div>
            </Form>
        </Spin>
    )
}

export default StudentCourseRegister