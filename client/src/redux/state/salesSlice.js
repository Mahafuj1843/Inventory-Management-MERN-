import { createSlice } from "@reduxjs/toolkit";
import { SuccessToast } from "../../helper/formHelper";

export const salesSlice = createSlice({
    name: 'sales',
    initialState:{
        Sales: [],
        Total: 0,
        customerDropdown: [],
        productDropdown: [],
        FormValue: {
            customerId: '',
            vatTax: '0',
            discount: '0',
            otherCost: '0',
            shippingCost: ''
        },
        salesItem: []
    },
    reducers:{
        setSales: (state, action)=>{
            state.Sales = action.payload
        },
        setSalesTotal: (state, action)=>{
            state.Total = action.payload
        },setCustomerDropdown: (state, action)=>{
            state.customerDropdown = action.payload
        },setProductDropdown: (state, action)=>{
            state.productDropdown = action.payload
        },onChangeSalesInput: (state, action)=>{ 
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        },
        addToCart: (state, action)=>{
            var temp = state.salesItem.find((items)=> items.productId === action.payload.productId)
                if(temp) SuccessToast('Product already added to cart.')
                else{
                    state.salesItem.push(action.payload)
                    SuccessToast('Product added to cart.')
                }
        },
        removeFromCart: (state, action)=>{
            state.salesItem.splice(action.payload, 1)
            SuccessToast('Product remove from cart.')
        },
        resetSalesItem: (state, action)=>{
            state.salesItem = []
        },setSalesItems: (state, action)=>{
            state.salesItem = action.payload
        }
    }
})

export const {  setSales, 
                setSalesTotal, 
                setCustomerDropdown, 
                setProductDropdown,
                onChangeSalesInput, 
                resetFormInput, 
                addToCart,
                removeFromCart,
                resetSalesItem,
                setSalesItems
            } = salesSlice.actions
export default salesSlice.reducer