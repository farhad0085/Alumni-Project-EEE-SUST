import React from 'react'
import Layout from '../../../Layout/Layout'
import './styles.css'
import { Link } from 'react-router-dom'


const LoginPage = () => {

  return (
    <Layout>
      <div className="loginComp">
        <div className="div-center">
          <div className="loginContent">
            <h3>Login</h3>
            <hr />
            <form>
              <div className="form-group">
                <label>Registration No.</label>
                <input type="number" className="form-control" placeholder="Registration No." />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input autoComplete='new-password' type="password" className="form-control" placeholder="Password" />
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
    </Layout>
  )

}


export default LoginPage