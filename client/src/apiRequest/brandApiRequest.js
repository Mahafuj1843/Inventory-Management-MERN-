import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { onChangeBrandInput, resetFormInput, setBrand, setBrandTotal } from "../redux/state/brandSlice";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import store from "../redux/store/store"
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const createBrandRequest = async (postBody) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/brands";
        const result = await axios.post(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Brand created.")
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

export const brandDetailsRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/brands/details/"+Id;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            let value=result.data.data[0];
            store.dispatch(onChangeBrandInput({name: "title", value: value.title}));
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

export const updateBrandRequest = async (postBody, Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/brands/"+Id;
        const result = await axios.put(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Brand updated successfully.")
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

export const deleteBrandRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/brands/"+Id;
        const result = await axios.delete(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200 && result.data.status === 'associate'){
            ErrorToast(result.data.msg)
            return false
        }else if(result.status === 200){
            SuccessToast("Brand has been deleted.")
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

export const brandListRequest = async (pageNo, perPage, searchKey) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/brands/List/"+pageNo+"/"+perPage+"/"+searchKey;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data[0].Row.length > 0){
                store.dispatch(setBrand(result.data.data[0].Row))
                store.dispatch(setBrandTotal(result.data.data[0].Total[0].total))
            }else{
                store.dispatch(setBrand([]))
                store.dispatch(setBrandTotal(0))
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