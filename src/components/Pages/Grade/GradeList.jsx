import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { Input, Button, Table, Alert, Space } from 'antd'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import DebounceSelect from '../../../helpers/customs/DebounceSelect';
import ContentContext from '../../../helpers/Context/ContentContext';

const GradeList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);
    const { setContentLoading } = useContext(ContentContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [courseId, setCourseId] = useState(searchParams.get('course') ? searchParams.get('course') : 'all');
    const [classId, setClassId] = useState(searchParams.get('class') ? searchParams.get('class') : 'all');

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

    const getTableDataFromGradeData = (gradeData) => {
        console.log(gradeData);
        return gradeData.map((grade) => ({
            key: grade.id,
            student_id: grade.student_id,
            student_name: grade.student_name,
            class_id: grade.class_id,
            class_name: grade.class_name,
            course_id: grade.course_id,
            course_name: grade.course_name,
            status: grade.status,
            score: grade.score,
            actions: {
                id: grade.id
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

    const fetchClassCourseData = async (currentPage, search, courseId, classId) => {
        setFetching(true);
        const url = `/grades?page=${currentPage}`
            + (courseId !== 'all' ? `&course=${courseId}` : '')
            + (classId !== 'all' ? `&class=${classId}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { grades, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromGradeData(grades));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchClassCourseData(currentPage, search, courseId, classId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, courseId, classId]);

    const handleCourseChange = (value) => {
        setCourseId(value);
        setCurrentPage(1);
    }

    const handleClassChange = (value) => {
        setClassId(value);
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/grade/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
            </div>
        },

    ]
    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>Grade List</p>
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
                        {/* <div className={classes['list__nav-right__add']}>
                            <Link to='/grade/add'>
                                <Button type='primary'>
                                    <i className="fas fa-plus"></i>
                                    <span>Add</span>
                                </Button>
                            </Link>
                        </div> */}
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

export default GradeList