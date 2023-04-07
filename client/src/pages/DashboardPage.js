import React, { Fragment, Suspense, lazy, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { taskSummaryRequest } from '../apiRequest/authRequest';
import LazyLoader from "../components/MasterLayout/LazyLoder";
import MasterLayout from '../components/MasterLayout/MasterLayout'
// const Dashboard = lazy(()=>import('../components/Dashboard/Dashboard'))

const DashboardPage = () => {
  // useEffect(()=>{
  //   taskSummaryRequest()
  // }, [])
  // const task = useSelector((state)=>state.task.Summary)

  return (
    <Fragment> 
        <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            
          </Suspense>
        </MasterLayout>
    </Fragment>
  )
}

export default DashboardPage