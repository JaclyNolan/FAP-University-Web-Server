import React from 'react'
import classes from './News.module.scss'
const NewsDetails = () => {
  return (
    <div className={classes['details']}>
      <h1 className={classes['details__title']}>This is title</h1>
      <p className={classes['details__author']}>Posted by: <b>Nguyen Van A</b></p>
      <p className={classes['details__content']}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias ad possimus ipsa labore, 
        cumque debitis modi mollitia id error fugit perspiciatis praesentium incidunt, ipsam reprehenderit 
        similique eaque, dolores cum exercitationem magnam inventore aliquam deleniti. Minus veritatis error sit illo. 
        Repellat praesentium pariatur dolor beatae fuga perferendis voluptatum eum quibusdam aliquid.
      </p>
      <p className={classes['details__date']}>Date: 01/01/2024</p>
    </div>
  )
}

export default NewsDetails