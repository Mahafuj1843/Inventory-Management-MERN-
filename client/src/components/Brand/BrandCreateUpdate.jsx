import React, { Fragment, useEffect } from 'react'
import { onChangeBrandInput, resetFormInput } from '../../redux/state/brandSlice'
import store from '../../redux/store/store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { brandDetailsRequest, createBrandRequest, updateBrandRequest } from '../../apiRequest/brandApiRequest'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'

const BrandCreateUpdate = () => {
  let navigate = useNavigate()
  let params = useParams()
  const location = useLocation();

  const FormValue = useSelector((state)=>(state.brand.FormValue))

  useEffect(()=>{
    if(params.id){
      brandDetailsRequest(params.id)
    }else{
      store.dispatch(resetFormInput())
    }
  },[location])

  const onSave = async () =>{
    if(IsEmpty(FormValue.title)){
      ErrorToast("Brand name requried.")
    }else{
      if(params.id){
        if(await updateBrandRequest(FormValue, params.id)){
          navigate('/BrandListPage')
        }
      }else{
        if(await createBrandRequest(FormValue)){
          navigate('/BrandListPage')
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
                                { params.id ? <h5 >Update Brand</h5> : <h5 >Create Brand</h5>}
                                <hr className="bg-light"/>

                                <div className="col-4 p-2">
                                    <label className="form-label">Brand Name</label>
                                    <input onChange={(e)=>{store.dispatch(onChangeBrandInput({name:"title", value:e.target.value}))}} value={FormValue.title} className="form-control form-control-sm" type="text"/>
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

export default BrandCreateUpdate
