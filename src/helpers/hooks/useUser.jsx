import { logDOM } from '@testing-library/react'
import { useState, useEffect } from 'react'

const useUser = () => {
    const [user, setUser] = useState(false)
    const [fetchingUser, setFetchingUser] = useState(true)
    useEffect(() => {
        (async() => {
            setFetchingUser(true)
            setTimeout(() => {
                setFetchingUser(false)
            }, 1000)
            const user = localStorage.getItem("loggedin");
            if(user){
                setUser(true)
            }
        })()
    }, [])
    return {user: user, isFetching: fetchingUser}
}

export default useUser