import React from "react";
import moment from "moment";

const PopUp = ({ sipId, amount, maturityDate, companyData, onClose, onConfirm, installmentId }) => {
  return (
    <div className="otpSection" style={{ zIndex: "999" }}>
      <div className="otpContainer" style={{ width: "400px" }}>
        <p>
          Are you sure you want to pay installment <strong>{installmentId} </strong> for SIP ID: <strong>{sipId}</strong>?
        </p>
        <p>
          Amount: <strong>{companyData?.currency_sign}{amount}</strong>
        </p>
        <p>
          Maturity Date: <strong>{moment(maturityDate).format("DD-MM-YYYY")}</strong>
        </p>
        <div>
          <button className="btnSecondary" onClick={onClose}>
            No
          </button>
          <button className="btnPrimary" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
