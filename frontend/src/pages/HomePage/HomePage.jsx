import React, { useEffect, useState } from 'react'
import AlumniList from '../../Components/Alumni/AlumniList'
import Carousel from '../../Components/Carousel/Carousel'
import Loader from '../../Components/Loader/Loader'
import Layout from '../../Layout/Layout'
import apiServices from './service'
import './styles.css'


const HomePage = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const [alumnis, setAlumnis] = useState([])

  useEffect(() => {
    setLoading(true)
    apiServices.loadFeaturedAlumnies()
      .then(({ data }) => {
        setAlumnis(data.results)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)

      })
  }, [])

  return (
    <Layout>
      <Carousel />
      <div className='my-4'>
        <h2>Featured</h2>
        {loading ? (
          <Loader withoutBackground />
        ) : (
          <AlumniList alumnies={alumnis} />
        )}
        <div>
          <button
            onClick={() => history.push("/batches")}
            className='btn btn-block btn-outline-primary'
          >
            VIEW ALL
          </button>
        </div>
      </div>
    </Layout>
  )

}


export default HomePage