import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const SalesList = lazy(() => import('../../components/Sales/SalesList'))

const SalesListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <SalesList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default SalesListPage
