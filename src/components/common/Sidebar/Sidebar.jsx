import React from 'react'
import classes from './Sidebar.module.scss'
import {Collapse} from 'antd'
import logo from '../../assets/Images/btec-logo.png'
import { sidebar } from '../../assets/data/Sidebar'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../../helpers/hooks/useMediaQuery'
const Sidebar = ({sidebarStyle}) => {
  const {Panel} = Collapse
  const isMobileView = useMediaQuery("(max-width: 850px)");

  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className={classes['sidebar']} style={sidebarStyle}>
      <div className={classes['sidebar-logo']}>
        <img src={logo} alt="Btec FPT" />
      </div>
      <Collapse defaultActiveKey={['0']} onChange={onChange} className={classes['sidebar-collapse']}>
        {sidebar.map((sidebarItem, index) => {
          return  <Panel header={sidebarItem.title} key={index}>
            {sidebarItem.items.map((item, index) => {
              return <Link to={item.path} key={index}>{item.title} <i className="fas fa-chevron-right"></i></Link>
            })}
        </Panel>
        })}
      </Collapse>
    </div>
  )
}

export default Sidebar