import React from 'react'
import {Select} from 'antd'
import classes from '../Page.module.scss'

import s from '../Lesson/InstructorWeeklySchedule.module.scss'
import { Link } from 'react-router-dom'
const WeeklyTimeTable = () => {
    const handleChange = () => {

    }
  return (
    <div>
        <p className={classes['page__title']}>Activities for <b>Nguyen Van A</b></p>
        <div className={classes['list__filters']}>
                <Select
                    defaultValue="Year"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: '2020', label: '2020' },
                        { value: '2021', label: '2021' },
                        { value: '2022', label: '2022' },
                        { value: '2023', label: '2023' },
                    ]}
                />
                <Select
                    defaultValue="Week"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                    ]}
                />
        </div>
        <div className={s['list']}>
            <div className={s['list__slots']}>
                <div className={s['list__slots-item']}></div>
                <div className={s['list__slots-item']}>Slot 1</div>
                <div className={s['list__slots-item']}>Slot 2</div>
                <div className={s['list__slots-item']}>Slot 3</div>
                <div className={s['list__slots-item']}>Slot 4</div>
                <div className={s['list__slots-item']}>Slot 5</div>
                <div className={s['list__slots-item']}>Slot 6</div>
            </div>
            <div className={s['list__table']}>
                <div className={s['list__table-header']}>Day Mon &rarr; Sun</div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <Link to={'/lesson/class/1'}>Class</Link>
                                </div>
                                <p>Programing</p>
                                <p>at <b>B01</b></p>
                                <div>
                                    <Link to='/lesson/attendance/1'>Take attendance</Link>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <div>
                                    <Link to={'/lesson/class/1'}>Class</Link>
                                </div>
                                <p>Programing</p>
                                <p>at <b>B01</b></p>
                                <div>
                                    <Link to='/lesson/attendance/1'>Take attendance</Link>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div>
                                    <Link to={'/lesson/class/1'}>Class</Link>
                                </div>
                                <p>Programing</p>
                                <p>at <b>B01</b></p>
                                <div>
                                    <Link to='/lesson/attendance/1'>Take attendance</Link>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div>
                                    <Link to={'/lesson/class/1'}>Class</Link>
                                </div>
                                <p>Programing</p>
                                <p>at <b>B01</b></p>
                                <div>
                                    <Link to='/lesson/attendance/1'>Take attendance</Link>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div>
                                    <Link to={'/lesson/class/1'}>Class</Link>
                                </div>
                                <p>Programing</p>
                                <p>at <b>B01</b></p>
                                <div>
                                    <Link to='/lesson/attendance/1'>Take attendance</Link>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div>
                                    <Link to={'/lesson/class/1'}>Class</Link>
                                </div>
                                <p>Programing</p>
                                <p>at <b>B01</b></p>
                                <div>
                                    <Link to='/lesson/attendance/1'>Take attendance</Link>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default WeeklyTimeTable