import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ExpenseTypeList = lazy(() => import('../../components/ExpenseType/ExpenseTypeList'))

const ExpenseTypeListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <ExpenseTypeList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ExpenseTypeListPage
