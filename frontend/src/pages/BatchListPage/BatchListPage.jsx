import React, { useState, useEffect } from 'react'
import Loader from '../../Components/Loader/Loader'
import Layout from '../../Layout/Layout'
import apiServices from './service'
import defaultThumb from '../../assets/icons/thumbnail.svg'


const BatchList = ({ history }) => {

  const [loading, setLoading] = useState(false)
  const [batches, setBatches] = useState([])

  useEffect(() => {
    setLoading(true)
    apiServices.loadBatchList()
      .then(({ data }) => {
        setBatches(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)

      })
  }, [])

  return (
    <Layout>
      <div className='my-4'>
        <h2>Batches</h2>
        {loading ? (
          <Loader withoutBackground />
        ) : (
          <div className='row'>
            {batches.map(batch => (
              <div className="col-md-3">
                <div className="card mb-4 shadow-sm">
                  <img
                    className="card-img-top"
                    alt="Thumbnail"
                    style={{ height: "225px", width: "100%", display: "block" }}
                    src={defaultThumb}
                    data-holder-rendered="true"
                  />
                  <div className="card-body">
                    <h5>{batch.session}</h5>
                    <hr />
                    <div className="card-text">
                      <dl>
                        <dt>Total Alumnies</dt>
                        <dd>{batch.students}</dd>
                      </dl>
                    </div>
                    {/* <div className="d-flex justify-content-between align-items-center"> */}
                        <button type="button" className="btn btn-sm btn-block btn-outline-primary">OPEN</button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
        </div>
      </div>
    </Layout>
  )

}


export default BatchList