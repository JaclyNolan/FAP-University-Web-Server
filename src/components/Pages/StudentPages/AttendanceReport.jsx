import React from 'react'
import s from './Student.module.scss'
const AttendanceReport = () => {
  return (
    <div className={s['attendance']}>
        <table>
            <tr>
                <th>No</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Teacher</th>
                <th>Class</th>
                <th>Attendance Status</th>
                <th>Teacher's Comment</th>
            </tr>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>01/01/2024</td>
                    <td>3</td>
                    <td>Nguyen Van A</td>
                    <td>BHAF123</td>
                    <td>absent</td>
                    <td>Ok</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>01/01/2024</td>
                    <td>3</td>
                    <td>Nguyen Van A</td>
                    <td>BHAF123</td>
                    <td>absent</td>
                    <td>Ok</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default AttendanceReport