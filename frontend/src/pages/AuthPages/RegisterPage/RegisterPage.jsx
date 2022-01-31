import React from 'react'
import Layout from '../../../Layout/Layout'
import './styles.css'


const RegisterPage = () => {

  return (
    <Layout>
      <div className="registerComp">
        <div className="registerPageCenter">
          <div className="registerContent">
            <h3>Create an Account</h3>
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
              <button type="submit" className="btn btn-primary">Register</button>
              <hr />
              Already have an account? Login Here
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )

}


export default RegisterPage