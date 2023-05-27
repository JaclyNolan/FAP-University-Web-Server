import React from 'react'
import useUser from '../../../helpers/hooks/useUser'
import {Navigate} from 'react-router-dom'
const PrivateRoute = (props) => {
  const {To, ElseTo,authRequire} = props
  const user = useUser()
  if(!user.isFetching){
    if((!user.user && authRequire) || (user.user && !authRequire)){
      return <Navigate to={ElseTo}/>
    }
    return <To/>
  }
}

export default PrivateRoute