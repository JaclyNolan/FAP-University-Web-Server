import React from 'react'
import classes from './Header.module.scss'
import { Breadcrumb, Avatar, Space, Dropdown} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import InvisibleButton from '../Button/InvisibleButton';
import { useMediaQuery } from '../../../helpers/hooks/useMediaQuery';
const Header = ({onToggleSidebar}) => {
  const isMobileView = useMediaQuery("(max-width: 850px)")
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
        <InvisibleButton>
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
          items={[
            {
              title: 'Home',
            },
            {
              title: <a href="">Application Center</a>,
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </div>
      <div className={classes['header-right']}>
          <div className={classes['header-avatar']}>
            <Link to="/profile">
              <Avatar size="medium" icon={<UserOutlined />} />
            </Link>
            <span>Nguyen Van A</span>
          </div>
          <div className={classes['header-signout']}>
            <button>
              <i className="fas fa-sign-out-alt"></i>
            </button>
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