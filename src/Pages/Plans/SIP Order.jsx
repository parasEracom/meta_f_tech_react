import React, { useEffect, useState } from "react";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import PaginationComponent from "../../Components/PaginationControls/PaginationControls";
import useAxiosHelper from "../../Common/AxiosHelper";
import { toastFailed, toastSuccess } from "../../Common/Data";
import moment from "moment";
import { BasicInfo } from "../../Config/BasicInfo";

const SipOrderHistory = () => {
  const [paymentTransaction, setPaymentTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [investmentAmounts, setInvestmentAmounts] = useState([]); // Store unique investment amounts
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Track if filter is applied
  const [filteredSipIds, setFilteredSipIds] = useState([]); // Store filtered sip_Id values
  const [selectedSipId, setSelectedSipId] = useState(null); // Track selected sip_Id
  const { AxiosGet, AxiosPost } = useAxiosHelper(); // Use AxiosPost for the payment request
  const handlePagination = (page) => { setCurrentPage(page); };
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
      console.log(error);
    }
  }
  // Function to fetch SIP data
  async function getSip() {
    setLoading(true);
    try {
      const res = await AxiosGet(ApiPaths.getSip);
      const transactions = res?.data || [];
      setPaymentTransaction(transactions);

      // Extract unique investment amounts from the data
      const amounts = [
        ...new Set(transactions.map((transaction) => transaction.investment_amount)),
      ];
      setInvestmentAmounts(amounts); // Set unique investment amounts for buttons
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // const payInstallment = async (sip_Id, installment_id) => {
  //   setLoading(true);
  //   try {
  //     const body = {
  //       sip_Id:parseInt(sip_Id),
  //       installment_id:parseInt(installment_id),
  //     };

  //     console.log("Body:", body);
  //     console.log(typeof sip_Id,"is type of SIP");
  //     console.log(typeof installment_id,"is type of Installment ID");

  //     const response = await AxiosPost(ApiPaths.payInstallment, body);
  //     console.log(response, "Response of Pay Installment")
  //     if (response?.data?.status == true) {
  //       // Handle success
  //       toastSuccess("Installment paid successfully.");
  //       // Optionally refresh the data to reflect changes
  //       getSip(); // Refresh data to update the state
  //     } else {
  //       toastFailed("Unexpected response status");
  //     }
  //   } catch (e) {
  //     console.error("Error:",e);
  //     toastFailed(e?.response?.data?.message || "Failed to pay installment.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const payInstallment = async (sip_Id, installment_id) => {
  //   setLoading(true);
  //   try {
  //     const body = {
  //       sip_Id: parseInt(sip_Id),
  //       installment_id: parseInt(installment_id),
  //     };

  //     const response = await AxiosPost(ApiPaths.payInstallment, body);

  //     if (response?.data?.status == true) {
  //       // Handle success
  //       toastSuccess("Installment paid successfully.");

  //       // Update the payment status directly in the state to reflect UI changes instantly
  //       const updatedTransactions = filteredTransactions.map((transaction) => {
  //         if (transaction.sip_Id === sip_Id) {
  //           return {
  //             ...transaction,
  //             installment: transaction.installment.map((inst) => {
  //               if (inst.installment_id === installment_id) {
  //                 return { ...inst, status: 1 }; // Mark the installment as "Paid"
  //               }
  //               return inst;
  //             }),
  //           };
  //         }
  //         return transaction;
  //       });

  //       setFilteredTransactions(updatedTransactions); // Update the state with new data
  //     } else {
  //       toastFailed("Unexpected response status");
  //     }
  //   } catch (e) {
  //     console.error("Error:", e);
  //     toastFailed(e?.response?.data?.message || "Failed to pay installment.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const payInstallment = async (sip_Id, installment_id) => {
    setLoading(true);
    try {
      const body = {
        sip_Id: parseInt(sip_Id),
        installment_id: parseInt(installment_id),
      };

      const response = await AxiosPost(ApiPaths.payInstallment, body);
      BasicInfo.isDebug && console.log(response, "lllllll")
      if (response?.data?.status == true) {
        // Handle success
        toastSuccess(response?.message);

        const currentDate = new Date(); // Get current date for paid_Date

        // Update the payment status directly in the state to reflect UI changes instantly
        const updatedTransactions = filteredTransactions.map((transaction) => {
          if (transaction.sip_Id === sip_Id) {
            return {
              ...transaction,
              installment: transaction.installment.map((inst) => {
                if (inst.installment_id === installment_id) {
                  return {
                    ...inst,
                    status: 1, // Mark the installment as "Paid"
                    paid_Date: currentDate, // Update the paid_Date with the current date
                  };
                }
                return inst;
              }),
            };
          }
          return transaction;
        });

        setFilteredTransactions(updatedTransactions); // Update the state with the new data
      } else {
        toastFailed("Unexpected response status");
      }
    } catch (e) {
      console.error("Error:", e);
      toastFailed(e?.response?.data?.message || "Failed to pay installment.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getSip();
  }, []);

  // Filter transactions by investment amount
  // const filterByAmount = (amount) => {
  //   const filtered = paymentTransaction.filter(
  //     (transaction) => transaction.investment_amount === amount
  //   );
  //   setFilteredTransactions(filtered);
  //   setIsFilterApplied(true); // Set to true when filter is applied

  //   // Extract unique sip_Ids from filtered transactions
  //   const sipIds = [...new Set(filtered.map((transaction) => transaction.sip_Id))];
  //   setFilteredSipIds(sipIds); // Set unique sip_Ids for further filtering
  //   setSelectedSipId(null); // Reset sip_Id selection
  // };


  const filterByAmount = (amount) => {
    // Filter transactions based on the selected amount
    const filtered = paymentTransaction.filter(
      (transaction) => transaction.investment_amount === amount
    );

    // Extract SIP IDs with their creation dates
    const sipData = filtered.map((transaction) => ({
      sipId: transaction.sip_Id,
      createdAt: new Date(transaction.createdAt), // Convert to Date object for sorting
    }));

    // Sort the SIP IDs by createdAt in descending order
    const sortedSipData = sipData.sort((a, b) => b.createdAt - a.createdAt);

    // Extract sorted SIP IDs
    const sortedSipIds = sortedSipData.map(data => data.sipId);

    // Update the state with sorted SIP IDs and apply filter
    setFilteredTransactions(filtered);
    setIsFilterApplied(true);
    setFilteredSipIds(sortedSipIds);
    setSelectedSipId(null); // Reset SIP ID selection
  };




  // Filter by selected sip_Id
  const filterBySipId = (sipId) => {
    setSelectedSipId(sipId);
    const filteredBySipId = paymentTransaction.filter(
      (transaction) => transaction.sip_Id === sipId
    );
    setFilteredTransactions(filteredBySipId); // Update filteredTransactions based on selected sipId
  };

  // Reset all filters
  const resetFilter = () => {
    setFilteredTransactions([]); // Clear filtered data
    setIsFilterApplied(false); // Set to false when reset
    setSelectedSipId(null); // Reset sip_Id
  };

  return (
    <>
      {loading && <Loader />}
      <section style={{ marginTop: "20px" }}>
        <section className="history">
          <h1 className="textHeading mt-30" style={{ marginBottom: "30px" }}>
            SIP Purchased Details
          </h1>

          {/* Dynamic Filter Buttons Below the Heading */}
          <div className="filter-buttons SipSelectIncomeSelectBox" style={{ marginBottom: "20px" }}>
            {investmentAmounts.map((amount, index) => (
              <button key={index} onClick={() => filterByAmount(amount)}>
                {amount} {companyData?.currency}

              </button>

            ))}
            
            <button onClick={resetFilter}>Reset Filter</button>

          </div>

          {/* Conditionally Render SIP ID Filter Buttons */}
          {isFilterApplied && filteredSipIds.length > 0 && (
            <div className="filter-buttons SipIdSelectBox">
              {filteredSipIds.map((sipId, index) => (
                <button className="SipIdFilter" key={index} onClick={() => filterBySipId(sipId)}>
                  SIP ID: {sipId}
                </button>
              ))}
            </div>
          )}

          {/* Conditionally Render Table After Clicking a Filter */}
          {isFilterApplied && filteredTransactions.length > 0 && (
            <>
              {filteredTransactions.length > 0 && (
                <div className="maturityDateDiv">
                  <span>Maturity Date: {moment(filteredTransactions[0]?.maturity_date).format("DD-MM-YYYY")}</span>
                  {/* <span>Maturity Time: {filteredTransactions[0]?.maturity_time || "N/A"} Months</span> */}
                </div>
              )}
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Installment Amount ({companyData?.currency})</th>
                      <th>Package</th>
                      <th>Installment Date</th>
                      <th>Paid Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction, i) => {
                      let firstPendingFound = false; // To track if the first unpaid installment has been found
                      return transaction.installment.map((inst, j) => {
                        let statusDisplay;
                        if (inst.status === 1) {
                          // If the installment is paid (status === 1)
                          statusDisplay = "Paid";
                        } else if (inst.status === 0 && !firstPendingFound) {
                          // If it's the first unpaid installment, show "Pay" button
                          statusDisplay = (
                            <button
                              className="btnPrimary mb-0"
                              onClick={() =>
                                payInstallment(transaction.sip_Id, inst.installment_id)
                              }
                            >
                              Pay
                            </button>
                          );
                          firstPendingFound = true; // Mark that the first unpaid installment is found
                        } else {
                          // For subsequent unpaid installments, show "Pending"
                          statusDisplay = "Pending Now";
                        }
                        return (
                          <tr key={`${i}-${j}`}>
                            <td>{j + 1}</td>
                            <td>{parseFloat(inst.installment_amount).toFixed(2)}</td>
                            <td>{transaction.package_type}</td>
                            <td>{new Date(inst.installment_Date).toLocaleDateString()}</td>
                            <td>
                              {inst.paid_Date
                                ? new Date(inst.paid_Date).toLocaleDateString()
                                : "Pending"}
                            </td>
                            <td>{statusDisplay}</td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePagination}
                />
              </div>
            </>
          )}
          {/* Show a message if no filter is applied or no data is available */}
          {!isFilterApplied && (
            <div className="sipFilterText" >
              <p>Please select a filter to view the SIP details.</p>
            </div>
          )}
          {isFilterApplied && filteredTransactions.length === 0 && (
            <div className="sipFilterText" >
              <p>No history found for the selected filter.</p>
            </div>
          )}
        </section>
      </section>
    </>
    
  );
};

export default SipOrderHistory;
