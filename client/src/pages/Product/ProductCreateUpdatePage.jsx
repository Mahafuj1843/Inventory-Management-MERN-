import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ProductCreateUpdate = lazy(() => import('../../components/Product/ProductCreateUpdate'))

const ProductCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <ProductCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ProductCreateUpdatePage
