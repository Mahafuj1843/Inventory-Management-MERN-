import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const BrandList = lazy(() => import('../../components/Brand/BrandList'))

const BrandListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <BrandList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default BrandListPage
