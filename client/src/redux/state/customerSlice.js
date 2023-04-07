import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name: 'customer',
    initialState:{
        Customer: [],
        Total: 0,
        FormValue: {
            name: '',
            email: '',
            phone: '',
            address: ""
        }
    },
    reducers:{
        setCustomer: (state, action)=>{
            state.Customer = action.payload
        },
        setCustomerTotal: (state, action)=>{
            state.Total = action.payload
        },
        onChangeCustomerInput: (state, action)=>{
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        }
    }
})

export const {setCustomer, setCustomerTotal, onChangeCustomerInput, resetFormInput} = customerSlice.actions
export default customerSlice.reducer