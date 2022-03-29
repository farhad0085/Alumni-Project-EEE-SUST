import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Header = ({ isAuthenticated, setIsAuthenticated }) => {

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
              <form className="form-inline my-2 mr-5 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
              </form>
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.sust.edu/d/eee/faculty">Faculty</a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/batches">Batches</NavLink>
              </li>
              {!isAuthenticated ? (
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
                    <NavLink exact className="nav-link" to="/register">Logout</NavLink>
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