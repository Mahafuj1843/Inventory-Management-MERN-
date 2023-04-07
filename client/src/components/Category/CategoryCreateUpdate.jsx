import React, { useEffect, Fragment } from 'react'
import { onChangeCategoryInput, resetFormInput } from '../../redux/state/categorySlice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { categoryDetailsRequest, createcategoryRequest, updateCategoryRequest } from '../../apiRequest/categoryApiRequest'
import store from '../../redux/store/store'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'

const CategoryCreateUpdate = () => {
  let navigate = useNavigate()
  let params = useParams()
  const location = useLocation();

  const FormValue = useSelector((state)=>(state.category.FormValue))

  useEffect(()=>{
    if(params.id){
      categoryDetailsRequest(params.id)
    }else{
      store.dispatch(resetFormInput())
    }
  },[location])

  const onSave = async () =>{
    if(IsEmpty(FormValue.title)){
      ErrorToast("Category name requried.")
    }else{
      if(params.id){
        if(await updateCategoryRequest(FormValue, params.id)){
          navigate('/CategoryListPage')
        }
      }else{
        if(await createcategoryRequest(FormValue)){
          navigate('/CategoryListPage')
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
                                { params.id ? <h5 >Update Category</h5> : <h5 >Create Category</h5>}
                                <hr className="bg-light"/>

                                <div className="col-4 p-2">
                                    <label className="form-label">Category Name</label>
                                    <input onChange={(e)=>{store.dispatch(onChangeCategoryInput({name:"title", value:e.target.value}))}} value={FormValue.title} className="form-control form-control-sm" type="text"/>
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

export default CategoryCreateUpdate
