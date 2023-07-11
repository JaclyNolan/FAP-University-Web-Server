import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Select, InputNumber, Upload, message, DatePicker, Table, Tag } from 'antd'
import classes from '../Page.module.scss'

import s from './InstructorWeeklySchedule.module.scss'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import axiosClient from '../../../axios-client'
import ContentContext from '../../../helpers/Context/ContentContext'
const SlotTimes = [
    <div><h4>Slot 1</h4><p>7:15AM - 9:15AM</p></div>,
    <div><h4>Slot 2</h4><p>9:20AM - 11:20AM</p></div>,
    <div><h4>Slot 3</h4><p>12:10PM - 2:10PM</p></div>,
    <div><h4>Slot 4</h4><p>2:15PM - 4:15PM</p></div>,
    <div><h4>Slot 5</h4><p>4:20PM - 6:20PM</p></div>,
    <div><h4>Slot 6</h4><p>6:25PM - 8:25PM</p></div>,
];
const DaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekFormat = 'DD/MM/YYYY';
const customWeekStartEndFormat = (value) =>
    `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
        .endOf('week')
        .format(weekFormat)}`;
const findStatusText = (status) => {
    switch (status) {
        case 1:
            return "Not Yet";
        case 2:
            return "In Progress";
        case 3:
            return "Done";
    }
}
const findStatusColor = (status) => {
    switch (status) {
        case 1:
            return "red";
        case 2:
            return "yellow";
        case 3:
            return "green";
    }
}

const InstructorWeeklySchedule = () => {
    const [scheduleData, setScheduleData] = useState([]);
    const [week, _setWeek] = useState({
        startDate: dayjs('2023-05-18').startOf('week'),
        endDate: dayjs('2023-05-18').endOf('week'),
    });
    const { setContentLoading } = useContext(ContentContext);

    const setWeek = (date) => {
        _setWeek({
            startDate: date.startOf('week'),
            endDate: date.endOf('week'),
        })
    }

    useEffect(() => {
        fetchScheduleData();
    }, [week]);

    /**
     * @return "classSchedules": [
        {
            "class_course_id": 1,
            "class_schedule_id": 1,
            "day": "2023-05-18",
            "room": 101,
            "slot": 1,
            "status": 1,
            "class_course": {
                "class_course_id": 1,
                "class_id": 1,
                "course_id": 1,
                "class": {
                    "class_id": 1,
                    "class_name": "CS001"
                }
                "course": {
                    "course_id": 1,
                    "course_name": "Introduction to Programming"
                }
            }
        }
    ]
     */

    const fetchScheduleData = async () => {
        setContentLoading(true);
        const url = `/instructor/classSchedule`
            + `?start_date=${week.startDate.format('DD/MM/YYYY')}`
            + `&end_date=${week.endDate.format('DD/MM/YYYY')}`;
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                setScheduleData(response.data.classSchedules);
                setContentLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching schedule data:', error);
            })
    };

    const columns = [
        {
            title: 'Slots',
            key: 'slot',
            dataIndex: 'slot',
        },
        ...DaysOfWeek.map((day) => ({
            title: day,
            key: day.toLowerCase(),
            dataIndex: day.toLowerCase(),
            render: (text) => text && <div className={s['cell']}>
                <Link to={`/class/${text.classCourseId}`}>
                    <p>Class: {text.className}</p>
                    <p>{text.courseName}</p>
                </Link>
                <p>at Room <b>{text.room}</b></p>
                <Tag color={findStatusColor(text.status)}>{findStatusText(text.status)}</Tag>
                <Link to={`/schedule/attendance/${text.classScheduleId}`}>
                    <p>Take Attendance</p>
                </Link>
            </div>,
        })),
    ];

    const data = SlotTimes.map((slotTime, index) => {
        const row = { slot: slotTime };

        DaysOfWeek.forEach((day) => {
            const matchingClassSchedule = scheduleData.find(
                (classSchedule) => { 
                    console.log(dayjs(classSchedule.day).format('dddd'), day);
                    return dayjs(classSchedule.day).format('dddd') === day && classSchedule.slot === index + 1;
                }
            );
            if (!matchingClassSchedule) return;
            row[day.toLowerCase()] = {
                classCourseId: matchingClassSchedule.class_course_id,
                className: matchingClassSchedule.class_course.class.class_name,
                courseName: matchingClassSchedule.class_course.course.course_name,
                room: matchingClassSchedule.room,
                status: matchingClassSchedule.status,
                classScheduleId: matchingClassSchedule.class_schedule_id,
            };
        });

        return row;
    });

    return (
        <div>
            <p className={classes['page__title']}>Activities for <b>Nguyen Van A</b></p>
            <div className={classes['list__filters']}>
                <DatePicker
                    value={week.startDate}
                    format={customWeekStartEndFormat}
                    picker="week"
                    onChange={(date, dateString) => {
                        setWeek(date);
                    }}
                />
            </div>
            <br />
            <div>
                <Table
                    dataSource={data}
                    columns={columns}
                    bordered
                    pagination={false}
                    size="middle"
                    className="schedule-table"
                />
            </div>
        </div>
    )
}

export default InstructorWeeklySchedule