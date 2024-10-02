import React, { useEffect, useState } from "react";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import PaginationComponent from "../../Components/PaginationControls/PaginationControls";
import useAxiosHelper from "../../Common/AxiosHelper";
import { toastFailed, toastSuccess } from "../../Common/Data";
import moment from "moment";
import PopUp from "../../Components/PayNowPopUp/PopUp"; // Importing the PopUp component

const SipOrderHistory = () => {
  const [paymentTransaction, setPaymentTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [investmentAmounts, setInvestmentAmounts] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filteredSipIds, setFilteredSipIds] = useState([]);
  const [selectedSipId, setSelectedSipId] = useState(null);
  const { AxiosGet, AxiosPost } = useAxiosHelper();
  const [companyData, setCompanyData] = useState([]);
  const handlePagination = (page) => { setCurrentPage(page); };

  const [showPopUp, setShowPopUp] = useState({ visible: false, sipId: null, amount: null, maturityDate: null, installmentId: null });

  useEffect(() => {
    CompanyInfo();
  }, []);

  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function getSip() {
    setLoading(true);
    try {
      const res = await AxiosGet(ApiPaths.getSip);
      const transactions = res?.data || [];
      setPaymentTransaction(transactions);
      const amounts = [
        ...new Set(transactions.map((transaction) => transaction.investment_amount)),
      ];
      setInvestmentAmounts(amounts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const payInstallment = async (sip_Id, installment_id, amount, maturityDate) => {
    setLoading(true);
    try {
      const body = {
        sip_Id: parseInt(sip_Id),
        installment_id: parseInt(installment_id),
      };

      const response = await AxiosPost(ApiPaths.payInstallment, body);
      if (response?.data?.status == true) {
        toastSuccess(response?.message);
        const currentDate = new Date();

        const updatedTransactions = filteredTransactions.map((transaction) => {
          if (transaction.sip_Id === sip_Id) {
            return {
              ...transaction,
              installment: transaction.installment.map((inst) => {
                if (inst.installment_id === installment_id) {
                  return {
                    ...inst,
                    status: 1,
                    paid_Date: currentDate,
                  };
                }
                return inst;
              }),
            };
          }
          return transaction;
        });
        setFilteredTransactions(updatedTransactions);
      } else {
        toastFailed("Coming Soon");
      }
    } catch (e) {
      console.error("Error:", e);
      toastFailed(e?.response?.data?.message || "Failed to pay installment.");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedClick = (sipId, amount, maturityDate, installmentId) => {
    setShowPopUp({ visible: true, sipId, amount, maturityDate, installmentId });
  };

  const handleSipSuccess = () => {
    setShowPopUp({ visible: false });
  };

  useEffect(() => {
    getSip();
  }, []);

  const filterByAmount = (amount) => {
    const filtered = paymentTransaction.filter(
      (transaction) => transaction.investment_amount === amount
    );

    const sipData = filtered.map((transaction) => ({
      sipId: transaction.sip_Id,
      createdAt: new Date(transaction.createdAt),
    }));

    const sortedSipData = sipData.sort((a, b) => b.createdAt - a.createdAt);
    const sortedSipIds = sortedSipData.map(data => data.sipId);

    setFilteredTransactions(filtered);
    setIsFilterApplied(true);
    setFilteredSipIds(sortedSipIds);
    setSelectedSipId(null);
  };

  const filterBySipId = (sipId) => {
    setSelectedSipId(sipId);
    const filteredBySipId = paymentTransaction.filter(
      (transaction) => transaction.sip_Id === sipId
    );
    setFilteredTransactions(filteredBySipId);
  };

  const resetFilter = () => {
    setFilteredTransactions([]);
    setIsFilterApplied(false);
    setSelectedSipId(null);
  };

  return (
    <>
      {loading && <Loader />}
      <section style={{ marginTop: "20px" }}>
        <section className="history">
          <h1 className="textHeading mt-30" style={{ marginBottom: "30px" }}>
            SIP Purchased Details
          </h1>

          <div className="filter-buttons SipSelectIncomeSelectBox" style={{ marginBottom: "20px" }}>
            {investmentAmounts.map((amount, index) => (
              <button key={index} onClick={() => filterByAmount(amount)}>
                {amount} {companyData?.currency}
              </button>
            ))}
            <button onClick={resetFilter}>Reset Filter</button>
          </div>

          {isFilterApplied && filteredSipIds.length > 0 ? (
            <div className="filter-buttons SipIdSelectBox">
              {filteredSipIds.map((sipId, index) => (
                <button className="SipIdFilter" key={index} onClick={() => filterBySipId(sipId)}>
                  SIP ID: {sipId}
                </button>
              ))}
            </div>
          ):(
            <p style={{color:"var(--textColor"}}>Please select an amount to view the SIP ID's:</p>
          )}
          {isFilterApplied && !selectedSipId && 
          (
            <p style={{color:"var(--textColor"}}>Please select a SIP ID to view further details:</p>
          )}

          {isFilterApplied &&selectedSipId && filteredTransactions.length > 0 && (
            <>
              {filteredTransactions.length > 0 && (
                <div className="maturityDateDiv">
                  <span>Maturity Date: {moment(filteredTransactions[0]?.maturity_date).format("DD-MM-YYYY")}</span>
                </div>
              )}
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Installment Amount ({companyData?.currency_sign})</th>
                      <th>Package</th>
                      <th>Installment Date</th>
                      <th>Paid Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction, i) => {
                      let firstPendingFound = false;
                      return transaction.installment.map((inst, j) => {
                        let statusDisplay;
                        if (inst.status === 1) {
                          statusDisplay = "Paid";
                        } else if (inst.status === 0 && !firstPendingFound) {
                          statusDisplay = (
                            <button
                              className="btnPrimary mb-0"
                              onClick={() => handleProceedClick(transaction.sip_Id, inst.installment_amount, inst.installment_Date, inst.installment_id)}
                            >
                              Pay
                            </button>
                          );
                          firstPendingFound = true;
                        } else {
                          statusDisplay = "Upcoming...";
                        }
                        return (
                          <tr key={`${i}-${j}`}>
                            <td>{j + 1}</td>
                            <td>{inst.installment_amount}</td>
                            <td>{transaction.package_type}</td>
                            <td>{moment(inst.installment_Date).format("DD MMM YY")}</td>
                            <td>{inst.paid_Date ? moment(inst.paid_Date).format("DD MMM YY") : "Pending"}</td>
                            <td>{statusDisplay}</td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </section>

      {showPopUp.visible && (
        <PopUp
          sipId={showPopUp.sipId}
          amount={showPopUp.amount}
          maturityDate={showPopUp.maturityDate}
          installmentId={showPopUp.installmentId}
          companyData={companyData}
          onClose={() => setShowPopUp({ visible: false })}
          onConfirm={() => {
            payInstallment(showPopUp.sipId, showPopUp.installmentId, showPopUp.amount, showPopUp.maturityDate);
            setShowPopUp({ visible: false });
          }}
        />
      )}
    </>
  );
};

export default SipOrderHistory;
