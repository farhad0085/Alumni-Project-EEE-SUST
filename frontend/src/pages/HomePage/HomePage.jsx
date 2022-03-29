import React, { useEffect, useState } from 'react'
import AlumniList from '../../Components/Alumni/AlumniList'
import Carousel from '../../Components/Carousel/Carousel'
import Loader from '../../Components/Loader/Loader'
import apiServices from './service'
import iictBuilding from '../../assets/images/iict_building.jpg'
import cat from '../../assets/images/cat.jpg'
import kid from '../../assets/images/kid.jpg'
import sparrow from '../../assets/images/sparrow.jpg'
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

  const carouselItems = [
    <>
      <img src={iictBuilding} alt="carousel" />
      <div className="carouselInfo">
        <p className="title">
          Welcome to EEE Alumni Association
        </p>
        <p className='content'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quis fugiat odit explicabo debitis reiciendis repudiandae, cum recusandae.
          Animi quia accusamus quo adipisci quisquam tempore modi consequuntur,
          repellat fugit enim mollitia!
        </p>
      </div>
    </>,
    <>
      <img src={cat} alt="carousel" />
      <div className="carouselInfo">
        <p className="title">
          Welcome to EEE Alumni Association
        </p>
        <p className='content'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quis fugiat odit explicabo debitis reiciendis repudiandae, cum recusandae.
          Animi quia accusamus quo adipisci quisquam tempore modi consequuntur,
          repellat fugit enim mollitia!
        </p>
      </div>
    </>,
    <>
      <img src={kid} alt="carousel" />
      <div className="carouselInfo">
        <p className="title">
          Welcome to EEE Alumni Association
        </p>
        <p className='content'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quis fugiat odit explicabo debitis reiciendis repudiandae, cum recusandae.
          Animi quia accusamus quo adipisci quisquam tempore modi consequuntur,
          repellat fugit enim mollitia!
        </p>
      </div>
    </>,
    <>
      <img src={sparrow} alt="carousel" />
      <div className="carouselInfo">
        <p className="title">
          Welcome to EEE Alumni Association
        </p>
        <p className='content'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quis fugiat odit explicabo debitis reiciendis repudiandae, cum recusandae.
          Animi quia accusamus quo adipisci quisquam tempore modi consequuntur,
          repellat fugit enim mollitia!
        </p>
      </div>
    </>
  ]

  return (
    <>
      <Carousel items={carouselItems} />
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
    </>
  )

}


export default HomePage