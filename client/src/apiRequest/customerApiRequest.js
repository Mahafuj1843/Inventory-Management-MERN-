import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { onChangeCustomerInput, resetFormInput, setCustomer, setCustomerTotal } from "../redux/state/customerSlice";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import store from "../redux/store/store"
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const createCustomerRequest = async (postBody) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/customers";
        const result = await axios.post(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Customer created.") 
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

export const customerDetailsRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/customers/details/"+Id;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            let value=result.data.data[0];
            store.dispatch(onChangeCustomerInput({name: "name", value: value.name}));
            store.dispatch(onChangeCustomerInput({name: "email", value: value.email}));
            store.dispatch(onChangeCustomerInput({name: "phone", value: value.phone}));
            store.dispatch(onChangeCustomerInput({name: "address", value: value.address}));
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

export const updateCustomerRequest = async (postBody, Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/customers/"+Id;
        const result = await axios.put(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Customer updated.")
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

export const deleteCustomerRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/customers/"+Id;
        const result = await axios.delete(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200 && result.data.status === 'associate'){
            ErrorToast(result.data.msg)
            return false
        }else if(result.status === 200){
            SuccessToast("Customer has been Deleted.")
            store.dispatch(resetFormInput())
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

export const customerListRequest = async (pageNo, perPage, searchKey) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/customers/List/"+pageNo+"/"+perPage+"/"+searchKey;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data[0].Row.length > 0){
                store.dispatch(setCustomer(result.data.data[0].Row))
                store.dispatch(setCustomerTotal(result.data.data[0].Total[0].total))
            }else{
                store.dispatch(setCustomer([]))
                store.dispatch(setCustomerTotal(0))
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