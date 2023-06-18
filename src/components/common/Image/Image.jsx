import React from 'react'
import classes from './Image.module.scss'
const Image = (props) => {
    const {alt, src, width, height, className} = props
  return (
    <img src={src} alt={alt} width={width} height={height} className={className}/>
  )
}

export default Image