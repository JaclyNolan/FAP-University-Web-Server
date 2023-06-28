import React, { useContext, useState } from 'react'
import classes from './Login.module.scss'
import logo from '../../assets/Images/btec-logo.png'
import background from '../../assets/Images/login-background.jpg'
import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode';
import AuthContext from '../../../helpers/Context/AuthContext';
import axiosClient from '../../../axios-client';
import { Alert } from 'antd';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { user } = useContext(AuthContext);
    const { setUser, setToken } = user;

    console.log("Rendering Login.jsx");

    const onLoginSuccess = async (credentialResponse) => {
        // const data = jwtDecode(credentialResponse.credential);
        const idToken = credentialResponse.credential;

        // setLoading(true);
        await axiosClient.post('/google-login', { idToken: idToken })
            .then((response) => {
                console.log(response);
                setUser(response.data.user);
                setToken(response.data.token);
                // window.location.replace("/")
            })
            .catch((error) => {
                console.log(error);
                setUser(null);
                setToken(null);
                try {
                    if (error.response.status <= 500)
                        setErrorMessage(error.response.data.message);
                    else
                        setErrorMessage('Internal Error');
                } catch (e) {
                    setErrorMessage(e.message);
                }

            });
        // setLoading(false);

    }
    const onLoginFailed = () => {
        setErrorMessage("Login Failed");
    }
    return <>
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
                {errorMessage !== "" ? <>
                    <br />
                    <Alert message={errorMessage} type='error' showIcon />
                </> : <></>}
            </div>
            <div className={classes['login-right']}>
                <div className={classes['login-img']}>
                    <img src={background} alt="Btec FPT" />
                </div>
            </div>
        </div>
    </>
}

export default Login