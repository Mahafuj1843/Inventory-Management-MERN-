import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ProductList = lazy(() => import('../../components/Product/ProductList'))

const ProductListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <ProductList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ProductListPage