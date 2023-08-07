import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Select, Input, Button, Popconfirm, Table, Alert } from 'antd';
import classes from '../Page.module.scss'
import axiosClient from '../../../axios-client';
import { Link, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
const NewList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [ isFetching, setFetching ] = useState(false);
    const fetchRef = useRef(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : '');
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
        0: 'Active',
        1: 'Expired',
      };

    const getTableDataFromNewData = (news) => {
        console.log(news);
        return news.map((news) => ({
            key: news.id,
            title: news.title,
            author: news.author,
            post_date: news.post_date,
            status: news.status,
            actions: {
                id: news.id
            }
        }))
    }

    const fetchNewData = async(currentPage, search, status) => {
        setFetching(true);
        const url = `/newContents?page=${currentPage}` 
        + (status !== 'all' ? `&status=${status}` : '') 
        + (search !== "" ? `&keyword=${search}` : ``);
        
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        await axiosClient.get(url)
            .then((response) => {
                if (fetchId !== fetchRef.current) return
                const { newsContents, total_pages } = response.data;
                setTotalPages(total_pages);
                setTableData(getTableDataFromNewData(newsContents));
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchNewData(currentPage, search, status)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, status]);

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
    
    const deleteNewHandler = (id) => {
        (async () => {
            setFetching(true);
            await axiosClient.put(`/newContents/delete-newContent/${id}`)
                .then((response) => {
                    setFetching(false);
                    setSuccessMessage('Successfully delete news with id ' + id)
                })
                .catch((error) => {
                    setFetching(false);
                    setErrorMessage(error.message);
                })
            if (!errorMessage) {
                if (currentPage === 1) {
                    fetchNewData(currentPage, search, status);
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Post Date',
            dataIndex: 'post_date',
            key: 'post_date',
           // render: (text) => <Tag color={findTagColor(text.role)}>{text.text}</Tag>
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
                <Link to={`/news/edit/${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Popconfirm
                    title="Delete the news"
                    description="Are you sure to delete this news?"
                    onConfirm={() => deleteNewHandler(text.id)}
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
        <p className={classes['page__title']}>News List</p>
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
                        <Link to='/newContents/add'>
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
                            defaultValue={status}
                            style={{ width: 120 }}
                            onChange={handleStatusChange}
                            options={[
                                { value: 'all', label: 'Status' },
                                { value: '0', label: 'Active' },
                                { value: '1', label: 'Expired ' },
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

export default NewList