import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const SupplierCreateUpdate = lazy(() => import('../../components/Supplier/SupplierCreateUpdate'))

const SupplierCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <SupplierCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default SupplierCreateUpdatePage
