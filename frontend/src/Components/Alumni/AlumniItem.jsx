import React from 'react'
import { withRouter } from 'react-router-dom'
import defaultThumb from '../../assets/icons/thumbnail.svg'
import Carousel from '../Carousel/Carousel'
import './styles.css'


const AlumniItem = ({ alumni, history }) => {

  const profilePicture = alumni?.profile_picture?.picture
  
  const userPictures = (uPictures) => {
    const pictures = uPictures.map(p => p.picture)

    if (!pictures.length) {
      pictures.push(defaultThumb)
    }
    const carouselItems = pictures.map(p => (
      <img
        className="card-img-top"
        alt="Thumbnail"
        style={{ height: "225px", width: "100%", display: "block" }}
        src={p}
        data-holder-rendered="true"
      />
    ))
    return carouselItems
  }

  return (
    <div className="col-md-3">
      <div className="card mb-4 shadow-sm">
        {profilePicture ? (
          <img
            className="card-img-top"
            alt="Thumbnail"
            style={{ height: "225px", width: "100%", display: "block" }}
            src={profilePicture}
            data-holder-rendered="true"
          />
        ) : (
          <>
            <Carousel
              showIndicators={false}
              showThumbs={false}
              items={userPictures(alumni.pictures)}
            />
          </>
        )}
        
        <div className="card-body">
          <h5>{alumni.name}</h5>
          <hr />
          <div className="card-text">
            <dl>
              <dt>Session</dt>
              <dd>{alumni.batch.session}</dd>
              <dt>Graduation Year</dt>
              <dd>{alumni.graduation_year}</dd>
              {alumni.is_employed && (
                <>
                  <dt>Designation</dt>
                  <dd>{alumni.designation} at {alumni.company}</dd>
                </>
              )}
              <dt>Present Address</dt>
              <dd>{alumni.present_address.address}</dd>
            </dl>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button onClick={() => history.push('/alumnies/2018338019')} type="button" className="btn btn-sm btn-outline-primary">View Profile</button>
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


export default withRouter(AlumniItem)