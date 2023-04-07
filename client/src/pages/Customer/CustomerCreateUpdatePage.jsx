import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const CustomerCreateUpdate = lazy(() => import('../../components/Customer/CustomerCreateUpdate'))

const CustomerCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <CustomerCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default CustomerCreateUpdatePage
