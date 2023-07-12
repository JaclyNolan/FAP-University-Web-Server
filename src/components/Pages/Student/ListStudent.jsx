import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Button, Popconfirm, Select, Table, Alert } from 'antd' //
import { Link, useLocation } from 'react-router-dom' //
import Image from '../../common/Image/Image' //
import classes from '../Page.module.scss' //
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

const ListStudent = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [ isFetching, setFetching ] = useState(false);
    const fetchRef = useRef(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [gender, setGender] = useState(searchParams.get('gender') ? searchParams.get('gender') : 'all');
    const [major, setMajor] = useState(searchParams.get('major') ? searchParams.get('major') : 'all');
    const [academic_year, setAcademicYear] = useState(searchParams.get('academic_year') ? searchParams.get('academic_year') : 'all');
    const [status, setStatus] = useState(searchParams.get('status') ? searchParams.get('status') : 'all');

    const [errorMessage, _setErrorMessage] = useState("");
    const [successMessage, _setSuccessMessage] = useState("");

    const statusLabels = {
        0: 'Dropout',
        1: 'In Progress',
        2: 'Reserve',
        3: 'Completed',
      };

    const setErrorMessage = (value) => {
        _setErrorMessage(value);
        _setSuccessMessage("");
    }
    const setSuccessMessage = (value) => {
        _setErrorMessage("");
        _setSuccessMessage(value);
    }

    const fetchStudentData = async(currentPage, search, major, gender, academic_year, status) => {
        setFetching(true);
        const url = `/students?page=${currentPage}`
        + (gender !== 'all' ? `&gender=${gender}` : '')
        + (major !== 'all' ? `&major=${major}` : '')
        + (academic_year !== 'all' ? `&academic_year=${academic_year}` : '')
        + (status !== 'all' ? `&status=${status}` : '')
        + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { students, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromUserData(students));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchStudentData(currentPage, search, major, gender, academic_year, status)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, major, gender, academic_year, status]);

    const getTableDataFromUserData = (studentData) => {
        console.log(studentData);
        return studentData.map((student) => ({
            key: student.id,
                image: {
                    src: '/public/images/students/' + student.image,
                    alt: student.full_name
                },
                full_name: student.full_name,
                email: student.email || "N/A",
                major: {
                    text: student.major_name,
                    role: student.major_name
                },
                gender: student.gender,
                academic_year: student.academic_year,
                Dob: student.Dob,
                phone_number: student.phone_number,
                address: student.address,
                major_id: student.major_id,
                status: student.status,
                detail: {
                    id: student.id,
                    text: 'Details'
                },
                actions: {
                    id: student.id
                }
        }))
    }

    const handleGenderChange = (value) => {
        setGender(value);
        setCurrentPage(1);
    }

    const handleMajorChange = (value) => {
        setMajor(value);
        setCurrentPage(1);
    }

    const handleAcademicYearChange = (value) => {
        setAcademicYear(value);
        setCurrentPage(1);
    }

    const handleStatusChange = (value) => {
        setStatus(value);
        setCurrentPage(1);
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    }

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    }

    const debounceSetter = useMemo(() => {
        const handleSearch = (e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
        }
        return debounce(handleSearch, 700);
    })

    const deleteStudentHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/students/delete-student/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete student with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchStudentData(currentPage, search, major, gender, academic_year, status);
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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render : (text) => <Image src={text.src} alt={text.alt} width = {30} height = {30}/>
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text) => (text === 0 ? 'Male' : 'Female'),
        },
        {
            title: 'DOB',
            dataIndex: 'Dob',
            key: 'Dob',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone_number'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'A-Y',
            dataIndex: 'academic_year',
            key: 'academic_year',
            render: (text) => {
                let year = 2018 + text;
                return year.toString();
            },
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
                <Link to={`/student/details/${text.id}`} style={{ marginRight: '10px' }}>Details</Link>
                <Link to={`/student/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the student"
                    description="Are you sure to delete this this student?"
                    onConfirm={() => deleteStudentHandler(text.id)}
                    okText="Confirm"
                    cancelText="Cancel"
                >
                    <Button danger type='primary'>
                        <i className="fas fa-trash-alt">xx</i>
                    </Button>
                </Popconfirm>
            </div>
        },

    ]

    return (
        <div className={classes['list']}>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            <p className={classes['page__title']}>Student List</p>
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
                            <Link to='/student/add'>
                                <Button type='primary'>
                                    <i className="fas fa-plus"></i>
                                    <span>Add</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={classes['list__filters']}>
                    <Select
                            defaultValue={major}
                            style={{ width: 120 }}
                            onChange={handleMajorChange}
                            options={[
                                { value: 'all', label: 'Majors' },
                                { value: '1', label: 'Computer Science' },
                                { value: '2', label: 'Business Administration' },
                                { value: '3', label: 'Mechanical Engineering' },
                                { value: '4', label: 'Psychology' },
                                // { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    <Select
                        defaultValue="Gender"
                        style={{ width: 120 }}
                        onChange={handleGenderChange}
                        options={[
                            { value: 'all', label: 'Gender' },
                            { value: '0', label: 'Male' },
                            { value: '1', label: 'Female' },
                        ]}
                    />
                    <Select
                        defaultValue="Admission Year"
                        style={{ width: 140 }}
                        onChange={handleAcademicYearChange}
                        options={[
                            { value: 'all', label: 'Admission Year' },
                            { value: '1', label: '2019' },
                            { value: '2', label: '2020' },
                            { value: '3', label: '2021' },
                            { value: '4', label: '2022' },
                            { value: '5', label: '2023' },
                        ]}
                    />

                    <Select
                        defaultValue="Status"
                        style={{ width: 120 }}
                        onChange={handleStatusChange}
                        options={[
                            { value: 'all', label: 'Status' },
                            { value: '0', label: 'Dropout' },
                            { value: '1', label: 'In Progress' },
                            { value: '2', label: 'Reserve' },
                            { value: '3', label: 'Completed' },
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

export default ListStudent