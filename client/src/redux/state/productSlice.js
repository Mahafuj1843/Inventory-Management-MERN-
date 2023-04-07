import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name: 'product',
    initialState:{
        Product: [],
        Total: 0,
        categoryDropdown: [],
        brandDropdown: [],
        FormValue: {
            title: '',
            categoryId: '',
            brandId: '',
            unit: '',
            desc: ''
        }
    },

    reducers:{
        setProduct:(state, action)=>{
            state.Product = action.payload
        },
        setProductTotal:(state, action)=>{
            state.Total = action.payload
        },setCategoryDropdown: (state, action)=>{
            state.categoryDropdown = action.payload
        },setBrandDropdown: (state, action)=>{
            state.brandDropdown = action.payload
        },onChangeProductInput: (state, action)=>{ 
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        }
    }
})

export const {setProduct, setProductTotal, setCategoryDropdown, setBrandDropdown, onChangeProductInput, resetFormInput} = productSlice.actions
export default productSlice.reducer