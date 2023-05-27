import React from 'react'
import classes from './Login.module.scss'
import logo from '../../assets/Images/btec-logo.png'
import background from '../../assets/Images/login-background.jpg'
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
const Login = () => {
    const onLoginSuccess = (credentialResponse) => {
        const data = jwtDecode(credentialResponse.credential)
        localStorage.setItem("loggedin", "true")
        window.location.replace("/")
    }
    const onLoginFailed = () => {
        console.log('Login failed');
    }
  return (
    <div className= {classes['login']}>
        <div className={classes['login-left']}>
            <div className={classes['login-logo']}>
                <img src={logo} alt="Btec" />
            </div>
            <h2 className={classes['login-title']}>Login To Your Account</h2>
            <div className={classes['login-btn']}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => onLoginSuccess(credentialResponse)}
                    onError={onLoginFailed}
                />
            </div>
        </div>
        <div className={classes['login-right']}>
            <div className={classes['login-img']}>
                <img src={background} alt="Btec FPT" />
            </div>
        </div>
    </div>
  )
}

export default Login