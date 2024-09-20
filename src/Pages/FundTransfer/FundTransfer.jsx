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
      BasicInfo.isDebug &&   console.log(error);
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
      BasicInfo.isDebug &&   console.log(e);
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
      // action: "transfer",
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

  // const handleTransferClick = () => {
  //   // Check if both amount and userId are valid
  //   if (!amount || amount <= 0) {
  //     toastFailed("Please enter a valid amount.");
  //     return;
  //   }

  //   if (!userId || userId.length === 0) {
  //     toastFailed("Please enter a valid User ID.");
  //     return;
  //   }

  //   if (!userVerified) {
  //     toastFailed("User ID is not verified.");
  //     return;
  //   }

  //   // If both fields are valid and user is verified, show the confirmation modal
  //   setShowConfirm(true);
  // };


  const handleTransferClick = () => {
    // Check if both amount and userId are valid
    if (!amount || amount <= 0) {
      toastFailed("Please enter a valid amount.");
      return;
    }
  
    // Check if the entered amount exceeds the fund wallet balance
    if (parseFloat(amount) > parseFloat(fundWallet)) {
      // toastFailed("Entered amount exceeds the available fund wallet balance.");
      toastFailed("Enter valid amount");
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
  
    // If all validations pass, show the confirmation modal
    setShowConfirm(true);
  };
  

  const handleConfirmClose = () => {
    setShowConfirm(false);
  };

  return (
    <section className="dashboard">
      {loading ? <Loader /> : null}
      <div className="addfundDiv inputPrimary" style={{marginBottom:"25px"}}>
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
