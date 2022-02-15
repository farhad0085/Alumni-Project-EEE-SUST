import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout/Layout'
import axios from '../../../utils/axios'
import Label from '../../../Components/FormElements/Label'
import TextArea from '../../../Components/FormElements/TextArea'
import Input from '../../../Components/FormElements/Input'
import './styles.css'


const EditProfilePage = () => {

  const [full_name, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date_of_birth, setDateOfBirth] = useState("")
  const [registration_no, setRegistrationNo] = useState("")
  const [session, setSession] = useState("")
  const [biography, setBiography] = useState("")
  const [isEmployed, setIsEmployed] = useState("yes")
  const [company, setCompany] = useState("")
  const [designation, setDesignation] = useState("")
  const [availableSessions, setAvailableSessions] = useState([])
  const [graduationYear, setGraduationYear] = useState([])

  // present address
  const [present_address_address, setPresentAddressAddress] = useState("")
  const [present_address_state, setPresentAddressState] = useState("")
  const [present_address_city, setPresentAddressCity] = useState("")
  const [present_address_zip_code, setPresentAddressZipCode] = useState("")
  const [present_address_country, setPresentAddressCountry] = useState("")
  // permanent address
  const [permanent_address_address, setPermanentAddressAddress] = useState("")
  const [permanent_address_state, setPermanentAddressState] = useState("")
  const [permanent_address_city, setPermanentAddressCity] = useState("")
  const [permanent_address_zip_code, setPermanentAddressZipCode] = useState("")
  const [permanent_address_country, setPermanentAddressCountry] = useState("")

  const getBatchList = () => {
    axios.get("/api/batches/")
      .then(res => {
        const batchList = res.data?.results || []
        setAvailableSessions(batchList)
      })
      .catch(error => {
        console.log("Error while getting batch list.")
      })
  }

  useEffect(() => {
    getBatchList()
  }, [])

  return (
    <Layout>
      <div className="container rounded border mt-4 mb-4">
        <div className="row">
          <div className="col">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      className="rounded-circle"
                      width="150px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="dp"
                    />
                    <span className="font-weight-bold">{full_name}</span>
                    <span className="text-black-50">{email}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <Label label={"Full Name"} />
                  <Input
                    placeholder="Please enter your full name"
                    value={full_name}
                    onChange={setFullName}
                  />
                  <Label label={"Email"} />
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={setEmail}
                  />
                  <Label label={"Date of birth"} />
                  <Input
                    type="date"
                    placeholder="Date of birth"
                    value={date_of_birth}
                    onChange={setDateOfBirth}
                  />
                  <Label label={"Registration No."} />
                  <Input
                    type="number"
                    placeholder="Please enter your registration no."
                    value={registration_no}
                    onChange={setRegistrationNo}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <Label label={"Session"} />
                  <select
                    className="form-control"
                    value={session}
                    onChange={e => setSession(e.target.value)}
                  >
                    <option>Please select your batch</option>
                    {availableSessions.map(s => (
                      <option key={s.session}>{s.session} ({s.batch_name})</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <Label label={"Graduation Year"} />
                  <Input
                    placeholder="Please enter your graduation year"
                    value={graduationYear}
                    onChange={setGraduationYear}
                  />
                </div>
                <div className="col-md-4">
                  <Label label={"Phone"} />
                  <Input
                    placeholder="Please enter your contact number"
                    value={phone}
                    onChange={setPhone}
                  />
                </div>
                <div className="col-md-12">
                  <Label label={"Biography"} />
                  <TextArea value={biography} onChange={setBiography} placeholder="Please write something about you." />
                </div>
              </div>

              <hr />
              <div className="row mt-3">
                Employement details
                <div className='col-md-12'>
                  Are you employed?
                  <label className="ml-2 checkbox-inline mr-2">
                    <input
                      type="radio"
                      name="isEmployed"
                      checked={isEmployed === "yes"}
                      value="yes"
                      onChange={e => setIsEmployed(e.target.value)}
                    /> Yes
                  </label>
                  <label className="checkbox-inline">
                    <input
                      type="radio"
                      name="isEmployed"
                      checked={isEmployed === "no"}
                      value="no"
                      onChange={e => setIsEmployed(e.target.value)}
                    /> Not yet
                  </label>
                </div>
                {isEmployed === "yes" && (
                  <>
                    <div className='col-md-6'>
                      <Label label={"Company"} />
                      <Input
                        placeholder="Company"
                        value={company}
                        onChange={setCompany}
                      />
                    </div>
                    <div className='col-md-6'>
                      <Label label={"Designation"} />
                      <Input
                        placeholder="Designation"
                        value={designation}
                        onChange={setDesignation}
                      />
                    </div>
                  </>
                )}
              </div>

              <hr />
              <div className="row mt-3">
                Permanent Address
                <div className="col-md-12">
                  <Label label={"Full Address"} />
                  <TextArea
                    placeholder="Please enter your full address here"
                    value={permanent_address_address}
                    onChange={setPermanentAddressAddress}
                  />
                </div>
                <div className="col-md-6">
                  <Label label={"State"} />
                  <Input
                    placeholder="State"
                    value={permanent_address_state}
                    onChange={setPermanentAddressState}
                  />
                  <Label label={"City"} />
                  <Input
                    placeholder="City"
                    value={permanent_address_city}
                    onChange={setPermanentAddressCity}
                  />
                </div>
                <div className="col-md-6">
                  <Label label={"Zip Code"} />
                  <Input
                    placeholder="Zip Code"
                    value={permanent_address_zip_code}
                    onChange={setPermanentAddressZipCode}
                  />
                  <Label label={"Country"} />
                  <Input
                    placeholder="Country"
                    value={permanent_address_country}
                    onChange={setPermanentAddressCountry}
                  />
                </div>
              </div>

              <hr />
              <div className="row mt-3">
                Present Address
                <div className="col-md-12">
                  <Label label={"Full Address"} />
                  <TextArea
                    placeholder="Please enter your full address here"
                    value={present_address_address}
                    onChange={setPresentAddressAddress}
                  />
                </div>
                <div className="col-md-6">
                  <Label label={"State"} />
                  <Input
                    placeholder="State"
                    value={present_address_state}
                    onChange={setPresentAddressState}
                  />
                  <Label label={"City"} />
                  <Input
                    placeholder="City"
                    value={present_address_city}
                    onChange={setPresentAddressCity}
                  />
                </div>
                <div className="col-md-6">
                  <Label label={"Zip Code"} />
                  <Input
                    placeholder="Zip Code"
                    value={present_address_zip_code}
                    onChange={setPresentAddressZipCode}
                  />
                  <Label label={"Country"} />
                  <Input
                    placeholder="Country"
                    value={present_address_country}
                    onChange={setPresentAddressCountry}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


export default EditProfilePage