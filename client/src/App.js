import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Page404 from "./pages/Page404";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ChangePassPage from "./pages/ChangePassPage";
import ForgetPassPage from "./pages/ForgetPassPage";
import ResetPassPage from "./pages/ResetPassPage";
import FullscreenLoader from './components/MasterLayout/FullscreenLoader';
import { getToken } from './helper/sessionHelper';

import BrandCreateUpdatePage from "./pages/Brand/BrandCreateUpdatePage";
import BrandListPage from "./pages/Brand/BrandListPage";
import CategoryCreateUpdatePage from "./pages/Category/CategoryCreateUpdatePage";
import CategoryListPage from "./pages/Category/CategoryListPage";
import CustomerCreateUpdatePage from "./pages/Customer/CustomerCreateUpdatePage";
import CustomerListPage from "./pages/Customer/CustomerListPage";
import ExpenseTypeCreateUpdatePage from "./pages/ExpenseType/ExpenseTypeCreateUpdatePage";
import ExpenseTypeListPage from "./pages/ExpenseType/ExpenseTypeListPage";
import ExpenseListPage from "./pages/Expense/ExpenseListPage";
import ExpenseCreateUpdatePage from "./pages/Expense/ExpenseCreateUpdatePage";
import ProductCreateUpdatePage from "./pages/Product/ProductCreateUpdatePage";
import ProductListPage from "./pages/Product/ProductListPage";
import PurchaseCreateUpdatePage from "./pages/Purchase/PurchaseCreateUpdatePage";
import PurchaseListPage from "./pages/Purchase/PurchaseListPage";
import PurchaseReportPage from "./pages/Report/PurchaseReportPage";
import ReturnReportPage from "./pages/Report/ReturnReportPage";
import SalesReportPage from "./pages/Report/SalesReportPage";
import ExpenseReportPage from "./pages/Report/ExpenseReportPage";
import ReturnCreateUpdatePage from "./pages/Return/ReturnCreateUpdatePage";
import ReturnListPage from "./pages/Return/ReturnListPage";
import SalesCreateUpdatePage from "./pages/Sales/SalesCreateUpdatePage";
import SalesListPage from "./pages/Sales/SalesListPage";
import SupplierCreateUpdatePage from "./pages/Supplier/SupplierCreateUpdatePage";
import SupplierListPage from "./pages/Supplier/SupplierListPage";

const App = () => {
  if(getToken()){
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<DashboardPage />} />
            <Route exact path="/Profile" element={<ProfilePage />} />
            <Route exact path="/ChangePassword" element={<ChangePassPage />} />

            <Route exact path="/BrandCreateUpdatePage" element={<BrandCreateUpdatePage/>} />
            <Route exact path="/BrandUpdatePage/:id" element={<BrandCreateUpdatePage/>} />
            <Route exact path="/BrandListPage" element={<BrandListPage />} />

            <Route exact path="/CategoryCreateUpdatePage" element={<CategoryCreateUpdatePage />} />
            <Route exact path="/CategoryUpdatePage/:id" element={<CategoryCreateUpdatePage />} />
            <Route exact path="/CategoryListPage" element={<CategoryListPage />} />

            <Route exact path="/CustomerCreateUpdatePage" element={<CustomerCreateUpdatePage />} />
            <Route exact path="/CustomerCreateUpdatePage/:id" element={<CustomerCreateUpdatePage />} />
            <Route exact path="/CustomerListPage" element={<CustomerListPage />} />

            <Route exact path="/ExpenseTypeCreateUpdatePage" element={<ExpenseTypeCreateUpdatePage />} />
            <Route exact path="/ExpenseTypeUpdatePage/:id" element={<ExpenseTypeCreateUpdatePage />} />
            <Route exact path="/ExpenseTypeListPage" element={<ExpenseTypeListPage />} />

            <Route exact path="/ExpenseCreateUpdatePage" element={<ExpenseCreateUpdatePage />} />
            <Route exact path="/ExpenseCreateUpdatePage/:id" element={<ExpenseCreateUpdatePage />} />
            <Route exact path="/ExpenseListPage" element={<ExpenseListPage />} />

            <Route exact path="/ProductCreateUpdatePage" element={<ProductCreateUpdatePage />} />
            <Route exact path="/ProductUpdatePage/:id" element={<ProductCreateUpdatePage />} />
            <Route exact path="/ProductListPage" element={<ProductListPage />} />

            <Route exact path="/PurchaseCreateUpdatePage" element={<PurchaseCreateUpdatePage />} />
            <Route exact path="/PurchaseListPage" element={<PurchaseListPage />} />

            <Route exact path="/ReturnCreateUpdatePage" element={<ReturnCreateUpdatePage />} />
            <Route exact path="/ReturnListPage" element={<ReturnListPage />} />

            <Route exact path="/SalesCreateUpdatePage" element={<SalesCreateUpdatePage />} />
            <Route exact path="/SalesListPage" element={<SalesListPage />} />

            <Route exact path="/SupplierCreateUpdatePage" element={<SupplierCreateUpdatePage />} />
            <Route exact path="/SupplierUpdatePage/:id" element={<SupplierCreateUpdatePage />} />
            <Route exact path="/SupplierListPage" element={<SupplierListPage />} />

            <Route exact path="/PurchaseReportPage" element={<PurchaseReportPage />} />
            <Route exact path="/ReturnReportPage" element={<ReturnReportPage />} />
            <Route exact path="/SaleReportPage" element={<SalesReportPage />} />
            <Route exact path="/ExpenseReportPage" element={<ExpenseReportPage />} />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader/>
        <Toaster position="top-right" reverseOrder={false}/>
      </Fragment>
    )
  }
  else{
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
              <Route path="*" element={<Page404 />} />
              <Route exact path="/" element={<Navigate to='/Login' replace />} />
              <Route exact path="/Login" element={<LoginPage />} />
              <Route exact path="/Registration" element={<RegisterPage />} />
              <Route exact path="/ForgetPassword" element={<ForgetPassPage />} />
              <Route exact path="/ResetPassword/:token" element={<ResetPassPage />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader/>
        <Toaster position="top-right" reverseOrder={false}/>
      </Fragment>
    )
  }
}

export default App
