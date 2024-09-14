import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Data, toastFailed, toastSuccess } from "../../Common/Data";
import Loader from "../../Components/Loader/Loader";
import "./SellToken.css";
import liveRate from "../../Common/LiveRate";
import ContractDetails from "../../Contracts/ContractDetails";
import GetCoinBalance from "../../Common/GetCoinBalance";
import getAddress from "../../Common/GetAddress";
import GetChainId from "../../Common/GetChainId";
import GetFloatValue from "../../Common/GetFloatValue";
const SellToken = () => {
  const [coinAmount, setCoinAmount] = useState();
  const [coinAmountError, setCoinAmountError] = useState();
  const [loading, setLoading] = useState(false);
  const [tokenLiveRate, setTokenLiveRate] = useState(0);
  const [amountInUSDT, setAmountInUSDT] = useState(0);
  const [tokenBalance, setTokenBalance] = useState();
  const [walletAddress, setWalletAddress] = useState();
  let walletAdd = localStorage.getItem("walletAddress");
  let x = 0;
  useEffect(() => {
    if (x == 0) {
      FetchData();
      x = 1;
    }
  }, []);

  async function FetchData() {
    setLoading(true);
    try {
      Data.isDebug && console.log("walletAdd", walletAdd);
      const coinBal = await GetCoinBalance(walletAdd);
      setTokenBalance(GetFloatValue(coinBal, 4));
      const livePrice = await liveRate();
      setTokenLiveRate(livePrice);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  function calculateAmount(amount) {
    Data.isDebug && console.log({ tokenLiveRate, amount });
    setCoinAmount(amount);
    let amt = tokenLiveRate * amount;
    Data.isDebug && console.log(amt);
    setAmountInUSDT(parseFloat(amt).toFixed(2));
  }

  async function increaseAllowance() {
    setLoading(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        let chain = await GetChainId(walletAdd);
        if (chain) {
          const connectedAddress = await getAddress();
          Data.isDebug &&
            console.log("9999999999999", { connectedAddress, walletAdd });
          if (connectedAddress == walletAdd) {
            const newAmount = ethers.utils.parseUnits(
              coinAmount.toString(),
              18
            );
            const numericCoinAmount = parseFloat(coinAmount);
            const numericTokenBalance = parseFloat(tokenBalance);
            if (numericCoinAmount <= numericTokenBalance) {
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const busdInstance = new ethers.Contract(
                ContractDetails.token,
                ContractDetails.tokenABI,
                signer
              );
              // Data.isDebug && console.log("Instance : " + busdInstance);
              // Data.isDebug && console.log("value", x)
              let inc = await busdInstance.increaseAllowance(
                ContractDetails.contract,
                newAmount,
                { value: ethers.utils.parseEther("0") }
              );
              await inc.wait();
              sellTokenFunc(newAmount);
              Data.isDebug && console.log("Tr Hash 1: " + inc.hash);
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
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      alert("Transaction Failed");
      Data.isDebug && console.log("error", error);
      setLoading(false);
    }
  }
  async function sellTokenFunc(newAmount) {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        // Data.isDebug && console.log("11", provider);
        const signer = provider.getSigner();
        // Data.isDebug && console.log("22", signer);
        const contractInstance = new ethers.Contract(
          ContractDetails.contract,
          ContractDetails.contractABI,
          signer
        );
        let inc = await contractInstance.sellTokens(newAmount);
        await inc.wait();
        toastSuccess("Transaction Successful");
        setLoading(false);
        FetchData();
      }
    } catch (error) {
      Data.isDebug && console.log("error12", error);
      alert("something went wrong");
      setLoading(false);
    }
  }

  return (
    <>

      {loading ? <Loader /> : null}
      <div className="dashboard">
        <div className="addfundDiv inputPrimary">
          {/* <img
            src={Bonus}
            alt="img"
            style={{ margin: "auto", display: "block", width: "100px" }}
          /> */}
          <div>
            <div
              className="liveRateDiv liveRateDivInvestment"
              style={{ marginBottom: "7px" }}
            >
              <h5>{Data.coinName} Live Rate</h5>
              <div>
                <p>INR  {tokenLiveRate}</p>
              </div>
            </div>
            <div className="liveRateDiv liveRateDivInvestment">
              <h5>{Data.coinName} Wallet</h5>
              <div>
                <p>
                  {tokenBalance} {Data.coinName}
                </p>
              </div>
            </div>
          </div>
          <label htmlFor="Amount">Amount</label>
          <div className="inputDivIcon">
            <input
              min={1}
              required
              type="text"
              placeholder="Enter amount"
              value={coinAmount}
              onChange={(e) => calculateAmount(e.target.value)}
            />
            <i>
              <p>{Data.coinName}</p>
            </i>
          </div>
          <p className="errorMsg">{coinAmountError}</p>
          <div id="pkgInfo" className="mt-2">
            <p>You will get</p>
            <p>INR  {amountInUSDT}</p>
          </div>
          <button
            className="btnPrimary mt-2"
            onClick={() => increaseAllowance()}
          >
            Sell Coin
          </button>
        </div>
      </div>
    </>
  );
};

export default SellToken;
