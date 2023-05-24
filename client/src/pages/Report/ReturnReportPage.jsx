import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ReturnReport = lazy(() => import('../../components/Report/ReturnReport'))

const ReturnReportPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnReport />
        </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ReturnReportPage
