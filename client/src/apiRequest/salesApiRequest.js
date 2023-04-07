import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { setCustomerDropdown, setProductDropdown, setSales, setSalesItems, setSalesTotal } from "../redux/state/salesSlice";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import store from "../redux/store/store"
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const customerDropdownRequest = async () =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/customers/dropDown";
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            store.dispatch(setCustomerDropdown(result.data.data))
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

export const productDropdownRequest = async () =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/products/dropDown";
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            store.dispatch(setProductDropdown(result.data.data))
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

export const createSalesRequest = async (parent, childs) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/sales";
        let postBody = { parent: parent, childs: childs}
        const result = await axios.post(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Sales created successfully.")
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

export const salesProductsRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/sales/products/"+Id;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data.length>0){
                store.dispatch(setSalesItems(result.data.data))
            }else{
                store.dispatch(setSalesItems([]))
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

export const deleteSalesRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/sales/"+Id;
        const result = await axios.delete(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200 && result.data.status === 'associate'){
            ErrorToast(result.data.msg)
            return false
        }else if(result.status === 200){
            SuccessToast("Sales has been Deleted.")
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

export const salesListRequest = async (pageNo, perPage, searchKey) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/sales/List/"+pageNo+"/"+perPage+"/"+searchKey;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data[0].Row.length > 0){
                store.dispatch(setSales(result.data.data[0].Row))
                store.dispatch(setSalesTotal(result.data.data[0].Total[0].total))
            }else{
                store.dispatch(setSales([]))
                store.dispatch(setSalesTotal(0))
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