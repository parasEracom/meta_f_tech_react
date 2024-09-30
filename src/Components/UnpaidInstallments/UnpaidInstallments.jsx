// import React from 'react'
// import useAxiosHelper from '../../Common/AxiosHelper';
// import { ApiPaths } from '../../Config/ApiPath';
// import { BasicInfo } from '../../Config/BasicInfo';
// import moment from 'moment';
// import { toastFailed } from '../../Common/Data';

// export default function UnpaidInstallments() {

//     const [unpaidInstallments, setUnpaidInstallments] = useState([]);
//     const { AxiosGet, AxiosPost } = useAxiosHelper();

//     const getUnpaidInstallments = async () => {
//         try {
//             setLoading(true);
//             const response = await AxiosGet(ApiPaths.getUnpaidSip);
//             BasicInfo.isDebug && console.log("Unpaid Installments Data:", response?.data);

//             if (response.success && Array.isArray(response.data)) {
//                 // Flatten the unpaid installments array and store it
//                 const unpaidInstallments = response.data.flatMap(item => item.unpaidInstallments || []);
//                 setUnpaidInstallments(unpaidInstallments); // Store the unpaid installments data array
//             } else {
//                 toastFailed("Failed to fetch unpaid installments");
//             }
//         } catch (error) {
//             console.error("Error fetching unpaid installments:", error);
//             toastFailed(error?.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     var x = 0;
//     useEffect(() => {
//         if (x === 0) {
//             getUnpaidInstallments()
//             x++;
//         }
//     }, []);

//     return (
//         <div className="row justify-content-between">
//             {unpaidInstallments.map((installment) => (
//                 <div key={installment._id} className="col-12 col-sm-6 col-lg-6 mb-3">
//                     <div className="card" style={{ borderRadius: '8px', border: "none" }}>
//                         <div className="card-body" style={{ background: "var(--containerColor)", minWidth: "300px", color: "var(--textColor)" }}>
//                             <div className="d-flex flex-column">
//                                 <h5 className="card-title">SIP ID: {installment.sip_Id}</h5>
//                                 <div className="d-flex justify-content-between">
//                                     <p className="card-text">Installment No.:</p>
//                                     <p className="card-text">{installment.installment_id}</p>
//                                 </div>
//                                 <div className="d-flex justify-content-between">
//                                     <p className="card-text">Amount:</p>
//                                     <p className="card-text">{installment.installment_amount}</p>
//                                 </div>
//                                 <div className="d-flex justify-content-between">
//                                     <p className="card-text">Installment Date:</p>
//                                     <p className="card-text">
//                                         {moment(installment.installment_Date).format("DD MMM YYYY")}
//                                     </p>
//                                 </div>
//                                 <div className="mt-3">
//                                     <button
//                                         className="btnPrimary"
//                                         onClick={() =>
//                                             handleProceedClick(
//                                                 installment.sip_Id,
//                                                 installment.installment_amount,
//                                                 installment.installment_Date,
//                                                 installment.installment_id
//                                             )
//                                         }
//                                     >
//                                         Pay Now
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
// }


import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import useAxiosHelper from '../../Common/AxiosHelper';
import { ApiPaths } from '../../Config/ApiPath';
import { BasicInfo } from '../../Config/BasicInfo';
import moment from 'moment';
import { toastFailed, toastSuccess } from '../../Common/Data';
import './UnpaidInstallments.css'
import PopUp from '../PayNowPopUp/PopUp';

export default function UnpaidInstallments() {
    const [unpaidInstallments, setUnpaidInstallments] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const { AxiosGet, AxiosPost } = useAxiosHelper();
    const [showPopUp, setShowPopUp] = useState({ visible: false, sipId: null, amount: null, maturityDate: null, installmentId: null });
    const [companyData, setCompanyData] = useState([])

    const handleProceedClick = (sipId, amount, maturityDate, installmentId) => {
        BasicInfo.isDebug && console.log(sipId, "=>Sip")
        BasicInfo.isDebug && console.log(amount, "=>amount")
        BasicInfo.isDebug && console.log(maturityDate, "=>maturityDate")
        BasicInfo.isDebug && console.log(installmentId, "=>installmentId")
        setShowPopUp({ visible: true, sipId, amount, maturityDate, installmentId });
      };

    const getUnpaidInstallments = async () => {
        try {
            setLoading(true);
            const response = await AxiosGet(ApiPaths.getUnpaidSip);
            BasicInfo.isDebug && console.log("Unpaid Installments Data:", response?.data);

            if (response.success && Array.isArray(response.data)) {
                // Flatten the unpaid installments array and store it
                const unpaidInstallments = response.data.flatMap(item => item.unpaidInstallments || []);
                setUnpaidInstallments(unpaidInstallments); // Store the unpaid installments data array
            } else {
                toastFailed("Failed to fetch unpaid installments");
            }
        } catch (error) {
            console.error("Error fetching unpaid installments:", error);
            toastFailed(error?.message);
        } finally {
            setLoading(false);
        }
    };
    const payInstallment = async (sip_Id, installment_id, amount, maturityDate) => {
        setLoading(true);
        try {
          const body = {
            sip_Id: parseInt(sip_Id),
            installment_id: parseInt(installment_id),
          };
          BasicInfo.isDebug && console.log(body, "pppppppppppppppppppppppppppp")
          const response = await AxiosPost(ApiPaths.payInstallment, body);
          if (response?.data?.status == true) {
            toastSuccess(response?.message);
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
      async function CompanyInfo() {
        try {
          const data = localStorage.getItem("companyData");
          setCompanyData(JSON.parse(data));
        } catch (error) {
          BasicInfo.isDebug && console.log(error);
        }
      }

    useEffect(() => {
        CompanyInfo()
        getUnpaidInstallments(); // Directly call the function
    }, []); // Empty dependency array ensures it runs once on mount

    if (loading) {
        return <div>Loading...</div>; // Loading indicator
    }

    return (
     <>
        <div className="overflow-scroll">
            <div className="row flex-nowrap">
                {unpaidInstallments.map((installment) => (
                    <div key={installment._id} className="col-12 col-sm-6 col-lg-6 mb-3">
                        <div className="card" style={{ borderRadius: '8px', border: "none" }}>
                            <div className="card-body" style={{ background: "var(--containerColor)", minWidth: "300px", color: "var(--textColor)" }}>
                                <div className="d-flex flex-column">
                                    <h5 className="card-title">SIP ID: {installment.sip_Id}</h5>
                                    <div className="d-flex justify-content-between">
                                        <p className="card-text">Installment No.:</p>
                                        <p className="card-text">{installment.installment_id}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="card-text">Amount:</p>
                                        <p className="card-text">{installment.installment_amount}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="card-text">Installment Date:</p>
                                        <p className="card-text">
                                            {moment(installment.installment_Date).format("DD MMM YYYY")}
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            className="btnPrimary"
                                            onClick={() =>
                                                handleProceedClick(
                                                    installment.sip_Id,
                                                    installment.installment_amount,
                                                    installment.installment_Date,
                                                    installment.installment_id
                                                )
                                            }
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {showPopUp.visible && (
            <PopUp
              sipId={showPopUp.sipId}
              amount={showPopUp.amount}
              maturityDate={showPopUp.maturityDate}
              companyData={companyData}
              installmentId={showPopUp.installmentId}
              onClose={() => setShowPopUp({ visible: false })}
              onConfirm={() => {
                payInstallment(showPopUp.sipId, showPopUp.installmentId, showPopUp.amount, showPopUp.maturityDate);
                setShowPopUp({ visible: false });
              }}
            />
          )}
     </>
    );
}
