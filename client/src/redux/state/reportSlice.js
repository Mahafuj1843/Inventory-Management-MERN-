import {createSlice} from "@reduxjs/toolkit";

export const reportSlice = createSlice({
    name:'report',
    initialState:{
        SalesByDateList:[],
        ExpensesByDateList:[],
        PurchaseByDateList:[],
        ReturnByDateList:[]
    },
    reducers:{
        setSalesByDateList:(state,action)=>{
            state.SalesByDateList=action.payload
        },
        setExpensesByDateList:(state,action)=>{
            state.ExpensesByDateList=action.payload
        },
        setPurchaseByDateList:(state,action)=>{
            state.PurchaseByDateList=action.payload
        },
        setReturnByDateList:(state,action)=>{
            state.ReturnByDateList=action.payload
        }
    }
})

export  const {setSalesByDateList,setExpensesByDateList,setPurchaseByDateList,setReturnByDateList}=reportSlice.actions;
export default  reportSlice.reducer;