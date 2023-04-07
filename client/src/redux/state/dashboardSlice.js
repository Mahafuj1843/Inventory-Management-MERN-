import {createSlice} from "@reduxjs/toolkit";

export const dashboardSlice=createSlice({
    name:'dashboard',
    initialState:{
        ExpenseChart:[],
        PurchaseChart:[],
        ReturnChart:[],
        SaleChart:[],
        ExpenseTotal:0,
        SaleTotal:0,
        PurchaseTotal:0,
        ReturnTotal:0,
    },
    reducers:{
        setExpenseChart:(state,action)=>{
            state.ExpenseChart=action.payload
        },
        setSaleChart:(state,action)=>{
            state.SaleChart=action.payload
        },
        setPurchaseChart:(state,action)=>{
            state.PurchaseChart=action.payload
        },
        setReturnChart:(state,action)=>{
            state.ReturnChart=action.payload
        },
        setExpenseTotal:(state,action)=>{
            state.ExpenseTotal=action.payload
        },
        setSaleTotal:(state,action)=>{
            state.SaleTotal=action.payload
        },
        setPurchaseTotal:(state,action)=>{
            state.PurchaseTotal=action.payload
        },
        setReturnTotal:(state,action)=>{
            state.ReturnTotal=action.payload
        }
    }
})
export  const { setExpenseChart,
    setSaleChart,
    setPurchaseChart,
    setReturnChart,
    setExpenseTotal,
    setSaleTotal,
    setPurchaseTotal,
    setReturnTotal } = dashboardSlice.actions;
export default  dashboardSlice.reducer;