import dayjs from "dayjs";

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
const findGradeStatusColor = (status) => {
    switch (status) {
        case "None":
            return "black";
        case "Failed":
            return "red";
        case "Passed":
            return "green";
        case "Merit":
            return "blue";
        default:
            return "purple";
    }
}
const findAttendanceColor = (status) => {
    switch (status) {
        case 0:
            return "red";
        default:
            return "green";
    }
}
const findAttendanceText = (status, time) => {
    switch (status) {
        case 0:
            return "Absent";
        default:
            return "Present at " + dayjs(time).format('h:mm A');
    }
}

export {findAttendanceColor, findAttendanceText, findGradeStatusColor, findStatusColor, findStatusText}