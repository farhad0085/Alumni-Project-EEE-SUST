import React from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from './Footer'
import Header from './Header'


const Layout = ({ children, isAuthenticated, setIsAuthenticated }) => {

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <ToastContainer />
      <div className='container'>
        {children}
      </div>
      <Footer />
    </>
  )

}


export default Layout