import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Components/Header/Header";
import "./LandingPage.css";
import { RxDashboard } from "react-icons/rx";
import { BsGraphUp } from "react-icons/bs";
import { TbReportAnalytics, TbReport, TbLogout, TbMoneybag } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineHistory } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { GiDiamondTrophy } from "react-icons/gi";
import { RiFundsFill } from "react-icons/ri";
import { FaMoneyBillTransfer, FaRankingStar } from "react-icons/fa6";

import { MdOutlineSupport } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Logo from "./../../Images/logo.png";
import NavPages from "../../NavPages";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarDisplay } from "./../../Redux/SideDisplaySlice";
import { IoIosArrowUp } from "react-icons/io";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { ApiPaths } from "../../Config/ApiPath";
import axios from "axios";
import ScrollToTop from "../../Common/ScrollToTop";
import { IoIosGift } from "react-icons/io";
import { FaWallet } from "react-icons/fa";
import { BasicInfo, toastFailed, toastSuccess } from "../../Config/BasicInfo";
import { setUserPersonalInfo } from "../../Redux/ProfileDataSlice";
import useAxiosHelper from "../../Common/AxiosHelper";
const LandingPage = () => {
  const sideDisplay = useSelector((state) => state.sideDisplay.value);
  const [alertmsg, setAlertmsg] = useState("-130px");
  const [partnerSideIcon, setPartnerSideIcon] = useState("180deg");
  const [partnerDropdown, setPartnerDropdown] = useState("0px");
  const [partnerDropdownVisi, setPartnerDropdownVisi] = useState("hidden");
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const { AxiosGet } = useAxiosHelper();
  const profileData = useSelector(
    (state) => state.profileData.userPersonalInfo
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    fetchData();
    ScrollToTop();
  }, [location.pathname]);

  function LogoutFunc() {
    localStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    window.addEventListener("load", () => { });
  });
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  async function fetchData() {
    try {
      const res1 = await AxiosGet(ApiPaths.getProfile);

      if (res1) dispatch(setUserPersonalInfo(res1));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }
  function handleDropDown() {
    if (partnerSideIcon === "180deg") setPartnerSideIcon("180deg");
    else setPartnerSideIcon("180deg");
    if (partnerDropdown === "0px") setPartnerDropdown("0px");
    else setPartnerDropdown("0px");
    if (partnerDropdownVisi === "hidden") setPartnerDropdownVisi("hidden");
    else setPartnerDropdownVisi("hidden");

    if (width < 800) dispatch(setSidebarDisplay("none"));
  }
  function handleDrop() {
    if (partnerSideIcon === "180deg") setPartnerSideIcon("180deg");
    else setPartnerSideIcon("180deg");
    if (partnerDropdown === "0px") setPartnerDropdown("0px");
    else setPartnerDropdown("0px");
    if (partnerDropdownVisi === "hidden") setPartnerDropdownVisi("hidden");
    else setPartnerDropdownVisi("hidden");

    if (width < 800) dispatch(setSidebarDisplay("none"));
    setConfirmLogout(true);
  }
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });
    return windowDimensions;
  }
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if (width > 800) {
      dispatch(setSidebarDisplay("block"));
    } else {
      dispatch(setSidebarDisplay("none"));
    }
  }, [width]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  return (
    <>
      {confirmLogout ? (
        <div className="otpSection" style={{ zIndex: "999" }}>
          <div className="otpContainer">
            <h1>Logout</h1>
            <p>Are you sure you want to log out?</p>
            {
              <div>
                <button
                  className="btnSecondary"
                  onClick={() => setConfirmLogout(false)}
                >
                  No
                </button>
                <button className="btnPrimary" onClick={() => LogoutFunc()}>
                  Yes
                </button>
              </div>
            }
          </div>
        </div>
      ) : null}
      <section className="landingPage">
        <div className="alertMsg" style={{ top: alertmsg }}>
          Link Copied!
        </div>
        <Container>
          <section className="landingPageContent">
            <div className="sidebar" style={{ display: sideDisplay }}>
              <div className="sidebarlogoDiv">
                <Link to="/dashboard">
                  <img src={Logo} alt="" width="120px" height="120px" />
                </Link>
                <i onClick={() => dispatch(setSidebarDisplay("none"))}>
                  <RxCross2 />
                </i>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--textColor)",
                      marginBottom: "0",
                      paddingRight: "10px",
                    }}
                  >
                    {profileData?.name}({profileData?.username})
                  </p>
                </div>
                {profileData?.status == 0 ? (
                  <div
                    style={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                    }}
                  ></div>
                ) : (
                  <div
                    style={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      backgroundColor: "green",
                    }}
                  ></div>
                )}
              </div>

              <div id="sideItems">
                <NavLink
                  to="/dashboard"
                  end
                  exact={true}
                  activeClassName="activeTab"
                  onClick={handleDropDown}
                >
                  <div className="sideLink">
                    <i>
                      <RxDashboard />
                    </i>
                    <h5>Dashboard</h5>
                  </div>
                </NavLink>
                <NavLink
                  to="profile"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={() =>
                    width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                  }
                >
                  <div className="sideLink">
                    <i>
                      <BiUser />
                    </i>
                    <h5>Profile</h5>
                  </div>
                </NavLink>

                <NavLink
                  to="kyc"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={() =>
                    width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                  }
                >
                  <div className="sideLink">
                    <i>
                      <BiNews />
                    </i>
                    <h5>KYC</h5>
                  </div>
                </NavLink>
                {/* ///////////////////////////////////// */}
                {/* <div id="partnershipSideFullDiv">
                  <div
                    className="sideLink"
                    onClick={() => (
                      partnerSideIcon === "180deg"
                        ? setPartnerSideIcon("0deg")
                        : setPartnerSideIcon("180deg"),
                      partnerDropdown === "0px"
                        ? setPartnerDropdown("100px")
                        : setPartnerDropdown("0px"),
                      partnerDropdownVisi === "hidden"
                        ? setPartnerDropdownVisi("visible")
                        : setPartnerDropdownVisi("hidden")
                    )}
                  >
                    <i>
                      <HiOutlineUserGroup />
                    </i>
                    <div id="partnershipSideDiv">
                      <h5>Team </h5>
                      <i style={{ transform: `rotate(${partnerSideIcon})` }}>
                        <IoIosArrowUp />
                      </i>
                    </div>
                  </div>
                  <div
                    id="sideDropdown"
                    style={{
                      height: partnerDropdown,
                      visibility: partnerDropdownVisi,
                    }}
                  >
                    <NavLink
                      to="direct_team"
                      exact={true}
                      activeClassName="activeTab"
                      onClick={() =>
                        width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                      }
                    >
                      <p>Direct Team</p>
                    </NavLink>
                    <NavLink
                      to="generation_team"
                      exact={true}
                      activeClassName="activeTab"
                      onClick={() =>
                        width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                      }
                    >
                      <p>Generation Team</p>
                    </NavLink>
                    <NavLink
                      to="genealogy"
                      exact={true}
                      activeClassName="activeTab"
                      onClick={() =>
                        width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                      }
                    >
                      <p>Genealogy</p>
                    </NavLink>
                  </div>
                </div>

                <div id="partnershipSideFullDiv">
                  <div
                    className="sideLink"
                    onClick={() => (
                      partnerSideIcon === "180deg"
                        ? setPartnerSideIcon("0deg")
                        : setPartnerSideIcon("180deg"),
                      partnerDropdown === "0px"
                        ? setPartnerDropdown("100px")
                        : setPartnerDropdown("0px"),
                      partnerDropdownVisi === "hidden"
                        ? setPartnerDropdownVisi("visible")
                        : setPartnerDropdownVisi("hidden")
                    )}
                  >
                    <i>
                      <BsGraphUp />
                    </i>
                    <div id="partnershipSideDiv">
                      <h5>Packages </h5>
                      <i style={{ transform: `rotate(${partnerSideIcon})` }}>
                        <IoIosArrowUp />
                      </i>
                    </div>
                  </div>
                  <div
                    id="sideDropdown"
                    style={{
                      height: partnerDropdown,
                      visibility: partnerDropdownVisi,
                    }}
                  >
                    <NavLink
                      to="time-deposit-plan"
                      exact={true}
                      activeClassName="activeTab"
                      onClick={() =>
                        width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                      }
                    >
                      <p>Time Deposit</p>
                    </NavLink>
                    <NavLink
                      to="growth-sip-plan"
                      exact={true}
                      activeClassName="activeTab"
                      onClick={() =>
                        width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                      }
                    >
                      <p>Growth Plan (SIP)</p>
                    </NavLink>
                  </div>
                </div> */}
                {/* ////////////////////////////////////////////// */}


                <div id="partnershipSideFullDiv">
                  <div
                    className="sideLink"
                    onClick={() => handleDropdownToggle("fundDropdown")}
                  >
                    <i>
                      {/* <BsGraphUp /> */}
                      {/* <RiFundsFill /> */}
                      <TbMoneybag />
                    </i>
                    <div id="partnershipSideDiv">
                      <h5>Funds</h5>
                      <i
                        style={{
                          transform: `rotate(${activeDropdown === "fundDropdown" ? "180deg" : "0deg"})`,
                        }}
                      >
                        <IoIosArrowUp />
                      </i>
                    </div>
                  </div>
                  {activeDropdown === "fundDropdown" && (
                    <div id="sideDropdown">
                      <NavLink
                        to="fund"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Fund Deposit</p>
                      </NavLink>
                      <NavLink
                        to="fund-transfer"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Transfer Fund</p>
                      </NavLink>
                      <NavLink
                        to="fund-history"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Fund History</p>
                      </NavLink>
                    </div>
                  )}
                </div>

                <div id="partnershipSideFullDiv">
                  <div
                    className="sideLink"
                    onClick={() => handleDropdownToggle("packagesDropdown")}
                  >
                    <i>
                      <BsGraphUp />
                    </i>
                    <div id="partnershipSideDiv">
                      <h5>Packages </h5>
                      <i
                        style={{
                          transform: `rotate(${activeDropdown === "packagesDropdown" ? "180deg" : "0deg"})`,
                        }}
                      >
                        <IoIosArrowUp />
                      </i>
                    </div>
                  </div>
                  {activeDropdown === "packagesDropdown" && (
                    <div id="sideDropdown">
                      <NavLink
                        to="time-deposit-plan"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Time Deposit</p>
                      </NavLink>
                      <NavLink
                        to="fixed-deposit-plan"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Fixed Deposit</p>
                      </NavLink>
                      <NavLink
                        to="growth-sip-plan"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Growth Plan (SIP)</p>
                      </NavLink>
                    </div>
                  )}
                </div>

                <div id="partnershipSideFullDiv">
                  <div
                    className="sideLink"
                    onClick={() => handleDropdownToggle("teamDropdown")}
                  >
                    <i>
                      <HiOutlineUserGroup />
                    </i>
                    <div id="partnershipSideDiv">
                      <h5>Team </h5>
                      <i
                        style={{
                          transform: `rotate(${activeDropdown === "teamDropdown" ? "180deg" : "0deg"})`,
                        }}
                      >
                        <IoIosArrowUp />
                      </i>
                    </div>
                  </div>
                  {activeDropdown === "teamDropdown" && (
                    <div id="sideDropdown">
                      <NavLink
                        to="direct_team"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Direct Team</p>
                      </NavLink>
                      <NavLink
                        to="generation_team"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Generation Team</p>
                      </NavLink>
                      <NavLink
                        to="genealogy"
                        exact={true}
                        activeClassName="activeTab"
                        onClick={() => width < 800 && dispatch(setSidebarDisplay("none"))}
                      >
                        <p>Genealogy</p>
                      </NavLink>
                    </div>
                  )}
                </div>

              

                {/* <NavLink
                  to="plans"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={handleDropDown}
                >
                  <div className="sideLink">
                    <i>
                      <BsGraphUp />
                    </i>
                    <h5>Package</h5>
                  </div>
                </NavLink>
                <NavLink
                  to="fund"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={handleDropDown}
                >
                  <div className="sideLink">
                    <i>
                      <RiFundsFill />

                    </i>
                    <h5>Fund</h5>
                  </div>
                </NavLink>
                <NavLink
                  to="fund-transfer"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={handleDropDown}
                >
                  <div className="sideLink">
                    <i>
                      <FaMoneyBillTransfer />

                    </i>
                    <h5>Transfer Fund</h5>
                  </div>
                </NavLink> */}
                

                <NavLink
                  to="withdrawal_history"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={() =>
                    width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                  }
                >
                  <div className="sideLink">
                    <i>
                      <AiOutlineHistory />
                    </i>
                    <h5>Withdrawal History</h5>
                  </div>
                </NavLink>

                <NavLink
                  to="incomes"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={handleDropDown}
                >
                  <div className="sideLink">
                    <i>
                      <TbReportAnalytics />
                    </i>
                    <h5>Incomes</h5>
                  </div>
                </NavLink>
                {/* <NavLink
                  to="transactions"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={() =>
                    width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                  }
                >
                  <div className="sideLink">
                    <i>
                      <IoIosGift />
                    </i>
                    <h5>Referral Bonus</h5>
                  </div>
                </NavLink> */}

                {/* <NavLink
                  to="promo"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={() =>
                    width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                  }
                >
                  <div className="sideLink">
                    <i>
                      <FaRegStar />
                    </i>
                    <h5>Promo</h5>
                  </div>
                </NavLink> */}
                {/* <NavLink
                  to="bonanza"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={() =>
                    width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                  }
                >
                  <div className="sideLink">
                    <i>
                      <GiDiamondTrophy />
                    </i>
                    <h5>Bonanza</h5>
                  </div>
                </NavLink> */}
                <NavLink
                  to="reward"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={() =>
                    width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                  }
                >
                  <div className="sideLink">
                    <i>
                      <GiDiamondTrophy />
                    </i>
                    <h5>Royality</h5>
                  </div>
                </NavLink>
                <NavLink
                  to="ranks"
                  exact={true}
                  activeClassName="activeTab"
                  onClick={() =>
                    width < 800 ? dispatch(setSidebarDisplay("none")) : ""
                  }
                >
                  <div className="sideLink">
                    <i>
                      {/* <GiDiamondTrophy /> */}
                      <FaRankingStar />
                    </i>
                    <h5>Ranks</h5>
                  </div>
                </NavLink>
                

                <a onClick={handleDrop}>
                  <div className="sideLink">
                    <i>
                      <TbLogout />
                    </i>
                    <h5>Logout</h5>
                  </div>
                </a>
              </div>
            </div>
            <div className="dashboardPages">
              <Header
                link={
                  window.location.origin +
                  "/register?ref=" + profileData?.username
                }
                username={profileData?.username}
                name={profileData?.name}
                status={profileData?.status}
              />

              <NavPages />
            </div>
          </section>
          <Footer />
        </Container>
      </section>
    </>
  );
};

export default LandingPage;
