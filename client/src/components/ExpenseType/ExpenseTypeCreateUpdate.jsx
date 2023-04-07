import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createExpenseTypeRequest, expenseTypeDetailsRequest, updateExpenseTypeRequest } from '../../apiRequest/expenseTypeApiRequest';
import { onChangeExpenseTypeInput, resetFormInput } from '../../redux/state/expenseTypeSlice';
import { useSelector } from 'react-redux';
import { ErrorToast, IsEmpty } from '../../helper/formHelper';
import store from '../../redux/store/store';

const ExpenseTypeCreateUpdate = () => {
  let navigate = useNavigate()
  let params = useParams()
  const location = useLocation();

  const FormValue = useSelector((state)=>(state.expenseType.FormValue))

  useEffect(()=>{
    if(params.id){
      expenseTypeDetailsRequest(params.id)
    }else{
      store.dispatch(resetFormInput())
    }
  },[location])

  const onSave = async () =>{
    if(IsEmpty(FormValue.title)){
      ErrorToast("Expense type requried.")
    }else{
      if(params.id){
        if(await updateExpenseTypeRequest(FormValue, params.id)){
          navigate('/ExpenseTypeListPage')
        }
      }else{
        if(await createExpenseTypeRequest(FormValue)){
          navigate('/ExpenseTypeListPage')
        }
      }
    }
  }
  return (
    <Fragment>
      <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                { params.id ? <h5 >Update Expense Type</h5> : <h5 >Create Expense Type</h5>}
                                <hr className="bg-light"/>

                                <div className="col-4 p-2">
                                    <label className="form-label">Expense Type Name</label>
                                    <input onChange={(e)=>{store.dispatch(onChangeExpenseTypeInput({name:"title", value:e.target.value}))}} value={FormValue.title} className="form-control form-control-sm" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 p-2">
                                    { params.id ? 
                                      <button onClick={onSave} className="btn btn-sm my-3 btn-success">Update</button>
                                      :
                                      <button onClick={onSave} className="btn btn-sm my-3 btn-success">Create</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ExpenseTypeCreateUpdate
