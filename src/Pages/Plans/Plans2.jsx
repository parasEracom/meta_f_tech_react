// import React, { useEffect, useState } from "react";
// import "./Plans.css";
// import { Row } from "react-bootstrap";
// import Loader from "../../Components/Loader/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { ApiPaths } from "../../Config/ApiPath";
// import { AiOutlineUser } from "react-icons/ai";
// import useAxiosHelper from "../../Common/AxiosHelper";
// import { setUserPersonalInfo } from "../../Redux/ProfileDataSlice";
// import { setIncomeWallet } from "../../Redux/IncomeWallet";
// import { BasicInfo, toastFailed, toastSuccess } from "../../Config/BasicInfo";
// import ArrayToObject from "../../Common/ArrayToObject";
// import OrderHistory from "./SIP Order";
// import { useNavigate } from "react-router-dom";

// const Plans = () => {
//   const dispatch = useDispatch();
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [amount, setAmount] = useState();
//   const [amountError, setAmountError] = useState("");
//   const [username, setUsername] = useState("");
//   const [fundBalance, setFundBalance] = useState();
//   const [selectIncome, setSelectIncome] = useState();
//   const [selectPackage, setSelectPackage] = useState([]);
//   const [sponsorLoading, setSponsorLoading] = useState(false);
//   const { AxiosPost, AxiosGet } = useAxiosHelper();
//   const incomeData = useSelector((state) => state.incomeData.incomeWallet);
//   const profileData = useSelector(
//     (state) => state.profileData.userPersonalInfo
//   );
//   const [showPopUp, setShowPopUp] = useState(false);
//   const [planId, setPlanId] = useState();
//   const navigate = useNavigate();
//   const [topUpSuccess, setTopUpSuccess] = useState(false);

//   useEffect(() => {
//     if (profileData?.username) {
//       setUsername(profileData.username);
//     }
//   }, [profileData]);

//   useEffect(() => {
//     FetchData();
//     fetchIncome();
//   }, []);



//   async function fetchIncome() {
//     try {
//       const res = await AxiosGet(ApiPaths.getPackages);
//       if (res) {
//         setSelectPackage(res?.packages);
//         const timeDepositPackage = res?.packages?.find(plan => plan.package.name === "Meta F Growth Plan(SIP)");
//         // Set select income with the value of "Meta F Time Deposit"
//         if (timeDepositPackage) {
//           setSelectIncome(timeDepositPackage.package.name);
//           setPlanId(timeDepositPackage?.planId)
//         } else {
//           console.log("Meta F Time Deposit package not found");
//         }
//       }
//     } catch (e) {
//       toastFailed(e?.response?.data?.message);
//     }
//   }

//   // const handleChange = (e) => {
//   //   const selectedPackage = selectPackage.find(
//   //     (pkg) => pkg?.package?.name === e.target.value
//   //   );
//   //   // setSelectIncome(e.target.value);
//   //   setPlanId(selectedPackage?.planId);
//   // };

//   async function FetchData() {
//     try {
//       const [res1, res2] = await Promise.all([
//         AxiosGet(ApiPaths.getProfile),
//         AxiosGet(ApiPaths.getWallets),
//       ]);

//       if (res1) {
//         dispatch(setUserPersonalInfo(res1));
//       }

//       if (res2?.wallets) {
//         dispatch(setIncomeWallet(res2?.wallets));
//         const objectWalletData = ArrayToObject(res2?.wallets);
//         setFundBalance(objectWalletData?.fund_wallet?.value);
//       }
//     } catch (error) {
//       toastFailed("Error loading data");
//     }
//   }

//   const handleProceedClick = () => {
//     setShowPopUp(true);
//   };

//   const handleTopUpSuccess = () => {
//     setTopUpSuccess(true);
//     setShowPopUp(false);
//   };

//   return (
//     <>
//       {loading ? <Loader /> : null}
//       {topUpSuccess ? (
//         <section className="registerSuccessDetails">
//           <div>
//             <div id="successIcon">
//               <h1>Success</h1>
//             </div>
//             <div id="successDetails">
//               <p className="mb-4">
//                 Congratulations your order has been successfully saved
//               </p>
//               <div style={{ display: "block" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <p className="successData">Name:</p>
//                   <p className="successData">{username}</p>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <p className="successData">Package Name:</p>
//                   <p className="successData">{selectIncome}</p>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <p className="successData">Package Amount:</p>
//                   <p className="successData">{amount}</p>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <p className="successData">Package Time:</p>
//                   <p className="successData">{topUpSuccess.packageTime}</p>
//                 </div>
//               </div>

//               <button
//                 onClick={() => {
//                   setTopUpSuccess(false);
//                   navigate("/dashboard/growth-sip-plan");

//                   // navigate("/dashboard");
//                 }}
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         </section>
//       ) : null}
//       <section className="dashboard">
//         <h1 className="textHeadingWithMargin mt-0 mt-4" style={{ marginBottom: "30px" }}>Package Activation (SIP)</h1>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div className="planDiv">
//             <div className="addfundDiv inputPrimary ">
//               <h1>Activation</h1>
//               <div className="subscriptionWallets">
//                 {incomeData?.map(
//                   (x) =>
//                     x?.name === "Fund Wallet" && (
//                       <div className="fundWallet" key={x?.name}>
//                         <p>Fund Wallet</p>
//                         <h5> INR {x?.value}</h5>
//                       </div>
//                     )
//                 )}
//               </div>
//               <label htmlFor="Amount">User ID</label>

//               <div style={{ position: "relative" }}>
//                 <div>
//                   <i
//                     style={{
//                       position: "absolute",
//                       top: 5,
//                       left: 2,
//                       color: "var(--colorPrimary)",
//                     }}
//                   >
//                     <AiOutlineUser />
//                   </i>
//                 </div>

//                 <input
//                   type="text"
//                   style={{ padding: "8px 20px" }}
//                   placeholder="Enter User ID"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 {sponsorLoading ? <i id="sponsorLoading"></i> : null}
//               </div>

//               <label htmlFor="Amount">Amount (INR )</label>
//               <input
//                 type="number"
//                 className="inputPrimary"
//                 placeholder="Enter Amount"
//                 style={{ borderRadius: "25px", padding: "8px 20px" }}
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//               />
//               <p className="errorMsg">{amountError}</p>
//               <button className="btnPrimary mt-3" onClick={handleProceedClick}>
//                 Proceed
//               </button>
//               {showPopUp && (
//                 <PopUp
//                   amount={amount}
//                   planId={planId}
//                   username={username}
//                   fundBalance={fundBalance}
//                   selectIncome={selectIncome}
//                   onClose={() => setShowPopUp(false)} // Pass a prop to close the pop-up
//                   onTopUpSuccess={handleTopUpSuccess} // Pass a callback for top-up success
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//         <OrderHistory />
//       </section>
//     </>
//   );
// };

// export default Plans;

// function PopUp({
//   username,
//   planId,
//   amount,
//   fundBalance,
//   selectIncome,
//   onClose,
//   onTopUpSuccess,
// }) {
//   const [loading, setLoading] = useState(false);
//   const { AxiosPost } = useAxiosHelper();

//   async function TopUp() {
//     const valid = checkValidation();
//     if (valid) {
//       try {
//         setLoading(true);
//         const body = {
//           username,
//           planId,
//           amount,
//         };
//         console.log(body);
//         const res = await AxiosPost(ApiPaths.topUp, body);
//         console.log(res, "..");
//         const packageTime = res?.date;
//         // console.log(packageTime, ".packageTime.");

//         onTopUpSuccess(packageTime);
//       } catch (e) {
//         toastFailed(e?.response?.data?.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//   }

//   function checkValidation() {
//     if (amount > 0) {
//       if (amount > fundBalance) {
//         toastFailed("Insufficient Funds");
//         return false;
//       } else {
//         return true;
//       }
//     } else {
//       toastFailed("Please Enter Amount");
//       return false;
//     }
//   }

//   return (
//     <>
//       <div className="otpSection" style={{ zIndex: "999" }}>
//         <div className="otpContainer">
//           <p>Are you sure you want to proceed with the top-up?</p>
//           <div>
//             <button className="btnSecondary" onClick={onClose}>
//               No
//             </button>
//             <button className="btnPrimary" onClick={TopUp} disabled={loading}>
//               {loading ? "Processing..." : "Yes"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import "./Plans.css";
import { Row } from "react-bootstrap";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ApiPaths } from "../../Config/ApiPath";
import { AiOutlineUser } from "react-icons/ai";
import useAxiosHelper from "../../Common/AxiosHelper";
import { setUserPersonalInfo } from "../../Redux/ProfileDataSlice";
import { setIncomeWallet } from "../../Redux/IncomeWallet";
import { BasicInfo, toastFailed, toastSuccess } from "../../Config/BasicInfo";
import ArrayToObject from "../../Common/ArrayToObject";
import OrderHistory from "./SIP Order";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Plans = () => {
  const dispatch = useDispatch();
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [amountError, setAmountError] = useState("");
  const [username, setUsername] = useState("");
  const [fundBalance, setFundBalance] = useState();
  const [selectIncome, setSelectIncome] = useState();
  const [selectPackage, setSelectPackage] = useState([]);
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const { AxiosPost, AxiosGet } = useAxiosHelper();
  const incomeData = useSelector((state) => state.incomeData.incomeWallet);
  const profileData = useSelector(
    (state) => state.profileData.userPersonalInfo
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const [planId, setPlanId] = useState();
  const navigate = useNavigate();
  const [topUpSuccess, setTopUpSuccess] = useState(false);
  const [packageTime, setPackageTime] = useState(""); // New state for packageTime
  const [sponsorName, setSponsorName] = useState("");
  const [companyData, setCompanyData] = useState([])
  useEffect(() => {
    CompanyInfo();
  }, []);
  async function CompanyInfo() {
    try {

      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }
  useEffect(() => {
    if (profileData?.username) {
      setUsername(profileData.username);
    }
  }, [profileData]);

  useEffect(() => {
    FetchData();
    fetchIncome();
  }, []);

  useEffect(() => {
    fetchActivationUserName()
  }, [username]);

  async function fetchIncome() {
    try {
      const res = await AxiosGet(ApiPaths.getPackages);
      if (res) {
        setSelectPackage(res?.packages);
        const timeDepositPackage = res?.packages?.find(
          (plan) => plan.planId == "1"
        );
        if (timeDepositPackage) {
          setSelectIncome(timeDepositPackage.package.name);
          setPlanId(timeDepositPackage?.planId);
        } else {
          BasicInfo.isDebug && console.log("Meta F Time Deposit package not found");
        }
      }
    } catch (e) {
      toastFailed(e?.response?.data?.message);
    }
  }

  async function FetchData() {
    try {
      const [res1, res2] = await Promise.all([
        AxiosGet(ApiPaths.getProfile),
        AxiosGet(ApiPaths.getWallets),
      ]);

      if (res1) {
        dispatch(setUserPersonalInfo(res1));
      }

      if (res2?.wallets) {
        dispatch(setIncomeWallet(res2?.wallets));
        const objectWalletData = ArrayToObject(res2?.wallets);
        setFundBalance(objectWalletData?.fund_wallet?.value);
      }
    } catch (error) {
      toastFailed("Error loading data");
    }
  }

  const handleProceedClick = () => {
    setShowPopUp(true);
  };

  const handleTopUpSuccess = (time) => {
    setTopUpSuccess(true);
    setShowPopUp(false);
    setPackageTime(time); // Store the packageTime
  };
  async function fetchActivationUserName() {
    const body = {
      username: username,
    };
    try {
      const res = await AxiosPost(ApiPaths.checkSponsor, body);
      if (res && res.name) {
        setSponsorName(res.name); // Set the sponsor name
      } else {
        BasicInfo.isDebug && console.log("Sponsor name not found");
        setSponsorName(" ")
      }
    } catch (e) {
      BasicInfo.isDebug && console.error("Error fetching sponsor name", e);
    }
  }


  return (
    <>
      {loading ? <Loader /> : null}
      {topUpSuccess ? (
        <section className="registerSuccessDetails">
          <div>
            <div id="successIcon">
              <h1>Success</h1>
            </div>
            <div id="successDetails">
              <p className="mb-4">
                Congratulations your order has been successfully saved
              </p>
              <div style={{ display: "block" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="successData">Name:</p>
                  <p className="successData">{username}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="successData">Package Name:</p>
                  <p className="successData">{selectIncome}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="successData">Package Amount:</p>
                  <p className="successData">{amount}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="successData">Package Time:</p>
                  <p className="successData">{moment(packageTime).format("DD-MM-YYYY")}</p> {/* Updated */}
                </div>
              </div>

              <button
                onClick={() => {
                  setTopUpSuccess(false);
                  navigate("/dashboard/growth-sip-plan");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </section>
      ) : null}
      <section className="dashboard">
        <h1
          className="textHeadingWithMargin mt-0 mt-4"
          style={{ marginBottom: "30px" }}
        >
          Package Activation ({selectIncome})
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="planDiv">
            <div className="addfundDiv inputPrimary ">
              <h1>Activation</h1>
              <div className="subscriptionWallets">
                {incomeData?.map(
                  (x) =>
                    x?.name === "Fund Wallet" && (
                      <div className="fundWallet" key={x?.name}>
                        <p>Fund Wallet</p>
                        <h5> {companyData?.currency} {x?.value}</h5>
                      </div>
                    )
                )}
              </div>
              <div className="d-flex">
                <label htmlFor="Amount">User ID</label>
                <label htmlFor="Amount" style={{ textAlign: "end" }}><span>{sponsorName || " "}</span></label>
              </div>

              <div style={{ position: "relative" }}>
                <div>
                  <i
                    style={{
                      position: "absolute",
                      top: 5,
                      left: 2,
                      color: "var(--colorPrimary)",
                    }}
                  >
                    <AiOutlineUser />
                  </i>
                </div>

                <input
                  type="text"
                  style={{ padding: "8px 20px" }}
                  placeholder="Enter User ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {sponsorLoading ? <i id="sponsorLoading"></i> : null}
              </div>

              <label htmlFor="Amount">Amount ({companyData?.currency} )</label>
              <input
                type="number"
                className="inputPrimary"
                placeholder="Enter Amount"
                style={{ borderRadius: "25px", padding: "8px 20px" }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="errorMsg">{amountError}</p>
              <button className="btnPrimary mt-3" onClick={handleProceedClick}>
                Proceed
              </button>
              {showPopUp && (
                <PopUp
                  amount={amount}
                  planId={planId}
                  username={username}
                  fundBalance={fundBalance}
                  selectIncome={selectIncome}
                  onClose={() => setShowPopUp(false)} // Pass a prop to close the pop-up
                  onTopUpSuccess={handleTopUpSuccess} // Pass a callback for top-up success
                />
              )}
            </div>
          </div>
        </div>
        <OrderHistory />
      </section>
    </>
  );
};

export default Plans;

function PopUp({
  username,
  planId,
  amount,
  fundBalance,
  selectIncome,
  onClose,
  onTopUpSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const { AxiosPost } = useAxiosHelper();

  async function TopUp() {
    const valid = checkValidation();
    if (valid) {
      try {
        setLoading(true);
        const body = {
          username,
          planId,
          amount,
        };
        const res = await AxiosPost(ApiPaths.topUp, body);
        const packageTime = res?.date;
        onTopUpSuccess(packageTime); // Pass packageTime to the parent
      } catch (e) {
        toastFailed(e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function checkValidation() {
    if (amount > 0) {
      if (amount > fundBalance) {
        toastFailed("Insufficient Funds");
        return false;
      } else {
        return true;
      }
    } else {
      toastFailed("Please Enter Amount");
      return false;
    }
  }

  return (
    <>
      <div className="otpSection" style={{ zIndex: "999" }}>
        <div className="otpContainer">
          <p>Are you sure you want to proceed with the top-up?</p>
          <div>
            <button className="btnSecondary" onClick={onClose}>
              No
            </button>
            <button className="btnPrimary" onClick={TopUp} disabled={loading}>
              {loading ? "Processing..." : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
