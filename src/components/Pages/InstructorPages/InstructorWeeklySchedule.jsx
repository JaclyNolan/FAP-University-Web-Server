import React, { useContext, useEffect, useState } from 'react'
import { DatePicker, Table, Tag } from 'antd'
import classes from '../Page.module.scss'
import s from './InstructorWeeklySchedule.module.scss'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import axiosClient from '../../../axios-client'
import ContentContext from '../../../helpers/Context/ContentContext'
const Times = [
    '7:15AM - 9:15AM',
    '9:20AM - 11:20AM',
    '12:10AM - 2:10PM',
    '2:15PM - 4:15PM',
    '4:20PM - 6:20PM',
    '6:25PM - 8:25PM',
];
const SlotTimes = [
    <div><h4>Slot 1</h4><p>{Times[0]}</p></div>,
    <div><h4>Slot 2</h4><p>{Times[1]}</p></div>,
    <div><h4>Slot 3</h4><p>{Times[2]}</p></div>,
    <div><h4>Slot 4</h4><p>{Times[3]}</p></div>,
    <div><h4>Slot 5</h4><p>{Times[4]}</p></div>,
    <div><h4>Slot 6</h4><p>{Times[5]}</p></div>,
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
        default:
            return "Done";
    }
}
const findStatusColor = (status) => {
    switch (status) {
        case 1:
            return "red";
        case 2:
            return "yellow";
        default:
            return "green";
    }
}

const InstructorWeeklySchedule = () => {
    const [scheduleData, setScheduleData] = useState([]);
    const [instructorData, setInstructorData] = useState(null);
    const [isScheduleDataFetching, setScheduleDataFetching] = useState(true);
    const [isInstructorFetching, setInstructorFetching] = useState(true);
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

    useEffect(() => {
        fetchInstructorData();
    }, []);

    useEffect(() => {
        if (!isInstructorFetching && !isScheduleDataFetching) setContentLoading(false);
        else setContentLoading(true);
    }, [isInstructorFetching, isScheduleDataFetching]);

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
                <Link to={`/schedule/attendance/${text.classScheduleId}`}>
                    <p>{text.isSubmit ? "Taken" : "Take Attendance"}</p>
                </Link>
            </div>,
        })),
    ];

    const data = SlotTimes.map((slotTime, index) => {
        const row = { slot: slotTime };

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
                    pagination={false}
                    size="middle"
                    className="schedule-table"
                />
            </div>
        </div>
    )
}

export default InstructorWeeklySchedule