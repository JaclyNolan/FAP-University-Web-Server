import PrivateRoute from "../../components/HOC/PrivateRoute/PrivateRoute"
import {Home, Login, NotFound} from '../../components/Pages/index'
import {List, Add, Edit} from '../../components/Pages/User'
import {AddStudent, EditStudent, ListStudent, StudentDetails} from '../../components/Pages/Student'
import {AddTeacher, EditTeacher, TeacherDetails, TeacherList} from '../../components/Pages/Teacher'
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
        render: () => <PrivateRoute To = {Add} roles = {['admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/user/edit',
        render: () => <PrivateRoute To = {Edit} roles = {['admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/user/list',
        render: () => <PrivateRoute To = {List} roles = {['admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/list',
        render: () => <PrivateRoute To = {ListStudent} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/add',
        render: () => <PrivateRoute To = {AddStudent} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/edit/:id',
        render: () => <PrivateRoute To = {EditStudent} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/details/:id',
        render: () => <PrivateRoute To = {StudentDetails} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/teacher/details/:id',
        render: () => <PrivateRoute To = {TeacherDetails} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/teacher/list',
        render: () => <PrivateRoute To = {TeacherList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/teacher/add',
        render: () => <PrivateRoute To = {AddTeacher} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/teacher/edit/:id',
        render: () => <PrivateRoute To = {EditTeacher} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '*',
        render: () => <NotFound/>
    }
]