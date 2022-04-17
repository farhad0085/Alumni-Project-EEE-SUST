import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from '../services'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { USER_LOGGED_IN } from '../../../store/actions/actionTypes';


const LoginPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
    loginUser({ username, password })
      .then(res => {
        setLoading(false)
        localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, res.data.key);
        dispatch({ type: USER_LOGGED_IN });

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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
          </div>
          <hr />
          <div className="form-group">
            Forgot your password? <Link to="/forget-password">Reset Password</Link>
          </div>
          Are you graduated? <Link to='/register'>Create an account</Link>
        </form>
      </div>
    </div>
  )

}


export default LoginPage