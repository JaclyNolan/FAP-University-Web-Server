import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import classes from '../Page.module.scss';
import { Input, Table, Alert, Image } from 'antd';
import axiosClient from '../../../axios-client';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import ContentContext from '../../../helpers/Context/ContentContext';
import { useLocation, useParams } from 'react-router-dom';

const Class = () => {
    console.log("Rendering Class.jsx")
    const params = useParams();
    const classCourseId = params.id;

    const [tableData, setTableData] = useState([]);
    const [classCourseData, setClassCourseData] = useState({});
    const [isClassCourseFetching, setClassCourseFetching] = useState(true);
    const [isStudentFetching, setStudentFetching] = useState(true);
    const fetchRef = useRef(0);
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


    const getTableDataFromClassEnrollemntData = (classEnrollmentData) => {
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

    const tableColumns = [
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


    /** @return "classCourse": {
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
        setContentLoading(true);
        const url = `/instructor/classCourse/${classCourseId}`
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                const { classCourse, total_pages } = response.data;
                setClassCourseData(classCourse);
                setClassCourseFetching(false);
                setContentLoading(false)
                _setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setContentLoading(false);
                setClassCourseFetching(false);
            })
    }

    /** @return "classEnrollments": [
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
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { classEnrollments, total_pages } = response.data;
                setTableData(getTableDataFromClassEnrollemntData(classEnrollments));
                setStudentFetching(false);
                _setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setStudentFetching(false);
            })
    }

    useEffect(() => {
        fetchClassCourseData();
        fetchClassCourseStudentData()
    }, []);

    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            {(isClassCourseFetching || isStudentFetching) ? null : <>
                <p className={classes['page__title']}>Class: {classCourseData.class.class_name}</p>
                <div className={classes['list__main']}>
                    <div className={classes['list__nav']}>
                        <div className={classes['list__nav-left']}>
                            <div className={classes['list__class-name']}>
                                <p><b>Class: </b></p>
                                <p>{classCourseData.class.class_name}</p>
                            </div>
                            <div className={classes['list__class-name']}>
                                <p><b>Course</b></p>
                                <p>{classCourseData.course.course_name}</p>
                            </div>
                        </div>
                        <div className={classes['list__nav-right']}>
                            <div className={classes['list__nav-right__search']}>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div><p>Student List:</p></div>
                    <div className={classes['list__table']}>
                        <Table columns={tableColumns} loading={isClassCourseFetching} pagination={false} dataSource={tableData} />
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Class