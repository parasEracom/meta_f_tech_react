import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "./Slot.css";
import { Row, Col } from "react-bootstrap";
// import Logo from "./../../Images/logo.png";
import Loader from "../../Components/Loader/Loader";
import InfoPage from "../../Components/InfoPage/InfoPage";
import { Link, useNavigate } from "react-router-dom";
import GetFloatValue from "../../Common/GetFloatValue";
import { FiCopy } from "react-icons/fi";
import CopyFromtag from "../../Common/CopyFromtag";
import ReferralComponent from "../../Components/ReferralComponent";
import { BasicInfo, toastFailed, toastSuccess } from "./../../Config/BasicInfo";
import { ApiPaths } from "./../../Config/ApiPath";
import useAxiosHelper from "./../../Common/AxiosHelper";
import RotateLoader from "./../../Components/RotateLoader/RotateLoader";
import QRCode from "react-qr-code";
import KycStatus from "./../../Components/KycStatus/KyStatus"
import { useSelector, useDispatch } from "react-redux";
import { setUserPersonalInfo } from "../../Redux/ProfileDataSlice";
import { setIncomeWallet } from "../../Redux/IncomeWallet";
import { setTeamSection } from "../../Redux/TeamSlice";
import MyChart from "../../Components/MyChart/MyChart";
import ArrayToObject from "../../Common/ArrayToObject";
import Income from "./../../Images/income.png";
const Dashboard = () => {
  let myArray = Array.from({ length: 8 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const { AxiosGet } = useAxiosHelper();
  const [upiDetailsData, setUpiDetailsData] = useState({});
  const [totalInvestment, setTotaInvestment] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [rewardData, setRewardData] = useState([]);
  const [growthBonus, setGrowthBonus] = useState();
  const [companyData, setCompanyData] = useState([])
  // const [kycStatusShow, setKycStatusShow] = useState("pending")
  const profileData = useSelector(
    (state) => state.profileData.userPersonalInfo
  );
  const incomeData = useSelector((state) => state.incomeData.incomeWallet);
  const teamData = useSelector((state) => state.teamData?.teamSection);

  var x = 0;

  useEffect(() => {
    if (x === 0) {
      FetchData();
      fetchData();
      FetchBankDetails();
      FetchRank();
      // kycStatus()
      CompanyInfo();

      x++;
    }
  }, []);

  // async function kycStatus() {
  //   const res = await AxiosGet(ApiPaths.getKycStatus)
  //   setKycStatusShow(res?.overall_kyc_status)
  // }



  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }
  const FetchRank = async () => {
    try {
      setLoading(true);
      const tempRank = await AxiosGet(ApiPaths.getRanks);
      setRewardData(tempRank);
    } catch (error) {
      console.error("Error fetching payment transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  async function fetchData() {
    try {
      const [res1, res2, tempTeam] = await Promise.all([
        AxiosGet(ApiPaths.getProfile),
        AxiosGet(ApiPaths.getWallets),
        AxiosGet(ApiPaths.getTeams),
      ]);
      if (res1) dispatch(setUserPersonalInfo(res1));
      if (res2) {
        dispatch(setIncomeWallet(res2?.wallets));
        const objectToArray = ArrayToObject(res2?.wallets);
        setTotalIncome(objectToArray?.roi_level_income?.value);
        setGrowthBonus(objectToArray?.roi_income?.value);
        setTotaInvestment(objectToArray?.self_investment?.value);
      }
      if (tempTeam) dispatch(setTeamSection(tempTeam));
    } catch (error) {
      toastFailed(error?.tempTeam?.message);
      BasicInfo.isDebug && console.log(error);
    }
  }
  const FetchData = async () => {
    try {
      setLoading(true);

      const response = await AxiosGet(ApiPaths.getOrders);


    } catch (error) {
      console.error("Error fetching payment transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  const FetchBankDetails = async () => {
    try {
      setLoading(true);
      const res = await AxiosGet(ApiPaths.getPaymentMethod);
      toastSuccess(res?.data?.message);
      setUpiDetailsData(res?.activeOptions?.web3?.chains?.[0] || {});
    } catch (e) {
      toastFailed(e?.response?.data?.message);
      console.error("Error payment method transactions:", e);
    } finally {
      setLoading(false);
    }
  };

  // const handleKycClick = () => {
  //   navigate('/dashboard/kyc');
  // };
  // let kycStatus = 2






  return (
    <>
      {loading ? <Loader /> : null}

      <section className="dashboard">
        <div
          id="dashboardRefLink"
          style={{ border: "1px solid #252525" }}
          className="headerLinkDiv"
          onClick={() => CopyFromtag("profileLink")}
        >
          <div className="linktext">
            <p>your referral link</p>
            <h2 id="profileLink">{`${window.location.origin}/register?ref=${profileData?.username}`}</h2>
          </div>
          <i>
            <FiCopy />
          </i>
          <ReferralComponent
            link={`${window.location.origin}/register?ref=${profileData?.username}`}
          />
        </div>

        <section className="cappingSection mt-4">

          <KycStatus />
          {/* <div className="viewCappingDiv">
            <h1 className="textHeadingWithMargin">Statistics</h1>
          </div>
          {incomeData != null && incomeData ? (
            <MyChart
              className="dashboardChart"
              totalIncome={totalInvestment}
              totalInvestment={totalInvestment}
              totalEarned={totalIncome}
              growthBonus={growthBonus}
            />
          ) : (
            ""
          )} */}

        </section>
        {/* <h1 className="textHeadingWithMargin">Dashboard</h1> */}
        <Row md="12" style={{marginTop:"20px"}}>
          <Col lg="6" className="mb-2">
            <div className="dashboardMainAccountCard d-flex flex-column justify-content-between">
              <h5 className="dashboardCardHeading">User Account</h5>
              <div className="metaDiv">
                {/* <div>
                      <img src={User} alt="" />
                    </div> */}
                <div className="dashboardProfile">
                  <p>Username:</p>
                  <p>
                    {profileData?.username}({profileData?.name})
                  </p>
                </div>

                <div className="dashboardProfile">
                  <p>Joining Date:</p>
                  <p>
                    {" "}
                    {new Date(profileData?.joining_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="dashboardProfile">
                  <p>Activation Date:</p>
                  <p>
                    {new Date(
                      profileData?.Activation_date
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="dashboardProfile">
                  <p>Rank:</p>
                  <p>{profileData?.myrank?.rankName}</p>
                </div>

                {profileData?.overall_kyc_status == "approved" && <div className="dashboardProfile">
                  <p>KycStatus:</p>
                  {/* <p>{profileData?.overall_kyc_status}</p> */}

                  <p>
                    <span
                      style={{
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        display: "inline-block",
                        backgroundColor: profileData?.overall_kyc_status === "approved"
                          ? "green"
                          : profileData?.overall_kyc_status === "rejected"
                            ? "red"
                            : "orange"
                      }}
                    ></span>
                    {' '} {profileData?.overall_kyc_status}
                  </p>



                </div> }
                
              </div>
              <div className="mt-3">
                <div className="d-flex gap-2">
                  {/* <Link to="plans" className="flex-1" style={{ width: "100%" }}>
                    <button className="btnPrimary">Package Activation</button>
                  </Link> */}
                  <Link to="fund" className="flex-1" style={{ width: "100%" }}>
                    <button className="btnPrimary">Top Up Wallet</button>
                  </Link>
                </div>
              </div>

{/* <div style={{display:"flex", justifyContent:"space-around"}}>
  
<div className="mt-3" style={{width:"20%"}}>
                <div className="d-flex gap-2">
                  
                  <Link to="time-deposit-plan" className="flex-1" style={{ width: "100%" }}>
                    <button className="btnPrimary">Time Deposit</button>
                  </Link>
                </div>
              </div><div className="mt-3" style={{width:"20%"}}>
                <div className="d-flex gap-2">
                
                  <Link to="fixed-deposit-plan" className="flex-1" style={{ width: "100%" }}>
                    <button className="btnPrimary">Fixed Deposit</button>
                  </Link>
                </div>
              </div><div className="mt-3" style={{width:"20%"}}>
                <div className="d-flex gap-2">
                  
                  <Link to="growth-sip-plan" className="flex-1" style={{ width: "100%" }}>
                    <button className="btnPrimary">SIP</button>
                  </Link>
                </div>
              </div>
</div> */}
<div
  style={{
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap", // Enable wrapping for smaller screens
    // gap: "10px", // Add some spacing between the items
  }}
>
  <div className="mt-3" style={{ width: "20%", minWidth: "150px" }}>
    <div className="d-flex gap-2">
      <Link to="time-deposit-plan" className="flex-1" style={{ width: "100%" }}>
        <button className="btnPrimary" style={{ width: "100%" }}>
          Time Deposit
        </button>
      </Link>
    </div>
  </div>
  
  <div className="mt-3" style={{ width: "20%", minWidth: "150px" }}>
    <div className="d-flex gap-2">
      <Link to="fixed-deposit-plan" className="flex-1" style={{ width: "100%" }}>
        <button className="btnPrimary" style={{ width: "100%" }}>
          Fixed Deposit
        </button>
      </Link>
    </div>
  </div>
  
  <div className="mt-3" style={{ width: "20%", minWidth: "150px" }}>
    <div className="d-flex gap-2">
      <Link to="growth-sip-plan" className="flex-1" style={{ width: "100%" }}>
        <button className="btnPrimary" style={{ width: "100%" }}>
          SIP
        </button>
      </Link>
    </div>
  </div>
</div>



            </div>
          </Col>

          <Col
            md="6"
            className="gap-2 d-flex flex-column justify-content-between"
          >
            <Row>
              {incomeData?.map((x, i) => {
                return (
                  x?.wallet_type == "wallet" && (
                    <Col md="6" className="mb-2">
                      <div className="dashboardIncomeCard">
                        <div className="dashboardData">
                          <div>
                            <h5
                              className="dashboardCardHeading"
                              style={{ textTransform: "capitalize" }}
                            >
                              {x?.name}
                            </h5>
                            <h1>
                              {companyData?.currency} {parseFloat(x?.value).toFixed(2) ?? "0"}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )
                );
              })}
              <Col md="6" className="mb-2">
                <div className="dashboardIncomeCard">
                  <div className="dashboardData">
                    <div>
                      <h5
                        className="dashboardCardHeading"
                        style={{ textTransform: "capitalize" }}
                      >
                        Total Directs{" "}
                      </h5>
                      <h1>{teamData?.teamSection?.[0]?.total_team || "0"}</h1>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="mb-2">
                <div className="dashboardIncomeCard">
                  <div className="dashboardData">
                    <div>
                      <h5
                        className="dashboardCardHeading"
                        style={{ textTransform: "capitalize" }}
                      >
                        Total Teams{" "}
                      </h5>
                      <h1>{teamData?.sum?.total_team}</h1>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="mb-2">
                <div className="dashboardIncomeCard">
                  <div className="dashboardData">
                    <div>
                      <h5
                        className="dashboardCardHeading"
                        style={{ textTransform: "capitalize" }}
                      >
                        Total Business{" "}
                      </h5>
                      <h1>{companyData?.currency} {teamData?.sum?.business}</h1>
                    </div>
                  </div>
                </div>
              </Col>
              {/* <Col md="6" className="mb-3">
                <div className="dashboardIncomeCard">
                  <div className="dashboardData">
                    <div>
                      <h5
                        className="dashboardCardHeading"
                        style={{ textTransform: "capitalize" }}
                      >
                        SIP Business{" "}
                      </h5>
                      <h1>{companyData?.currency} {teamData?.sum?.}</h1>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="mb-3">
                <div className="dashboardIncomeCard">
                  <div className="dashboardData">
                    <div>
                      <h5
                        className="dashboardCardHeading"
                        style={{ textTransform: "capitalize" }}
                      >
                        Time Deposit Business{" "}
                      </h5>
                      <h1>{companyData?.currency} {teamData?.sum?.}</h1>
                    </div>
                  </div>
                </div>
              </Col> */}
            </Row>
          </Col>
          <Col
            lg="12"
            className="gap-2 d-flex flex-column justify-content-between"
          >
            <Row className="mt-5">
              {incomeData?.map((x, i) => {
                return (
                  x?.wallet_type == "income" && (
                    <Col md="3" className="mb-2">
                      <div className="dashboardIncomeCard">
                        <div className="dashboardData d-flex justify-content-between w-100">
                          <div>
                            <h5
                              className="dashboardCardHeading"
                              style={{ textTransform: "capitalize" }}
                            >
                              {x?.name}
                            </h5>
                            <h1>
                              {companyData?.currency} {parseFloat(x?.value).toFixed(2) ?? "0"}
                            </h1>
                          </div>
                          {/* <div>
                          <img src={Income} style={{ height: 40, width: 40 }} />
                        </div> */}
                        </div>
                      </div>
                    </Col>
                  )
                );
              })}
            </Row>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Dashboard;
