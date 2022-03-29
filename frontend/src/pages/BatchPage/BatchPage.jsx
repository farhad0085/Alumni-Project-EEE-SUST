import React, { useEffect, useState } from 'react'
import AlumniList from '../../Components/Alumni/AlumniList'
import Loader from '../../Components/Loader/Loader'
import apiServices from './service'
import './styles.css'


const BatchPage = ({ history, match }) => {
  const [loading, setLoading] = useState(false)
  const [alumnis, setAlumnis] = useState([])
  const session = match.params.batchId
  

  useEffect(() => {
    setLoading(true)
    apiServices.loadAlumnies(session)
      .then(({ data }) => {
        setAlumnis(data.results)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [session])

  return (
    <>
      <div className='my-4'>
        <h2>Alumnies of batch: {session}</h2>
        {loading ? (
          <Loader withoutBackground />
        ) : (
          <AlumniList alumnies={alumnis} />
        )}
      </div>
    </>
  )

}

export default BatchPage
