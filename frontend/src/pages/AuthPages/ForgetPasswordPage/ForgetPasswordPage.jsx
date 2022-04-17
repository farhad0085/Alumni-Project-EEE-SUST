import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from '../services'
import { toast } from "react-toastify";


const ForgetPasswordPage = () => {
  
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleError = (message, duration) => {
    toast.error(message || "Something went wrong", {
      position: "bottom-right",
      autoClose: duration || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    loginUser({ email })
      .then(res => {
        setLoading(false)
        toast.success(res.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        history.push("/edit-profile")
      })
      .catch(error => {
        setLoading(false)
        handleError("Email or password is incorrect!")
      })
  }


  return (
    <>
      <div className="forgetPassComp">
        <div className="div-center">
          <div className="loginContent">
            <h3>Forgot password?</h3>
            <small className="text-muted">No worries, we got you! Just enter your email address and we'll send you a link to reset your password.</small>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Please wait..." : "Reset Password"}
                </button>
              </div>
              <hr />
              <div className="form-group">
                Or <Link to="/forget-password">Login Here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )

}


export default ForgetPasswordPage
