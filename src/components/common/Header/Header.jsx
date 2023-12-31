import React, { useContext, useEffect, useState } from 'react'
import classes from './Header.module.scss'
import { Breadcrumb, Avatar, Dropdown, Spin } from 'antd';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import InvisibleButton from '../Button/InvisibleButton';
import { useMediaQuery } from '../../../helpers/hooks/useMediaQuery';
import AuthContext from '../../../helpers/Context/AuthContext';
import axiosClient from '../../../axios-client';
const Header = ({ onToggleSidebar }) => {
  const isMobileView = useMediaQuery("(max-width: 850px)")
  const [breadcrumbData, setBreadcrumbData] = useState([])
  const { user } = useContext(AuthContext);
  const [isFetching, setFetching] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();
  
  useEffect(() => {
    const splitedUrl = window.location.href.split('/')
    const url = splitedUrl.splice(3, splitedUrl.length)
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
    setFetching(true);
    await axiosClient.delete('/logout')
      .then((response) => {
        // Store the fetched user data in AuthContext
        user.setToken(null);
        user.setUser(null);
        console.log(response);
        setFetching(false);
        return navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        setFetching(false);
      });
      // window.location.href = '/';
    }

  const items = [
    {
      key: '1',
      label: (
        <Link to="/profile">
          <Avatar size="medium" src={user.user.picture} />
          <span>{user.user.username}</span>
        </Link>
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

  // if (isFetching) 

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
            <Avatar size="medium" src={user.user.picture} />
          </Link>
          <span>{user.user.username}</span>
        </div>
        <div className={classes['header-signout']}>
          {!isFetching ?
            <InvisibleButton onclick={logoutHandler}>
              <i className="fas fa-sign-out-alt"></i>
            </InvisibleButton> :
            <Spin />}
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