import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const SupplierList = lazy(() => import('../../components/Supplier/SupplierList'))

const SupplierListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <SupplierList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default SupplierListPage