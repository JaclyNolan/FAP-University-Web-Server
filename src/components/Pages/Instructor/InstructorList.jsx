import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Button, Popconfirm, Select, Table, Alert } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import ContentContext from '../../../helpers/Context/ContentContext';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import BACKEND_SERVER_URL from '../../../helpers/constants/config';
import debounce from 'lodash/debounce';

const InstructorList = () => {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [gender, setGender] = useState(searchParams.get('gender') ? searchParams.get('gender') : 'all');
    const [major, setMajor] = useState(searchParams.get('major') ? searchParams.get('major') : 'all');
    const [position, setPosition] = useState(searchParams.get('position') ? searchParams.get('position') : 'all');

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

    const debounceSetter = useMemo(() => {
        const handleSearch = (e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
        }
        return debounce(handleSearch, 700);
    })

    const positionLabels = {
        0: 'Lecturers',
        1: 'Associate Professor',
        2: 'Lecturer Dr',
        3: 'Master of Instructors',
        4: 'Professor',
        5: 'Visiting Lecturer',
        6: 'Research Lecturer',
        7: 'Practical Instructor',
        8: 'Tutors',
    };

    const fetchInsData = async (currentPage, search, gender, major, position) => {
        setFetching(true);
        const url = `/instructors?page=${currentPage}`
            + (gender !== 'all' ? `&gender=${gender}` : '')
            + (major !== 'all' ? `&major=${major}` : '')
            + (position !== 'all' ? `&position=${position}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { instructors, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromInsData(instructors));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchInsData(currentPage, search, gender, major, position)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, gender, major, position]);

    const getTableDataFromInsData = (insData) => {
        console.log(insData);
        return insData.map((instructor) => ({
            key: instructor.id,
            image: {
                src: instructor.image,
                alt: instructor.full_name
            },
            full_name: instructor.full_name,
            email: instructor.email || "N/A",
            major: {
                text: instructor.major_name,
                major: instructor.major_name
            },
            gender: instructor.gender,
            Dob: instructor.Dob,
            phone_number: instructor.phone_number,
            address: instructor.address,
            position: instructor.position,
            detail: {
                id: instructor.id,
                text: 'Details'
            },
            actions: {
                id: instructor.id
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

    const handlePositonChange = (value) => {
        setPosition(value);
        setCurrentPage(1);
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    }

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    }

    const deleteInsHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/instructors/delete-instructor/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete instructor with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchInsData(currentPage, search, gender, major, position);
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
            render : (text) => <Image src={`${BACKEND_SERVER_URL}/api/files/get-file/${text.src}`} alt={text.alt} width = {40} height = {40}/>
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
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            render: (position) => positionLabels[position] || '', // Sử dụng đối tượng
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link to={`/instructor/details/${text.id}`} style={{ marginRight: '10px' }}>Details</Link>
                <Link to={`/instructor/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the instructor"
                    description="Are you sure to delete this this instructor?"
                    onConfirm={() => deleteInsHandler(text.id)}
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
            <p className={classes['page__title']}>Instructor List</p>
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
                            <Link to='/instructor/add'>
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
                        defaultValue="Major"
                        style={{ width: 120 }}
                        onChange={handleMajorChange}
                        options={[
                            { value: 'all', label: 'Majors' },
                            { value: '1', label: 'Business Administration' },
                            { value: '2', label: 'Computer Science' },
                            { value: '3', label: 'Mechanical Engineering' },
                            { value: '4', label: 'Psychology' },
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
                        defaultValue="Position"
                        style={{ width: 120 }}
                        onChange={handlePositonChange}
                        options={[
                            { value: 'all', label: 'Position' },
                            { value: '0', label: 'Lecturers' },
                            { value: '1', label: 'Associate Professor' },
                            { value: '2', label: 'Lecturer Dr' },
                            { value: '3', label: 'Master of Instructors' },
                            { value: '4', label: 'Professor' },
                            { value: '5', label: 'Visiting Lecturer' },
                            { value: '6', label: 'Research Lecturer' },
                            { value: '7', label: 'Practical Instructor' },
                            { value: '8', label: 'Tutors' },
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

export default InstructorList