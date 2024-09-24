import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "./Slot.css";
import { Row, Col, Table } from "react-bootstrap";
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
import moment from "moment/moment";
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
  const [orderHistory, setOrderHistory] = useState([]);
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
      CompanyInfo();
      FetchOrderHistory(); // Fetch the order history

      x++;
    }
  }, []);

  const FetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await AxiosGet(ApiPaths.getOrders); // Assuming this API returns order history
      console.log("ordersssssss", response)
      setOrderHistory(response?.data || []); // Assuming 'orders' is the key for the list of orders
    } catch (error) {
      console.error("Error fetching order history:", error);
      toastFailed(error?.message);
    } finally {
      setLoading(false);
    }
  };


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

          {/* <section className="orderHistorySection mt-4">
          <h1 className="textHeadingWithMargin">Order History</h1>
          <div className="orderHistoryGridContainer">
            <Row>
              {orderHistory.length > 0 ? (
                orderHistory.map((order, index) => (
                  <Col
                    key={index}
                    md="3"
                    className="orderCard mb-3"
                    style={{ minHeight: "200px" }}
                  >
                    <div className="orderCardContent">
                      <h5>Order ID: {order.id}</h5>
                      <p>Status: {order.status}</p>
                      <p>Amount: {order.amount}</p>
                      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </Col>
                ))
              ) : (
                <p>No orders found</p>
              )}
            </Row>
          </div>
        </section> */}
          <h1 className="textHeadingWithMargin">Package Details</h1>

          <section className="orderHistorySection mt-4 ">
            {/* <h1 className="textHeadingWithMargin">Package Details</h1> */}
            <div className="orderHistoryTableContainer">
              {orderHistory.length > 0 ? (
                <Table striped responsive className="orderTable">
                  <thead>
                    <tr>
                      <th>Plan</th>
                      {/* <th>Status</th> */}
                      <th>Amount</th>
                      {/* <th>Order Date</th> */}
                      <th>Maturity Date</th>
                      {/* <th>Status</th> */}
                      {/* <th>Date</th> */}
                      {/* <th>Username(name)</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order, index) => (
                      <tr key={index}>
                        <td>{order.package_type}</td>
                        {/* <td>{order.status}</td> */}
                        <td>{order.amount}</td>
                        {/* <td>{moment(order.createdAt).format("DD MMM YY")}</td> */}
                        <td>{order?.maturity_Date} Months</td>

                        {/* {order?.status == "0" ? (
                          <td>Pending</td>
                        ) : order?.status == "1" ? (
                          <td style={{ color: "green" }}>Success</td>
                        ) : (
                          <td style={{ color: "red" }}>Rejected</td>
                        )} */}
                        {/* <td>{new Date(order?.order_Date).toLocaleDateString()}</td> */}
                        {/* <td>{order?.username}({order?.name})</td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No orders found</p>
              )}
            </div>
          </section>

          {/* <section
  className="orderHistorySection mt-4"
  style={{ backgroundColor: 'var(--containerColor)' }}
>
  <div className="orderHistoryTableContainer">
    {orderHistory.length > 0 ? (
      <Table striped responsive className="orderTable" style={{ color: 'var(--textColor)' }}>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Amount</th>
            <th>Maturity Date</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order, index) => (
            <tr key={index}>
              <td>{order.package_type}</td>
              <td>{order.amount}</td>
              <td>{order?.maturity_Date} Months</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <p style={{ color: 'var(--textColor)' }}>No orders found</p>
    )}
  </div>
              </section> */}


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
        <Row md="12" style={{ marginTop: "20px" }}>
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
                  <p>
                    <span
                      style={{
                        height: "10px", width: "10px", borderRadius: "50%", display: "inline-block", backgroundColor: profileData?.overall_kyc_status === "approved" ? "green" : profileData?.overall_kyc_status === "rejected" ? "red" : "orange"
                      }}
                    ></span>
                    {' '} {profileData?.overall_kyc_status}
                  </p>
                </div>}

              </div>
              <div className="mt-3">
                <div className="d-flex gap-2">
                  <Link to="fund" className="flex-1" style={{ width: "100%" }}>
                    <button className="btnPrimary">Top Up Wallet</button>
                  </Link>
                </div>
              </div>
              <div
                style={{
                  display: "flex", justifyContent: "space-around", flexWrap: "wrap", // Enable wrapping for smaller screens
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
          <Col lg="12" className="gap-2 d-flex flex-column justify-content-between" >
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
