import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const ExpenseReport = lazy(() => import('../../components/Report/ExpenseReport'))

const ExpenseReportPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseReport />
        </Suspense>
      </MasterLayout>
    </Fragment>
  )
}

export default ExpenseReportPage
