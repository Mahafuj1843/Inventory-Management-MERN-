import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { setProductDropdown, setPurchase, setPurchaseItems, setPurchaseTotal, setSupplierDropdown } from "../redux/state/purchaseSlice";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import store from "../redux/store/store"
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const supplierDropdownRequest = async () =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/suppliers/dropDown";
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            store.dispatch(setSupplierDropdown(result.data.data))
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

export const createPurchaseRequest = async (parent, childs) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/purchases";
        let postBody = { parent: parent, childs: childs}
        const result = await axios.post(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Purchase created successfully.")
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

export const purchaseProductsRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/purchases/products/"+Id;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data.length>0){
                store.dispatch(setPurchaseItems(result.data.data))
            }else{
                store.dispatch(setPurchaseItems([]))
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

export const deletePurchaseRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/Purchases/"+Id;
        const result = await axios.delete(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200 && result.data.status === 'associate'){
            ErrorToast(result.data.msg)
            return false
        }else if(result.status === 200){
            SuccessToast("Purchase has been Deleted.")
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

export const purchaseListRequest = async (pageNo, perPage, searchKey) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/purchases/List/"+pageNo+"/"+perPage+"/"+searchKey;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data[0].Row.length > 0){
                store.dispatch(setPurchase(result.data.data[0].Row))
                store.dispatch(setPurchaseTotal(result.data.data[0].Total[0].total))
            }else{
                store.dispatch(setPurchase([]))
                store.dispatch(setPurchaseTotal(0))
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