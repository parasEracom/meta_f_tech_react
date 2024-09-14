import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import "./Footer.css";
import footer from "./../../Images/footerImg.svg";
import { ApiPaths } from "../../Config";
import axios from "axios";
import { Data } from "../../Common/Data";
const Footer = () => {
  const [dashboardData, setDashboardData] = useState([]);
  useEffect(() => {
    FetchData();
  }, []);
  function FetchData(checkload) {
    let userId = localStorage.getItem("userId");
    axios({
      method: "post",
      url: ApiPaths.dashboard,
      data: {
        u_id: userId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        // Data.isDebug && console.log("Footer", response);
        setDashboardData(response?.data);
      })
      .catch(function (response) {
        // Data.isDebug && console.log(response);
      });
  }
  return (
    <section className="footer">
      <p>2024 Meta F : All Right Reserved</p>
      <p>Terms and Conditions | User Agreement</p>
      <div className="socialIcons">
        {dashboardData?.telegram_link?.length == 0 && (
          <a href={dashboardData?.telegram_link} target="_blank">
            <i>
              <FaTelegramPlane />
            </i>{" "}
          </a>
        )}
        {dashboardData?.twitter_link?.length == 0 && (
          <a href={dashboardData?.twitter_link} target="_blank">
            <i>
              <FaTwitter />
            </i>{" "}
          </a>
        )}
        {dashboardData?.facebook_link?.length == 0 && (
          <a href={dashboardData?.facebook_link} target="_blank">
            <i>
              <FaFacebookF />
            </i>{" "}
          </a>
        )}
      </div>
      <img src={footer} alt="" />
    </section>
  );
};

export default Footer;
