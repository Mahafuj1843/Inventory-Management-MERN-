import React, { Fragment } from 'react'
import { BsCartCheck, BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { createSalesRequest, customerDropdownRequest, productDropdownRequest } from '../../apiRequest/salesApiRequest'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import store from '../../redux/store/store'
import { addToCart, onChangeSalesInput, removeFromCart, resetFormInput, resetSalesItem } from '../../redux/state/salesSlice'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'
import { useRef } from 'react'
import CurrencyFormat from 'react-currency-format'

const SalesCreateUpdate = () => {
    let location = useLocation()
    let navigate = useNavigate()
    let productRef, qtyRef, priceRef = useRef()
    useEffect(() => {
        (async () => {
            await customerDropdownRequest()
            await productDropdownRequest()
            store.dispatch(resetFormInput())
            store.dispatch(resetSalesItem())
        })();
    }, [location])

    let customerDropdown = useSelector((state) => state.sales.customerDropdown)
    let productDropdown = useSelector((state) => state.sales.productDropdown)
    let formValue = useSelector((state) => state.sales.FormValue)
    let salesItem = useSelector((state) => state.sales.salesItem)

    const OnAddToCart = async () => {
        if (IsEmpty(productRef.value)) {
            ErrorToast('Select a product.')
        } else if (IsEmpty(qtyRef.value)) {
            ErrorToast('Product quantity requrired.')
        } else if (IsEmpty(priceRef.value)) {
            ErrorToast('Product price requried.')
        } else {
            let item = {
                "productId": productRef.value,
                "title": productRef.selectedOptions[0].text,
                "qty": qtyRef.value,
                "price": priceRef.value,
                "total": (parseInt(qtyRef.value)) * (parseInt(priceRef.value))
            }
            store.dispatch(addToCart(item))
            productRef.value = ''
            qtyRef.value = ''
            priceRef.value = ''
        }
    }

    const onRemoveCart = (i) => {
        store.dispatch(removeFromCart(i))
    }

    const onSave = async () => {
        if (IsEmpty(formValue.customerId)) {
            ErrorToast('Customer required.')
        } else if (IsEmpty(formValue.shippingCost)) {
            ErrorToast('Customer required.')
        } else if (IsEmpty(salesItem)) {
            ErrorToast('Your cart is Empty.')
        } else {
            if (await createSalesRequest(formValue, salesItem)) {
                navigate('/SalesListPage')
            }
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Create Sales</h5>
                                    <hr className="bg-light" />
                                    <div className="col-12 p-1">
                                        <label className="form-label">Customer</label>
                                        <select onChange={(e) => { store.dispatch(onChangeSalesInput({ name: "customerId", value: e.target.value })) }} className="form-select form-select-sm">
                                            <option value="">Select Customer</option>
                                            {
                                                customerDropdown.map((item, i) => {
                                                    return (<option key={i.toLocaleString()} value={item._id}>{item.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Vat/Tax (%)</label>
                                        <input onChange={(e) => { store.dispatch(onChangeSalesInput({ name: "vatTax", value: e.target.value })) }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Discount (%)</label>
                                        <input onChange={(e) => { store.dispatch(onChangeSalesInput({ name: "discount", value: e.target.value })) }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Other Cost</label>
                                        <input onChange={(e) => { store.dispatch(onChangeSalesInput({ name: "otherCost", value: e.target.value })) }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Shipping Cost</label>
                                        <input onChange={(e) => { store.dispatch(onChangeSalesInput({ name: "shippingCost", value: e.target.value })) }} className="form-control form-control-sm" type="number" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={onSave} className="btn btn-sm my-3 btn-success">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-8 mb-3">
                        <div className="card  h-100">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-6  p-1">
                                        <label className="form-label">Select Product</label>
                                        <select ref={(input) => productRef = input} className="form-select form-select-sm">
                                            <option value="">Select Product</option>
                                            {
                                                productDropdown.map((item, i) => {
                                                    return (<option key={i.toLocaleString()} value={item._id}>{item.title}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Qty</label>
                                        <input ref={(input) => qtyRef = input} className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Unit Price</label>
                                        <input ref={(input) => priceRef = input} className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Add to cart</label>
                                        <button onClick={OnAddToCart} className="btn w-100 btn-success btn-sm"><BsCartCheck /></button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive table-section">
                                            <table className="table-sm text-center table">
                                                <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Qty</th>
                                                        <th>Unit Price</th>
                                                        <th>Total</th>
                                                        <th>Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        salesItem.map((item, i) => {
                                                            return (
                                                                <tr key={i.toLocaleString()}>
                                                                    <td>{item.title}</td>
                                                                    <td>{item.qty}</td>
                                                                    <td>
                                                                        <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </td>
                                                                    <td>
                                                                        <CurrencyFormat value={item.total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </td>
                                                                    <td><button onClick={onRemoveCart.bind(this, i)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"><BsTrash /></button></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
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

export default SalesCreateUpdate
