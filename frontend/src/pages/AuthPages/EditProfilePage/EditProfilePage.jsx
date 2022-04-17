import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import Label from '../../../Components/FormElements/Label'
import TextArea from '../../../Components/FormElements/TextArea'
import Input from '../../../Components/FormElements/Input'
import { toast } from "react-toastify";
import { getHeaders } from '../../../utils'
import defaultDp from '../../../assets/images/defaultDp.png'
import { FileUploader } from "react-drag-drop-files";
import { updateProfile } from '../services'
import Loader from '../../../Components/Loader/Loader'
import './styles.css'


const EditProfilePage = () => {
  const [profileDataLoading, setProfileDataLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [profilePicture, setProfilePicture] = useState()
  const [preview, setPreview] = useState()

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

  const handleError = (message, duration) => {
    toast.error(message || "Something went wrong", {
      position: "bottom-right",
      autoClose: duration || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  const getBatchList = () => {
    axios.get("/api/batches/")
      .then(res => {
        const batchList = res.data?.results || []
        setAvailableSessions(batchList)
      })
      .catch(error => {
        handleError("Error while getting batch list.")
      })
  }

  useEffect(() => {
    setProfileDataLoading(true)
    axios.get("/api/alumni-details/", { headers: getHeaders() })
    .then(res => {
      setProfilePicture(res.data?.profile_picture?.picture || null)
      setFullName(res.data?.name)
      setEmail(res.data?.email)
      setPhone(res.data?.contact_number)
      setDateOfBirth(res.data?.date_of_birth)
      setRegistrationNo(res.data?.registration_number)
      setSession(res.data?.batch?.id)
      setBiography(res.data?.biography)
      setIsEmployed(res.data?.is_employed ? "yes" : "no")
      setCompany(res.data?.company)
      setDesignation(res.data?.designation)
      setGraduationYear(res.data?.graduation_year)

      setPresentAddressAddress(res.data?.present_address?.address)
      setPresentAddressState(res.data?.present_address?.state)
      setPresentAddressCity(res.data?.present_address?.city)
      setPresentAddressZipCode(res.data?.present_address?.zip_code)
      setPresentAddressCountry(res.data?.present_address?.country)
      setPermanentAddressAddress(res.data?.permanent_address?.address)
      setPermanentAddressState(res.data?.permanent_address?.state)
      setPermanentAddressCity(res.data?.permanent_address?.city)
      setPermanentAddressZipCode(res.data?.permanent_address?.zip_code)
      setPermanentAddressCountry(res.data?.permanent_address?.country)
      setProfileDataLoading(false)
    })
    .catch(error => {
      setProfileDataLoading(false)
    })
  }, [])

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!profilePicture) {
      setPreview(undefined)
      return
    }

    let objectUrl = null

    if (typeof profilePicture === 'string') {
      // means it's already url
      setPreview(profilePicture)
    }
    else {
      objectUrl = URL.createObjectURL(profilePicture)
      setPreview(objectUrl)
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [profilePicture])


  useEffect(() => {
    getBatchList()

    // eslint-disable-next-line
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitLoading(true)

    const data = {
      full_name: full_name,
      email: email,
      date_of_birth: date_of_birth,
      registration_number: registration_no,
      batch: session,
      graduation_year: graduationYear,
      is_employed: isEmployed === "yes",
      contact_number: phone,
      company: company,
      designation: designation,
      biography: biography,
      present_address: {
        address: present_address_address,
        state: present_address_state,
        city: present_address_city,
        zip_code: present_address_zip_code,
        country: present_address_country,
      },
      permanent_address: {
        address: permanent_address_address,
        state: permanent_address_state,
        city: permanent_address_city,
        zip_code: permanent_address_zip_code,
        country: permanent_address_country,
      }
    }

    if (profilePicture && (typeof profilePicture !== 'string')) {
      data["profile_picture"] = profilePicture
    }

    const formData = new FormData();
    for (let key in data) {
      if (key === 'present_address') {
        for (let presentKey in data[key]) {
          formData.append(`present_address.${presentKey}`, data[key][presentKey]);
        }
      }
      else if (key === 'permanent_address') {
        for (let permanentKey in data[key]) {
          formData.append(`permanent_address.${permanentKey}`, data[key][permanentKey]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    updateProfile(formData)
      .then(res => {
        setSubmitLoading(false)
        toast.success(res.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch(error => {
        setSubmitLoading(false)
        setErrors(error.response?.data || {})
      })
  }

  return (
    <>
      <div className="container rounded border mt-4 mb-4">
        <div className="row">
          <div className="col">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              {profileDataLoading ? (
                <Loader withoutBackground />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          className="rounded-circle"
                          width="150px"
                          src={preview || defaultDp}
                          alt="dp"
                        />
                        <FileUploader
                          classes="mt-4"
                          name="profileDp"
                          handleChange={setProfilePicture}
                          types={["JPEG", "JPG", "PNG", "GIF"]}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <Label label={"Full Name"} />
                      <Input
                        placeholder="Please enter your full name"
                        value={full_name}
                        onChange={setFullName}
                        errorMessage={errors?.full_name}
                      />
                      <Label label={"Email"} />
                      <Input
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                        errorMessage={errors?.email}
                      />
                      <Label label={"Date of birth"} />
                      <Input
                        type="date"
                        placeholder="Date of birth"
                        value={date_of_birth}
                        onChange={setDateOfBirth}
                        errorMessage={errors?.date_of_birth}
                      />
                      <Label label={"Registration No."} />
                      <Input
                        type="number"
                        placeholder="Please enter your registration no."
                        value={registration_no}
                        onChange={setRegistrationNo}
                        errorMessage={errors?.registration_number}
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
                          <option key={s.id} value={s.id}>{s.session} ({s.batch_name})</option>
                        ))}
                      </select>
                      {errors?.batch && (
                        <div className='text-danger'>
                          Please select your batch
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <Label label={"Graduation Year"} />
                      <Input
                        placeholder="Please enter your graduation year"
                        value={graduationYear}
                        onChange={setGraduationYear}
                        errorMessage={errors?.graduation_year}
                      />
                    </div>
                    <div className="col-md-4">
                      <Label label={"Phone"} />
                      <Input
                        placeholder="Please enter your contact number"
                        value={phone}
                        onChange={setPhone}
                        errorMessage={errors?.contact_number}
                      />
                    </div>
                    <div className="col-md-12">
                      <Label label={"Biography"} />
                      <TextArea
                        value={biography}
                        onChange={setBiography}
                        placeholder="Please write something about you."
                        errorMessage={errors?.biography}
                      />
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
                            errorMessage={errors?.company}
                          />
                        </div>
                        <div className='col-md-6'>
                          <Label label={"Designation"} />
                          <Input
                            placeholder="Designation"
                            value={designation}
                            onChange={setDesignation}
                            errorMessage={errors?.designation}
                          />
                        </div>
                      </>
                    )}
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
                        errorMessage={errors?.present_address?.address}
                      />
                    </div>
                    <div className="col-md-6">
                      <Label label={"State"} />
                      <Input
                        placeholder="State"
                        value={present_address_state}
                        onChange={setPresentAddressState}
                        errorMessage={errors?.present_address?.state}
                      />
                      <Label label={"City"} />
                      <Input
                        placeholder="City"
                        value={present_address_city}
                        onChange={setPresentAddressCity}
                        errorMessage={errors?.present_address?.city}
                      />
                    </div>
                    <div className="col-md-6">
                      <Label label={"Zip Code"} />
                      <Input
                        placeholder="Zip Code"
                        value={present_address_zip_code}
                        onChange={setPresentAddressZipCode}
                        errorMessage={errors?.present_address?.zip_code}
                      />
                      <Label label={"Country"} />
                      <Input
                        placeholder="Country"
                        value={present_address_country}
                        onChange={setPresentAddressCountry}
                        errorMessage={errors?.present_address?.country}
                      />
                    </div>
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
                        errorMessage={errors?.permanent_address?.address}
                      />
                    </div>
                    <div className="col-md-6">
                      <Label label={"State"} />
                      <Input
                        placeholder="State"
                        value={permanent_address_state}
                        onChange={setPermanentAddressState}
                        errorMessage={errors?.permanent_address?.state}
                      />
                      <Label label={"City"} />
                      <Input
                        placeholder="City"
                        value={permanent_address_city}
                        onChange={setPermanentAddressCity}
                        errorMessage={errors?.permanent_address?.city}
                      />
                    </div>
                    <div className="col-md-6">
                      <Label label={"Zip Code"} />
                      <Input
                        placeholder="Zip Code"
                        value={permanent_address_zip_code}
                        onChange={setPermanentAddressZipCode}
                        errorMessage={errors?.permanent_address?.zip_code}
                      />
                      <Label label={"Country"} />
                      <Input
                        placeholder="Country"
                        value={permanent_address_country}
                        onChange={setPermanentAddressCountry}
                        errorMessage={errors?.permanent_address?.country}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <button type="submit" className="btn btn-primary" disabled={submitLoading}>
                      {submitLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default EditProfilePage