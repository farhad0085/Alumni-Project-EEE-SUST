import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/actions/authActions'

const Header = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  return (
    <header className='mb-4'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">EEE SUST</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.sust.edu/d/eee/faculty">Faculty</a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/batches">Batches</NavLink>
              </li>
              {!auth.isAuthenticated ? (
               <>
                <li className="nav-item">
                  <NavLink exact className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact className="nav-link" to="/register">Register</NavLink>
                </li>
               </> 
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink exact className="nav-link" to="/edit-profile">Edit Profile</NavLink>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" style={{ cursor: "pointer" }} onClick={() => dispatch(logout())}>Logout</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )

}


export default Header