import React, { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import "./UpgradeCard.css";
import { ethers } from "ethers";
import Loader from "../Loader/Loader";
import ContractDetails from "../../Contracts/ContractDetails";
import { Data, toastFailed } from "../../Common/Data";
import { useNavigate } from "react-router-dom";

const UpgradeCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [amount, setAmount] = useState("");
  const [subsAmountError, setSubsAmountError] = useState("");
  const [subsUserId, setSubsUserId] = useState(props.username);
  const [subsWalletsError, setSubsWalletsError] = useState("");
  const [subsPackageError, setSubsPackageError] = useState("");
  const [subsUserIdError, setSubsUserIdError] = useState("");
  const [address, setAddress] = useState("");
  const [days, setDays] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [refAddress, setRefAddress] = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [dailyBonus, setDailyBonus] = useState(0);
  const [walletAddressError, setWalletAddressError] = useState("");
  const [refAddressError, setRefAddressError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    checkData();
    setWalletAddress(props?.walletAddress);
    setRefAddress(props?.refAddress);
    if (props?.data?.bonus == "170") {
      setDays(730);
    } else {
      setDays(1095);
    }
  }, []);

  function checkData() {
    let jsondata = localStorage.getItem("dashboardData");
    const data = JSON.parse(jsondata);
    Data.isDebug && console.log("data", data);
    if (data) {
      setAddress(data?.profile?.[0]?.wallet_address);
    } else {
    }
  }
  function resetSubError() {
    setSubsPackageError("");
    setSubsUserIdError("");
    setSubsAmountError("");
    setSubsWalletsError("");
  }
  function resetSubError() {
    setReceiveAmount(0);
    setDailyBonus(0);
    setAmount(0);
  }

  // -------------------------*******************************************-------------------------

  async function Transfer(id) {
    setLoading(true);

    try {
      const newAmount = String(amount * 1e18);
      Data.isDebug && console.log("newAmount", newAmount);
      let obj = {
        walletAddress: walletAddress,
        newAmount: newAmount,
        refAddress: refAddress,
        days: days,
      };

      Data.isDebug && console.log(obj);
      const bscTestnetRpcUrl = Data.providerLink; // BSC Testnet endpoint

      // Private key of the account
      const privateKey = Data.privateKey;

      // Create a provider instance
      const provider = new ethers.providers.JsonRpcProvider(bscTestnetRpcUrl);

      // Create a wallet instance from the private key and provider
      const wallet = new ethers.Wallet(privateKey, provider);

      // Contract ABI and address
      const contractABI = ContractDetails.contractABI;
      const contractAddress = ContractDetails.contract; // Address of the deployed contract

      // Connect to the deployed contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        wallet
      );
      Data.isDebug && console.log("contract", contract);
      // Function to interact with the contract

      // Call the contract function with custom gas price and gas limit
      const result = await contract.stakeForUser(
        walletAddress,
        newAmount,
        refAddress,
        days,
        {
          gasPrice: ethers.utils.parseUnits("10", "gwei"), // Example gas price: 10 Gwei
          gasLimit: 2000000, // Example gas limit: 2 million
        }
      );
      alert("Transaction successful");
      Data.isDebug && console.log("Transaction successful. Result:", result);
      setLoading(false);
      setShowOtp(false);
    } catch (error) {
      toastFailed("Transaction Failed! Please check your details");
      Data.isDebug && console.error("Error calling contract function:", error);
      setLoading(false);
    }
  }
  function calculateAmount(amount) {
    const newAmount = (amount * props?.data?.bonus) / 100;
    const newDailyAmount = (amount * props?.data?.daily_roi) / 100;
    setDailyBonus(parseFloat(newDailyAmount / props?.liveRate).toFixed(4));
    setReceiveAmount(parseFloat(newAmount / props?.liveRate).toFixed(4));
    setAmount(amount);
  }

  function gotoPage() {
    Data.isDebug && console.log("props", props);
    navigate("stake", { state: { myData: JSON.stringify(props) } });
  }
  return (
    <>
      {loading ? <Loader /> : null}

      <div className="upgradesCard" draggable={true}>
        <h1>{props?.data?.pin_type}</h1>
        <div>
          <p>Subcription</p>
          <h5>{props?.data?.subcription}</h5>
        </div>
        <div className="upgradeCardLight">
          <p>Bonus</p>
          <h5>{props?.data?.bonus}%</h5>
        </div>
        {
          props?.data?.package_type == "flexi" ?
            <div >
              <p>Daily Bonus</p>
              <h5>{props?.data?.daily_roi}%</h5>
            </div>
            : ""
        }
        <button className="simplePrimaryButton" onClick={() => gotoPage()}>
          Buy
        </button>
      </div>
      {showOtp ? (
        <div className="otpSection">
          <div className="addfundDiv inputPrimary">
            {/* <img
              src={bonus}
              alt="img"
              style={{ margin: "auto", display: "block", width: "100px" }}
            /> */}
            <div className="liveRateDiv">
              <h5>Live Rate</h5>
              <div>
                <p>{Data.coinName} : </p>
                <p>INR  {parseFloat(props.liveRate).toFixed(2)}</p>
              </div>
            </div>
            <p className="errorMsg">{subsWalletsError}</p>

            <label htmlFor="Amount">User Wallet Address</label>
            <input
              min={42}
              required
              type="text"
              placeholder="Enter user wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <p className="errorMsg">{walletAddressError}</p>

            <label htmlFor="Amount">Referral Address</label>
            <input
              min={42}
              required
              type="text"
              placeholder="Enter referral address"
              value={refAddress}
              onChange={(e) => setRefAddress(e.target.value)}
            />
            <p className="errorMsg">{refAddressError}</p>

            <label htmlFor="Amount">User ID</label>
            <input
              min={1}
              required
              type="text"
              placeholder="Enter user ID"
              value={subsUserId}
              onChange={(e) => setSubsUserId(e.target.value)}
            />
            <p className="errorMsg">{subsUserIdError}</p>

            <label htmlFor="Amount">Amount</label>
            <div className="inputDivIcon">
              <input
                min={1}
                required
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => calculateAmount(e.target.value)}
              />
              <i>
                <BiDollarCircle />
              </i>
            </div>
            <p className="errorMsg">{subsAmountError}</p>
            <div id="pkgInfo" className="mt-2">
              <p>Subscription</p>
              <p>{props?.data?.subcription}</p>
            </div>
            <div id="pkgInfo">
              <p>Bonus</p>
              <p>{props?.data?.bonus}%</p>
            </div>
            <div id="pkgInfo">
              <p>You will get </p>
              <p>
                {receiveAmount} {Data?.coinName}
              </p>
            </div>
            <div id="pkgInfo">
              <p>You will daily get </p>
              <p>
                {dailyBonus} {Data?.coinName}
              </p>
            </div>
            {loading ? (
              <div className="otpLoading"></div>
            ) : (
              <div className="d-flex" style={{ columnGap: "15px" }}>
                <button
                  className="btnSecondary mt-3 "
                  onClick={() => (setShowOtp(false), resetSubError())}
                >
                  Cancel
                </button>
                <button className="btnPrimary mt-3" onClick={Transfer}>
                  Proceed
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UpgradeCard;
