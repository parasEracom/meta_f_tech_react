import React, { useState } from "react";
import { ApiPaths } from "../../Config/ApiPath";
import useAxiosHelper from "../../Common/AxiosHelper";
import { toastFailed, toastSuccess } from "../../Config/BasicInfo";
import { useNavigate } from "react-router-dom";

export default function PopUp({
  username,
  planId,
  amount,
  fundBalance,
  selectIncome,
  onClose,
}) {
  const [loading, setLoading] = useState(false);
  const [topUpSuccess, setTopUpSuccess] = useState(false);
  const { AxiosPost } = useAxiosHelper();
  const navigate = useNavigate();
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
        onClose();
        setTopUpSuccess(true);
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
      toastFailed("Invalid Data");
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
