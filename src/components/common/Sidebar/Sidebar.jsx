import React, { useContext, useEffect, useState } from 'react'
import classes from './Sidebar.module.scss'
import {Collapse} from 'antd'
import logo from '../../assets/Images/btec-logo.png'
import { adminSidebar, staffSidebar, studentSidebar } from '../../assets/data/Sidebar'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../../helpers/hooks/useMediaQuery'
import AuthContext from '../../../helpers/Context/AuthContext'
const Sidebar = ({sidebarStyle}) => {
  const {Panel} = Collapse
  const [sidebarData, setSidebarData] = useState([])
  const authCtx = useContext(AuthContext)
  const isMobileView = useMediaQuery("(max-width: 850px)");

  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    switch(authCtx.user.user.role){
      case 'admin':
        setSidebarData(adminSidebar)
        break
      case 'staff':
        setSidebarData(staffSidebar)
        break
      default:
        setSidebarData(studentSidebar)
        break
    }
  }, [authCtx.user.user])
  console.log(sidebarData);
  return (
    <div className={classes['sidebar']} style={sidebarStyle}>
      <div className={classes['sidebar-logo']}>
        <img src={logo} alt="Btec FPT" />
      </div>
      <Collapse defaultActiveKey={['0']} onChange={onChange} className={classes['sidebar-collapse']}>
        {sidebarData.map((sidebarItem, index) => {
          return  <Panel header={sidebarItem.title} key={index}>
            {sidebarItem?.items?.map((item, index) => {
              return <Link to={item.path} key={index}>{item.title} <i className="fas fa-chevron-right"></i></Link>
            })}
        </Panel>
        })}
      </Collapse>
    </div>
  )
}

export default Sidebar