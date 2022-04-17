import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/actions/authActions'

const Header = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [menuExpanded, setMenuExpanded] = useState(false)
  const ref = useRef();
  const refIcon = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      // if user click outside of chartinfo or chartinfo icon
      // close the info
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !refIcon.current.contains(event.target)
      ) {
        setMenuExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

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
            aria-expanded="true"
            aria-label="Toggle navigation"
            ref={refIcon}
            onClick={() => setMenuExpanded(!menuExpanded)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div ref={ref} className={`collapse navbar-collapse ${menuExpanded && "show"}`} id="navbarSupportedContent">
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
                    <NavLink exact className="nav-link" to="/change-password">Change Password</NavLink>
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