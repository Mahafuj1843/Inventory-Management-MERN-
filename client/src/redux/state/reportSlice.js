import {createSlice} from "@reduxjs/toolkit";

export const reportSlice = createSlice({
    name:'report',
    initialState:{
        SalesByDateRange:[],
        ExpensesByDateRange:[],
        PurchaseByDateRange:[],
        ReturnByDateRange:[]
    },
    reducers:{
        setSalesReport:(state,action)=>{
            state.SalesByDateRange=action.payload
        },
        setExpensesReport:(state,action)=>{
            state.ExpensesByDateRange=action.payload
        },
        setPurchaseReport:(state,action)=>{
            state.PurchaseByDateRange=action.payload
        },
        setReturnReport:(state,action)=>{
            state.ReturnByDateRange=action.payload
        }
    }
})

export  const {setSalesReport,setExpensesReport,setPurchaseReport,setReturnReport}=reportSlice.actions;
export default  reportSlice.reducer;