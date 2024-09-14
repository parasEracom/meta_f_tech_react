import React, { useEffect, useState } from "react";
import "./PaymentWithUPI.css";
import { useNavigate } from "react-router-dom";
import useAxiosHelper from "./../../Common/AxiosHelper";
import { ApiPaths } from "./../../Config/ApiPath";
import { BsQrCodeScan } from "react-icons/bs";
import { FaMoneyCheckDollar, FaReceipt } from "react-icons/fa6";
import RotateLoader from "./../../Components/RotateLoader/RotateLoader";
import QRCode from "react-qr-code";
import { toastFailed, toastSuccess } from "../../Config/BasicInfo";
import CopyFromtag from "../../Common/CopyFromtag";
import { FiCopy } from "react-icons/fi";
import { QRCodeSVG } from "qrcode.react";

const PaymentWithUPI = () => {
  const { AxiosGet } = useAxiosHelper();
  const navigate = useNavigate();
  const [upiDetailsData, setUpiDetailsData] = useState({});
  const [payableAmount, setPayableAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get("amount");
    if (amount) {
      setPayableAmount(amount);
    }

    if (!upiDetailsData?.upiId) {
      fetchBankDetails();
    }
  }, [upiDetailsData]);

  const fetchBankDetails = async () => {
    const data = localStorage.getItem("companyData");
    console.log(JSON.parse(data));
    setCompanyData(JSON.parse(data));
    try {
      setLoading(true);
      const res = await AxiosGet(ApiPaths.getPaymentMethod);
      if (res?.activeOptions?.manual?.upi?.[0]) {
        setUpiDetailsData(res.activeOptions.manual.upi[0]);
        toastSuccess(res?.data?.message);
      } else {
        throw new Error("No UPI details found.");
      }
    } catch (e) {
      toastFailed(
        e?.response?.data?.message ||
          e.message ||
          "Failed to fetch UPI details."
      );
    } finally {
      setLoading(false);
    }
  };
  const UpiQrCode = ({ upiId, amount, name }) => {
    // Generate UPI payment link
    const upiLink = `upi://pay?pa=${upiId}&pn=${name}&mc=&tid=&tt=&am=${amount}&cu=INR&url=`;

    return (
      <div>
        <QRCodeSVG
          value={upiLink}
          size={256}
          bgColor="#ffffff"
          fgColor="#000000"
          level="Q"
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      </div>
    );
  };
  return (
    <div className="dashboard">
      <section className="mainContent pt-4">
        <div className="paymentWithUPIContent">
          <div id="paymentWithUpiAmountDiv">
            <p>Amount</p>
            <p>
              INR
              {companyData?.currency_sign}
              {payableAmount}
            </p>
          </div>
          <div id="paymentWithUPIContentQRDiv">
            <h1>Scan QR Code To Pay</h1>
            {loading == true ? (
              <RotateLoader />
            ) : upiDetailsData?.upiId != null ? (
              <div>
                <UpiQrCode
                  upiId={upiDetailsData?.upiId}
                  amount={payableAmount}
                  name={upiDetailsData?.name}
                />
              </div>
            ) : (
              ""
            )}
            <p
              style={{
                color: "var(--textColor)",
                margin: "0",
                marginTop: "10px",
              }}
            >
              {upiDetailsData?.name}
            </p>

            <p
              id="upiId"
              style={{
                color: "var(--textColor)",
                margin: "10px 0 0",
                fontSize: "15px",
              }}
            >
              {upiDetailsData?.upiId}
              <i
                style={{ color: "var(--textColor)", marginLeft: "10px" }}
                onClick={() => CopyFromtag("upiId")}
              >
                <FiCopy />
              </i>
            </p>
            <p>Don't use the same QR code to pay multiple times</p>
          </div>{" "}
          <div id="paymentWithUPIContentProcess">
            <div>
              <i>
                <BsQrCodeScan />
              </i>
              <p>Scan the QR code or copy the provided UPI ID.</p>
            </div>
            <div>
              <i>
                <FaMoneyCheckDollar />
              </i>
              <p>
                Open your payment app (PayTM, PhonePE, GooglePay, BHIM, etc.)
                and select the "Send Money" or "UPI Payment" option.
              </p>
            </div>
            <div>
              <i style={{ fontSize: "22px" }}>
                <FaReceipt />
              </i>
              <p>
                Enter the payment amount. Then, review the payment details and
                complete the transaction.
              </p>
            </div>
          </div>
          <h5>If you have completed your payment, please share proof here:</h5>
          <button
            className="btnPrimary"
            onClick={() =>
              navigate("/dashboard/payment-proof", {
                state: { myData: JSON.stringify(payableAmount) },
              })
            }
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default PaymentWithUPI;
