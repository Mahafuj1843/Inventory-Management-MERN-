import axios from "axios";
import { ErrorToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import store from "../redux/store/store"
import { setExpenseChart, setExpenseTotal, setPurchaseChart, setPurchaseTotal, setReturnChart, setReturnTotal, setSaleChart, setSaleTotal } from "../redux/state/dashboardSlice";
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export async function expensesSummaryRequest(){
    try {
        store.dispatch(showLoader())
        let URL=BaseURL+"/expenses/summary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(setExpenseChart(res.data['data'][0]['Last30Days']))
            store.dispatch(setExpenseTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(hideLoader())
        ErrorToast("Something Went Wrong")
    }
}

export async function returnSummaryRequest(){
    try {
        store.dispatch(showLoader())
        let URL=BaseURL+"/returns/summary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(setReturnChart(res.data['data'][0]['Last30Days']))
            store.dispatch(setReturnTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(hideLoader())
        ErrorToast("Something Went Wrong")
    }
}

export async function saleSummaryRequest(){
    try {
        store.dispatch(showLoader())
        let URL=BaseURL+"/sales/summary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(setSaleChart(res.data['data'][0]['Last30Days']))
            store.dispatch(setSaleTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(hideLoader())
        ErrorToast("Something Went Wrong")
    }
}

export async function purchaseSummaryRequest(){
    try {
        store.dispatch(showLoader())
        let URL=BaseURL+"/purchases/summary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(setPurchaseChart(res.data['data'][0]['Last30Days']))
            store.dispatch(setPurchaseTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(hideLoader())
        ErrorToast("Something Went Wrong")
    }
}