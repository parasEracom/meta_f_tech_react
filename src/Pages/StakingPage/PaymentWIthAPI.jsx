import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { IoCopyOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import CopyFromtag from "../../Common/CopyFromtag";
import Timer from "../../Components/Timer";

const PaymentWIthAPI = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [paymentData, setPaymentData] = useState();

  useEffect(() => {
    try {
      let apiData = JSON.parse(location?.state?.myData);
      console.log("2222222222222222222222222", apiData);
      setPaymentData(apiData);
      if (!apiData?.success) {
        navigate("/dashboard/plans");
      }
    } catch (e) {
      navigate("/dashboard/plans");
      console.log(e);
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="qrSection">
        <p>
          You have to Pay {parseFloat(paymentData?.paymentAmount).toFixed(2)} to
          given address before {paymentData?.expiryDate}
        </p>
        <h5>Pay : {parseFloat(paymentData?.paymentAmount).toFixed(2)}</h5>
        <div className="qrDiv">
          {paymentData?.paymentWallet && (
            <QRCode value={paymentData?.paymentWallet} />
          )}
        </div>
        <p id="timer">
          {paymentData?.expiryDate && <Timer time={paymentData?.expiryDate} />}
        </p>
        <div id="qrAddress">
          <p id="fundAddress">{paymentData?.paymentWallet ?? ""}</p>
          <i onClick={() => CopyFromtag("fundAddress")}>
            <IoCopyOutline />
          </i>
        </div>
      </div>
    </div>
  );
};

export default PaymentWIthAPI;
