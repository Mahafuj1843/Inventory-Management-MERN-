import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const PurchaseReport = lazy(() => import('../../components/Report/PurchaseReport'))

const PurchaseReportPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <PurchaseReport />
        </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default PurchaseReportPage
