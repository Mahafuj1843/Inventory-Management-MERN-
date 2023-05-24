import React, { Fragment, Suspense, lazy, useEffect } from 'react'
import LazyLoader from "../components/MasterLayout/LazyLoder";
import MasterLayout from '../components/MasterLayout/MasterLayout'
const Dashboard = lazy(()=>import('../components/Dashboard'))

const DashboardPage = () => {

  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <Dashboard />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default DashboardPage