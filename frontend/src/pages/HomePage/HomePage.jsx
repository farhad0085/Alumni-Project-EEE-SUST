import React, { useEffect, useState } from 'react'
import SidebarLayout from '../../Layout'
import './styles.css'
import apiServices from './service'
import Loader from '../../Components/Loader/Loader'
import AlumniList from '../../Components/Alumni/AlumniList'


const HomePage = () => {

  const [loading, setLoading] = useState(false)
  const [alumnies, setAlumnies] = useState([])

  useEffect(() => {
    setLoading(true)
    apiServices.loadAlumnies()
      .then(res => {
        setAlumnies(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <SidebarLayout>
      <h1>Featured</h1>
      <div>
        {loading ? (
          <Loader withoutBackground />
        ) : (
          <AlumniList alumnies={alumnies} />
        )}
      </div>
    </SidebarLayout>
  )

}


export default HomePage