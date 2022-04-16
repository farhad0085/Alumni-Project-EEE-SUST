import React from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from './Footer'
import Header from './Header'


const Layout = ({ children }) => {

  return (
    <>
      <Header />
      <ToastContainer />
      <div className='container'>
        {children}
      </div>
      <Footer />
    </>
  )

}


export default Layout