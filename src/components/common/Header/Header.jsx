import React, { useContext, useEffect, useState } from 'react'
import classes from './Header.module.scss'
import { Breadcrumb, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import InvisibleButton from '../Button/InvisibleButton';
import { useMediaQuery } from '../../../helpers/hooks/useMediaQuery';
import AuthContext from '../../../helpers/Context/AuthContext';
import axiosClient from '../../../axios-client';
const Header = ({ onToggleSidebar }) => {
  const isMobileView = useMediaQuery("(max-width: 850px)")
  const [breadcrumbData, setBreadcrumbData] = useState([])
  const { user, setLoading } = useContext(AuthContext);
  const location = useLocation()
  console.log(location);

  useEffect(() => {
    const splitedUrl = window.location.href.split('/')
    const url = splitedUrl.splice(splitedUrl.length - 2, splitedUrl.length)
    let data = []
    let concatedUrl = ''
    for (let i in url) {
      concatedUrl += `/${url[i]}`
      data.push({
        title: <Link style={{
          textTransform: 'capitalize'
        }} to={concatedUrl}>{url[i]}</Link>,
      })
    }
    setBreadcrumbData(data)
  }, [location.pathname])

  const logoutHandler = async () => {
    setLoading(true);
    await axiosClient.post('/logout')
      .then((response) => {
        // Store the fetched user data in AuthContext
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload()
  }

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Nguyen Van A
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <InvisibleButton onclick={logoutHandler}>
          <span style={{
            paddingRight: '15px'
          }}>Logout</span> <i className="fas fa-sign-out-alt"></i>
        </InvisibleButton>
      ),
    }
  ];

  return (
    <header className={classes['header']}>
      <div className={classes['header-left']}>
        {isMobileView && <InvisibleButton onclick={onToggleSidebar} className={classes['header-left-btn']}>
          <i className="fas fa-bars"></i>
        </InvisibleButton>}
        <Breadcrumb
          items={breadcrumbData}
        />
      </div>
      <div className={classes['header-right']}>
        <div className={classes['header-avatar']}>
          <Link to="/profile">
            <Avatar size="medium" icon={<UserOutlined />} />
          </Link>
          <span>{user.user.username}</span>
        </div>
        <div className={classes['header-signout']}>
          <InvisibleButton onclick={logoutHandler}>
            <i className="fas fa-sign-out-alt"></i>
          </InvisibleButton>
        </div>
      </div>
      <div className={classes['header-user']}>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <i className="fas fa-user"></i>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header