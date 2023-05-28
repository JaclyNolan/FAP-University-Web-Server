import React from 'react'
import classes from './Backdrop.module.scss'
const Backdrop = ({parentComponent, backdropClick}) => {
    let zIndexValue = 0
    switch(parentComponent){
        case 'sidebar':
            zIndexValue = 9
            break
        case 'header':
            zIndexValue = 8
            break
        default:
            zIndexValue = 0
            break
    }
  return (
    <div style={{
        zIndex: zIndexValue
    }} className={classes['backdrop']} onClick={backdropClick}></div>
  )
}

export default Backdrop