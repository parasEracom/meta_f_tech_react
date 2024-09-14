import React, { useState } from "react";
import "./Header.css";
import Logo from "./../../Images/logo.png";
import Logo1 from "./../../Images/logo.png";
import LogoIcon from "./../../Images/logoIcon.png";
import User from "./../../Images/user.png";
import { FiCopy } from "react-icons/fi";
import { HiMoon } from "react-icons/hi2";
import { HiSun } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiMenu } from "react-icons/fi";
import { setSidebarDisplay } from "./../../Redux/SideDisplaySlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CopyFromtag from "../../Common/CopyFromtag";
import PlayStore from "./../../Images/playstore.png";
import AppleStore from "./../../Images/applestore.png";
import { IoIosNotifications } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import ReferralComponent from "../ReferralComponent";
const Header = (props) => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(Logo);
  const [settingDisplay, setSettingDisplay] = useState("none");
  const [alertmsg, setAlertmsg] = useState("-130px");
  const dispatch = useDispatch();
  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };
  const Dark = () => {
    setLogo(Logo);
    let ThemeColor = document.querySelector(":root");
    var rs = getComputedStyle(ThemeColor);
    ThemeColor.style.setProperty("--bodyColor", "#151515");
    ThemeColor.style.setProperty("--containerColor", "#1D1D1D");
    ThemeColor.style.setProperty("--textHeading", "#FFFFFF");
    ThemeColor.style.setProperty("--sideActiveColor", "#FFFFFF");
    ThemeColor.style.setProperty("--lightColor", "#252525");
    ThemeColor.style.setProperty("--borderColor", "#fff");
    ThemeColor.style.setProperty("--darkLightText", "#fff");
    ThemeColor.style.setProperty("--darkLightBackground", "#181818");
    ThemeColor.style.setProperty("--activeTextColor", "#FFFFFF");
    ThemeColor.style.setProperty("--textColor", "white");
    ThemeColor.style.setProperty("--rewardCardActive", "#73ba3f2b ");
    ThemeColor.style.setProperty("--rewardCardInactive", "#72ba3f0c ");
    ThemeColor.style.setProperty("--colorPrimary", "#f87735");
    ThemeColor.style.setProperty("--boxShadow", "none");
  };
  const Light = () => {
    setLogo(Logo1);
    let ThemeColor = document.querySelector(":root");
    ThemeColor.style.setProperty("--bodyColor", "rgb(244, 247, 252)");
    ThemeColor.style.setProperty("--containerColor", "#fff");
    ThemeColor.style.setProperty("--textHeading", "black;");
    ThemeColor.style.setProperty("--sideActiveColor", "#000");
    ThemeColor.style.setProperty("--lightColor", "#d3ebd494");
    ThemeColor.style.setProperty("--borderColor", "#fff");
    ThemeColor.style.setProperty("--darkLightText", "#f87735");
    ThemeColor.style.setProperty("--darkLightBackground", "#EFEFEF");
    ThemeColor.style.setProperty("--activeTextColor", "Black");
    ThemeColor.style.setProperty("--textColor", "black");
    ThemeColor.style.setProperty("--rewardCardActive", "#f87735 ");
    ThemeColor.style.setProperty("--rewardCardInactive", "#f87735");
    ThemeColor.style.setProperty("--colorPrimary", "#f87735 ");
    ThemeColor.style.setProperty("--boxShadow", "0 0 12px 0 #1d438347;");
  };
  function LogOut() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <div className="header">
        <div className="alertMsg" id="CopiedMsg" style={{ top: alertmsg }}>
          Link Copied!
        </div>
        <div>
          <Link to="/dashboard">
            <img id="logoicon" src={Logo} alt="logo.png" />
          </Link>
          <div className="headerLogoLink headerLinkHeader">
            <div className="headerLinkDiv">
              <div className="linktext">
                <p>your referral link</p>
                <h2 id="headerLink1">{props.link}</h2>
              </div>
              <i onClick={() => CopyFromtag("headerLink1")}>
                <FiCopy />
              </i>
              <ReferralComponent link={props.link} />
            </div>
          </div>
        </div>
        <div className="headerProfileColorDiv">
          {/* <div className="mobileStore">
            <img
              onClick={() => toastInfo("Will Available Soon")}
              src={PlayStore}
              alt="PlayStore"
            />
            <img
              onClick={() => toastInfo("Will Available Soon")}
              src={AppleStore}
              alt="AppleStore"
            />
          </div> */}
          <div className="themeChangeIcons">
            <p>
              color <br></br>mode
            </p>
            <i id="moon" onClick={Dark}>
              {" "}
              <HiMoon />
            </i>
            <i onClick={Light}>
              <HiSun />
            </i>
            <Link to="/dashboard/notification">
              <i>
                <MdNotificationsActive />
              </i>
            </Link>
          </div>
          {/* <i className="userIcon">
            <FaUserCircle />
          </i> */}

          <i
            className="menuIcon"
            onClick={() => dispatch(setSidebarDisplay("block"))}
          >
            <FiMenu />
          </i>
        </div>
      </div>
      <div className="usernameShow">
        <div className="usernameShowContent">
          <p>
            {props?.username}({props?.name})
          </p>
        </div>
        {props?.status == 0 ? (
          <div className="statusShow"></div>
        ) : (
          <div className="statusNotShow"></div>
        )}
      </div>
    </>
  );
};

export default Header;
