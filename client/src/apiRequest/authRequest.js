import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken, setToken, setUserDetails } from "../helper/sessionHelper";
import { setProduct, setTotal } from "../redux/state/productSlice";
import { setProfile } from "../redux/state/profileSlice";
import { hideLoader, showLoader } from "../redux/state/settingSlice";
import store from "../redux/store/store";
const BaseURL = "http://localhost:8800/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const RegistrationRequest = (fullname, username, email, password) => {
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/register";
    let PostBody = { fullname: fullname, username: username, email: email, password: password }
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast("Registration Successfull.")
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const LoginRequest = (email, password) => {
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/login";
    let PostBody = { email: email, password: password }
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            setToken(res.data.token)
            setUserDetails(res.data.data)
            SuccessToast("Login Successfull.")
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const ProfileDetailsRequest = () =>{
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/profile/details";
    return axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            store.dispatch(setProfile(res.data.data))
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const UpdateProfileRequest = (fullname,username,photo) =>{
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/updateProfile";
    let PostBody = { fullname: fullname, username: username, photo: photo }
    return axios.put(URL, PostBody, AxiosHeader).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast("Profile Updated Successfull.")
            setUserDetails(res.data.data)
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const ChangePasswordRequest = (oldPass, newPass) =>{
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/change/password";
    let PostBody = { oldPassword: oldPass, newPassword: newPass }
    return axios.put(URL, PostBody, AxiosHeader).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast(res.data)
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        }else if (err.response.data.status === 401) {
            ErrorToast(err.response.data.message)
            return false;
        } else if (err.response.data.status === 403) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const ForgetPasswordRequest = (email) =>{
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/forgotPassword";
    let PostBody = { email: email }
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast(res.data)
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const ResetPasswordRequest = (password, resetToken) =>{
    store.dispatch(showLoader())
    let PostBody = { password: password }
    let URL = BaseURL + "/auth/resetPassword/"+resetToken;
    return axios.put(URL, PostBody).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast(res.data)
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 401) {
            ErrorToast(err.response.data.message)
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

