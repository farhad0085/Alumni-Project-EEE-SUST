import React, { useState } from 'react'
import Popup from '../Popup/Popup'
import './styles.css'


const AlumniItem = ({ alumni }) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='alumniGrid_item' onClick={() => setIsOpen(true)}>
        <div className='left'>
          <img
            className='profilePicture'
            src={alumni.profile_picture.picture}
            alt={alumni.name}
            height={'100px'}
            width={"100px"}
          />
        </div>
        <div className='right'>
          <h3 className='alumniName'>
            {alumni.name}
          </h3>
          <p className='batchName'>
            Batch: {alumni.session}
          </p>
          <p className='email'>
            Email: {alumni.email}
          </p>
          <p className='phone'>
            Phone: {alumni.contact_number}
          </p>
        </div>
      </div>
      {isOpen && (
        <Popup
          alumni={alumni}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )

}


export default AlumniItem