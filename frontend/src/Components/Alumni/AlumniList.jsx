import React from 'react'
import './styles.css'
import AlumniItem from './AlumniItem'


const AlumniList = ({ alumnies }) => {

  return (
    <div className='alumniGridContainer'>
      {alumnies.map(alumni => <AlumniItem alumni={alumni} />)}
    </div>
  )

}


export default AlumniList