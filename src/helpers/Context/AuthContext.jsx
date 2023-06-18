import { createContext, useContext } from 'react'

const AuthContext = createContext({
    user: {
        user: {
            username: null,
            email: null,
            role: null
        },
        setUser: () => { },
        token: null,
        setToken: () => { },
        isFetching: true,
    }
})

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;