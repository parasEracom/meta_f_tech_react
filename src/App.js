import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import AdminLogin from "./Pages/AdminLogin";
import TermsCondition from "./Pages/TermsConditions/TermsCondition";
import { ToastContainer } from "react-toastify";
import ReferralComponent from "./Components/ReferralComponent";
import LoginRegisterDap from "./Pages/LoginRegisterDap/LoginRegisterDap";
import { ApiPaths } from "./Config/ApiPath";
import { useEffect, useState } from "react";
import useAxiosHelper from "./Common/AxiosHelper";
function App() {

  const { AxiosGet } = useAxiosHelper();

  const [companyData, setCompanyData] = useState([])
  useEffect(() => {
    CompanyInfo();
  }, []);
  async function CompanyInfo() {
    try {
      const response = await AxiosGet(ApiPaths.getCompanyDetails);
      // console.log(response, "llllllllll");
      localStorage.setItem(
        "companyData",
        JSON.stringify(response?.company_info)
      );
      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }

  // async function CompanyInfo() {
  //   try {
  //     // Check if company data exists in localStorage
  //     const storedData = localStorage.getItem("companyData");
  
  //     if (storedData) {
  //       // If data exists in localStorage, set it to state
  //       setCompanyData(JSON.parse(storedData));
  //     } else {
  //       // If data doesn't exist, fetch from API
  //       const response = await AxiosGet(ApiPaths.getCompanyDetails);
  
  //       // Store the fetched data in localStorage
  //       localStorage.setItem(
  //         "companyData",
  //         JSON.stringify(response?.company_info)
  //       );
  
  //       // Set the company data to state
  //       setCompanyData(response?.company_info);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }




  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Page />}></Route> */}
          <Route path="/dashboard/*" element={<LandingPage />}></Route>
          <Route path="/page" element={<ReferralComponent />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forget_password" element={<ForgetPassword />}></Route>
          <Route path="/admin_login" element={<AdminLogin />}></Route>
          <Route path="/terms_conditions" element={<TermsCondition />}></Route>
          {/* <Route path="/" element={<LoginRegisterDap />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
