import React from 'react'
import classes from './styles.module.scss'

const Loader = ({ withoutBackground }) => {

  return (
    <>
      <div className={withoutBackground ? classes.loader_container_without_background : classes.loader_container}>
        <div className={classes.loader}>Loading...</div>
      </div>
    </>
  )

}


export default Loader