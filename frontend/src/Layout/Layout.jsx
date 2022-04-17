import React from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from './Footer'
import Header from './Header'


const Layout = ({ children }) => {

  return (
    <div className="mainWrapper">
      <div className="headerWrapper">
        <Header />
      </div>
      <div className="contentWrapper">
        <ToastContainer />
        <div className='container'>
          {children}
        </div>
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  )

}


export default Layout