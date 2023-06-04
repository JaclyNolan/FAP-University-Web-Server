import React from 'react'
const Image = (props) => {
    const {alt, src, width, height} = props
  return (
    <img src={src} alt={alt} width={width} height={height}/>
  )
}

export default Image