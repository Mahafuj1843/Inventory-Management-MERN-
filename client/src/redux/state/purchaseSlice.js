import { createSlice } from "@reduxjs/toolkit";
import { SuccessToast } from "../../helper/formHelper";

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState:{
        Purchase: [],
        Total: 0,
        supplierDropdown: [],
        productDropdown: [],
        FormValue: {
            supplierId: '',
            vatTax: '0',
            discount: '0',
            otherCost: '0',
            shippingCost: ''
        },
        purchaseItem: []
    },
    reducers:{
        setPurchase: (state, action)=>{
            state.Purchase = action.payload
        },
        setPurchaseTotal: (state, action)=>{
            state.Total = action.payload
        },setSupplierDropdown: (state, action)=>{
            state.supplierDropdown = action.payload
        },setProductDropdown: (state, action)=>{
            state.productDropdown = action.payload
        },onChangePurchaseInput: (state, action)=>{ 
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        },
        addToCart: (state, action)=>{
            var temp = state.purchaseItem.find((items)=> items.productId === action.payload.productId)
                if(temp) SuccessToast('Product already added to cart.')
                else{
                    state.purchaseItem.push(action.payload)
                    SuccessToast('Product added to cart.')
                }
        },
        removeFromCart: (state, action)=>{
            state.purchaseItem.splice(action.payload, 1)
            SuccessToast('Product remove from cart.')
        },
        resetPurchaseItem: (state, action)=>{
            state.purchaseItem = []
        },
        setPurchaseItems: (state, action)=>{
            state.purchaseItem = action.payload
        }
    }
})

export const {
                setPurchase, 
                setPurchaseTotal, 
                setSupplierDropdown, 
                setProductDropdown,
                onChangePurchaseInput, 
                resetFormInput, 
                addToCart,
                removeFromCart,
                resetPurchaseItem,
                setPurchaseItems
            } = purchaseSlice.actions
export default purchaseSlice.reducer