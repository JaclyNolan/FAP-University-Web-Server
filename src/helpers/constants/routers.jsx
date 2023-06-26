import PrivateRoute from "../../components/HOC/PrivateRoute/PrivateRoute"
import {Home, Login, NotFound} from '../../components/Pages/index'
import {List, Add, Edit} from '../../components/Pages/User'
import {AddStudent, EditStudent, ListStudent} from '../../components/Pages/Student'
import {AddTeacher, EditTeacher, TeacherList} from '../../components/Pages/Teacher'
import {AddStaff, EditStaff, StaffList} from '../../components/Pages/Staff'
import {AddCourse, CourseEdit, CourseList} from '../../components/Pages/Course'
import {ClassCourseAdd, ClassCourseEdit, ClassCourseList} from '../../components/Pages/ClassCourse'
import {ClassEnrollAdd, ClassEnrollEdit, ClassEnrollList} from '../../components/Pages/ClassEnroll'
import {ScheduleAdd, ScheduleEdit, ScheduleList} from '../../components/Pages/Schedule'
import {GradeAdd, GradeEdit, GradeList} from '../../components/Pages/Grade'
import {FeedbackDetails, FeedbackList} from '../../components/Pages/Feedback'
import { AttendanceEdit, AttendanceList } from '../../components/Pages/Attendance'
import {NewsAdd, NewsDetails, NewsEdit, NewsList} from '../../components/Pages/News'
import {EnrollmentEdit, EnrollmentList} from '../../components/Pages/Enrollment'



import {Details} from '../../components/Pages/Common'
import { AddClass, ClassEdit, ClassList } from "../../components/Pages/Class"
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
        path: '/user/details/:id',
        render: () => <PrivateRoute To = {Details} roles = {['admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
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
        path: '/student/edit/:id',
        render: () => <PrivateRoute To = {EditStudent} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/details/:id',
        render: () => <PrivateRoute To = {Details} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/teacher/details/:id',
        render: () => <PrivateRoute To = {Details} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/teacher/list',
        render: () => <PrivateRoute To = {TeacherList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/teacher/add',
        render: () => <PrivateRoute To = {AddTeacher} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/teacher/edit/:id',
        render: () => <PrivateRoute To = {EditTeacher} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/staff/add',
        render: () => <PrivateRoute To = {AddStaff} roles = {['admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/staff/list',
        render: () => <PrivateRoute To = {StaffList} roles = {['admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/staff/edit/:id',
        render: () => <PrivateRoute To = {EditStaff} roles = {['admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/staff/details/:id',
        render: () => <PrivateRoute To = {Details} roles = {['admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/course/list',
        render: () => <PrivateRoute To = {CourseList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/course/add',
        render: () => <PrivateRoute To = {AddCourse} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/course/edit/:id',
        render: () => <PrivateRoute To = {CourseEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/class/list',
        render: () => <PrivateRoute To = {ClassList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/class/edit/:id',
        render: () => <PrivateRoute To = {ClassEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/class/add',
        render: () => <PrivateRoute To = {AddClass} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classcourse/add',
        render: () => <PrivateRoute To = {ClassCourseAdd} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classcourse/list',
        render: () => <PrivateRoute To = {ClassCourseList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classcourse/edit/:id',
        render: () => <PrivateRoute To = {ClassCourseEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/enroll/add',
        render: () => <PrivateRoute To = {ClassEnrollAdd} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/enroll/list',
        render: () => <PrivateRoute To = {ClassEnrollList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/enroll/edit/:id',
        render: () => <PrivateRoute To = {ClassEnrollEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/schedule/list',
        render: () => <PrivateRoute To = {ScheduleList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/schedule/add',
        render: () => <PrivateRoute To = {ScheduleAdd} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/schedule/edit/:id',
        render: () => <PrivateRoute To = {ScheduleEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/grade/list',
        render: () => <PrivateRoute To = {GradeList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/grade/add',
        render: () => <PrivateRoute To = {GradeAdd} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/grade/edit/:id',
        render: () => <PrivateRoute To = {GradeEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/feedback/details/:id',
        render: () => <PrivateRoute To = {FeedbackDetails} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/feedback/list',
        render: () => <PrivateRoute To = {FeedbackList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/attendance/list',
        render: () => <PrivateRoute To = {AttendanceList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/attendance/edit/:id',
        render: () => <PrivateRoute To = {AttendanceEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/news/edit/:id',
        render: () => <PrivateRoute To = {NewsEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/news/add',
        render: () => <PrivateRoute To = {NewsAdd} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/news/list',
        render: () => <PrivateRoute To = {NewsList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/news/details/:id',
        render: () => <PrivateRoute To = {NewsDetails} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/enrollment/edit/:id',
        render: () => <PrivateRoute To = {EnrollmentEdit} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/enrollment/list',
        render: () => <PrivateRoute To = {EnrollmentList} roles = {['admin', 'staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '*',
        render: () => <NotFound/>
    }
]