import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createExpenseRequest, expenseDetailsRequest, expenseTypeDropdownRequest, updateExpenseRequest } from '../../apiRequest/expenseApiRequest'
import { useSelector } from 'react-redux'
import { onChangeExpenseInput, resetFormInput } from '../../redux/state/expenseSlice'
import store from '../../redux/store/store'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'

const ExpenseCreateUpdate = () => {
  let navigate = useNavigate()
  let params = useParams()
  let location = useLocation()

  let expenseTypeDropdown = useSelector((state)=>state.expense.ExpenseTypeDropdown)
  let formValue = useSelector((state)=>state.expense.FormValue)

  useEffect(()=>{
    (async()=>{
      await expenseTypeDropdownRequest()

      if(params.id){
        await expenseDetailsRequest(params.id)
      }else{
        store.dispatch(resetFormInput())
      }
    })();
  },[location])

  const onSave = async () =>{
    if(IsEmpty(formValue.typeId)){
      ErrorToast('Expense Type requrired.')
    }else if(IsEmpty(formValue.total)){
      ErrorToast("Amount required.")
    }else if(IsEmpty(formValue.note)){
      ErrorToast('Note requried.')
    }else{
      if(params.id){
        if(await updateExpenseRequest(formValue, params.id)){
          navigate('/ExpenseListPage')
        }
      }else{
        if(await createExpenseRequest(formValue)){
          navigate('/ExpenseListPage')
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
                                { params.id ? <h5>Update Expense</h5> : <h5>Create Expense</h5> }
                                <hr className="bg-light"/>
                                <div className="col-6 p-2">
                                    <label className="form-label">Expense Type</label>
                                    <select onChange={(e)=>{store.dispatch(onChangeExpenseInput({name: 'typeId', value: e.target.value}))}} value={formValue.typeId} className="form-select form-select-sm">
                                        <option value="">Select Type</option>
                                        {
                                            expenseTypeDropdown.map((item,i)=>{
                                                return( <option key={i.toLocaleString()} value={item._id}>{item.title}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-6 p-2">
                                    <label className="form-label">Expense Amount</label>
                                    <input onChange={(e)=>{store.dispatch(onChangeExpenseInput({name:"total", value: e.target.value}))}} value={formValue.total} className="form-control form-control-sm" type="text"/>
                                </div>
                                <div className="col-12 p-2">
                                    <label className="form-label">Expense Note</label>
                                    <textarea onChange={(e)=>{store.dispatch(onChangeExpenseInput({name:"note", value: e.target.value}))}} value={formValue.note} className="form-control form-control-sm" type="text" rows={4} style={{resize: 'none'}}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 p-2">
                                    { params.id ? 
                                      <button onClick={onSave}  className="btn btn-sm my-3 btn-success">Update</button>
                                      :
                                      <button onClick={onSave}  className="btn btn-sm my-3 btn-success">Create</button>
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

export default ExpenseCreateUpdate
