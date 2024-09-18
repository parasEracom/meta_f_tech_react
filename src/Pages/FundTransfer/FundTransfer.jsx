// // import React, { useEffect, useState } from "react";
// // import "./FundTransfer.css";
// // import axios from "axios";
// // import { Row, Col } from "react-bootstrap";
// // import { ToastContainer, toast } from "react-toastify";
// // import FundTransferHistory from "./FundTransferHistory";
// // import useAxiosHelper from "../../Common/AxiosHelper";
// // import { BasicInfo } from "../../Config/BasicInfo";
// // import { ApiPaths } from "../../Config/ApiPath";
// // import Loader from "../../Components/Loader/Loader";
// // const FundTransfer = () => {
// //   const [fundWallet, setFundWallet] = useState("");
// //   const [username, setUsername] = useState("")
// //   const [typingTimeout, setTypingTimeout] = useState(null);
// //   const [amount, setAmount] = useState("");
// //   const [userId, setUserId] = useState("");
// //   const [amountError, setAmountError] = useState("");
// //   const [userIdError, setUserIdError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [dashboardData, setDashboardData] = useState([]);
// //   const [showOtp, setShowOtp] = useState(false);
// //   const [otp, setOtp] = useState("");
// //   const [otpError, setOtpError] = useState("");
// //   const [otpLoading, setOtpLoading] = useState(false);
// //   const [sponsorLoading, setSponsorLoading] = useState(false);
// //   const [checkSponsorExist, setCheckSponsorExist] = useState([]);
// //   const [status, setStatus] = useState("0");
// //   const [change, setChange] = useState();
// //   const { AxiosPost, AxiosGet } = useAxiosHelper();

// //   const handleShowFundHistory = (newStatus) => {
// //     setStatus(newStatus);
// //   };
// //   const [companyData, setCompanyData] = useState();

// //   async function CompanyInfo() {
// //     try {
// //       const data = localStorage.getItem("companyData");
// //       // console.log(JSON.parse(data));
// //       setCompanyData(JSON.parse(data));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }

// //   const toastSuccess = (msg) => toast.success(msg);
// //   const toastFailed = (msg) => toast.error(msg);

// //   useEffect(() => {
// //     FetchData();
// //     CompanyInfo()
// //   }, []);

// //   async function FetchData() {
// //     try {
// //       const tempData = await AxiosGet(ApiPaths.getWallets);
// //       console.log("tempData", tempData)
// //       tempData?.wallets?.map((x, i) => {
// //         if (x?.slug == "fund_wallet") {
// //           setFundWallet(x?.value);
// //         }
// //       })
// //     } catch (e) {
// //       console.log(e)
// //     }
// //   }


// //   async function TransferOTP() {
// //     try {
// //       setLoading(true);
// //       const body = {
// //         "action": "transfer"
// //       }
// //       const tempOtpData = await AxiosPost(ApiPaths.sendOTP, body);
// //       console.log("tempOtpData", tempOtpData);
// //       toastSuccess(tempOtpData?.message);
// //       setLoading(false);
// //       setShowOtp(true);
// //     } catch (error) {
// //       console.log(error);
// //       toastFailed(error?.response?.data?.message);
// //       setLoading(false);
// //     }
// //   }


// //   async function FundTransferFunc() {

// //     setAmountError("");
// //     setUserIdError("");
// //     setOtpError("");
// //     if (!amount > 0) {
// //       setAmountError("Invalid Amount");
// //     }
// //     if (!userId.length > 0) {
// //       setUserIdError("Invalid User ID");
// //     }
// //     if (otp.length != 6) {
// //       // toastFailed("Invalid OTP");
// //     }
// //     const body = {
// //       username: userId,
// //       amount: amount,
// //       otp: otp,
// //       action: "transfer"
// //     }
// //     console.log("body", body)
// //     if (amount > 0 && userId.length > 0 && otp.length == 6) {
// //       try {
// //         setOtpLoading(true);
// //         const response = await AxiosPost(ApiPaths.p2pTransfer, body);
// //         toastSuccess(response?.message);
// //         setChange(Date.now())
// //         setShowOtp(false);
// //         FetchData();
// //         setUserId("");
// //         setAmount("");
// //         setOtp("");
// //         console.log("response", response)
// //         setOtpLoading(false)
// //       } catch (e) {
// //         toastFailed(e?.response?.data?.message)
// //         console.log("error", e)
// //         setOtpLoading(false)
// //       }
// //     }
// //   }
// //   async function onUserStoppedTyping(sponID) {
// //     setSponsorLoading(true);
// //     try {
// //       const body = { username: sponID };
// //       const res = await AxiosPost(ApiPaths.checkSponsor, body);

// //       if (res.status == 200) {
// //         setCheckSponsorExist(true);
// //         setUsername(res?.name);
// //       }
// //     } catch (error) {
// //       BasicInfo.isDebug && console.error("error here", error);
// //     } finally {
// //       setSponsorLoading(false);
// //     }
// //   }
// //   const handleInputChange = (e) => {
// //     setUserIdError("");
// //     const value = e.target.value;
// //     setUserId(value);
// //     if (typingTimeout) {
// //       clearTimeout(typingTimeout);
// //     }
// //     setTypingTimeout(
// //       setTimeout(() => {
// //         if (value.length > 0) {
// //           onUserStoppedTyping(value);
// //         } else {
// //           setUsername("");
// //         }
// //       }, 500)
// //     );
// //   };

// //   return (
// //     <section className="dashboard">
// //       {loading ? <Loader /> : null}
// //       {showOtp ? (
// //         <div className="otpSection">
// //           <div className="otpContainer">
// //             <h1>OTP</h1>
// //             <p>OTP sent to your registered email address</p>
// //             <input
// //               type="text"
// //               maxLength={6}
// //               size={6}
// //               placeholder="Enter OTP"
// //               value={otp}
// //               onChange={(e) => setOtp(e.target.value)}
// //             />
// //             <p className="errorMsg">{otpError}</p>
// //             {otpLoading ? (
// //               <div className="otpLoading"></div>
// //             ) : (
// //               <div>
// //                 <button
// //                   className="btnSecondary"
// //                   onClick={() => (setOtp(""), setShowOtp(false))}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button className="btnPrimary" onClick={FundTransferFunc}>
// //                   Submit
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       ) : null}
// //       <div className="addfundDiv inputPrimary">
// //         <h1>Fund Transfer</h1>
// //         <div className="addfundDivFundWallet">
// //           <p>Fund Wallet</p>
// //           <p>{companyData?.currency_sign} {parseFloat(fundWallet).toFixed(2)}</p>
// //         </div>
// //         <label htmlFor="Amount">User ID</label>
// //         {username?.length > 0 ? (
// //           <p id="sponsorVerified">{username}</p>
// //         ) : userId?.length > 0 && (
// //           <p id="sponsorVerified" style={{ color: "red" }}>
// //             Not Exist
// //           </p>
// //         )}
// //         <div className="loginInput_inner">
// //           <input
// //             style={{ borderRadius: "5px" }}
// //             min={1}
// //             required
// //             type="text"
// //             placeholder="User Id"
// //             value={userId}
// //             onChange={(e) => handleInputChange(e)}
// //           />
// //           {sponsorLoading ? <i id="sponsorLoading"></i> : null}
// //         </div>
// //         <p className="errorMsg">{userIdError}</p>
// //         <label htmlFor="Amount">Amount</label>
// //         <input
// //           min={1}
// //           required
// //           type="number"
// //           placeholder="Enter Amount"
// //           value={amount}
// //           onChange={(e) => setAmount(e.target.value)}
// //         />
// //         <p className="errorMsg">{amountError}</p>
// //         <button className="btnPrimary mt-3" onClick={TransferOTP}>
// //           Send OTP
// //         </button>
// //       </div>
// //       <section>
// //         <div>{status && <FundTransferHistory key={change} status={status} />}</div>
// //       </section>
// //     </section>
// //   );
// // };

// // export default FundTransfer;




// // import React, { useEffect, useState } from "react";
// // import { Modal, Button } from "react-bootstrap";
// // import "./FundTransfer.css";
// // import { ToastContainer, toast } from "react-toastify";
// // import FundTransferHistory from "./FundTransferHistory";
// // import useAxiosHelper from "../../Common/AxiosHelper";
// // import { BasicInfo } from "../../Config/BasicInfo";
// // import { ApiPaths } from "../../Config/ApiPath";
// // import Loader from "../../Components/Loader/Loader";

// // const FundTransfer = () => {
// //   const [fundWallet, setFundWallet] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [typingTimeout, setTypingTimeout] = useState(null);
// //   const [amount, setAmount] = useState("");
// //   const [userId, setUserId] = useState("");
// //   const [amountError, setAmountError] = useState("");
// //   const [userIdError, setUserIdError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [sponsorLoading, setSponsorLoading] = useState(false);
// //   const [status, setStatus] = useState("0");
// //   const [change, setChange] = useState();
// //   const [showConfirm, setShowConfirm] = useState(false); // Modal control

// //   const { AxiosPost, AxiosGet } = useAxiosHelper();
// //   const [companyData, setCompanyData] = useState();

// //   const toastSuccess = (msg) => toast.success(msg);
// //   const toastFailed = (msg) => toast.error(msg);

// //   useEffect(() => {
// //     FetchData();
// //     CompanyInfo();
// //   }, []);

// //   async function CompanyInfo() {
// //     try {
// //       const data = localStorage.getItem("companyData");
// //       setCompanyData(JSON.parse(data));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }

// //   async function FetchData() {
// //     try {
// //       const tempData = await AxiosGet(ApiPaths.getWallets);
// //       tempData?.wallets?.map((x) => {
// //         if (x?.slug === "fund_wallet") {
// //           setFundWallet(x?.value);
// //         }
// //       });
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   }

// //   async function FundTransferFunc() {
// //     setAmountError("");
// //     setUserIdError("");
// //     setShowConfirm(false);

// //     if (!amount || amount <= 0) {
// //       setAmountError("Invalid Amount");
// //       return;
// //     }

// //     if (!userId || userId.length === 0) {
// //       setUserIdError("Invalid User ID");
// //       return;
// //     }

// //     const body = {
// //       username: userId,
// //       amount: amount,
// //       action: "transfer",
// //     };

// //     try {
// //       setLoading(true);
// //       const response = await AxiosPost(ApiPaths.p2pTransfer, body);
// //       toastSuccess(response?.message);
// //       setChange(Date.now());
// //       FetchData();
// //       setUserId("");
// //       setAmount("");
// //       setLoading(false);
// //       setShowConfirm(false); // Close the confirmation modal after successful transfer
// //     } catch (e) {
// //       toastFailed(e?.response?.data?.message);
// //       setLoading(false);
// //     }
// //   }

// //   async function onUserStoppedTyping(sponID) {
// //     setSponsorLoading(true);
// //     try {
// //       const body = { username: sponID };
// //       const res = await AxiosPost(ApiPaths.checkSponsor, body);

// //       if (res.status === 200) {
// //         setUsername(res?.name);
// //       }
// //     } catch (error) {
// //       BasicInfo.isDebug && console.error("error here", error);
// //     } finally {
// //       setSponsorLoading(false);
// //     }
// //   }

// //   const handleInputChange = (e) => {
// //     setUserIdError("");
// //     const value = e.target.value;
// //     setUserId(value);

// //     if (typingTimeout) {
// //       clearTimeout(typingTimeout);
// //     }

// //     setTypingTimeout(
// //       setTimeout(() => {
// //         if (value.length > 0) {
// //           onUserStoppedTyping(value);
// //         } else {
// //           setUsername("");
// //         }
// //       }, 500)
// //     );
// //   };

// //   const handleTransferClick = () => {
// //     setShowConfirm(true); // Show confirmation modal when Transfer is clicked
// //   };

// //   const handleConfirmClose = () => {
// //     setShowConfirm(false);
// //   };

// //   return (
// //     <section className="dashboard">
// //       {loading ? <Loader /> : null}
// //       <div className="addfundDiv inputPrimary">
// //         <h1>Fund Transfer</h1>
// //         <div className="addfundDivFundWallet">
// //           <p>Fund Wallet</p>
// //           <p>{companyData?.currency_sign} {parseFloat(fundWallet).toFixed(2)}</p>
// //         </div>
// //         <label htmlFor="Amount">User ID</label>
// //         {username?.length > 0 ? (
// //           <p id="sponsorVerified">{username}</p>
// //         ) : userId?.length > 0 && (
// //           <p id="sponsorVerified" style={{ color: "red" }}>
// //             Not Exist
// //           </p>
// //         )}
// //         <div className="loginInput_inner">
// //           <input
// //             style={{ borderRadius: "5px" }}
// //             min={1}
// //             required
// //             type="text"
// //             placeholder="User Id"
// //             value={userId}
// //             onChange={(e) => handleInputChange(e)}
// //           />
// //           {sponsorLoading ? <i id="sponsorLoading"></i> : null}
// //         </div>
// //         <p className="errorMsg">{userIdError}</p>
// //         <label htmlFor="Amount">Amount</label>
// //         <input
// //           min={1}
// //           required
// //           type="number"
// //           placeholder="Enter Amount"
// //           value={amount}
// //           onChange={(e) => setAmount(e.target.value)}
// //         />
// //         <p className="errorMsg">{amountError}</p>
// //         <button className="btnPrimary mt-3" onClick={handleTransferClick}>
// //           Transfer
// //         </button>
// //       </div>
// //       <section>
// //         <div>{status && <FundTransferHistory key={change} status={status} />}</div>
// //       </section>

// //       {/* Confirmation Modal */}
// //       <Modal show={showConfirm} onHide={handleConfirmClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Confirmation</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           Are you sure you want to transfer<br/> {companyData?.currency_sign} {amount} to user {userId} ?
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleConfirmClose}>
// //             Cancel
// //           </Button>
// //           <Button variant="primary" onClick={FundTransferFunc}>
// //             Confirm
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </section>
// //   );
// // };

// // export default FundTransfer;


// import React, { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import "./FundTransfer.css";
// import { ToastContainer, toast } from "react-toastify";
// import FundTransferHistory from "./FundTransferHistory";
// import useAxiosHelper from "../../Common/AxiosHelper";
// import { BasicInfo } from "../../Config/BasicInfo";
// import { ApiPaths } from "../../Config/ApiPath";
// import Loader from "../../Components/Loader/Loader";

// const FundTransfer = () => {
//   const [fundWallet, setFundWallet] = useState("");
//   const [username, setUsername] = useState("");
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [userId, setUserId] = useState("");
//   const [amountError, setAmountError] = useState("");
//   const [userIdError, setUserIdError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sponsorLoading, setSponsorLoading] = useState(false);
//   const [status, setStatus] = useState("0");
//   const [change, setChange] = useState();
//   const [showConfirm, setShowConfirm] = useState(false); // Modal control

//   const { AxiosPost, AxiosGet } = useAxiosHelper();
//   const [companyData, setCompanyData] = useState();

//   const toastSuccess = (msg) => toast.success(msg);
//   const toastFailed = (msg) => toast.error(msg);

//   useEffect(() => {
//     FetchData();
//     CompanyInfo();
//   }, []);

//   async function CompanyInfo() {
//     try {
//       const data = localStorage.getItem("companyData");
//       setCompanyData(JSON.parse(data));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function FetchData() {
//     try {
//       const tempData = await AxiosGet(ApiPaths.getWallets);
//       tempData?.wallets?.map((x) => {
//         if (x?.slug === "fund_wallet") {
//           setFundWallet(x?.value);
//         }
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   async function FundTransferFunc() {
//     setAmountError("");
//     setUserIdError("");
//     setShowConfirm(false);

//     if (!amount || amount <= 0) {
//       setAmountError("Invalid Amount");
//       return;
//     }

//     if (!userId || userId.length === 0) {
//       setUserIdError("Invalid User ID");
//       return;
//     }

//     const body = {
//       username: userId,
//       amount: amount,
//       action: "transfer",
//     };

//     try {
//       setLoading(true);
//       const response = await AxiosPost(ApiPaths.p2pTransfer, body);
//       toastSuccess(response?.message);
//       setChange(Date.now());
//       FetchData();
//       setUserId("");
//       setAmount("");
//       setLoading(false);
//       setShowConfirm(false); // Close the confirmation modal after successful transfer
//     } catch (e) {
//       toastFailed(e?.response?.data?.message);
//       setLoading(false);
//     }
//   }

//   async function onUserStoppedTyping(sponID) {
//     setSponsorLoading(true);
//     try {
//       const body = { username: sponID };
//       const res = await AxiosPost(ApiPaths.checkSponsor, body);

//       if (res.status === 200) {
//         setUsername(res?.name);
//       }
//     } catch (error) {
//       BasicInfo.isDebug && console.error("error here", error);
//     } finally {
//       setSponsorLoading(false);
//     }
//   }

//   const handleInputChange = (e) => {
//     setUserIdError("");
//     const value = e.target.value;
//     setUserId(value);

//     if (typingTimeout) {
//       clearTimeout(typingTimeout);
//     }

//     setTypingTimeout(
//       setTimeout(() => {
//         if (value.length > 0) {
//           onUserStoppedTyping(value);
//         } else {
//           setUsername("");
//         }
//       }, 500)
//     );
//   };

//   const handleTransferClick = () => {
//     // Check if both amount and userId are valid
//     if (!amount || amount <= 0) {
//       toastFailed("Please enter a valid amount.");
//       return;
//     }

//     if (!userId || userId.length === 0) {
//       toastFailed("Please enter a valid User ID.");
//       return;
//     }

//     // If both fields are valid, show the confirmation modal
//     setShowConfirm(true);
//   };

//   const handleConfirmClose = () => {
//     setShowConfirm(false);
//   };

//   return (
//     <section className="dashboard">
//       {loading ? <Loader /> : null}
//       <div className="addfundDiv inputPrimary">
//         <h1>Fund Transfer</h1>
//         <div className="addfundDivFundWallet">
//           <p>Fund Wallet</p>
//           <p>{companyData?.currency_sign} {parseFloat(fundWallet).toFixed(2)}</p>
//         </div>
//         <label htmlFor="Amount">User ID</label>
//         {username?.length > 0 ? (
//           <p id="sponsorVerified">{username}</p>
//         ) : userId?.length > 0 && (
//           <p id="sponsorVerified" style={{ color: "red" }}>
//             Not Exist
//           </p>
//         )}
//         <div className="loginInput_inner">
//           <input
//             style={{ borderRadius: "5px" }}
//             min={1}
//             required
//             type="text"
//             placeholder="User Id"
//             value={userId}
//             onChange={(e) => handleInputChange(e)}
//           />
//           {sponsorLoading ? <i id="sponsorLoading"></i> : null}
//         </div>
//         <p className="errorMsg">{userIdError}</p>
//         <label htmlFor="Amount">Amount</label>
//         <input
//           min={1}
//           required
//           type="number"
//           placeholder="Enter Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <p className="errorMsg">{amountError}</p>
//         <button className="btnPrimary mt-3" onClick={handleTransferClick}>
//           Transfer
//         </button>
//       </div>
//       <section>
//         <div>{status && <FundTransferHistory key={change} status={status} />}</div>
//       </section>

//       {/* Confirmation Modal */}
//       <Modal show={showConfirm} onHide={handleConfirmClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Transfer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to transfer {companyData?.currency_sign}{amount} to {username} ?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleConfirmClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={FundTransferFunc}>
//             Confirm
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </section>
//   );
// };

// export default FundTransfer;



import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./FundTransfer.css";
import { ToastContainer, toast } from "react-toastify";
import FundTransferHistory from "./FundTransferHistory";
import useAxiosHelper from "../../Common/AxiosHelper";
import { BasicInfo } from "../../Config/BasicInfo";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";

const FundTransfer = () => {
  const [fundWallet, setFundWallet] = useState("");
  const [username, setUsername] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [amountError, setAmountError] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const [status, setStatus] = useState("0");
  const [change, setChange] = useState();
  const [showConfirm, setShowConfirm] = useState(false); // Modal control
  const [userVerified, setUserVerified] = useState(false); // To track if the userId is valid

  const { AxiosPost, AxiosGet } = useAxiosHelper();
  const [companyData, setCompanyData] = useState();

  const toastSuccess = (msg) => toast.success(msg);
  const toastFailed = (msg) => toast.error(msg);

  useEffect(() => {
    FetchData();
    CompanyInfo();
  }, []);

  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function FetchData() {
    try {
      const tempData = await AxiosGet(ApiPaths.getWallets);
      tempData?.wallets?.map((x) => {
        if (x?.slug === "fund_wallet") {
          setFundWallet(x?.value);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function FundTransferFunc() {
    setAmountError("");
    setUserIdError("");
    setShowConfirm(false);


    if (!amount || amount <= 0) {
      setAmountError("Invalid Amount");
      return;
    }

    if (!userId || userId.length === 0) {
      setUserIdError("Invalid User ID");
      return;
    }

    const body = {
      username: userId,
      amount: amount,
      action: "transfer",
    };

    try {
      setLoading(true);
      const response = await AxiosPost(ApiPaths.p2pTransfer, body);
      toastSuccess(response?.message);
      setChange(Date.now());
      FetchData();
      setUserId("");
      setAmount("");
      setLoading(false);
      setShowConfirm(false); // Close the confirmation modal after successful transfer
    } catch (e) {
      toastFailed(e?.response?.data?.message);
      setLoading(false);
    }
  }

  async function onUserStoppedTyping(sponID) {
    setSponsorLoading(true);
    try {
      const body = { username: sponID };
      const res = await AxiosPost(ApiPaths.checkSponsor, body);

      if (res.status === 200) {
        setUsername(res?.name);
        setUserVerified(true); // User is verified
      } else {
        setUsername("");
        setUserVerified(false); // User is not verified
        toastFailed("User ID does not exist");
      }
    } catch (error) {
      BasicInfo.isDebug && console.error("error here", error);
      setUserVerified(false); // In case of an error, mark user as not verified
    } finally {
      setSponsorLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setUserIdError("");
    const value = e.target.value;
    setUserId(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (value.length > 0) {
          onUserStoppedTyping(value);
        } else {
          setUsername("");
          setUserVerified(false); // Reset verification status when input is cleared
        }
      }, 500)
    );
  };

  const handleTransferClick = () => {
    // Check if both amount and userId are valid
    if (!amount || amount <= 0) {
      toastFailed("Please enter a valid amount.");
      return;
    }

    if (!userId || userId.length === 0) {
      toastFailed("Please enter a valid User ID.");
      return;
    }

    if (!userVerified) {
      toastFailed("User ID is not verified.");
      return;
    }

    // If both fields are valid and user is verified, show the confirmation modal
    setShowConfirm(true);
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
  };

  return (
    <section className="dashboard">
      {loading ? <Loader /> : null}
      <div className="addfundDiv inputPrimary">
        <h1>Fund Transfer</h1>
        <div className="addfundDivFundWallet">
          <p>Fund Wallet</p>
          <p>{companyData?.currency_sign} {parseFloat(fundWallet).toFixed(2)}</p>
        </div>
        <label htmlFor="Amount">User ID</label>
        {username?.length > 0 ? (
          <p id="sponsorVerified">{username}</p>
        ) : userId?.length > 0 && (
          <p id="sponsorVerified" style={{ color: "red" }}>
            Not Exist
          </p>
        )}
        <div className="loginInput_inner">
          <input
            style={{ borderRadius: "5px" }}
            min={1}
            required
            type="text"
            placeholder="User Id"
            value={userId}
            onChange={(e) => handleInputChange(e)}
          />
          {sponsorLoading ? <i id="sponsorLoading"></i> : null}
        </div>
        <p className="errorMsg">{userIdError}</p>
        <label htmlFor="Amount">Amount</label>
        <input
          min={1}
          required
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className="errorMsg">{amountError}</p>
        <button className="btnPrimary mt-3" onClick={handleTransferClick}>
          Transfer
        </button>
      </div>
      <section>
        <div>{status && <FundTransferHistory key={change} status={status} />}</div>
      </section>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to transfer {companyData?.currency_sign}{amount} to {username} ?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ 
            // background: "var(--bs-red)",
             border: "none"
          }} variant="secondary" onClick={handleConfirmClose}>
            Cancel
          </Button>
          <Button style={{ background: "var(--colorPrimary)", border: "none"
          }} variant="primary" onClick={FundTransferFunc}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default FundTransfer;
