import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ReturnList = lazy(() => import('../../components/Return/ReturnList'))

const ReturnListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <ReturnList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ReturnListPage