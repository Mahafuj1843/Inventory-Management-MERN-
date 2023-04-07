import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({

    name: 'brand',
    initialState:{
        Brand: [],
        Total: 0,
        FormValue: {
            title: ''
        }
    },

    reducers:{
        setBrand:(state, action)=>{
            state.Brand = action.payload
        },
        setBrandTotal:(state, action)=>{
            state.Total = action.payload
        },
        onChangeBrandInput: (state, action)=>{
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        }
    }
})

export const {setBrand, setBrandTotal, onChangeBrandInput, resetFormInput} = brandSlice.actions
export default brandSlice.reducer