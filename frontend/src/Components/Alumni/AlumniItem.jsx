import React from 'react'
import defaultThumb from '../../assets/icons/thumbnail.svg'
import './styles.css'


const AlumniItem = ({ alumni }) => {

  const profilePicture = alumni?.profile_picture?.picture

  return (
    <div class="col-md-3">
      <div class="card mb-4 shadow-sm">
        <img
          class="card-img-top"
          alt="Thumbnail"
          style={{ height: "225px", width: "100%", display: "block" }}
          src={profilePicture ? profilePicture : defaultThumb}
          data-holder-rendered="true"
        />
        <div class="card-body">
          <h5>{alumni.name}</h5>
          <hr />
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-primary">View Profile</button>
            </div>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">Email</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Phone</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


export default AlumniItem