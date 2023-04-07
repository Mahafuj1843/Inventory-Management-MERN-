import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const PurchaseList = lazy(() => import('../../components/Purchase/PurchaseList'))

const PurchaseListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <PurchaseList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default PurchaseListPage
