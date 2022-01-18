import React from 'react'
import defaultThumb from '../../assets/icons/thumbnail.svg'
import './styles.css'


const AlumniItem = ({ alumni }) => {

  const profilePicture = alumni?.profile_picture?.picture

  return (
    <div className="col-md-3">
      <div className="card mb-4 shadow-sm">
        <img
          className="card-img-top"
          alt="Thumbnail"
          style={{ height: "225px", width: "100%", display: "block" }}
          src={profilePicture ? profilePicture : defaultThumb}
          data-holder-rendered="true"
        />
        <div className="card-body">
          <h5>{alumni.name}</h5>
          <hr />
          <div className="card-text">
            <dl>
              <dt>Session</dt>
              <dd>{alumni.session}</dd>
              <dt>Passing Year</dt>
              <dd>{alumni.passing_year}</dd>
              <dt>Designation</dt>
              <dd>{alumni.designation} at {alumni.company}</dd>
              <dt>Present Address</dt>
              <dd>{alumni.present_address.address}</dd>
            </dl>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-primary">View Profile</button>
            </div>
            <div className="btn-group">
                <a role="button" className="btn btn-sm btn-outline-secondary" href={`mailto:${alumni.email}`}>
                  Email
                </a>
                <a role="button" className="btn btn-sm btn-outline-secondary" href={`tel:${alumni.contact_number}`}>
                  Phone
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


export default AlumniItem