import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const BrandCreateUpdate = lazy(() => import('../../components/Brand/BrandCreateUpdate'))

const BrandCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <BrandCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default BrandCreateUpdatePage
