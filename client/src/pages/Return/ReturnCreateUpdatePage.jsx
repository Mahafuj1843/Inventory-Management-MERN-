import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ReturnCreateUpdate = lazy(() => import('../../components/Return/ReturnCreateUpdate'))

const ReturnCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <ReturnCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ReturnCreateUpdatePage
