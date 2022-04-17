import React from 'react'
import './styles.css'


const Footer = () => {

  return (
    <footer className='footer'>
      <div className="footerContent">
        <p>&copy; {new Date().getFullYear()} {process.env.REACT_APP_SITE_TITLE}</p>
      </div>
    </footer>
  )

}


export default Footer