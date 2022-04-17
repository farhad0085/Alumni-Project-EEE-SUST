import React, { useState, useEffect } from 'react'
import Loader from '../../Components/Loader/Loader'
import apiServices from './service'
import defaultThumb from '../../assets/icons/thumbnail.svg'
import Carousel from '../../Components/Carousel/Carousel'


const BatchList = ({ history }) => {

  const [loading, setLoading] = useState(false)
  const [batches, setBatches] = useState([])

  useEffect(() => {
    setLoading(true)
    apiServices.loadBatchList()
      .then(({ data }) => {
        setBatches(data.results)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)

      })
  }, [])

  const batchPictures = (batch) => {
    const pictures = batch.batch_pictures.map(p => p.picture)
    if (!pictures.length) {
      pictures.push(defaultThumb)
    }
    const carouselItems = pictures.map(p => (
      <img
        className="card-img-top dp"
        alt="Thumbnail"
        style={{ height: "225px", width: "100%", display: "block" }}
        src={p}
        data-holder-rendered="true"
      />
    ))
    return carouselItems
  }

  return (
    <>
      <div className='my-4'>
        <h2>Batches</h2>
        <hr />
        {loading ? (
          <Loader withoutBackground />
        ) : (
          <div className='row'>
            {batches.map(batch => (
              <div key={batch.id} className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  <Carousel
                    showIndicators={false}
                    showThumbs={false}
                    items={batchPictures(batch)}
                  />
                  <div className="card-body">
                    <h5>{batch.session} ({batch.batch_name})</h5>
                    <hr />
                    <div className="card-text">
                      <dl>
                        <dt>Total Students</dt>
                        <dd>{batch.total_students}</dd>
                      </dl>
                      <dl>
                        <dt>Total Alumnies</dt>
                        <dd>{batch.total_alumnies}</dd>
                      </dl>
                    </div>
                    <button
                      onClick={() => history.push(`/batches/${batch.session}`)}
                      type="button"
                      className="btn btn-sm btn-block btn-outline-primary"
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
        </div>
      </div>
    </>
  )

}


export default BatchList