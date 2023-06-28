import { useState, useEffect } from 'react'

const useUser = () => {
    const [user, setUser] = useState(null)
    const [fetchingUser, setFetchingUser] = useState(true)
    useEffect(() => {
        (async() => {
            setFetchingUser(true)
            setTimeout(() => {
                setFetchingUser(false)
            }, 1000)
            const user = localStorage.getItem("loggedin");
            if(user){
                setUser({
                    userName: '',
                    role: 'teacher'
                })
            }
        })()
    }, [])
    return {user: user, isFetching: fetchingUser}
}

export default useUser