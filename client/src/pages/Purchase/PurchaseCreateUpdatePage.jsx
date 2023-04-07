import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const PurchaseCreateUpdate = lazy(() => import('../../components/Purchase/PurchaseCreateUpdate'))

const PurchaseCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <PurchaseCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default PurchaseCreateUpdatePage
