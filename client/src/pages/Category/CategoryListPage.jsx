import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const CategoryList = lazy(() => import('../../components/Category/CategoryList'))

const CategoryListPage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <CategoryList />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default CategoryListPage
