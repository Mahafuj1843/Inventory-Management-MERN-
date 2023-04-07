import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ExpenseList = lazy(() => import('../../components/Expense/ExpenseList'))

const ExpenseListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <ExpenseList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default ExpenseListPage
