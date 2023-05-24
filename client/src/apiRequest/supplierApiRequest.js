import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { setPurchase, setPurchaseTotal } from "../redux/state/purchaseSlice";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import { onChangeSupplierInput, resetFormInput, setSupplier, setSupplierTotal } from "../redux/state/supplierSlice";
import store from "../redux/store/store"
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const createSupplierRequest = async (postBody) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/suppliers";
        const result = await axios.post(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Supplier has been created.") 
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

export const supplierDetailsRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/suppliers/details/"+Id;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            let value=result.data.data[0];
            store.dispatch(onChangeSupplierInput({name: "name", value: value.name}));
            store.dispatch(onChangeSupplierInput({name: "email", value: value.email}));
            store.dispatch(onChangeSupplierInput({name: "phone", value: value.phone}));
            store.dispatch(onChangeSupplierInput({name: "address", value: value.address}));
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

export const updateSupplierRequest = async (postBody, Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/Suppliers/"+Id;
        const result = await axios.put(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Supplier has beeb updated.")
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

export const deleteSupplierRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/suppliers/"+Id;
        const result = await axios.delete(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200 && result.data.status === 'associate'){
            ErrorToast(result.data.data)
            return false
        }else if(result.status === 200){
            SuccessToast("Supplier has been Deleted.")
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

export const supplierListRequest = async (pageNo, perPage, searchKey) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/suppliers/List/"+pageNo+"/"+perPage+"/"+searchKey;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data[0].Row.length > 0){
                store.dispatch(setSupplier(result.data.data[0].Row))
                store.dispatch(setSupplierTotal(result.data.data[0].Total[0].total))
            }else{
                store.dispatch(setSupplier([]))
                store.dispatch(setSupplierTotal(0))
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