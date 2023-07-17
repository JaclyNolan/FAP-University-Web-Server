import React, { useEffect, useState } from 'react'
import { DatePicker, Table, Tag } from 'antd'
import classes from '../Page.module.scss'
import s from './InstructorWeeklySchedule.module.scss'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import axiosClient from '../../../axios-client'

const DaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekFormat = 'DD/MM/YYYY';
const customWeekStartEndFormat = (value) =>
    `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
        .endOf('week')
        .format(weekFormat)}`;
const findStatusText = (status) => {
    switch (status) {
        case 1:
            return "Not Started";
        case 2:
            return "Taking Attendance";
        case 3:
            return "In Progress";
        default:
            return "Ended";
    }
}
const findStatusColor = (status) => {
    switch (status) {
        case 1:
            return "red";
        case 2:
            return "orange";
        case 3:
            return "yellow";
        default:
            return "green";
    }
}

const InstructorWeeklySchedule = () => {
    const [slotTimes, setSlotTimes] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [instructorData, setInstructorData] = useState(null);
    const [isSlotTimesFetching, setSlotTimesFetching] = useState(true);
    const [isScheduleDataFetching, setScheduleDataFetching] = useState(true);
    const [isInstructorFetching, setInstructorFetching] = useState(true);
    const [week, _setWeek] = useState({
        startDate: dayjs('2023-05-18').startOf('week'),
        endDate: dayjs('2023-05-18').endOf('week'),
    });


    const setWeek = (date) => {
        _setWeek({
            startDate: dayjs(date).startOf('week'),
            endDate: dayjs(date).endOf('week'),
        })
    }

    useEffect(() => {
        fetchScheduleData();
    }, [week]);

    useEffect(() => {
        fetchInstructorData();
        fetchSlotTimesData();
    }, []);

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
        setScheduleDataFetching(true);
        const url = `/instructor/classSchedule`
            + `?start_date=${week.startDate.format('DD/MM/YYYY')}`
            + `&end_date=${week.endDate.format('DD/MM/YYYY')}`;
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                setScheduleData(response.data.classSchedules);
                setScheduleDataFetching(false);
            })
            .catch((error) => {
                console.error('Error fetching schedule data:', error);
                setScheduleDataFetching(false);
            })
    };

    const fetchInstructorData = async () => {
        setInstructorFetching(true);
        const url = `/instructor/detail`;
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                setInstructorData(response.data.instructor);
                setInstructorFetching(false);
            })
            .catch((error) => {
                console.error('Error fetching instructor data:', error);
                setInstructorFetching(false);
            })
    };

    /**
     * @return "slotTimes": [
        {
            "slot": 1,
            "start_time": "7:15:00",
            "end_time": "9:15:00"
        },
    */

    const fetchSlotTimesData = async () => {
        setSlotTimesFetching(true);
        const url = `/classSchedule/slotTimes`;
        console.log(url);
        await axiosClient.get(url)
            .then((response) => {
                setSlotTimes(getSlotTimesFromData(response.data.slotTimes));
                setSlotTimesFetching(false);
            })
            .catch((error) => {
                console.error('Error fetching slot time data:', error);
                setSlotTimesFetching(false);
            })
    }

    const getSlotTimesFromData = (slotTimesData) => {
        return slotTimesData.map((slotTime) => {
            const Time = dayjs(slotTime.start_time, 'HH:mm:ss').format('h:mmA') + ' - ' + dayjs(slotTime.end_time, 'HH:mm:ss').format('h:mmA')
            return <div><h4>Slot {slotTime.slot}</h4><p>{Time}</p></div>
        })
    }

    const columns = [
        {
            title: 'Slots',
            key: 'slot',
            className: s['row__slots'],
            dataIndex: 'slot',
        },
        ...DaysOfWeek.map((day) => ({
            title: day,
            key: day.toLowerCase(),
            dataIndex: day.toLowerCase(),
            render: (text) => text && <div className={s['row__data']}>
                <Link to={`/class/${text.classCourseId}`}>
                    <p>Class: {text.className}</p>
                    <p>{text.courseName}</p>
                </Link>
                <p>at Room <b>{text.room}</b></p>
                <Tag color={findStatusColor(text.status)}>{findStatusText(text.status)}</Tag>
                {text.status !== 1
                    && <Link to={`/schedule/attendance/${text.classScheduleId}`}>
                        {text.status === 2 
                        ? <p>{text.isSubmit ? "Taken" : "Take Attendance"}</p> 
                        : <p>View Attendance</p>}                
                    </Link>}
            </div>,
        })),
    ];

    const data = (slotTimes && scheduleData) && slotTimes.map((slotTime, index) => {
        const row = { key: index, slot: slotTime };

        DaysOfWeek.forEach((day) => {
            const matchingClassSchedule = scheduleData.find(
                (classSchedule) => {
                    return dayjs(classSchedule.day).format('dddd') === day && classSchedule.slot === index + 1;
                }
            );
            if (!matchingClassSchedule) return;
            row[day.toLowerCase()] = {
                key: matchingClassSchedule.class_course_id,
                classCourseId: matchingClassSchedule.class_course_id,
                className: matchingClassSchedule.class_course.class.class_name,
                courseName: matchingClassSchedule.class_course.course.course_name,
                room: matchingClassSchedule.room,
                status: matchingClassSchedule.status,
                classScheduleId: matchingClassSchedule.class_schedule_id,
                isSubmit: matchingClassSchedule.submit_time ? true : false,
            };
        });

        return row;
    });

    return (
        <div>
            <p className={classes['page__title']}>Activities for <b>{instructorData && instructorData.full_name}</b></p>
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
                    loading={isScheduleDataFetching || isSlotTimesFetching}
                    pagination={false}
                    size="middle"
                    className="schedule-table"
                />
            </div>
        </div>
    )
}

export default InstructorWeeklySchedule