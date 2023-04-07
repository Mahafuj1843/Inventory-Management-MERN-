import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState:{
        Category: [],
        Total: 0,
        FormValue: {
            title: ''
        }
    },
    reducers:{
        setCategory: (state, action)=>{
            state.Category = action.payload
        },
        setCategoryTotal: (state, action)=>{
            state.Total = action.payload
        },
        onChangeCategoryInput: (state, action)=>{
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        }
    }
})

export const {setCategory, setCategoryTotal, onChangeCategoryInput, resetFormInput} = categorySlice.actions
export default categorySlice.reducer