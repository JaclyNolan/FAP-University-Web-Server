import React from 'react'
import {Navigate} from 'react-router-dom'
import { useAuthContext } from '../../../helpers/Context/AuthContext'
const PrivateRoute = (props) => {
  const {To, ElseTo, authRequire, roles} = props
  const userCtx = useAuthContext();

  if(!userCtx.user.isFetching){
    if((userCtx.user.user === null && authRequire) || (userCtx.user.user !== null && !authRequire) || (roles.length > 0 && !roles.includes(userCtx.user.user.role))){
      return <Navigate to={ElseTo}/>
    }
    return <To/>
  }
}

export default PrivateRoute