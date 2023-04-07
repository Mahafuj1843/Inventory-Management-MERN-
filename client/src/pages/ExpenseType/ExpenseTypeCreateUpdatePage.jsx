import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ExpenseTypeCreateUpdate = lazy(() => import('../../components/ExpenseType/ExpenseTypeCreateUpdate'))

const ExpenseTypeCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <ExpenseTypeCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ExpenseTypeCreateUpdatePage
