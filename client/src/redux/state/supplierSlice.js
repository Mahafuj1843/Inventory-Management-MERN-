import { createSlice } from "@reduxjs/toolkit";

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState:{
        Supplier: [],
        Total: 0,
        FormValue: {
            name: '',
            email: '',
            phone: '',
            address: ""
        }
    },

    reducers:{
        setSupplier: (state, action)=>{
            state.Supplier = action.payload
        },
        setSupplierTotal: (state, action)=>{
            state.Total = action.payload
        },onChangeSupplierInput: (state, action)=>{
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        }
    }
})

export const {setSupplier, setSupplierTotal, onChangeSupplierInput, resetFormInput} = supplierSlice.actions
export default supplierSlice.reducer