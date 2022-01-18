import React from 'react'
import './styles.css'
import AlumniItem from './AlumniItem'


const AlumniList = ({ alumnies, showPagination }) => {

  return (
    <div class="album pt-4 bg-light">
      <div className="row">
        {alumnies.map(alumni => <AlumniItem alumni={alumni} />)}
      </div>
    </div>
  )

}


export default AlumniList