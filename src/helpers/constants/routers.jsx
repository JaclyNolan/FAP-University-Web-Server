import PrivateRoute from "../../components/HOC/PrivateRoute/PrivateRoute"
import {Home, Login, NotFound} from '../../components/Pages/index'
export const routers = [
    {
        path: '/',
        render: () => <PrivateRoute To={Home} authRequire = {true} ElseTo='/login'/>
    },
    {
        path: '/login',
        render: () => <PrivateRoute To = {Login} authRequire={false} ElseTo = '/'/>
    },
    {
        path: '*',
        render: () => <NotFound/>
    }
]