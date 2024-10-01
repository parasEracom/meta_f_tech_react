import React, { useEffect, useState } from "react";
import "./Fund.css";
import { Row, Col } from "react-bootstrap";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ApiPaths } from "../../Config/ApiPath";
import { AiOutlineUser } from "react-icons/ai";
import useAxiosHelper from "../../Common/AxiosHelper";
import { setUserPersonalInfo } from "../../Redux/ProfileDataSlice";
import { setIncomeWallet } from "../../Redux/IncomeWallet";
import { BasicInfo, toastFailed, toastSuccess } from "../../Config/BasicInfo";
import ArrayToObject from "../../Common/ArrayToObject";
import FundHistory from "./FundHistory";
const Fund = () => {
  const dispatch = useDispatch();
  const { BigInt } = window;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [showFundHistory, setShowFundHistory] = useState(false);

  const [amountError, setAmountError] = useState("");
  const [paymentTransaction, setPaymentTransaction] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("0");
  const [companyData, setCompanyData] = useState([])
  useEffect(() => {
    CompanyInfo();
  }, []);
  async function CompanyInfo() {
    try {
      // const response = await AxiosGet(ApiPaths.getCompanyDetails);
      // // console.log(response, "llllllllll");
      // localStorage.setItem(
      //   "companyData",
      //   JSON.stringify(response?.company_info)
      // );
      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }

  const handleShowFundHistory = (newStatus) => {
    setStatus((prevStatus) => (prevStatus === newStatus ? "" : newStatus));
  };
  const handleDeposit = () => {
    if (amount > 0) {
      const data = { amount: amount };
      const queryParams = new URLSearchParams(data).toString();
      window.location.href = `payment-upi?${queryParams}`;
    } else {
      toastFailed("Invalid amount");
    }
  };
  return (
    <>
      {loading ? <Loader /> : null}

      <section className="dashboard">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="planDiv">
            <div className="addfundDiv inputPrimary ">
              <h1>Deposit</h1>

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
              <button className="btnPrimary mt-3" onClick={handleDeposit}>
                Deposit
              </button>
            </div>
          </div>
        </div>
        <section>
          <div style={{ padding: "20px" }}>
            {" "}
            <Row>
              <Col lg="2" md="4" xs="6">
                <div
                  className={`tab ${status === "0" ? "active" : ""} fundActive`}
                  onClick={() => handleShowFundHistory("0")}
                >
                  Pending
                </div>
              </Col>
              <Col lg="2" md="4" xs="6">
                <div
                  className={`tab ${status === "1" ? "active" : ""} fundActive`}
                  onClick={() => handleShowFundHistory("1")}
                >
                  Approved
                </div>
              </Col>
            </Row>
          </div>
          {status && <FundHistory status={status} />}
        </section>
      </section>
    </>
  );
};

export default Fund;
