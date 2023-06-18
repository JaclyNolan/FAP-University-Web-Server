import PrivateRoute from "../../components/HOC/PrivateRoute/PrivateRoute"
import {Home, Login, NotFound} from '../../components/Pages/index'
import {List, Add, Edit} from '../../components/Pages/User'
import {AddStudent, EditStudent, ListStudent, StudentDetails} from '../../components/Pages/Student'
//Possible Role: Admin, Staff, Instructor, Student (Case sensitive)
export const routers = [
    {
        path: '/',
        render: () => <PrivateRoute To={Home} roles = {[]} authRequire = {true} ElseTo='/login'/>
    },
    {
        path: '/login',
        render: () => <PrivateRoute To = {Login} roles = {[]} authRequire={false} ElseTo = '/'/>
    },
    {
        path: '/user/add',
        render: () => <PrivateRoute To = {Add} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/user/edit',
        render: () => <PrivateRoute To = {Edit} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/user/list',
        render: () => <PrivateRoute To = {List} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/list',
        render: () => <PrivateRoute To = {ListStudent} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/add',
        render: () => <PrivateRoute To = {AddStudent} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/edit',
        render: () => <PrivateRoute To = {EditStudent} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/details',
        render: () => <PrivateRoute To = {StudentDetails} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '*',
        render: () => <NotFound/>
    }
]