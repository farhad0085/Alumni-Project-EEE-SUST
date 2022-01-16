import React, { useState } from 'react'


const Header = () => {

  const [showDropDown, setShowDropDown] = useState(false)

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">EEE SUST</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.sust.edu/d/eee/faculty">Faculty</a>
              </li>
              <li className="nav-item dropdown">
                <a href='#?' onClick={() => setShowDropDown(!showDropDown)} className="nav-link dropdown-toggle">
                  Batches
                </a>
                <div className={`dropdown-menu ${showDropDown ? "show": ""}`} aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/batch/2010">2010</a>
                  <a className="dropdown-item" href="/batch/2011">2011</a>
                  <a className="dropdown-item" href="/batch/2012">2012</a>
                  <a className="dropdown-item" href="/batch/2013">2013</a>
                  <a className="dropdown-item" href="/batch/2014">2014</a>
                  <a className="dropdown-item" href="/batch/2015">2015</a>
                  <a className="dropdown-item" href="/batch/2016">2016</a>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </header>
  )

}


export default Header