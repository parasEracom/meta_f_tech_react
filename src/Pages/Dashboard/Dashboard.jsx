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
import PopUp from "../../Components/PayNowPopUp/PopUp";
import moment from "moment/moment";
import UnpaidInstallments from "../../Components/UnpaidInstallments/UnpaidInstallments";
const Dashboard = () => {
  let myArray = Array.from({ length: 8 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const { AxiosGet, AxiosPost } = useAxiosHelper();
  const [upiDetailsData, setUpiDetailsData] = useState({});
  const [totalInvestment, setTotaInvestment] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [rewardData, setRewardData] = useState([]);
  const [growthBonus, setGrowthBonus] = useState();
  const [companyData, setCompanyData] = useState([])
  const [orderHistory, setOrderHistory] = useState([]);
  const [upcomingSips, setUpcomingSips] = useState([]);
  const [unpaidInstallments, setUnpaidInstallments] = useState([]);
  const [showPopUp, setShowPopUp] = useState({ visible: false, sipId: null, amount: null, maturityDate: null, installmentId: null });

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
      getUpcomingSip()
      getUnpaidInstallments()
      x++;
    }
  }, []);

  const getUnpaidInstallments = async () => {
    try {
      setLoading(true);
      const response = await AxiosGet(ApiPaths.getUnpaidSip);
      BasicInfo.isDebug && console.log("Unpaid Installments Data:", response?.data);

      if (response.success && Array.isArray(response.data)) {
        // Flatten the unpaid installments array and store it
        const unpaidInstallments = response.data.flatMap(item => item.unpaidInstallments || []);
        setUnpaidInstallments(unpaidInstallments); // Store the unpaid installments data array
      } else {
        toastFailed("Failed to fetch unpaid installments");
      }
    } catch (error) {
      BasicInfo.isDebug && console.error("Error fetching unpaid installments:", error);
      toastFailed(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const payInstallment = async (sip_Id, installment_id, amount, maturityDate) => {
    setLoading(true);
    try {
      const body = {
        sip_Id: parseInt(sip_Id),
        installment_id: parseInt(installment_id),
      };
      BasicInfo.isDebug && console.log(body, "pppppppppppppppppppppppppppp")
      const response = await AxiosPost(ApiPaths.payInstallment, body);
      if (response?.data?.status == true) {
        toastSuccess(response?.message);
      } else {
        toastFailed("Coming Soon");
      }
    } catch (e) {
      BasicInfo.isDebug && console.error("Error:", e);
      toastFailed(e?.response?.data?.message || "Failed to pay installment.");
    } finally {
      setLoading(false);
    }
  };
  const FetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await AxiosGet(ApiPaths.getOrders); // Assuming this API returns order history
      BasicInfo.isDebug && console.log("ordersssssss", response)
      setOrderHistory(response?.data || []); // Assuming 'orders' is the key for the list of orders
    } catch (error) {
      BasicInfo.isDebug && console.error("Error fetching order history:", error);
      toastFailed(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const getUpcomingSip = async () => {
    try {
      setLoading(true);
      const response = await AxiosGet(ApiPaths.getUpcomingSip); // Fetch upcoming SIPs
      BasicInfo.isDebug && console.log("getUpcomingSipppppppppp", response);
      // Sort the data by installment_date in ascending order (earliest date first)
      const sortedSips = response?.data.sort((a, b) =>
        new Date(a.nextUpcomingInstallment.installment_Date) - new Date(b.nextUpcomingInstallment.installment_Date)
      );
      setUpcomingSips(sortedSips || []); // Store the sorted data
      // setPendingSips(response?.data || []); // Store the SIP data
    } catch (error) {
      BasicInfo.isDebug && console.error("Error fetching pending SIPs:", error);
      toastFailed(error?.message);
    } finally {
      setLoading(false);
    }
  };
  // const handlePayNow = async (sipId, installment_id) => {
  //   try {
  //     setLoading(true);
  //     const body = {
  //       sip_Id: parseInt(sipId),
  //       installment_id: parseInt(installment_id),
  //     };
  //     const response = await AxiosPost(ApiPaths.payInstallment, body); // Assuming there's an API for making the payment
  //     BasicInfo.isDebug && console.log("Pay Now for SIP ID:", sipId);
  //     toastFailed("Coming Soon");
  //     getUpcomingSip(); // Refresh the SIPs list after payment
  //   } catch (error) {
  //     BasicInfo.isDebug && console.error("Error processing payment:", error);
  //     toastFailed(error?.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleProceedClick = (sipId, amount, maturityDate, installmentId) => {
    BasicInfo.isDebug && console.log(sipId, "=>Sip")
    BasicInfo.isDebug && console.log(amount, "=>amount")
    BasicInfo.isDebug && console.log(maturityDate, "=>maturityDate")
    BasicInfo.isDebug && console.log(installmentId, "=>installmentId")
    setShowPopUp({ visible: true, sipId, amount, maturityDate, installmentId });
  };
  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }
  const FetchRank = async () => {
    try {
      setLoading(true);
      const tempRank = await AxiosGet(ApiPaths.getRanks);
      setRewardData(tempRank);
    } catch (error) {
      BasicInfo.isDebug && console.error("Error fetching payment transactions:", error);
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
      BasicInfo.isDebug && console.error("Error fetching payment transactions:", error);
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
      BasicInfo.isDebug && console.error("Error payment method transactions:", e);
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
          <section className="unpaidInstallmentsSection mt-4">
            {unpaidInstallments.length > 0 ? (
              <>
                <h1 className="textHeadingWithMargin">Unpaid Installments</h1>
                {/* <div className="row">
                  {unpaidInstallments.map((installment) => (
                    <div key={installment._id} className="col-12 mb-3">
                      <div className="card " style={{ borderRadius: '8px', border: "none" }}>
                        <div className="card-body" style={{ background: "var(--containerColor", color: "var(--textColor)" }}>

                          <div className="d-flex flex-wrap justify-content-between align-items-center">
                            <div style={{ flex: '1 1 100%', display: 'flex', justifyContent: 'space-between' }}>
                              <h5 className="card-title">SIP ID: {installment.sip_Id}</h5>
                            </div>

                            <div style={{ flex: '1 1 100%', display: 'flex', justifyContent: 'space-between' }}>
                              <p className="card-text">Installment No.:</p>
                              <p className="card-text">{installment.installment_id}</p>
                            </div>

                            <div style={{ flex: '1 1 100%', display: 'flex', justifyContent: 'space-between' }}>
                              <p className="card-text">Amount:</p>
                              <p className="card-text">{installment.installment_amount}</p>
                            </div>

                            <div style={{ flex: '1 1 100%', display: 'flex', justifyContent: 'space-between' }}>
                              <p className="card-text">Installment Date:</p>
                              <p className="card-text">
                                {moment(installment.installment_Date).format("DD MMM YYYY")}
                              </p>
                            </div>

                            <div style={{ flex: '1 1 auto', marginTop: "10px" }}>
                              <button
                                className="btnPrimary"
                                onClick={() =>
                                  handleProceedClick(
                                    installment.sip_Id,
                                    installment.installment_amount,
                                    installment.installment_Date,
                                    installment.installment_id
                                  )
                                }
                              >
                                Pay Now
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
                {/* <div className="row">
                  {unpaidInstallments.map((installment) => (
                    <div key={installment._id} className="col-12 col-md-6 col-lg-4 mb-3">
                      <div className="card" style={{ borderRadius: '8px', border: "none" }}>
                        <div className="card-body" style={{ background: "var(--containerColor)", color: "var(--textColor)" }}>
                          <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                              <h5 className="card-title">SIP ID: {installment.sip_Id}</h5>
                            </div>

                            <div className="d-flex justify-content-between">
                              <p className="card-text">Installment No.:</p>
                              <p className="card-text">{installment.installment_id}</p>
                            </div>

                            <div className="d-flex justify-content-between">
                              <p className="card-text">Amount:</p>
                              <p className="card-text">{installment.installment_amount}</p>
                            </div>

                            <div className="d-flex justify-content-between">
                              <p className="card-text">Installment Date:</p>
                              <p className="card-text">
                                {moment(installment.installment_Date).format("DD MMM YYYY")}
                              </p>
                            </div>

                            <div className="d-flex justify-content-center mt-3">
                              <button
                                className="btnPrimary"
                                onClick={() =>
                                  handleProceedClick(
                                    installment.sip_Id,
                                    installment.installment_amount,
                                    installment.installment_Date,
                                    installment.installment_id
                                  )
                                }
                              >
                                Pay Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
                {/* <div className="row justify-content-between">
                  {unpaidInstallments.map((installment) => (
                    <div key={installment._id} className="col-12 col-sm-6 col-lg-6 mb-3">
                      <div className="card" style={{ borderRadius: '8px', border: "none" }}>
                        <div className="card-body" style={{ background: "var(--containerColor)", minWidth: "300px", color: "var(--textColor)" }}>
                          <div className="d-flex flex-column">
                            <h5 className="card-title">SIP ID: {installment.sip_Id}</h5>
                            <div className="d-flex justify-content-between">
                              <p className="card-text">Installment No.:</p>
                              <p className="card-text">{installment.installment_id}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="card-text">Amount:</p>
                              <p className="card-text">{installment.installment_amount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="card-text">Installment Date:</p>
                              <p className="card-text">
                                {moment(installment.installment_Date).format("DD MMM YYYY")}
                              </p>
                            </div>
                            <div className="mt-3">
                              <button
                                className="btnPrimary"
                                onClick={() =>
                                  handleProceedClick(
                                    installment.sip_Id,
                                    installment.installment_amount,
                                    installment.installment_Date,
                                    installment.installment_id
                                  )
                                }
                              >
                                Pay Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
                <UnpaidInstallments />
              </>
            ) : (
              null)}
          </section>
          {/* <h1 className="textHeadingWithMargin">Package Details</h1> */}

          <div className="container">
            <Row md="12" style={{ marginTop: "20px" }}>
              <Col lg="6" className="mb-2">
                <p className="packageDetailText">Order History</p>
                <section className=" orderHistorySection ">
                  {/* <h1 className="textHeadingWithMargin">Package Details</h1> */}
                  <div className="orderHistoryTableContainer">
                    {orderHistory.length > 0 ? (
                      <Table striped responsive className="orderTable">
                        <thead>
                          <tr>
                            <th>Plan</th>
                            <th>Amount</th>
                            <th>Maturity Time</th>
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
                      <p>No orders found</p>
                    )}
                  </div>
                </section>
              </Col>
              <Col lg="6" className="mb-2 d-flex flex-column ">
                <p className="packageDetailText">Upcoming Orders</p>

                <section className="orderHistorySection">
                  {/* <h1 className="textHeadingWithMargin">Upcoming SIPs</h1> */}
                  <div className="orderHistoryTableContainer">
                    {upcomingSips.length > 0 ? (
                      <Table striped responsive className="orderTable">
                        <thead>
                          <tr>
                            <th>SIP ID</th>
                            <th>Amount</th>
                            <th>Installment Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upcomingSips.map((sip, index) => (
                            <tr key={index}>
                              <td>{sip.nextUpcomingInstallment.sip_Id}</td>
                              <td>{sip.nextUpcomingInstallment.installment_amount}</td>
                              <td>{moment(sip.nextUpcomingInstallment.installment_Date).format("DD MMM YY")}</td>
                              <td>
                                {sip.nextUpcomingInstallment.paid_Date === null ? (
                                  <button className="btnPrimary"
                                    onClick={() => handleProceedClick(
                                      sip.nextUpcomingInstallment.sip_Id,
                                      sip.nextUpcomingInstallment.installment_amount,
                                      sip.nextUpcomingInstallment.installment_Date,
                                      sip.nextUpcomingInstallment.installment_id
                                    )}                                >
                                    Pay Now
                                  </button>
                                ) : (
                                  <span>Paid</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p>No upcoming SIPs found</p>
                    )}
                  </div>
                </section>
              </Col>
            </Row>
          </div>

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

                    {moment(profileData?.joining_date).format("DD MMM YY")}
                  </p>
                </div>
                <div className="dashboardProfile">
                  <p>Activation Date:</p>
                  <p>
                    {moment(profileData?.Activation_date).format("DD MMM YY")}
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
          <Col md="6" className="gap-2 d-flex flex-column justify-content-between">
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

      {showPopUp.visible && (
        <PopUp
          sipId={showPopUp.sipId}
          amount={showPopUp.amount}
          maturityDate={showPopUp.maturityDate}
          companyData={showPopUp.companyData}
          installmentId={showPopUp.installmentId}
          onClose={() => setShowPopUp({ visible: false })}
          onConfirm={() => {
            payInstallment(showPopUp.sipId, showPopUp.installmentId, showPopUp.amount, showPopUp.maturityDate);
            setShowPopUp({ visible: false });
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
