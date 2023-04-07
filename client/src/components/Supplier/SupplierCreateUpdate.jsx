import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { onChangeSupplierInput, resetFormInput } from '../../redux/state/supplierSlice';
import { ErrorToast, IsEmail, IsEmpty } from '../../helper/formHelper';
import store from '../../redux/store/store'
import { createSupplierRequest, supplierDetailsRequest, updateSupplierRequest } from '../../apiRequest/supplierApiRequest';

const SupplierCreateUpdate = () => {
  let navigate = useNavigate()
  let params = useParams()
  const location = useLocation();

  const FormValue = useSelector((state) => (state.supplier.FormValue))

  useEffect(() => {
    if (params.id) {
      supplierDetailsRequest(params.id)
    } else {
      store.dispatch(resetFormInput())
    }
  }, [location])

  const onSave = async () => {
    if (IsEmpty(FormValue.name)) {
      ErrorToast("Supplier name requried.")
    } else if (IsEmail(FormValue.email)) {
      ErrorToast("Invalid email address.")
    } else if (IsEmpty(FormValue.phone)) {
      ErrorToast("Phone number required.")
    } else if (IsEmpty(FormValue.address)) {
      ErrorToast("Address requrird.")
    } else {
      if (params.id) {
        if(await updateSupplierRequest(FormValue, params.id)){
          navigate('/SupplierListPage')
        }
      } else {
        if(await createSupplierRequest(FormValue)){
          navigate('/SupplierListPage')
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
                  {params.id ? <h5 >Update Supplier</h5> : <h5 >Create Supplier</h5>}
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">Supplier Name</label>
                    <input onChange={(e) => { store.dispatch(onChangeSupplierInput({ name: "name", value: e.target.value })) }} value={FormValue.name} className="form-control form-control-sm" type="text" />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Mobile No</label>
                    <input onChange={(e) => { store.dispatch(onChangeSupplierInput({ name: "phone", value: e.target.value })) }} value={FormValue.phone} className="form-control form-control-sm" type="text" />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Email </label>
                    <input onChange={(e) => { store.dispatch(onChangeSupplierInput({ name: "email", value: e.target.value })) }} value={FormValue.email} className="form-control form-control-sm" type="text" />
                  </div>
                  <div className="col-12 p-2">
                    <label className="form-label">Address</label>
                    <textarea onChange={(e) => { store.dispatch(onChangeSupplierInput({ name: "address", value: e.target.value })) }} value={FormValue.address} className="form-control form-control-sm" rows={4} />
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

export default SupplierCreateUpdate
