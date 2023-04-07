import { createSlice } from "@reduxjs/toolkit";
import { SuccessToast } from "../../helper/formHelper";

export const returnSlice = createSlice({
    name: 'return',
    initialState:{
        Return: [],
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
        returnItem: []
    },
    reducers:{
        setReturn: (state, action)=>{
            state.Return = action.payload
        },
        setReturnTotal: (state, action)=>{
            state.Total = action.payload
        },setCustomerDropdown: (state, action)=>{
            state.customerDropdown = action.payload
        },setProductDropdown: (state, action)=>{
            state.productDropdown = action.payload
        },onChangeReturnInput: (state, action)=>{ 
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        },
        addToCart: (state, action)=>{
            var temp = state.returnItem.find((items)=> items.productId === action.payload.productId)
                if(temp) SuccessToast('Product already added to cart.')
                else{
                    state.returnItem.push(action.payload)
                    SuccessToast('Product added to cart.')
                }
        },
        removeFromCart: (state, action)=>{
            state.returnItem.splice(action.payload, 1)
            SuccessToast('Product remove from cart.')
        },
        resetReturnItem: (state, action)=>{
            state.returnItem = []
        },setReturnItems: (state, action)=>{
            state.returnItem = action.payload
        }
    }
})

export const {
                setReturn, 
                setReturnTotal, 
                setCustomerDropdown, 
                setProductDropdown,
                onChangeReturnInput, 
                resetFormInput, 
                addToCart,
                removeFromCart,
                resetReturnItem,
                setReturnItems
            } = returnSlice.actions
export default returnSlice.reducer