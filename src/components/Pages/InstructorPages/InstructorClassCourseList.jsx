import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import classes from '../Page.module.scss';
import { Input, Table, Alert } from 'antd';
import axiosClient from '../../../axios-client';
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';

const InstructorClassCourseList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);

    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');

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

    /** 
     * @return "classCourses": [
        {
            "class_course_id": 1,
            "class_id": 1,
            "course_id": 1,
            "instructor_id": "INS001",
            "class": {
                "class_id": 1,
                "major_id": 1,
                "class_name": "CS001",
                "major": {
                    "major_id": 1,
                    "major_name": "Computer Science"
                }
            },
            "course": {
                "course_id": 1,
                "course_name": "Introduction to Programming"
            }
        },
    **/

    const getTableDataFromClassCourseData = (classCourseData) => {
        console.log(classCourseData);
        return classCourseData.map((classCourse, index) => ({
            key: index + 1,
            course: classCourse.course.course_name,
            class: classCourse.class.class_name,
            major: classCourse.class.major.major_name,
            detail: {
                id: classCourse.class_course_id,
            }
        }))
    }

    const fetchClassCourseData = async (search) => {
        setFetching(true);
        const url = `/instructor/classCourse`
            + (search !== "" ? `?keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { classCourses } = response.data;
                setTableData(getTableDataFromClassCourseData(classCourses));
                setFetching(false);
                _setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchClassCourseData(search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const debounceSetter = useMemo(() => {
        const handleSearch = (e) => {
            setSearch(e.target.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return debounce(handleSearch, 700);
    })

    const tableColumns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'no',
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major'
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
            render: (text) => <Link to={`/class/${text.id}`}>Details</Link>,
        },
    ]

    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>Class course List</p>
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
                <div className={classes['list__table']}>
                    <Table columns={tableColumns} loading={isFetching} pagination={ false } dataSource={tableData} />
                </div>
            </div>
        </div>
    )
}

export default InstructorClassCourseList