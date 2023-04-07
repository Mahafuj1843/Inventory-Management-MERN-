import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoder'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const CategoryCreateUpdate = lazy(() => import('../../components/Category/CategoryCreateUpdate'))

const CategoryCreateUpdatePage = () => {
  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <CategoryCreateUpdate />
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default CategoryCreateUpdatePage
