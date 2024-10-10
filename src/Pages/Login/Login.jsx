import React, { useEffect, useState } from "react";
import "./Login.css";
import Logo from "./../../Images/logo.png";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import Loader from "../../Components/Loader/Loader";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import useAxiosHelper from "./../../Common/AxiosHelper";
import { setAuthToken } from "./../../Redux/StatusState";
import { toast } from "react-toastify";
import { BasicInfo } from "./../../Config/BasicInfo";
import { ApiPaths } from "./../../Config/ApiPath";
import { setLoginDisplay } from "../../Redux/LoginSlice";
import { setRegisterDisplay } from "../../Redux/RegisterSlice";
import { useDispatch } from "react-redux";

import LoginImage from "./../../Images/loginFrontImage.png";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisility, setPasswordVisiblity] = useState(false);
  const dispatch = useDispatch();
  const { AxiosPost, AxiosGet } = useAxiosHelper();
  const toastSuccess = (msg) => toast.success(msg);
  const toastFailed = (msg) => toast.error(msg);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const basepath = process.env.REACT_APP_API_URL;
  const [companyData, setCompanyData] = useState()
  async function CompanyInfo() {
    try {
      let data = localStorage.getItem("companyData");
     BasicInfo.isDebug && console.log("LocalStorage Data:", JSON.parse(data));
      
      if (data) {
        // If data exists in localStorage, parse and set it
        setCompanyData(JSON.parse(data));
      } else {
        // If no data, make an API call to fetch the company info
        const response = await AxiosGet(ApiPaths.getCompanyDetails);
        
        // Assuming response?.company_info holds the data you need
        const companyData = response?.company_info;
        
        // Store the fetched data in localStorage
        localStorage.setItem("companyData", JSON.stringify(companyData));
        
        // Set the fetched data in the state
        setCompanyData(companyData);
        BasicInfo.isDebug && console.log("Fetched and stored company data:", companyData);
      }
    } catch (error) {
      BasicInfo.isDebug && console.log("Error fetching company data:", error);
    }
  }
  

  let x = 0
  useEffect(() => {
    if (x == 0) {
      CompanyInfo();
      x++
    }
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (token && token.length > 10) {
          const response = await axios.get(`${basepath}/get_profile`, {
            headers: { Authorization: token },
          });
          if (response) {
            BasicInfo.isDebug && console.log(response);
            localStorage.setItem("token", token);
            localStorage.setItem("userId", response?.data?.uid);
            navigate("/dashboard");
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        Login();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [username, password]);

  async function Login() {
    if (username?.length > 0 && password?.length > 0) {
      setLoading(true);
      try {
        setLoading(true);
        const body = {
          password: password,
          username: username,
        };
        const res = await AxiosPost(ApiPaths.login, body);
        // console.log("login", res);
        if (res.status == 200) {
          toastSuccess(res?.message);
          dispatch(setAuthToken(res?.token));
          localStorage.setItem("token", res?.token);
          localStorage.setItem("userId", JSON.stringify(res?.user?.uid));

          dispatch(setLoginDisplay(false));
          navigate("/dashboard");
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        toastFailed(error?.response?.data?.message);
        setLoading(false);
      }
    } else {
      toastFailed("Invalid Data");
    }
  }

  return (
    <>
      {loading ? <Loader /> : null}
      <Container id="logincontainer">
        <div className="loginContainerContent">
          <Row md="12">
            <Col md="6">
              <div className="loginSideContent">
                <img
                  id="loginImage"
                  src={LoginImage}
                  style={{ transform: "scale(-1, 1)" }}
                />
              </div>
            </Col>
            <Col md="6">
              {" "}
              <div className="loginContent">
                <a className="loginLogo" href={companyData?.contactInfo?.website}>
                  <img src={Logo} alt="logo.png" width="50px" height="50px" />
                </a>
                <p>sign in into your account</p>

                <div className="loginContent_inner">
                  <div className="loginInput_inner">
                    <span>Username</span>
                    <i>
                      <AiOutlineUser />
                    </i>
                    <input
                      autocomplete="off"
                      type="text"
                      placeholder="Enter your Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div
                      style={{ borderColor: "black !important" }}
                      className="partition"
                    ></div>
                  </div>
                  <div className="loginInput_inner">
                    <span>Password</span>

                    <i>
                      <HiLockClosed />
                    </i>
                    <input
                      autocomplete="off"
                      id="viewInput"
                      type={passwordVisility ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <i
                      id="eyeIcon"
                      onClick={() => setPasswordVisiblity(!passwordVisility)}
                    >
                      {passwordVisility ? <FaRegEye /> : <FaRegEyeSlash />}
                    </i>
                    <div className="partition"></div>
                  </div>
                  <div className="loginForgot_link">
                    <Link to="/forget_password">forgot password</Link>
                  </div>
                  <div className="loginFooter_btn">
                    <button
                      className="btnPrimary mb-2"
                      onClick={Login}
                      id="viewBtn"
                    >
                      Login
                    </button>
                    <p className="sign_log">Don't have an account?</p>
                    <Link to="/register" className="btnPrimary">
                      Register
                    </Link>
                    <h2 id="trustShlogan">
                      Your Gateway To <br />
                      <span
                        style={{
                          color: "#6E6A6A",

                          fontWeight: "700",
                          padding: "10px",
                        }}
                      >
                        Financial Freedom!
                      </span>
                    </h2>
                  </div>{" "}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Login;
