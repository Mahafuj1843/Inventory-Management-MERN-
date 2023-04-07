import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { onChangeProductInput, resetFormInput, setBrandDropdown, setCategoryDropdown, setProduct, setProductTotal } from "../redux/state/productSlice";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import store from "../redux/store/store"
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const categoryDropdownRequest = async () =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/categories/dropDown";
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            store.dispatch(setCategoryDropdown(result.data.data))
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

export const brandDropdownRequest = async () =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/brands/dropDown";
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            store.dispatch(setBrandDropdown(result.data.data))
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

export const createProductRequest = async (postBody) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/products";
        const result = await axios.post(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Product created.")
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

export const productDetailsRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/products/details/"+Id;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            let value=result.data.data[0];
            store.dispatch(onChangeProductInput({name: "title", value: value.title}));
            store.dispatch(onChangeProductInput({name: "categoryId", value: value.categoryId}));
            store.dispatch(onChangeProductInput({name: "brandId", value: value.brandId}));
            store.dispatch(onChangeProductInput({name: "unit", value: value.unit}));
            store.dispatch(onChangeProductInput({name: "desc", value: value.desc}));
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

export const updateProductRequest = async (postBody, Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/products/"+Id;
        const result = await axios.put(url, postBody, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            SuccessToast("Product updated successfully.")
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

export const deleteProductRequest = async (Id) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/products/"+Id;
        const result = await axios.delete(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200 && result.data.status === 'associate'){
            ErrorToast(result.data.msg)
            return false
        }else if(result.status === 200){
            SuccessToast("Product has been deleted.")
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

export const productListRequest = async (pageNo, perPage, searchKey) =>{
    try {
        store.dispatch(showLoader())
        let url = BaseURL+"/products/List/"+pageNo+"/"+perPage+"/"+searchKey;
        const result = await axios.get(url, AxiosHeader);
        store.dispatch(hideLoader())
        if(result.status === 200){
            if(result.data.data[0].Row.length > 0){
                store.dispatch(setProduct(result.data.data[0].Row))
                store.dispatch(setProductTotal(result.data.data[0].Total[0].total))
            }else{
                store.dispatch(setProduct([]))
                store.dispatch(setProductTotal(0))
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