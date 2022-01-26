import React from 'react'
import './styles.css'
import AlumniItem from './AlumniItem'


const AlumniList = ({ alumnies }) => {

  return (
    <div className="album pt-4 bg-light">
      <div className="row">
        {alumnies.map(alumni => <AlumniItem key={alumni.id} alumni={alumni} />)}
      </div>
    </div>
  )

}


export default AlumniList