import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
    name: 'expense',
    initialState:{
        Expense: [],
        Total: 0,
        ExpenseTypeDropdown: [],
        FormValue: {
            typeId: "",
            total: "",
            note: ""
        }
    },
    reducers:{
        setExpense: (state, action)=>{
            state.Expense = action.payload
        },
        setExpenseTotal: (state, action)=>{
            state.Total = action.payload
        },
        onChangeExpenseInput: (state, action)=>{
            state.FormValue[`${action.payload.name}`] = action.payload.value
        },resetFormInput: (state, action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i] = '')
        },setExpenseTypeDropdown: (state, action)=>{
            state.ExpenseTypeDropdown = action.payload
        }
    }
})

export const { setExpense, setExpenseTotal, onChangeExpenseInput, resetFormInput, setExpenseTypeDropdown } = expenseSlice.actions
export default expenseSlice.reducer