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
import OrderHistory from "./FixedDepositPlanOrder";
import { useNavigate } from "react-router-dom";

const FixedDepositPlan = () => {
  const dispatch = useDispatch();
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [existUserName, setExistUserName] = useState();

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
  const [sponsorName, setSponsorName] = useState("");
  const [companyData, setCompanyData] = useState([])

  useEffect(() => {
    CompanyInfo();
    // fetchActivationUserName();
  }, []);
  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }
//   async function fetchActivationUserName() {
//     const body = {
//       username: username,
//     };
//     try {
//       const res = await AxiosPost(ApiPaths.checkSponsor, body);
//       if (res && res.name) {
//         setSponsorName(res.name); // Set the sponsor name
//       } else {
//         BasicInfo.isDebug && console.log("Sponsor name not found");
//         setSponsorName(" ")
//       }
//     } catch (e) {
//       BasicInfo.isDebug && console.error("Error fetching sponsor name", e);
//     }
//   }

const isUserExist = async () => {
    setLoad(true);

    if (!username) {
      setExistUserName(". . .");
      setLoad(false);
      return;
    }
    try {
      setLoad(true);
      const body = {
        username: username,
      };
      console.log("body", body);
      const res = await AxiosPost(ApiPaths.checkSponsor, body);
      if (res) {
        toastSuccess(res?.message);
        setExistUserName(res.name);
      } else {
        setExistUserName("User not exists");
      }
    } catch (e) {
      toastFailed(e?.response?.data?.message);
      setExistUserName("User not exists");
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    // Clear the timeout when the user is typing
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a new timeout to call the API after the user stops typing
    setTypingTimeout(
      setTimeout(() => {
        isUserExist();
      }, 500) // 500ms debounce delay
    );

    // Cleanup the timeout when the component is unmounted or when typing continues
    return () => clearTimeout(typingTimeout);
  }, [username]);





  useEffect(() => {
    if (profileData?.username) {
      setUsername(profileData.username);
    }
  }, [profileData]);

  useEffect(() => {
    FetchData();
    fetchIncome();
  }, []);
  async function fetchIncome() {
    try {
      const res = await AxiosGet(ApiPaths.getPackages);
      if (res) {
        // Filter packages with sip_status = "0"
        const filteredPackages = res?.packages?.filter(packageData => packageData.sip_status == "0");
  
        // Set the filtered packages in state
        setSelectPackage(filteredPackages);
  
        // Find "Meta F Time Deposit" in the filtered packages
        const fixedDepositPackage = filteredPackages.find(plan => plan.planId == "3");
  
        // Set select income with the value of "Meta F Time Deposit"
        if (fixedDepositPackage) {
          setSelectIncome(fixedDepositPackage.package.name);
          setPlanId(fixedDepositPackage?.planId);
        } else {
          BasicInfo.isDebug && console.log("Meta F Time Deposit package not found");
        }
      }
    } catch (e) {
      toastFailed(e?.response?.data?.message);
    }
  }
  



  const handleChange = (e) => {
    const selectedPackage = selectPackage.find(
      (pkg) => pkg?.package?.name === e.target.value
    );
    setSelectIncome(e.target.value);
    setPlanId(selectedPackage?.planId);
  };

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

  const handleTopUpSuccess = () => {
    setTopUpSuccess(true);
    setShowPopUp(false);
  };

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
              </div>

              <button
                onClick={() => {
                  setTopUpSuccess(false);
                  navigate("/dashboard");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </section>
      ) : null}
      <section className="dashboard">
        <h1 className="textHeadingWithMargin mt-0 mt-4">Package Activation ({selectIncome})</h1>
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
                <label htmlFor="Amount" style={{ textAlign: "end" }}>
                    <span>{load && username ? "Loading..." : existUserName}</span>
                    </label>
                {/* <label htmlFor="Amount" style={{ textAlign: "end" }}><span>{sponsorName || " "}</span></label> */}
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
              {/* <label>Select Packages</label>

              <div>
                <div
                  style={{
                    padding: "8px",
                    color: "var(--textColor)",
                    width: "100%",
                    borderRadius: "20px",
                    border: "1px solid #ccc", // Optional: to give it a similar appearance to the select box
                  }}
                >
                  {selectIncome || "Not Available"}
                </div>
              </div> */}

              {/* <div>
                <select
                  style={{
                    padding: "8px",
                    color: "var(--textColor)",
                    width: "100%",
                    borderRadius: "20px",
                  }}
                  name=""
                  id=""
                  value={selectIncome}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Select Package</option>
                  {selectPackage?.map((pkg) => (
                    <option key={pkg?.planId} value={pkg?.package?.name}>
                      {pkg?.package?.name}
                    </option>
                  ))}
                </select>
              </div> */}






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

export default FixedDepositPlan;

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
        console.log(body);
        const res = await AxiosPost(ApiPaths.topUp, body);
        console.log(res, "..");
        onTopUpSuccess();
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
