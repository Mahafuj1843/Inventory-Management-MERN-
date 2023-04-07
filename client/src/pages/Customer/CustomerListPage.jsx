import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const CustomerList = lazy(() => import('../../components/Customer/CustomerList'))

const CustomerListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <CustomerList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default CustomerListPage
