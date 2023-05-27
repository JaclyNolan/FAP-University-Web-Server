import React from 'react'
import classes from './ScreenLoader.module.scss'
import logo from '../../assets/Images/btec-logo.png'
const ScreenLoader = () => {
  return (
    <div className={classes['loader-container']}>
        <div className={classes['loader-img']}>
            <img src={logo} alt="Btec FPT" />
        </div>
    </div>
  )
}

export default ScreenLoader