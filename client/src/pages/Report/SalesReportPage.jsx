import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const SalesReport = lazy(() => import('../../components/Report/SalesReport'))

const SalesReportPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <SalesReport />
        </Suspense>
      </MasterLayout>
    </Fragment>
  )
}

export default SalesReportPage
