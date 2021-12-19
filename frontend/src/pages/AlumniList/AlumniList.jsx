import React, { useEffect, useState } from 'react'
import SidebarLayout from '../../Layout'
import './styles.css'
import apiServices from './service'
import Loader from '../../Components/Loader/Loader'


const AlumniList = () => {

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
          <div className='alumniGridContainer'>
            {alumnies.map(alumni => (
              <div className='alumniGrid_item'>
                <div>
                  <img src={alumni.profile_picture.picture} alt={alumni.name} height={'100px'} width={"100px"} />
                </div>
                <div>
                  <h3 className='alumniName'>
                    {alumni.name}
                  </h3>
                  <p className='batchName'>
                    Batch: {alumni.session}
                  </p>
                  <p className='batchName'>
                    Email: {alumni.email}
                  </p>
                  <p className='batchName'>
                    Phone: {alumni.contact_number}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SidebarLayout>
  )

}


export default AlumniList