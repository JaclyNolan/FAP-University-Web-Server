import React from 'react'
import classes from './Home.module.scss'
import { NewsSection } from '../News'
const Home = () => {
  return (
    <>
      <div className={classes['home']}>Home</div>
      <NewsSection />
    </>
  )
}

export default Home