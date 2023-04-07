import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { onChangeExpenseInput, setExpense, setExpenseTotal, setExpenseTypeDropdown } from "../redux/state/expenseSlice";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import store from "../redux/store/store"
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const expenseTypeDropdownRequest = async () =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/expenses/type/dropDown";
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            store.dispatch(setExpenseTypeDropdown(result.data.data))
        }else{
            ErrorToast("Something went wrong.")
            return false;
        }
    } catch (error) {
        store.dispatch(hideLoader());
        ErrorToast("Something went wrong.")
        return false;
    }
}

export const createExpenseRequest = async (postBody) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/expenses";
        const result = await axios.post(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Expense has been created.")
            return true;
        }else{
            ErrorToast("Something went wrong.")
            return false;
        }
    } catch (error) {
        store.dispatch(hideLoader());
        ErrorToast("Something went wrong.")
        return false;
    }
}

export const expenseDetailsRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/expenses/details/"+Id;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            let value=result.data.data[0];
            store.dispatch(onChangeExpenseInput({name: "typeId", value: value.typeId}));
            store.dispatch(onChangeExpenseInput({name: "total", value: value.total}));
            store.dispatch(onChangeExpenseInput({name: "note", value: value.note}));
            return true;
        }else{
            ErrorToast("Something went wrong.")
            return false;
        }
    } catch (error) {
        store.dispatch(hideLoader());
        ErrorToast("Something went wrong.")
        return false;
    }
}

export const updateExpenseRequest = async (postBody, Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/expenses/"+Id;
        const result = await axios.put(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Expense has been update.")
            return true;
        }else{
            ErrorToast("Something went wrong.")
            return false;
        }
    } catch (error) {
        store.dispatch(hideLoader());
        ErrorToast("Something went wrong.")
        return false;
    }
}

export const deleteExpenseRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/expenses/"+Id;
        const result = await axios.delete(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200 && result.data.status === 'associate'){
            ErrorToast(result.data.msg)
            return false
        }else if(result.status === 200){
            SuccessToast("Expense has been Deleted.")
            return true;
        }else{
            ErrorToast("Something went wrong.")
            return false;
        }
    } catch (error) {
        store.dispatch(hideLoader());
        ErrorToast("Something went wrong.")
        return false;
    }
}

export const expenseListRequest = async (pageNo, perPage, searchKey) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/expenses/List/"+pageNo+"/"+perPage+"/"+searchKey;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data[0].Row.length > 0){
                store.dispatch(setExpense(result.data.data[0].Row))
                store.dispatch(setExpenseTotal(result.data.data[0].Total[0].total))
            }else{
                store.dispatch(setExpense([]))
                store.dispatch(setExpenseTotal(0))
                ErrorToast("No data found.")
            }
        }else{
            ErrorToast("Something went wrong.")
        }
    } catch (error) {
        store.dispatch(hideLoader());
        ErrorToast("Something went wrong.")
    }
}