import React from 'react'
import Layout from '../../../Layout/Layout'
import './styles.css'


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
              <button type="submit" className="btn btn-primary">Login</button>
              <hr />
              Create an Account
              Reset Password
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )

}


export default LoginPage