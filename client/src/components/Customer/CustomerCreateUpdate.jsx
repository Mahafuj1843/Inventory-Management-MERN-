import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, useLocation  } from 'react-router-dom';
import { createCustomerRequest, customerDetailsRequest, updateCustomerRequest } from '../../apiRequest/customerApiRequest';
import { ErrorToast, IsEmail, IsEmpty } from '../../helper/formHelper';
import { onChangeCustomerInput, resetFormInput } from '../../redux/state/customerSlice'
import store from "../../redux/store/store";

const CustomerCreateUpdate = () => {
  let navigate = useNavigate()
  let params = useParams()
  const location = useLocation();

  const FormValue = useSelector((state)=>(state.customer.FormValue))

  useEffect(()=>{
    if(params.id){
      customerDetailsRequest(params.id)
    }else{
      store.dispatch(resetFormInput())
    }
  },[location])

  const onSave = async () =>{
    if(IsEmpty(FormValue.name)){
      ErrorToast("Customer name requried.")
    }else if(IsEmail(FormValue.email)){
      ErrorToast("Invalid email address.")
    }else if(IsEmpty(FormValue.phone)){
      ErrorToast("Phone number required.")
    }else if(IsEmpty(FormValue.address)){
      ErrorToast("Address requrird.")
    }else{
      if(params.id){
        if(await updateCustomerRequest(FormValue, params.id)){
          navigate('/CustomerListPage')
        }
      }else{
        if(await createCustomerRequest(FormValue)){
          navigate('/CustomerListPage')
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
                                    {
                                      params.id ? <h5 >Update Customer</h5> : <h5 >Create Customer</h5>
                                    }
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Customer Name</label>
                                        <input onChange={(e)=>{store .dispatch(onChangeCustomerInput({name: 'name', value: e.target.value}))}} value={FormValue.name} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Email </label>
                                        <input onChange={(e)=>{store.dispatch(onChangeCustomerInput({name: 'email', value: e.target.value}))}} value={FormValue.email} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Mobile No</label>
                                        <input onChange={(e)=>{store.dispatch(onChangeCustomerInput({name: "phone", value:e.target.value}))}} value={FormValue.phone} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Address</label>
                                        <textarea autoCorrect='off' onChange={(e)=>{store.dispatch(onChangeCustomerInput({name: "address", value:e.target.value}))}} value={FormValue.address}  className="form-control form-control-sm" rows={4}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                    {params.id ? 
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

export default CustomerCreateUpdate
