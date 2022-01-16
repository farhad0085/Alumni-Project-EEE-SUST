import React from 'react'
import Header from './Header'


const Layout = ({ children }) => {

  return (
    <>
      <Header />
      <div className='mt-4'>
        <div className='container'>
          {children}
        </div>
      </div>
    </>
  )

}


export default Layout