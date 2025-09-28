import React, { useEffect, useState } from 'react'
import Routes from './Routes'
import Layout from './Layout/Layout'


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('alumniUserToken')) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
      <Routes />
    </Layout>
  )

}


export default App