import React from 'react'
import classes from './User.module.scss'
import { Select, Input , Button, Space, Tag, Table} from 'antd'
import Link from 'antd/es/typography/Link'
import Image from '../../common/Image/Image'
const List = () => {
    const {Search} = Input

    const handleChange = () => {

    }
    const onSearch = () => {

    }
    const deleteUserHandler = (id) => {
        alert(`Deleted ${id}`)
    }
    const findTagColor = (role) => {
        let color = ''
        switch(role){
            case 'Admin':
                color = 'red'
                break
            case 'student':
                color = 'magenta'
                break
            case 'staff':
                color = 'purple'
                break
            default:
                color = 'cyan'
                break

        }
        return color
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
            render: (text) => <Image src={text.src} alt={text.alt} width = {30} height = {30}/>
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <Link href={`/user/details?id=${text.id}`}>{text.text}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text) => <Tag color={findTagColor(text.role)}>{text.text}</Tag>
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
            render: (text) => <Link href={`/user/details?id=${text.id}`}>{text.text}</Link>,
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text) => <div>
                <Link href={`/user/edit/id=${text.id}`}>
                    <Button type='primary' className={classes['list__table__actions-edit']}>
                        <i className="fas fa-edit"></i>
                    </Button>
                </Link>
                <Button type='primary' onClick={() => deleteUserHandler(text.id)}>
                    <i className="fas fa-trash-alt"></i>
                </Button>
            </div>
        },

    ]
    const tableData = [
        {
            key: '1',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van A',
                id: 1
            },
            email: 'anvbhaf190345@fpt.edu.vn',
            role: {
                text: 'Admin',
                role: 'Admin'
            },
            detail: {
                id: 1,
                text: 'Details'
            },
            actions: {
                id: 1
            }
        },
        {
            key: '2',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van B',
                id: 2
            },
            email: 'bnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'student',
                role: 'student'
            },
            detail: {
                id: 2,
                text: 'Details'
            },
            actions: {
                id: 2
            }
        },
        {
            key: '3',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van C',
                id: 3
            },
            email: 'cnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'teacher',
                role: 'teacher'
            },
            detail: {
                id: 3,
                text: 'Details'
            },
            actions: {
                id: 3
            }
        },
        {
            key: '4',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van D',
                id: 4
            },
            email: 'dnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'staff',
                role: 'staff'
            },
            detail: {
                id: 4,
                text: 'Details'
            },
            actions: {
                id:4
            }
        },
        {
            key: '5',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van D',
                id: 4
            },
            email: 'dnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'staff',
                role: 'staff'
            },
            detail: {
                id: 4,
                text: 'Details'
            },
            actions: {
                id:4
            }
        },
        {
            key: '6',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van D',
                id: 4
            },
            email: 'dnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'staff',
                role: 'staff'
            },
            detail: {
                id: 4,
                text: 'Details'
            },
            actions: {
                id:4
            }
        },
        {
            key: '7',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van D',
                id: 4
            },
            email: 'dnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'staff',
                role: 'staff'
            },
            detail: {
                id: 4,
                text: 'Details'
            },
            actions: {
                id:4
            }
        },
        {
            key: '8',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van D',
                id: 4
            },
            email: 'dnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'staff',
                role: 'staff'
            },
            detail: {
                id: 4,
                text: 'Details'
            },
            actions: {
                id:4
            }
        },
        {
            key: '9',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van D',
                id: 4
            },
            email: 'dnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'staff',
                role: 'staff'
            },
            detail: {
                id: 4,
                text: 'Details'
            },
            actions: {
                id:4
            }
        },
        {
            key: '10',
            image: {
                src: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                alt: 'user'
            },
            username: {
                text: 'Nguyen Van D',
                id: 4
            },
            email: 'dnvbhaf190345@fpt.edu.vn',
            role: {
                text: 'staff',
                role: 'staff'
            },
            detail: {
                id: 4,
                text: 'Details'
            },
            actions: {
                id:4
            }
        }
    ]
  return (
    <div className={classes['list']}>
        <p className={classes['list__title']}>User List</p>
        <div className={classes['list__main']}>
            <div className={classes['list__nav']}>
                <div className={classes['list__nav-left']}>
                <Select
                    defaultValue="All"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Admin', label: 'Admin' },
                        { value: 'Staff', label: 'Staff' },
                        { value: 'Student', label: 'Student' },
                        { value: 'Teacher', label: 'Teacher' },
                        // { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                    />
                </div>
                <div className={classes['list__nav-right']}>
                    <div className={classes['list__nav-right__search']}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={classes['list__nav-right__add']}>
                        <Link href='/user/add'>
                            <Button type='primary'>
                                <i className="fas fa-plus"></i>
                                <span>Add</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={classes['list__table']}>
                <Table columns={tableColumns} pagination={{ pageSize: 6 }} dataSource={tableData} />
            </div>
        </div>
    </div>
  )
}

export default List