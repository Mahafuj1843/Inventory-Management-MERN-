import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ExpenseCreateUpdate = lazy(() => import('../../components/Expense/ExpenseCreateUpdate'))

const ExpenseCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <ExpenseCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ExpenseCreateUpdatePage
