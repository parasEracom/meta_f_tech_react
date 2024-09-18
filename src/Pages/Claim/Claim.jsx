import React, { useEffect, useState } from "react";
import "./Claim.css";
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
const Claim = () => {
  const dispatch = useDispatch();
  const { BigInt } = window;
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [amountError, setAmountError] = useState("");
  const [checkSponsorExist, setCheckSponsorExist] = useState(false);
  const [sponsorError, setSponsorError] = useState("");
  const [sponsorId, setSponsorId] = useState();
  const [fundBalance, setFundBalance] = useState();

  const [sponsorLoading, setSponsorLoading] = useState(false);
  const { AxiosPost, AxiosGet } = useAxiosHelper();
  const incomeData = useSelector((state) => state.incomeData.incomeWallet);
  const profileData = useSelector(
    (state) => state.profileData.userPersonalInfo
  );

  const [companyData, setCompanyData] = useState([])

  useEffect(() => {
    CompanyInfo();
  }, []);
  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }

  const Withdraw = async () => {
    try {
      setLoading(true);
      const body = {
        amount: amount,
      };
      const tempWithdrawData = await AxiosPost(ApiPaths.withdraw, body);
      toastSuccess(tempWithdrawData?.message);
    } catch (error) {
      toastFailed(error?.response?.data?.message);
    } finally {
      setLoading(false);
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
              <h1>Withdraw</h1>

              <div className="subscriptionWallets">
                {incomeData?.map((x, i) => {
                  return (
                    x?.name == "Main Wallet" && (
                      <div className="fundWallet">
                        <p>{x?.name}</p>
                        <h5>{companyData?.currency_sign}
                          {x?.value}</h5>
                      </div>
                    )
                  );
                })}
              </div>
              <label htmlFor="Amount">Amount ({companyData?.currency_sign})</label>
              <input
                type="number"
                className="inputPrimary"
                placeholder="Enter Amount"
                style={{ borderRadius: "25px", padding: "8px 20px" }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="errorMsg">{amountError}</p>
              <button className="btnPrimary mt-3" onClick={Withdraw}>
                Proceed
              </button>
            </div>
          </div>
        </div>
        <Row className="d-flex gap-4"></Row>
      </section>
    </>
  );
};

export default Claim;
