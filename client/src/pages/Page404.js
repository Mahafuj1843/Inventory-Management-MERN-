import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../helper/sessionHelper'

const Page404 = () => {
  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-success">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <Link to={`${getToken() ? '/' : '/Login'}`} className="btn btn-success text-d-n">Go Home</Link>
            </div>
        </div>
    </Fragment>
  )
}

export default Page404