import {createContext} from 'react'

const AuthContext = createContext({
    user: {
        user: null,
        isFetching: true
    }
})


export default AuthContext