import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from '../services'
import { loginUser as loginUserToApp } from '../../../utils/auth'
import { toast } from "react-toastify";


const LoginPage = () => {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
    loginUser({ username, password })
      .then(res => {
        const userToken = res.data?.key
        loginUserToApp(userToken)
        
        toast.success(res.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        history.push("/profile")
      })
      .catch(error => {
        handleError("Email or password is incorrect!")
      })
  }

  return (
    <>
      <div className="loginComp">
        <div className="div-center">
          <div className="loginContent">
            <h3>Login</h3>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  onChange={e => setUsername(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  onChange={e => setPassword(e.target.value)}
                  autoComplete='new-password'
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
              <hr />
              <div className="form-group">
                Forgot your password? <Link to="/reset-password">Reset Password</Link>
              </div>
              Are you graduated? <Link to='/register'>Create an account</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )

}


export default LoginPage