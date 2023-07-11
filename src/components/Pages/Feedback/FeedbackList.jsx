import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import {Input, Button, Popconfirm, Select, Table, Space, Alert} from 'antd'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import ContentContext from '../../../helpers/Context/ContentContext';


const FeedbackList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);
    const { setContentLoading } = useContext(ContentContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [majorId, setMajorId] = useState(searchParams.get('major') ? searchParams.get('major') : 'all');
    const [courseId, setCourseId] = useState(searchParams.get('course') ? searchParams.get('course') : 'all');
    const [classId, setClassId] = useState(searchParams.get('class') ? searchParams.get('class') : 'all');
    const [instructorId, setInstructorId] = useState(searchParams.get('instructor') ? searchParams.get('instructor') : 'all');

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

    const getTableDataFromFeedbackData = (feedbackData) => {
        console.log(feedbackData);
        return feedbackData.map((feedback) => ({
            key: feedback.id,
            major_id: feedback.major_id,
            major_name: feedback.major_name,
            instructor_id: feedback.instructor_id,
            instructor_name: feedback.instructor_name,
            student_id: feedback.student_id,
            student_name: feedback.student_name,
            class_name: feedback.class_name,
            course_id: feedback.course_id,
            course_name: feedback.course_name,
            actions: {
                id: feedback.id
            }
        }))
    }

    async function fetchCourseList(searchValue) {
        setContentLoading(true);
        const url = '/courses'
            + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
        console.log(url);

        try {
            const response = await axiosClient.get(url)
            // console.log(response)
            const data = response.data.courses
            // console.log(data);
            setContentLoading(false);
            return data.map((info) => ({
                label: `${info.id} ${info.name}`,
                value: info.id,
            }))
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message);
            setContentLoading(false);
        }
    }
    async function fetchClassList(searchValue) {
        setContentLoading(true);
        const url = '/class'
            + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
        console.log(url);

        try {
            const response = await axiosClient.get(url)
            // console.log(response)
            const data = response.data.classes
            // console.log(data);
            setContentLoading(false);
            return data.map((info) => ({
                label: `${info.id} ${info.name}`,
                value: info.id,
            }))
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message);
            setContentLoading(false);
        }
    }

    async function fetchInstructorList(searchValue) {
        setContentLoading(true);
        const url = '/instructors'
            + (searchValue !== "" ? `?page=1&keyword=${searchValue}` : '')
        console.log(url);

        try {
            const response = await axiosClient.get(url)
            const data = response.data.instructors
            setContentLoading(false);
            return data.map((info) => ({
                label: `${info.id} ${info.full_name}`,
                value: info.id,
            }))
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message);
            setContentLoading(false);
        }
    }

    const fetchClassCourseData = async (currentPage, search, majorId, courseId, classId, instructorId) => {
        setFetching(true);
        const url = `/feedbacks?page=${currentPage}`
            + (majorId !== 'all' ? `&major=${majorId}` : '')
            + (courseId !== 'all' ? `&course=${courseId}` : '')
            + (classId !== 'all' ? `&class=${classId}` : '')
            + (instructorId !== 'all' ? `&instructor=${instructorId}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { feedbacks, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromFeedbackData(feedbacks));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchClassCourseData(currentPage, search, majorId, courseId, classId, instructorId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, majorId, courseId, classId, instructorId]);

    const handleMajorChange = (value) => {
        setMajorId(value);
        setCurrentPage(1);
    }

    const handleCourseChange = (value) => {
        setCourseId(value);
        setCurrentPage(1);
    }

    const handleClassChange = (value) => {
        setClassId(value);
        setCurrentPage(1);
    }

    const handleInstructorChange = (value) => {
        setInstructorId(value);
        setCurrentPage(1);
    }

    const debounceSetter = useMemo(() => {
        const handleSearch = (e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return debounce(handleSearch, 700);
    })

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    }

    const tableColumns = [
        {
            title: 'Id',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Teacher',
            dataIndex: 'instructor_name',
            key: 'instructor_name'
        },
        {
            title: 'Class',
            dataIndex: 'class_name',
            key: 'class_name',
        },
        {
            title: 'Course',
            dataIndex: 'course_name',
            key: 'course_name'
        },
        {
            title: 'Student ID',
            dataIndex: 'student_id',
            key: 'student_id',
        },
        {
            title: 'Student Name',
            dataIndex: 'student_name',
            key: 'student_name',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/feedback/details/${text.id}`} style={{marginRight: '10px'}}>Details</Link>
            </div>
        },

    ]
    // const tableData = [
    //     {
    //         key: '1',
    //         teacher: 'Nguyen Van A',
    //         class: 'BHAF123',
    //         course: 'Programing',
    //         student: 'Nguyen Van B',
    //         actions: {
    //             id: 1
    //         }
    //     }
    // ]
  return (
    <div className={classes['list']}>
        {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
        <p className={classes['page__title']}>Feedback List</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                    <Input
                                prefix={isFetching ? <LoadingOutlined /> : <SearchOutlined />}
                                placeholder="input search text"
                                allowClear
                                onChange={debounceSetter}
                                style={{ width: 200 }}
                            />
                    </div>
                </div>
            </div>
            <div className={classes['list__filters']}>
            <Space>
                            <Select
                                defaultValue={majorId}
                                style={{ width: 120 }}
                                onChange={handleMajorChange}
                                options={[
                                    { value: 'all', label: 'Major' },
                                    { value: '1', label: 'Computer Science' },
                                    { value: '2', label: 'Business Administration' },
                                    { value: '3', label: 'Mechanical Engineering' },
                                    { value: '4', label: 'Psychology' },
                                    // { value: 'disabled', label: 'Disabled', disabled: true },
                                ]}
                            />
                            <DebounceSelect
                                defaultValue={courseId}
                                key='course'
                                style={{ width: 200 }}
                                onChange={handleCourseChange}
                                fetchOptions={fetchCourseList}
                                presetOptions={[
                                    { value: 'all', label: 'Course' },
                                ]}
                            />
                            <DebounceSelect
                                defaultValue={classId}
                                key='class'
                                style={{ width: 200 }}
                                onChange={handleClassChange}
                                fetchOptions={fetchClassList}
                                presetOptions={[
                                    { value: 'all', label: 'Class' },
                                ]}
                            />
                            <DebounceSelect
                                defaultValue={instructorId}
                                key='instructor'
                                style={{ width: 200 }}
                                onChange={handleInstructorChange}
                                fetchOptions={fetchInstructorList}
                                presetOptions={[
                                    { value: 'all', label: 'Instructor' },
                                ]}
                            />

                        </Space>
            </div>
            <div className={classes['list__table']}>
            <Table columns={tableColumns} loading={isFetching} pagination={{
                        current: currentPage,
                        total: totalPages * tableData.length,
                        pageSize: tableData.length,
                        defaultCurrent: 1,
                        showQuickJumper: true,
                        onChange: handlePageChange
                    }} dataSource={tableData} />
            </div>
        </div>
    </div>
  )
}

export default FeedbackList