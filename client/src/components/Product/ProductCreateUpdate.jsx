import React, { Fragment } from 'react'
import { onChangeProductInput, resetFormInput } from '../../redux/state/productSlice'
import store from '../../redux/store/store'
import { brandDropdownRequest, categoryDropdownRequest, createProductRequest, productDetailsRequest, updateProductRequest } from '../../apiRequest/productApiRequest'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const ProductCreateUpdate = () => {
  let navigate = useNavigate()
  let params = useParams()
  const location = useLocation();

  let categoryDropdown = useSelector((state) => state.product.categoryDropdown)
  let brandDropdown = useSelector((state) => state.product.brandDropdown)
  const FormValue = useSelector((state) => (state.product.FormValue))

  useEffect(() => {
    (async () => {
      categoryDropdownRequest()
      brandDropdownRequest()
      if (params.id) {
        productDetailsRequest(params.id)
      } else {
        store.dispatch(resetFormInput())
      }
    })();
  }, [location])

  const onSave = async () => {
    if (IsEmpty(FormValue.title)) {
      ErrorToast("Product name requried.")
    }else if (IsEmpty(FormValue.categoryId)) {
      ErrorToast("Category requried.")
    }else if (IsEmpty(FormValue.brandId)) {
      ErrorToast("Brand requried.")
    }else if (IsEmpty(FormValue.unit)) {
      ErrorToast("Unit requried.")
    }else if (IsEmpty(FormValue.desc)) {
      ErrorToast("Details requried.")
    } else {
      if (params.id) {
        if (await updateProductRequest(FormValue, params.id)) {
          navigate('/ProductListPage')
        }
      } else {
        if (await createProductRequest(FormValue)) {
          navigate('/ProductListPage')
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
                  {params.id ? <h5 >Update Product</h5> : <h5 >Create Product</h5>}
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">Product Name</label>
                    <input onChange={(e) => { store.dispatch(onChangeProductInput({ name: "title", value: e.target.value })) }} value={FormValue.title} className="form-control form-control-sm" type="text" />
                  </div>


                  <div className="col-4 p-2">
                    <label className="form-label">Product Category</label>
                    <select onChange={(e) => { store.dispatch(onChangeProductInput({ name: "categoryId", value: e.target.value })) }} value={FormValue.categoryId} className="form-select form-select-sm">
                      <option value="">Select category</option>
                      {
                        categoryDropdown.map((item, i) => {
                          return (<option key={i.toLocaleString()} value={item._id}>{item.title}</option>)
                        })
                      }
                    </select>
                  </div>


                  <div className="col-4 p-2">
                    <label className="form-label">Product Brand</label>
                    <select onChange={(e) => { store.dispatch(onChangeProductInput({ name: "brandId", value: e.target.value })) }} value={FormValue.brandId} className="form-select form-select-sm">
                      <option value="">Select brand</option>
                      {
                        brandDropdown.map((item, i) => {
                          return (<option key={i.toLocaleString()} value={item._id}>{item.title}</option>)
                        })
                      }
                    </select>
                  </div>


                  <div className="col-4 p-2">
                    <label className="form-label">Unit</label>
                    <input onChange={(e) => { store.dispatch(onChangeProductInput({ name: "unit", value: e.target.value })) }} value={FormValue.unit} className="form-control form-control-sm" type="text" />
                  </div>

                  <div className="col-12 p-2">
                    <label className="form-label">Details</label>
                    <textarea onChange={(e) => { store.dispatch(onChangeProductInput({ name: "desc", value: e.target.value })) }} value={FormValue.desc} className="form-control form-control-sm" type="text" rows={4} style={{resize: 'none'}}/>
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

export default ProductCreateUpdate
