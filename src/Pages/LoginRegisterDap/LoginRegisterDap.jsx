import React, { useEffect, useState } from "react";
import Logo from "./../../Images/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { ApiPaths } from "../../Config";
import Loader from "../../Components/Loader/Loader";
import Trust3 from "./../../Images/trust3.png";
import { Data, toastFailed } from "../../Common/Data";
import ConnectButton from "../../Components/ConnectButton";
import { Link, useNavigate } from "react-router-dom";
import "./LoginRegisterDap.css";
// import LoginImage from "./../../Images/loginFrontImage.png";

import { useSelector } from "react-redux";
const LoginRegisterDap = () => {
  const [sponsorUsername, setSponsorUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const acc = useSelector((state) => state.account.value);
  const navigate = useNavigate();
  useEffect(() => {
    const after = window.location.search.slice(
      window.location.search.indexOf("=") + 1
    );
    setSponsorUsername(after);
  }, []);

  function LoginFunc() {
    localStorage.clear();
    if (acc != null && acc.length > 0) {
      setLoading(true);
      axios({
        method: "post",
        url: ApiPaths.login,
        data: {
          wallet_address: acc,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log(response);
          if (response?.data?.res == "found") {
            localStorage.setItem("userId", response?.data?.u_id);
            localStorage.setItem("token", response?.data?.token);
            navigate("/dashboard");
            setLoading(false);
          } else {
            toastFailed(response?.data?.message);
            setLoading(false);
          }
          setLoading(false);
        })
        .catch(function (response) {
          setLoading(false);
        });
    } else {
      toastFailed("Please connect your wallet");
    }
  }

  async function RegisterFunc() {
    localStorage.clear();
    let valid = await registerValidation();
    if (valid) {
      setLoading(true);
      axios({
        method: "post",
        url: ApiPaths.register,
        data: {
          referrer_id: sponsorUsername,
          wallet_address: acc,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log(response);
          if (response?.data?.res == "success") {
            localStorage.setItem("userId", response?.data?.u_id);
            localStorage.setItem("token", response?.data?.token);
            navigate("/dashboard");
            setLoading(false);
          } else {
            toastFailed(response?.data?.error.replace(/<\/?p>/g, ""));
            setLoading(false);
          }
          setLoading(false);
        })
        .catch(function (response) {
          setLoading(false);
        });
    }
  }
  async function registerValidation() {
    if (sponsorUsername.length > 0) {
      if (acc != null && acc.length > 0) {
        return true;
      } else {
        toastFailed("Please connect your wallet");
        return false;
      }
    } else {
      toastFailed("Invalid sponsor username");
      return false;
    }
  }

  return (
    <>
      {loading ? <Loader /> : null}

      <Container id="logincontainer">
        <div className="loginContainerContent">
          <div className="loginContent">
            <div className="loginHeaderContent">
              <div>
                <a className="loginLogo" href={Data.websiteLink}>
                  <img src={Logo} alt="logo.png" />
                </a>
              </div>
              <ConnectButton />
            </div>
            <div className="loginContent_inner">
              <h1 className="heading">Automatic Registration</h1>
              <div className="loginInputs">
                <div className="loginInput_inner mb-2">
                  <input
                    type="text"
                    placeholder="Sponsor Username"
                    value={sponsorUsername}
                    onChange={(e) => setSponsorUsername(e.target.value)}
                  />
                  <i>
                    <AiOutlineUser />
                  </i>
                </div>
              </div>
              <div className="loginFooter_btn">
                <button
                  className="btnPrimary mb-2"
                  onClick={RegisterFunc}
                  id="viewBtn"
                >
                  Register
                </button>
                <p className="sign_log">Already have an account?</p>
                <Link onClick={() => LoginFunc()} className="btnPrimary">
                  Automatic Login
                </Link>
              </div>
              {/* <img id="trustedLogo" src={Trust} alt="trusted" /> */}
              <img id="handImage" src={Trust3} alt="trusted" />
              <h2 id="trustShlogan">Be Loyal to Your Soil:</h2>
              <h1 style={{ color: "DarkGreen", fontWeight: "700" }}>
                Compost!
              </h1>
            </div>
          </div>
          {/* <img src={LoginImage} width="50%" /> */}
        </div>{" "}
      </Container>
    </>
  );
};

export default LoginRegisterDap;
