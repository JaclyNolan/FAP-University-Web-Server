import { useState, useEffect } from 'react'
import axiosClient from '../../axios-client';

//useUser is like a context provider for the user nest in AuthContext
const useUser = () => {
    const [user, _setUser] = useState({
        username: null,
        email: null,
        role: null
    });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [fetchingUser, setFetchingUser] = useState(true)

    const setUser = (user) => {
        if (user === null) {
            _setUser({
                username: null,
                email: null,
                role: null
            })
        } else {
            _setUser(user);
        }
    }

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    useEffect(() => {
        (async () => {
            setFetchingUser(true)
            //Add fetching user using ACCESS_TOKEN here
            const token = localStorage.getItem('ACCESS_TOKEN') === null ? false : localStorage.getItem('ACCESS_TOKEN');
            if (token) {
                console.log('token: ' + token);
                // Fetch user data using access token
                await axiosClient.get('/check-token')
                .then((response) => {
                    // Store the fetched user data in AuthContext
                    console.log(response);
                    setUser(response.data.user);
                    setFetchingUser(false)
                })
                .catch((error) => {
                    console.log(error);
                    setUser(null);
                    setToken(null);
                    setFetchingUser(false)
                })  
            } else {
                setFetchingUser(false)
            }
        })()
    }, [])

    const data = { user, setUser, token, setToken, isFetching: fetchingUser }

    return data;
}

export default useUser