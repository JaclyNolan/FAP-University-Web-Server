import PrivateRoute from "../../components/HOC/PrivateRoute/PrivateRoute"
import {Home, Login, NotFound} from '../../components/Pages/index'
import {List, Add, Edit} from '../../components/Pages/User'
import {AddStudent, DetailsStudent, EditStudent, ListStudent, WeeklyTimeTable, Courses, CoureRegister, Classes, MarkReport, AttendanceReport, News, Feedback} from '../../components/Pages/Student'
import { AddInstructor, DetailsInstructor, EditInstructor, InstructorList} from '../../components/Pages/Instructor'
import {AddStaff, DetailsStaff, EditStaff, StaffList} from '../../components/Pages/Staff'
import {AddCourse, CourseEdit, CourseList} from '../../components/Pages/Course'
import {ClassCourseAdd, ClassCourseEdit, ClassCourseList} from '../../components/Pages/ClassCourse'
import {ClassEnrollAdd, ClassEnrollEdit, ClassEnrollList} from '../../components/Pages/ClassEnroll'
import {ScheduleAdd, ScheduleEdit, ScheduleList} from '../../components/Pages/Schedule'
import {GradeAdd, GradeEdit, GradeList} from '../../components/Pages/Grade'
import {FeedbackDetails, FeedbackList} from '../../components/Pages/Feedback'
import { AttendanceEdit, AttendanceList } from '../../components/Pages/Attendance'
import {NewsAdd, NewsDetails, NewsEdit, NewsList} from '../../components/Pages/News'
import {EnrollmentEdit, EnrollmentList} from '../../components/Pages/Enrollment'
import {List as LessonList, Attendance, InstructorClassCourseList, InstructorClassCourseDetail} from '../../components/Pages/Lesson'
import {TeacherFeedback, TeacherFeedbackDetails} from '../../components/Pages/TeacherFeedback'
import { AddClass, ClassEdit, ClassList } from "../../components/Pages/Class"
import { Navigate } from "react-router-dom"
export const routers = [
    //ADMIN----------------------------------------------------------------------------------------------------------------
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
        path: '/user/edit/:id',
        render: () => <PrivateRoute To = {Edit} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/user/list',
        render: () => <PrivateRoute To = {List} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/user',
        render: () => <Navigate to='/user/list'/>
    },
    //STAFF&ADMIN----------------------------------------------------------------------------------------------------------------
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
        path: '/student/edit/',
        render: () => <Navigate to='/student/list'/>
    },
    {
        path: '/student/details/:id',
        render: () => <PrivateRoute To = {DetailsStudent} role_id = '4' roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/details/',
        render: () => <Navigate to='/student/list'/>
    },
    {
        path: '/instructor/details/:id',
        render: () => <PrivateRoute To = {DetailsInstructor} role_id = '3' roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/instructor/details/',
        render: () => <Navigate to='/instructor/list'/>
    },
    {
        path: '/instructor/list',
        render: () => <PrivateRoute To = {InstructorList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/instructor/add',
        render: () => <PrivateRoute To = {AddInstructor} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/instructor/edit/:id',
        render: () => <PrivateRoute To = {EditInstructor} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/instructor/edit/',
        render: () => <Navigate to='/instructor/list'/>
    },
    {
        path: '/staff/add',
        render: () => <PrivateRoute To = {AddStaff} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/staff/list',
        render: () => <PrivateRoute To = {StaffList} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/staff/edit/:id',
        render: () => <PrivateRoute To = {EditStaff} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/staff/edit/',
        render: () => <Navigate to='/staff/list'/>
    },
    {
        path: '/staff/details/:id',
        render: () => <PrivateRoute To = {DetailsStaff} roles = {['Admin']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/staff/details/',
        render: () => <Navigate to='/staff/list'/>
    },
    {
        path: '/course/list',
        render: () => <PrivateRoute To = {CourseList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/course/add',
        render: () => <PrivateRoute To = {AddCourse} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/course/edit/:id',
        render: () => <PrivateRoute To = {CourseEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/class/list',
        render: () => <PrivateRoute To = {ClassList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/class/edit/:id',
        render: () => <PrivateRoute To = {ClassEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/class/add',
        render: () => <PrivateRoute To = {AddClass} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classcourse/add',
        render: () => <PrivateRoute To = {ClassCourseAdd} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classcourse/list',
        render: () => <PrivateRoute To = {ClassCourseList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classcourse/edit/:id',
        render: () => <PrivateRoute To = {ClassCourseEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classenroll/add',
        render: () => <PrivateRoute To = {ClassEnrollAdd} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classenroll/list',
        render: () => <PrivateRoute To = {ClassEnrollList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/classenroll/edit/:id',
        render: () => <PrivateRoute To = {ClassEnrollEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/schedule/list',
        render: () => <PrivateRoute To = {ScheduleList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/schedule/add',
        render: () => <PrivateRoute To = {ScheduleAdd} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/schedule/edit/:id',
        render: () => <PrivateRoute To = {ScheduleEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/grade/list',
        render: () => <PrivateRoute To = {GradeList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/grade/add',
        render: () => <PrivateRoute To = {GradeAdd} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/grade/edit/:id',
        render: () => <PrivateRoute To = {GradeEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/feedback/details/:id',
        render: () => <PrivateRoute To = {FeedbackDetails} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/feedback/list',
        render: () => <PrivateRoute To = {FeedbackList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/attendance/list',
        render: () => <PrivateRoute To = {AttendanceList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/attendance/edit/:id',
        render: () => <PrivateRoute To = {AttendanceEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/news/edit/:id',
        render: () => <PrivateRoute To = {NewsEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/news/add',
        render: () => <PrivateRoute To = {NewsAdd} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/news/list',
        render: () => <PrivateRoute To = {NewsList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/news/details/:id',
        render: () => <PrivateRoute To = {NewsDetails} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/enrollment/edit/:id',
        render: () => <PrivateRoute To = {EnrollmentEdit} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/enrollment/list',
        render: () => <PrivateRoute To = {EnrollmentList} roles = {['Admin', 'Staff']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    //INSTRUCTOR----------------------------------------------------------------------------------------------------------------
    {
        path: '/schedule/weekly',
        render: () => <PrivateRoute To = {LessonList} roles = {['Instructor']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/class',
        render: () => <PrivateRoute To = {InstructorClassCourseList} roles = {['Instructor']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/class/:id',
        render: () => <PrivateRoute To = {InstructorClassCourseDetail} roles = {['Instructor']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/schedule/attendance/:classId',
        render: () => <PrivateRoute To = {Attendance} roles = {['Instructor']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/Instructorfeedback/list',
        render: () => <PrivateRoute To = {TeacherFeedback} roles = {['Instructor']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/Instructorfeedback/details/:id',
        render: () => <PrivateRoute To = {TeacherFeedbackDetails} roles = {['Instructor']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    //STUDENT----------------------------------------------------------------------------------------------------------------
    {
        path: '/student/weeklytable/:id',
        render: () => <PrivateRoute To = {WeeklyTimeTable} roles = {['Student']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/courses/:id',
        render: () => <PrivateRoute To = {Courses} roles = {['Student']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/courseregister/:id',
        render: () => <PrivateRoute To = {CoureRegister} roles = {['Student']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/classes',
        render: () => <PrivateRoute To = {Classes} roles = {['Student']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/markreport',
        render: () => <PrivateRoute To = {MarkReport} roles = {['Student']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/attendancereport',
        render: () => <PrivateRoute To = {AttendanceReport} roles = {['Student']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/news/:id',
        render: () => <PrivateRoute To = {News} roles = {['Student']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    {
        path: '/student/feedback',
        render: () => <PrivateRoute To = {Feedback} roles = {['Student']} authRequire = {true} ElseTo='/'></PrivateRoute>
    },
    //
    {
        path: '*',
        render: () => <NotFound/>
    }
]