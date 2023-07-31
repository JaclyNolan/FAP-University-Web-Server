import React, { useContext, useEffect, useState } from 'react'
import classes from './Feedback.module.scss'
import ContentContext from '../../../helpers/Context/ContentContext'
import axiosClient from '../../../axios-client'
import { Alert, Tag } from 'antd'
import { useParams } from 'react-router-dom'
const FeedbackDetails = () => {
    const params = useParams();
    const feedback_id = params.id;
    const { setContentLoading } = useContext(ContentContext);
    const [errorMessage, _setErrorMessage] = useState("");
    const [successMessage, _setSuccessMessage] = useState("");
    const [tableData, setTableData] = useState({});
    const [isValidFeedbackId, setIsValidFeedbackId] = useState(false);

    const setErrorMessage = (value) => {
        _setErrorMessage(value);
        _setSuccessMessage("");
    }
    const setSuccessMessage = (value) => {
        _setErrorMessage("");
        _setSuccessMessage(value);
    }

    useEffect(() => {
        setContentLoading(true);
        const fetchFeedbackData = async () => {
            try {
                const url = `/feedbacks/edit-feedback/${feedback_id}`;
                const response = await axiosClient.get(url);
                setTableData(getTableDataFromFeedbackData(response.data.feedback));
                setIsValidFeedbackId(true);
                setContentLoading(false);
            } catch (error) {
                setErrorMessage(error.message);
                setContentLoading(false);
            }
        }

        fetchFeedbackData();
    }, [])

    const getTableDataFromFeedbackData = (feedback) => {
        return {
            feedback: {
                feedbackContent: feedback.feedback_content,
            },
            details: [
                {
                    label: 'ID',
                    value: feedback.id
                },
                {
                    label: 'Course',
                    value: feedback.course_name
                },
                {
                    label: 'Class',
                    value: feedback.class_name
                },
                {
                    label: 'Student',
                    value: feedback.student_name
                },
                {
                    label: 'Teacher',
                    value: feedback.instructor_name
                },
            ]
        }
    }

    return (
        <>
            {successMessage !== "" && <Alert type='success' banner message={successMessage} />}
            {errorMessage !== "" && <Alert type='error' banner message={errorMessage} />}
            {isValidFeedbackId &&
                <div className={classes['feedback__details']}>
                    <div className={classes['feedback__details-row']}>
                        {tableData.details.map((d) => {
                            return <div className={classes['feedback__details-detail']}>
                                <p className={classes['feedback__details-title']}>{d.label} :</p>
                                <b className={classes['feedback__details-value']}>{d.value}</b>
                            </div>
                        })}
                    </div>
                    <div className={classes['feedback__details-details']}>
                        <p>Feedback Details:</p>
                        <div className={classes['feedback__details-content']}>{tableData.feedback.feedbackContent}</div>
                    </div>
                </div>
            }
        </>
    )
}

export default FeedbackDetails