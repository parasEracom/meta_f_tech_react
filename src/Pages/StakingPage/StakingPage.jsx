import React, { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { ethers } from "ethers";
import ContractDetails from "../../Contracts/ContractDetails";
import { Data, toastFailed, toastSuccess } from "../../Common/Data";
import Loader from "../../Components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import "./StakingPage.css";
import QR from "./../../Images/qr.png";
import Purse from "./../../Images/wallet.png";
import getAddress from "../../Common/GetAddress";
import GetUSDTBalance from "../../Common/GetUsdtBalance";
import axios from "axios";
import GetChainId from "../../Common/GetChainId";
import GetUserData from "../../Common/GetUserData";
import liveRate from "../../Common/LiveRate";
const StakingPage = () => {
  const { BigInt } = window;
  let location = useLocation();
  let props = JSON.parse(location.state?.myData);

  Data.isDebug && console.log("1111111111", props.data.package_type);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [subsAmountError, setSubsAmountError] = useState("");
  const [subsUserId, setSubsUserId] = useState(props.username);
  const [subsWalletsError, setSubsWalletsError] = useState("");
  const [subsUserIdError, setSubsUserIdError] = useState("");
  const [days, setDays] = useState("");
  //   const [address, setAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [refAddress, setRefAddress] = useState("");
  const [holdUnit, setHoldUnit] = useState();
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [dailyBonus, setDailyBonus] = useState(0);
  const [walletAddressError, setWalletAddressError] = useState("");
  const [refAddressError, setRefAddressError] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeHold, setActiveHold] = useState(0);
  const [repurchaseData, setRepurchaseData] = useState(0);
  const [requiredToken, setRequiredToken] = useState(0);
  const [requiredUSDT, setRequiredUSDT] = useState(0);
  const [tokenLiveRate, setTokenLiveRate] = useState(0);
  const holdingData = [0, 5, 10, 20, 30, 40, 50];

  useEffect(() => {
    checkData();
    setWalletAddress(props?.walletAddress);
    setRefAddress(props?.refAddress);
    setDays(props?.data?.days);
  }, []);

  async function checkData() {
    let jsondata = localStorage.getItem("dashboardData");
    const data = JSON.parse(jsondata);
    Data.isDebug && console.log("data", data);
    if (data) {
      setWalletAddress(data?.profile?.[0]?.wallet_address);
      try {
        setLoading(true);
        const userdata = await GetUserData(data?.profile?.[0]?.wallet_address);
        const livePrice = await liveRate();
        setTokenLiveRate(livePrice);

        console.log("999999999999999999999999999999", livePrice);
        let respur = parseFloat(userdata.repurchaseWallet / 1e18).toFixed(2);
        setRepurchaseData(respur);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    } else {
    }
  }

  function resetSubError() {
    setSubsUserIdError("");
    setSubsAmountError("");
    setSubsWalletsError("");
  }
  async function increaseAllowance() {
    if (repurchaseData >= requiredToken) {
      setLoading(true);
      try {
        let chain = GetChainId();
        if (chain) {
          const connectedAddress = await getAddress();
          Data.isDebug &&
            console.log("000000000000", {
              connectedAddress,
              walletAddress,
              refAddress,
            });
          const { ethereum } = window;
          if (ethereum) {
            if (connectedAddress == walletAddress) {
              const newAmount = String(amount * 1e18);
              Data.isDebug && console.log("newAmount", newAmount);
              const usdtAmount = await GetUSDTBalance(walletAddress);
              const availBalance = parseFloat(usdtAmount / 1e18);
              Data.isDebug && console.log("availBalance", availBalance);
              if (availBalance >= amount) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const busdInstance = new ethers.Contract(
                  ContractDetails.BUSD,
                  ContractDetails.BUSD_ABI,
                  signer
                );
                // console.log("Instance : " + busdInstance);
                // console.log("value", x)
                let inc = await busdInstance.increaseAllowance(
                  ContractDetails.contract,
                  newAmount,
                  { value: ethers.utils.parseEther("0") }
                );
                await inc.wait();
                StakeByUser(newAmount);
                // console.log("Tr Hash 1: " + inc.hash);
              } else {
                toastFailed("Insufficient funds in your wallet");
                setLoading(false);
              }
            } else {
              toastFailed(
                "Please connect with registered wallet address" + walletAddress
              );
              setLoading(false);
            }
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        alert("Transaction Failed");
        Data.isDebug && console.log("error", error);
        setLoading(false);
      }
    } else {
      toastFailed("Insufficient balance in repurchase wallet");
    }
  }
  async function StakeByUser(newAmount) {
    console.log("holdingData[activeHold]", holdingData[activeHold]);
    console.log("props?.data?.package_type", props?.data?.package_type);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        // console.log("11", provider);
        const signer = provider.getSigner();
        // console.log("22", signer);
        const contractInstance = new ethers.Contract(
          ContractDetails.contract,
          ContractDetails.contractABI,
          signer
        );
        // let fee = await contractInstance.estimateGas.stake(
        //   newAmount,
        //   refAddress,
        //   days
        // );
        // const overrides = {
        //   gasLimit: fee,
        //   gasPrice: ethers.utils.parseUnits("3", "gwei"),
        //   value: ethers.utils.parseEther("0"),
        // };
        // console.log("Instance : " + contractInstance);
        let inc = await contractInstance.stake(
          walletAddress,
          newAmount,
          holdingData[activeHold],
          refAddress,
          BigInt(days),
          props?.data?.package_type == "flexi" ? 0 : 1
          // overrides
        );
        await inc.wait();
        alert("Transaction Successful");
        navigate("/dashboard");
        setLoading(false);
        // console.log("Tr Hash : " + inc.hash);
      }
    } catch (error) {
      Data.isDebug && console.log("error12", error);
      alert("something went wrong");
      setLoading(false);
    }
  }
  async function checkStakeData() {
    Data.isDebug && console.log(refAddress?.length);
    Data.isDebug && console.log(walletAddress.length);
    if (
      // refAddress?.length !== 42 ||
      // walletAddress.length !== 42 ||
      // amount <= 0
      1 == 2
    ) {
      toastFailed("Invalid Data");
    } else {
      setVisible(!visible);
    }
  }
  async function Transfer(newAmount) {
    setLoading(true);
    try {
      //   const newAmount = String(amount * 1e18);
      //   console.log("newAmount", newAmount);
      let obj = {
        // walletAddress: walletAddress,
        newAmount: newAmount,
        refAddress: refAddress,
        days: days,
      };
      Data.isDebug && console.log("obj", obj);
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
      const result = await contract.stake(
        // walletAddress,
        newAmount,
        refAddress,
        days,
        0,
        {
          gasPrice: ethers.utils.parseUnits("10", "gwei"), // Example gas price: 10 Gwei
          gasLimit: 2000000, // Example gas limit: 2 million
        }
      );
      toastSuccess("Transaction successful");
      Data.isDebug && console.log("Transaction successful. Result:", result);
      setLoading(false);
    } catch (error) {
      toastFailed("Transaction Failed! Please check your details");
      Data.isDebug && console.error("Error calling contract function:", error);
      setLoading(false);
    }
  }
  function calculateAmount(amount) {
    countRequiredToken(amount, activeHold);

    Data.isDebug && console.log("cong ", props);
    const newAmount = (amount * props?.data?.bonus) / 100;
    const newDailyAmount = (amount * props?.data?.daily_roi) / 100;
    setDailyBonus(parseFloat(newDailyAmount / tokenLiveRate).toFixed(4));
    setReceiveAmount(parseFloat(newAmount / tokenLiveRate).toFixed(4));
    setAmount(amount);
  }
  async function StakeByAPI() {
    setVisible(!visible);
    setLoading(true);
    let userId = localStorage.getItem("userId");
    Data.isDebug && console.log("user id", userId);
    axios({
      method: "post",
      url: "https://minjokvista.com/crypto/create_payment",
      data: {
        api_key: "bc8d211a3e44a3542a0092b058472582",
        action: "create_payment",
        user_address: walletAddress,
        payment_amount: amount,
        token: "USDT-BEP20",
        network: "BSC",
        referral: refAddress,
        period: days,
        type: props?.data?.package_type == "flexi" ? 0 : 1,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        Data.isDebug && console.log(response);
        let paymentData = response?.data;
        if (paymentData?.success) {
          navigate("payment", {
            state: { myData: JSON.stringify(paymentData) },
          });
        } else {
          toastFailed(paymentData?.message);
        }
        setLoading(false);
      })
      .catch(function (response) {
        Data.isDebug && console.log(response);
        setLoading(false);
      });
  }
  function countRequiredToken(amt, active) {
    let getPercent = (amt * holdingData[active]) / 100;
    console.log("getPercent", getPercent);
    let newamt = amt - getPercent;

    let requirToken = getPercent / tokenLiveRate;
    setRequiredToken(requirToken);
    setRequiredUSDT(newamt);
  }
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="dashboard">
        <div className="addfundDiv inputPrimary">
          {/* <img
                        src={bonus}
                        alt="img"
                        style={{ margin: "auto", display: "block", width: "100px" }}
                    /> */}
          <div className="liveRateDiv liveRateDivInvestment">
            <h5>Live Rate</h5>
            <div>
              <p>{Data.coinName} : </p>
              <p>INR  {parseFloat(tokenLiveRate).toFixed(2)}</p>
            </div>
          </div>
          <div className="liveRateDiv liveRateDivInvestment">
            <h5>Repurchase Wallet</h5>
            <div>
              <p>
                {repurchaseData} {Data.coinName}
              </p>
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
          <div>
            <label htmlFor="holding">Use Repurchase wallet</label>
            <div className="holdingDiv">
              {holdingData.map((x, i) => {
                return (
                  <p
                    className={i == activeHold ? "holdingActiveItem" : ""}
                    onClick={() => (
                      setActiveHold(i), countRequiredToken(amount, i)
                    )}
                  >
                    {x}%
                  </p>
                );
              })}
            </div>
          </div>
          <p className="errorMsg">{subsAmountError}</p>
          <div id="pkgInfo" className="mt-2">
            <p>Required Repurchase Balance</p>
            <p>
              {requiredToken} {Data.coinName}
            </p>
          </div>
          <div id="pkgInfo">
            <p>Required USDT Balance</p>
            <p>INR  {requiredUSDT}</p>
          </div>
          <div id="pkgInfo">
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
              <>
                <CButton
                  onClick={() => checkStakeData()}
                  className="btnPrimary mt-3"
                >
                  Proceed
                </CButton>

                <CModal
                  alignment="center"
                  visible={visible}
                  onClose={() => setVisible(false)}
                  aria-labelledby="VerticallyCenteredExample"
                >
                  <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">
                      Select Payment Type
                    </CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <div className="SelectWalletDiv">
                      <div
                        className="selectWalletInner"
                        onClick={() => (
                          setVisible(!visible), increaseAllowance()
                        )}
                      >
                        <img src={Purse} alt="" />
                        <p>Web3 Wallet</p>
                      </div>
                      <div
                        className="selectWalletInner"
                        onClick={() => StakeByAPI()}
                      >
                        <img src={QR} alt="" />
                        <p>Payment API</p>
                      </div>
                    </div>
                  </CModalBody>
                  {/* <CModalFooter>
                                        <CButton color="secondary" onClick={() => setVisible(false)}>
                                            Cancel
                                        </CButton>
                                        <CButton color="primary">Proceed</CButton>
                                    </CModalFooter> */}
                </CModal>
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StakingPage;
