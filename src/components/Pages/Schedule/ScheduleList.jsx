import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import {Input, Button, Popconfirm, Select, Table, Alert} from 'antd'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import axiosClient from '../../../axios-client';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import ContentContext from '../../../helpers/Context/ContentContext';

const ScheduleList = () => {
    const { Search } = Input;
    const onSearch = (value) => {
        // Handle search functionality here
        console.log(value);
      };
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [ isFetching, setFetching ] = useState(false);
    const fetchRef = useRef(0);
    const { setContentLoading } = useContext(ContentContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [courseId, setCourseId] = useState(searchParams.get('course') ? searchParams.get('course') : 'all');
    const [classId, setClassId] = useState(searchParams.get('class') ? searchParams.get('class_id') : 'all');
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

    const statusLabels = {
        0: 'Not Started',
        1: 'Ongoing',
        2: 'Completed',
      };

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

    const getTableDataFromScheduleData = (scheduleData) => {
        console.log(scheduleData);
        return scheduleData.map((schedule) => ({
            key: schedule.id,
            class_id: schedule.class_id,
            class_name: schedule.class_name,
            course_id: schedule.course_id,
            course_name: schedule.course_name,
            day: schedule.day,
            slot: schedule.slot,
            room: schedule.room,
            status: schedule.status,
            detail: {
                id: schedule.id,
                text: 'Details'
            },
            actions: {
                id: schedule.id
            }
        }))
    }

    const fetchScheduleData = async(currentPage, search, classId, courseId, slot, status ) => {
        setFetching(true);
        const url = `/classSchedules?page=${currentPage}` 
        + (classId !== 'all' ? `&class=${classId}` : '') 
        + (courseId !== 'all' ? `&course=${courseId}` : '') 
        + (slot !== 'all' ? `&slot=${slot}` : '') 
        + (status !== 'all' ? `&status=${status}` : '') 
        + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { classSchedules, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromScheduleData(classSchedules));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchScheduleData(currentPage, search, classId, courseId, slot, status)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, classId, courseId, slot, status]);

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
        return debounce(handleSearch, 700);
    })

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    }
    
    const deleteScheduleHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/classSchedules/delete-classSchedule/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete class schedules with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchScheduleData(currentPage, search, classId, courseId, slot, status);
                } else {
                    setCurrentPage(1);
                }
            }
        })()
    }
    const tableColumns = [
        {
            title: 'Id',
            dataIndex: 'key',
            key: 'id',
        },
        {
            title: 'Class',
            dataIndex: 'class_name',
            key: 'class_name'
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
            render: (status) => statusLabels[status] || '', // Sử dụng đối tượng
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/schedule/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the schedule"
                    description="Are you sure to delete this this schedule?"
                    onConfirm={() => deleteScheduleHandler(text.id)}
                    okText="Confirm"
                    cancelText="Cancel"
                >
                    <Button danger type='primary'>
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </Popconfirm>
            </div>
        },

    ]
  return (
    <div className={classes['list']}>
        {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
        <p className={classes['page__title']}>schedule List Test</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                    
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                    <Input
                                prefix={isFetching ? <LoadingOutlined/> : <SearchOutlined/>}
                                placeholder="input search text"
                                allowClear
                                onChange={debounceSetter}
                                style={{ width: 200 }}
                            />
                    </div>
                    <div className={classes['list__nav-right__add']}>
                        <Link to='/schedule/add'>
                            <Button type='primary'>
                                <i className="fas fa-plus"></i>
                                <span>Add</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={classes['list__filters']}>
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
                            { value: '0', label: 'Not Started' },
                            { value: '1', label: 'Ongoing' },
                            { value: '2', label: 'Completed' },
                        ]}
                    />

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

export default ScheduleList