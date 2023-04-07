import React, { Fragment, Suspense, lazy, useEffect } from 'react'
import { useSelector } from 'react-redux';
import LazyLoader from "../components/MasterLayout/LazyLoder";
import MasterLayout from '../components/MasterLayout/MasterLayout'
const ProductList = lazy(()=>import('../components/ProductList'))

const ProductPage = () => {
  const product = useSelector((state)=>state.product.Product)
  const total = useSelector((state)=>state.product.Total)
  return (
    <Fragment>
        <MasterLayout>   
                <Suspense fallback={<LazyLoader/>}>
                    <ProductList product={product} total={total}/>
                </Suspense>
            </MasterLayout>
    </Fragment>
  )
}

export default ProductPage