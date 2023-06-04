import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import AuthContext from '../../../helpers/Context/AuthContext'
const PrivateRoute = (props) => {
  const {To, ElseTo,authRequire, roles} = props
  const userCtx = useContext(AuthContext)
  if(!userCtx.user.isFetching){
    if((!userCtx.user.user && authRequire) || (userCtx.user.user && !authRequire) || (roles.length > 0 && !roles.includes(userCtx.user.user.role))){
      return <Navigate to={ElseTo}/>
    }
    return <To/>
  }
}

export default PrivateRoute