import React, { useContext, useEffect, useState } from 'react'
import classes from './Sidebar.module.scss'
import {Collapse} from 'antd'
import logo from '../../assets/Images/btec-logo.png'
import { adminSidebar, staffSidebar, studentSidebar } from '../../assets/data/Sidebar'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../../../helpers/Context/AuthContext'
const Sidebar = ({sidebarStyle}) => {
  const [currentUrl, setCurrentUrl] = useState([])
  const {Panel} = Collapse
  const [sidebarData, setSidebarData] = useState([])
  const authCtx = useContext(AuthContext)
  const location = useLocation()
  useEffect(() => {
    const splitedUrl = window.location.href.split('/')
    const url = splitedUrl.splice(splitedUrl.length - 2, splitedUrl.length)
    url.splice(0,0,'')
    setCurrentUrl(url)
  }, [location.pathname])
  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    switch(authCtx.user.user.role){
      case 'Admin':
        setSidebarData(adminSidebar)
        break
      case 'Staff':
        setSidebarData(staffSidebar)
        break
      case 'Student':
        setSidebarData(studentSidebar)
        break
      default:
        break
    }
  }, [authCtx.user.user])
  const activeStyle = {
    fontWeight: '600',
    fontSize: '16px',
    color: '#000'
  }
  console.log(currentUrl);
  return (
    <div className={classes['sidebar']} style={sidebarStyle}>
      <div className={classes['sidebar-logo']}>
        <img src={logo} alt="Btec FPT" />
      </div>
      <Collapse accordion defaultActiveKey={['0']} onChange={onChange} className={classes['sidebar-collapse']}>
        {sidebarData.map((sidebarItem, index) => {
          return  <Panel header={sidebarItem.title} key={index}>
            {sidebarItem?.items?.map((item, index) => {
              return <Link style={item.path ===currentUrl.join('/') ? activeStyle : {}} to={item.path} key={index}>{item.title} <i className="fas fa-chevron-right" style={item.path === currentUrl.join('/') ? activeStyle : {}}></i></Link>
            })}
        </Panel>
        })}
      </Collapse>
    </div>
  )
}

export default Sidebar