import {configureStore} from "@reduxjs/toolkit";
import settingReducer from '../state/settingSlice'
import profileReducer from '../state/profileSlice'
import productReducer from '../state/productSlice'
import brandReducer from "../state/brandSlice";
import categoryReducer from "../state/categorySlice";
import customerReducer from "../state/customerSlice";
import dashboardReducer from "../state/dashboardSlice";
import expenseReducer from "../state/expenseSlice";
import expenseTypeReducer from "../state/expenseTypeSlice";
import purchaseReducer from "../state/purchaseSlice";
import reportReducer from "../state/reportSlice";
import returnReducer from "../state/returnSlice";
import salesReducer from "../state/salesSlice";
import supplierReducer from "../state/supplierSlice";

export default configureStore({
    reducer:{
        settings: settingReducer,
        profile: profileReducer,
        brand: brandReducer,
        category: categoryReducer,
        product: productReducer,
        customer: customerReducer,
        dashboard: dashboardReducer,
        expense: expenseReducer,
        expenseType: expenseTypeReducer,
        purchase: purchaseReducer,
        report: reportReducer,
        return: returnReducer,
        sales: salesReducer,
        supplier: supplierReducer
    }
})