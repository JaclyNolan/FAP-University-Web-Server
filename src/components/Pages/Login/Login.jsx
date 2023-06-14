import React, { useState } from 'react'
import classes from './Login.module.scss'
import logo from '../../assets/Images/btec-logo.png'
import background from '../../assets/Images/login-background.jpg'
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import BACKEND_SERVER_URL from './../../../helpers/constants/config';
import ScreenLoader from '../../common/ScreenLoader/ScreenLoader';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onLoginSuccess = (credentialResponse) => {
        const data = jwtDecode(credentialResponse.credential);
        const idToken = credentialResponse.credential;
        // console.log(idToken);
        const url = BACKEND_SERVER_URL.concat('/api/google-login');
        setLoading(true);
        // console.log(idToken);
        axios.post(url, { idToken })
            .then((response) => {
                console.log(response);
                localStorage.setItem("loggedin", "true")
                // window.location.replace("/")
            })
            .catch((error) => {
                setLoading(false);
                if (error.status != 500)
                    setErrorMessage(error.response.data.message);
                else 
                    setErrorMessage('Internal Error');
            });


    }
    const onLoginFailed = () => {
        setErrorMessage("LoginFailed");
    }
    return loading ? <ScreenLoader /> : (
        <div className={classes['login']}>
            <div className={classes['login-left']}>
                <div className={classes['login-logo']}>
                    <img src={logo} alt="Btec" />
                </div>
                <h2 className={classes['login-title']}>Login To Your Account</h2>
                <div className={classes['login-btn']}>
                    <GoogleLogin
                        clientId="971766812836-re275ffnj3jnf9gcefunt2tavn29on7q.apps.googleusercontent.com"
                        onSuccess={(credentialResponse) => onLoginSuccess(credentialResponse)}
                        onError={onLoginFailed}
                    />
                </div>
                {/* add CSS Error message here */}
                <div className={classes['login-error']}>
                    {errorMessage}
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