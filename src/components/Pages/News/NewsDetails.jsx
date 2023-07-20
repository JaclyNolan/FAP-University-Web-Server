import React from 'react'
import classes from './News.module.scss'
import dayjs from 'dayjs'
const NewsDetails = ({ newsData }) => {
  return (
    <div className={classes['details']}>
      <h1 className={classes['details__title']}>{newsData.title}</h1>
      <p className={classes['details__author']}>Posted by: <b>{newsData.author}</b></p>
      <p className={classes['details__content']}>
        {newsData.content}
      </p>
      <p className={classes['details__date']}>{dayjs(newsData.created_at).format('DD/MM/YY H:mm')}</p>
    </div>
  )
}

export default NewsDetails