import axios from "axios";
import { ErrorToast } from "../helper/formHelper";
import { getToken } from "../helper/sessionHelper";
import { hideLoader, showLoader } from "../redux/state/settingSlice"
import store from "../redux/store/store"
import { setExpensesReport, setPurchaseReport, setReturnReport, setSalesReport } from "../redux/state/reportSlice";
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export async function expensesReportRequest(formData,toDate) {
    try {
        store.dispatch(showLoader())
        let PostBody={"formDate":formData+"T00:00:00.000+00:00","toDate":toDate+"T00:00:00.000+00:00"}
        let URL = BaseURL+"/expenses/report";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(hideLoader());
        if (result.status === 200 && result.data['status']==="success") {
            store.dispatch(setExpensesReport(result.data['data']))

        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export async function salesReportRequest(formData,toDate) {
    try {
        store.dispatch(showLoader())
        let PostBody={"formDate":formData+"T00:00:00.000+00:00","toDate":toDate+"T00:00:00.000+00:00"}
        let URL = BaseURL+"/sales/report";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(hideLoader());
        if (result.status === 200 && result.data['status']==="success") {
            store.dispatch(setSalesReport(result.data['data']))

        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export async function purchaseReportRequest(formData,toDate) {
    try {
        store.dispatch(showLoader())
        let PostBody={"formDate":formData+"T00:00:00.000+00:00","toDate":toDate+"T00:00:00.000+00:00"}
        let URL = BaseURL+"/purchases/report";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(hideLoader());
        if (result.status === 200 && result.data['status']==="success") {
            store.dispatch(setPurchaseReport(result.data['data']))
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export async function returnReportRequest(formData,toDate) {
    try {
        store.dispatch(showLoader())
        let PostBody={"formDate":formData+"T00:00:00.000+00:00","toDate":toDate+"T00:00:00.000+00:00"}
        let URL = BaseURL+"/returns/report";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(hideLoader());
        if (result.status === 200 && result.data['status']==="success") {
            store.dispatch(setReturnReport(result.data['data']))
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}