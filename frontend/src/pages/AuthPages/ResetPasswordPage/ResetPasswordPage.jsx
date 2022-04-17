import React, { useState } from 'react'
import './styles.css'
import { changePassword } from '../services'
import { toast } from "react-toastify";


const ResetPasswordPage = () => {

  const [old_password, setOldPassword] = useState('')
  const [new_password1, setNewPassword1] = useState('')
  const [new_password2, setNewPassword2] = useState('')
  const [errors, setErrors] = useState({})

  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    changePassword({ old_password, new_password1, new_password2 })
      .then(res => {
        setLoading(false)
        setErrors({})

        toast.success(res.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch(error => {
        setLoading(false)
        setErrors(error?.response?.data)
      })
  }

  return (
    <div className="div-center">
      <div className="loginContent">
        <h3>Change Password</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <PasswordField
            label="Current Password"
            value={old_password}
            onChange={setOldPassword}
            error={errors.old_password}
          />
          <PasswordField
            label="New Password"
            value={new_password1}
            onChange={setNewPassword1}
            error={errors.new_password1}
          />
          <PasswordField
            label="Confirm Password"
            value={new_password2}
            onChange={setNewPassword2}
            error={errors.new_password2}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Please wait..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}


export default ResetPasswordPage



const PasswordField = ({ label, value, onChange, error, ...rest }) => {
  return (
    <div className={"form-group"}>
      <label>
        {label}
      </label>
      <input
        type='password'
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete='new-password'
        {...rest}
      />

      {!!error && (
        <div className="errorMessage">
          {error}
        </div>
      )}

    </div>
  )
}