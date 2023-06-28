import { useState, useEffect } from 'react'
import axiosClient from '../../axios-client';

//useUser is like a context provider for the user nest in AuthContext
const useUser = () => {
    const [user, _setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [fetchingUser, setFetchingUser] = useState(true)

    console.log("Rendering useUser.jsx")

    const setUser = (user) => {
        if (user === null) {
            _setUser(null)
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
            console.log('token: ' + token);
            console.log('user:' + user);
            //Add fetching user using ACCESS_TOKEN here
            if (token && user === null) {
                console.log('Fetching!');
                // Fetch user data using access token
                await axiosClient.get('/check-token')
                    .then((response) => {
                        // Store the fetched user data in AuthContext
                        console.log(`Fetched! ${response}`);
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
    }, [token, user])

    const data = { user, setUser, token, setToken, isFetching: fetchingUser }

    return data;
}

export default useUser