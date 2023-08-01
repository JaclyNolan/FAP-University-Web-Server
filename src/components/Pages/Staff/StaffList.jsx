import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Button, Popconfirm, Select, Table, Alert } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import Image from '../../common/Image/Image'
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import BACKEND_SERVER_URL from '../../../helpers/constants/config';

const StaffList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const fetchRef = useRef(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
    const [gender, setGender] = useState(searchParams.get('gender') ? searchParams.get('gender') : 'all');
    const [department, setDepartment] = useState(searchParams.get('department') ? searchParams.get('department') : 'all');
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

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    }

    const handleDepartmentChange = (value) => {
        setDepartment(value);
        setCurrentPage(1);
    }

    const handleGenderChange = (value) => {
        setGender(value);
        setCurrentPage(1);
    }

    const handlePositionChange = (value) => {
        setPosition(value);
        setCurrentPage(1);
    }

    const positionLabels = {
        0: 'Teacher',
        1: 'Trainer',
        2: 'HR',
        3: 'Marketing',
      };

    const deleteStaffHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/staffs/delete-staff/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete staff with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchStaffData(currentPage, search, gender, department, position);
                } else {
                    setCurrentPage(1);
                }
            }
        })()
    }

    const getTableDataFromStaffData = (staffData) => {
        console.log(staffData);
        return staffData.map((staff) => ({
            key: staff.id,
            image: {
                src: staff.image,
                alt: staff.full_name
            },
            full_name: staff.full_name,
            email: staff.email || "N/A",
            gender: staff.gender,
            Dob: staff.Dob,
            phone_number: staff.phone_number,
            address: staff.address,
            position: staff.position,
            department: staff.department,
            detail: {
                id: staff.id,
                text: 'Details'
            },
            actions: {
                id: staff.id
            }
        }))
    }

    const fetchStaffData = async (currentPage, search, gender, department, position) => {
        setFetching(true);
        const url = `/staffs?page=${currentPage}`
            + (gender !== 'all' ? `&gender=${gender}` : '')
            + (department !== 'all' ? `&department=${department}` : '')
            + (position !== 'all' ? `&position=${position}` : '')
            + (search !== "" ? `&keyword=${search}` : ``);
        console.log(url);
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { staffs, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromStaffData(staffs));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchStaffData(currentPage, search, gender, department, position);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, gender, department, position]);

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
            title: 'Department',
            dataIndex: 'department',
            key: 'department'
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
                <Link to={`/staff/details/${text.id}`} style={{ marginRight: '10px' }}>Details</Link>
                <Link to={`/staff/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete staff"
                    description="Are you sure to delete this staff?"
                    onConfirm={() => deleteStaffHandler(text.id)}
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
            <p className={classes['page__title']}>Staff List Test</p>
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
                        <div className={classes['list__nav-right__add']}>
                            <Link to='/staff/add'>
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
                        defaultValue={department}
                        style={{ width: 140 }}
                        onChange={handleDepartmentChange}
                        options={[
                            { value: 'all', label: 'Departments' },
                            { value: 'Student Services', label: 'Student Services' },
                            { value: 'Finance', label: 'Finance' },
                            { value: 'Admissions', label: 'Admissions' },
                            { value: 'Administration', label: 'Administration' },
                            { value: 'Academic Affairs', label: 'Academic Affairs' },
                            // { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                    <Select
                        defaultValue={gender}
                        style={{ width: 120 }}
                        onChange={handleGenderChange}
                        options={[
                            { value: 'all', label: 'Gender' },
                            { value: '0', label: 'Male' },
                            { value: '1', label: 'Female' },
                        ]}
                    />
                    <Select
                        defaultValue={position}
                        style={{ width: 120 }}
                        onChange={handlePositionChange}
                        options={[
                            { value: 'all', label: 'Position' },
                            { value: '0', label: 'Teacher' },
                            { value: '1', label: 'Trainer' },
                            { value: '2', label: 'HR' },
                            { value: '3', label: 'Marketing' },
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

export default StaffList