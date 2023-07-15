import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div><p>404 NotFound</p>
    <Link to='/'>
      <Button>Go to Home</Button>
    </Link>
    </div>
  )
}

export default NotFound