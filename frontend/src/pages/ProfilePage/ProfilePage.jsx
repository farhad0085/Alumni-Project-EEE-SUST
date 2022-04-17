import React, { useEffect, useState } from 'react'
import defaultDp from '../../assets/images/defaultDp.png'
import Loader from '../../Components/Loader/Loader'
import './styles.css'
import { loadAlumniProfileData } from './service';
import { useHistory } from 'react-router-dom'


const ProfilePage = ({ match }) => {
  const history = useHistory()
  const [profileDataLoading, setProfileDataLoading] = useState(false)
  const [profileData, setProfileData] = useState({})
  const [activeComponent, setActiveComponent] = useState('basic') // address
  const alumniId = match.params.alumniId

  useEffect(() => {
    setProfileDataLoading(true)
    loadAlumniProfileData(alumniId)
      .then(res => {
        setProfileData(res.data)
        setProfileDataLoading(false)
      })
      .catch(error => {
        setProfileDataLoading(false)
        history.push("/404")
      })

    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="container rounded border mt-4 mb-4">
        <div className="row">
          <div className="col">
            <div className="p-3 py-5">
              {profileDataLoading ? (
                <Loader withoutBackground />
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">{profileData.full_name}</h4>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          className="rounded-circle"
                          width="150px"
                          src={profileData.profile_picture?.picture || defaultDp}
                          alt="dp"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3>{profileData.name}</h3>
                      {profileData.is_employed && (
                        <b>{profileData.designation} at {profileData.company}</b>
                      )}
                      {profileData.present_address?.address && (
                        <p>
                          Lives in {profileData.present_address?.address}
                        </p>
                      )}
                      {profileData.biography && (
                        <h6>Biography</h6>
                      )}
                      <p>
                        {profileData.biography}
                      </p>
                    </div>
                  </div>

                  <div className="infoWrapper">
                    <div className={"listWrap"}>
                      <span
                        className={`listWrap item ${activeComponent === 'basic' && 'active'}`}
                        onClick={() => setActiveComponent("basic")}
                      >
                        Basic Informations
                      </span>
                      <span
                        className={`listWrap item ${activeComponent === 'address' && 'active'}`}
                        onClick={() => setActiveComponent("address")}
                      >
                        Address
                      </span>
                    </div>
                    <div className="infoDetails">
                      {activeComponent === "basic" ? (
                        <div className="row mt-3">
                          <div className="col">
                            <p>
                              Email: {profileData.email}
                            </p>
                            <p>
                              Contact: {profileData.contact_number}
                            </p>

                            <p>
                              Date of birth: {profileData.date_of_birth}
                            </p>
                            <p>
                              Session: {profileData.batch?.session}
                            </p>
                            <p>
                              Batch Name: {profileData.batch?.batch_name}
                            </p>
                            <p>
                              Graduation Year: {profileData.graduation_year}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h6>Present Address</h6>
                          <p>
                            Full Address: {profileData.present_address?.address}<br />
                            State: {profileData.present_address?.state}<br />
                            City: {profileData.present_address?.city}<br />
                            Country: {profileData.present_address?.country}<br />
                          </p>
                          <h6>Permanent Address</h6>
                          <p>
                            Full Address: {profileData.permanent_address?.address}<br />
                            State: {profileData.permanent_address?.state}<br />
                            City: {profileData.permanent_address?.city}<br />
                            Country: {profileData.permanent_address?.country}<br />
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* <div className="infoWrapper">
                    <div className={"listWrap"}>
                      <span
                        className='listWrap item'
                        onClick={() => setActiveComponent("basic")}
                      >
                        Basic Informations
                      </span>
                      <span
                        className='listWrap item active'
                        onClick={() => setActiveComponent("address")}
                      >
                        Address
                      </span>
                    </div>
                    {activeComponent === "basic" ? (
                      <div className="row mt-3">
                        <div className="col">
                          <h5>Basic Informations</h5>
                          <hr />
                          <p>
                            Email: {profileData.email}
                          </p>
                          <p>
                            Contact: {profileData.contact_number}
                          </p>

                          <p>
                            Date of birth: {profileData.date_of_birth}
                          </p>
                          <p>
                            Session: {profileData.batch?.session}
                          </p>
                          <p>
                            Batch Name: {profileData.batch?.batch_name}
                          </p>
                          <p>
                            Graduation Year: {profileData.graduation_year}
                          </p>

                          <h6>Present Address</h6>
                          <p>
                            Full Address: {profileData.present_address?.address}<br />
                            State: {profileData.present_address?.state}<br />
                            City: {profileData.present_address?.city}<br />
                            Country: {profileData.present_address?.country}<br />
                          </p>
                          <h6>Permanent Address</h6>
                          <p>
                            Full Address: {profileData.permanent_address?.address}<br />
                            State: {profileData.permanent_address?.state}<br />
                            City: {profileData.permanent_address?.city}<br />
                            Country: {profileData.permanent_address?.country}<br />
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                      </>
                    )}
                  </div> */}

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default ProfilePage