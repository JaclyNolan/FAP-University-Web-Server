import React from 'react'
import classes from './Button.module.scss'
const InvisibleButton = ({children, className, onclick}) => {
  return (
    <button onClick={onclick} className={`${classes['button-invisible']} ${className && className}`}>
        {children}
    </button>
  )
}

export default InvisibleButton