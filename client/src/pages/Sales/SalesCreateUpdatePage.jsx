import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const SalesCreateUpdate = lazy(() => import('../../components/Sales/SalesCreateUpdate'))

const SalesCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <SalesCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default SalesCreateUpdatePage
