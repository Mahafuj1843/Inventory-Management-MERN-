import { createSlice } from "@reduxjs/toolkit";

export const expenseTypeSlice = createSlice({
    name: 'expenseType',
    initialState:{
        ExpenseType: [],
        Total: 0,
        FormValue: {
            title: ''
        }
    },
    reducers:{
        setExpenseType: (state, action)=>{
            state.ExpenseType = action.payload
        },
        setExpenseTypeTotal: (state, action)=>{
            state.Total = action.payload
        },
        onChangeExpenseTypeInput: (state, action)=>{
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        }
    }
})

export const {setExpenseType, setExpenseTypeTotal, onChangeExpenseTypeInput, resetFormInput} = expenseTypeSlice.actions
export default expenseTypeSlice.reducer