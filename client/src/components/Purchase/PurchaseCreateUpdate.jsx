import React, { Fragment } from 'react'
import { BsCartCheck, BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import store from '../../redux/store/store'
import { addToCart, onChangePurchaseInput, removeFromCart, resetFormInput, resetPurchaseItem } from '../../redux/state/purchaseSlice'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'
import { useRef } from 'react'
import CurrencyFormat from 'react-currency-format'
import { createPurchaseRequest, productDropdownRequest, supplierDropdownRequest } from '../../apiRequest/purchaseApiRequest'

const PurchaseCreateUpdate = () => {
    let location = useLocation()
    let navigate = useNavigate()
    let productRef, qtyRef, priceRef = useRef()
    useEffect(() => {
        (async () => {
            await supplierDropdownRequest()
            await productDropdownRequest()
            store.dispatch(resetFormInput())
            store.dispatch(resetPurchaseItem())
        })();
    }, [location])

    let supplierDropdown = useSelector((state) => state.purchase.supplierDropdown)
    let productDropdown = useSelector((state) => state.purchase.productDropdown)
    let formValue = useSelector((state) => state.purchase.FormValue)
    let purchaseItem = useSelector((state) => state.purchase.purchaseItem)

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
        if (IsEmpty(formValue.supplierId)) {
            ErrorToast('Supplier required.')
        } else if (IsEmpty(formValue.shippingCost)) {
            ErrorToast('Customer required.')
        } else if (IsEmpty(purchaseItem)) {
            ErrorToast('Your cart is Empty.')
        } else {
            if (await createPurchaseRequest(formValue, purchaseItem)) {
                navigate('/PurchaseListPage')
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
                                    <h5 >Create Purchase</h5>
                                    <hr className="bg-light" />
                                    <div className="col-12 p-1">
                                        <label className="form-label">Supplier</label>
                                        <select onChange={(e) => { store.dispatch(onChangePurchaseInput({ name: "supplierId", value: e.target.value })) }} className="form-select form-select-sm">
                                            <option value="">Select Supplier</option>
                                            {
                                                supplierDropdown.map((item, i) => {
                                                    return (<option key={i.toLocaleString()} value={item._id}>{item.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Vat/Tax (%)</label>
                                        <input onChange={(e) => { store.dispatch(onChangePurchaseInput({ name: "vatTax", value: e.target.value })) }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Discount (%)</label>
                                        <input onChange={(e) => { store.dispatch(onChangePurchaseInput({ name: "discount", value: e.target.value })) }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Other Cost</label>
                                        <input onChange={(e) => { store.dispatch(onChangePurchaseInput({ name: "otherCost", value: e.target.value })) }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Shipping Cost</label>
                                        <input onChange={(e) => { store.dispatch(onChangePurchaseInput({ name: "shippingCost", value: e.target.value })) }} className="form-control form-control-sm" type="number" />
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
                                                        purchaseItem.map((item, i) => {
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

export default PurchaseCreateUpdate
