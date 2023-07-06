import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { Input, Button, Popconfirm, Select, Table, Space, Alert } from 'antd'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import ContentContext from '../../../helpers/Context/ContentContext';

const AttendanceList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);
    const { setContentLoading } = useContext(ContentContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [majorId, setMajorId] = useState(searchParams.get('major_id') ? searchParams.get('major') : 'all');
    const [courseId, setCourseId] = useState(searchParams.get('course') ? searchParams.get('course') : 'all');
    const [classId, setClassId] = useState(searchParams.get('class') ? searchParams.get('class') : 'all');
    const [slot, setSlot] = useState(searchParams.get('slot') ? searchParams.get('slot') : 'all');
    const [status, setStatus] = useState(searchParams.get('status') ? searchParams.get('status') : 'all');

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

    const getTableDataFromAttendanceData = (attendanceData) => {
        console.log(attendanceData);
        return attendanceData.map((attendance) => ({
            key: attendance.id,
            student_id: attendance.student_id,
            student_name: attendance.student_name,
            class_name: attendance.class_name,
            course_name: attendance.course_name,
            day: attendance.day,
            slot: attendance.slot,
            room: attendance.room,
            status: attendance.status,

            actions: {
                id: attendance.id
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

    const fetchAttendanceData = async (currentPage, search, courseId, classId, slot, status) => {
        setFetching(true);
        const url = `/attendances?page=${currentPage}`
            + (courseId !== 'all' ? `&course=${courseId}` : '')
            + (classId !== 'all' ? `&class=${classId}` : '')
            + (slot !== 'all' ? `&slot=${slot}` : '')
            + (status !== 'all' ? `&status=${status}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { attendances, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromAttendanceData(attendances));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchAttendanceData(currentPage, search, courseId, classId, slot, status)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, courseId, classId, slot, status]);

    const handleCourseChange = (value) => {
        setCourseId(value);
        setCurrentPage(1);
    }

    const handleClassChange = (value) => {
        setClassId(value);
        setCurrentPage(1);
    }

    const handleSlotChange = (value) => {
        setSlot(value);
        setCurrentPage(1);
    }

    const handleStatusChange = (value) => {
        setStatus(value);
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
            title: 'ID',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Student ID',
            dataIndex: 'student_id',
            key: 'student_id'
        },
        {
            title: 'Student Name',
            dataIndex: 'student_name',
            key: 'student_name'
        },
        {
            title: 'Class',
            dataIndex: 'class_name',
            key: 'class_name',
        },
        {
            title: 'Course',
            dataIndex: 'course_name',
            key: 'course_name',
        },
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day'
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
            render: (text) => (text === 0 ? 'Attended' : 'Absent'),
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/attendance/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
            </div>
        },

    ]
    // const tableData = [
    //     {
    //         key: '1',
    //         student: 'Nguyen Van A',
    //         class: 'BHAF123',
    //         course: 'Programing',
    //         day: 'Tuesday',
    //         slot: '1',
    //         room: 'B01',
    //         status: 'In progress',
    //         actions: {
    //             id: 1
    //         }
    //     }
    // ]
    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>Attendance List</p>
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
                        <Select
                        defaultValue="Slot"
                        style={{ width: 120 }}
                        onChange={handleSlotChange}
                        options={[
                            { value: 'all', label: 'Slot' },
                            { value: '1', label: 'Slot 1 (7:15-9:15)' },
                            { value: '2', label: 'Slot 2 (9:25-11:25)' },
                            { value: '3', label: 'Slot 3 (12:00-14:00)' },
                            { value: '4', label: 'Slot 4 (14:10-16:10)' },
                            { value: '5', label: 'Slot 5 (16:20-18:20)' },
                            { value: '6', label: 'Slot 6 (18:30-20:30)' },
                        ]}
                    />
                        <Select
                            defaultValue="Status"
                            style={{ width: 120 }}
                            onChange={handleStatusChange}
                            options={[
                                { value: 'all', label: 'Status' },
                                { value: '0', label: 'Attended' },
                                { value: '1', label: 'Absent' },
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

export default AttendanceList