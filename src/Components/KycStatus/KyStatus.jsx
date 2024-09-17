import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import useAxiosHelper from '../../Common/AxiosHelper';
import { useNavigate } from 'react-router-dom';
import { ApiPaths } from '../../Config/ApiPath';
import KycPending from "./../../Images/KycPending.png";
import KycSubmitted from "./../../Images/KycSubmitted.png";
import KycApproved from "./../../Images/KycApproved.png";
import KycRejected from "./../../Images/KycRejected.png";

export default function KyStatus() {
    const [kycStatusShow, setKycStatusShow] = useState("");
    const [kycDetails, setKycDetails] = useState({});
    const { AxiosGet } = useAxiosHelper();
    const navigate = useNavigate();

    async function kycStatus() {
        const res = await AxiosGet(ApiPaths.getKycStatus);
        setKycStatusShow(res?.overall_kyc_status);
        setKycDetails(res?.isApproved); // Store bank, pan, and address status details
    }

    const handleKycClick = () => {
        navigate('/dashboard/kyc');
    };

    useEffect(() => {
        kycStatus();
    }, []);

    // Define status labels
    const statusLabels = {
        0: 'Pending',
        1: 'Submitted',
        2: 'Approved',
        3: 'Rejected'
    };

    return (
        <div>
            <>
                <div className="viewCappingDiv"></div>

                {kycStatusShow === "pending" && (
                    <Row md="12" className="capping d-flex kycDetailDiv">
                        <Col md="2" className="kycDetailDivImg">
                            <img src={KycPending} alt="KYC Pending" height="130px" width="auto" />
                        </Col>
                        <Col md="6">
                            <h3>Complete Your KYC</h3>
                            <span>Finish your KYC to gain full access. It's quick and easy!</span>
                        </Col>
                        <Col md="2">
                            <button className="btnPrimary" onClick={handleKycClick}>Complete KYC</button>
                        </Col>
                        <div style={{ textAlign: "center", display:"flex", justifyContent:"space-evenly" }}>
                        {/* <h4>KYC Status Overview:</h4> */}
                        <p><strong>Bank :</strong> {statusLabels[kycDetails.bank] || 'Unknown'}</p>
                        <p><strong>PAN :</strong> {statusLabels[kycDetails.pan] || 'Unknown'}</p>
                        <p><strong>Address :</strong> {statusLabels[kycDetails.address] || 'Unknown'}</p>
                    </div>
                    </Row>
                )}

                {kycStatusShow === "submitted" && (
                    <Row md="12" className="capping d-flex kycDetailDiv">
                        <Col md="2" className="kycDetailDivImg">
                            <img src={KycSubmitted} alt="KYC Submitted" height="130px" width="auto" />
                        </Col>
                        <Col md="6">
                            <h3>KYC Submitted</h3>
                            <span>Your KYC is under review. Verification may take some time.</span>
                        </Col>
                        <Col md="2">
                            <button className="btnPrimary" disabled>Verification in Progress</button>
                        </Col>
                        <div style={{ textAlign: "center", display:"flex", justifyContent:"space-evenly"  }}>
                        {/* <h4>KYC Status Overview:</h4> */}
                        <p><strong>Bank KYC:</strong> {statusLabels[kycDetails.bank] || 'Unknown'}</p>
                        <p><strong>PAN KYC:</strong> {statusLabels[kycDetails.pan] || 'Unknown'}</p>
                        <p><strong>Address KYC:</strong> {statusLabels[kycDetails.address] || 'Unknown'}</p>
                    </div>
                    </Row>
                )}

                {/* {kycStatusShow === "approved" && (
                    <Row md="12" className="capping d-flex kycDetailDiv">
                        <Col md="5" className="kycDetailDivImg">
                            <img src={KycApproved} alt="KYC Approved" height="60px" width="auto" />
                        </Col>
                        <Col md="6">
                            <h3 style={{ textAlign: "center" }}>KYC Verified Successfully</h3>
                        </Col>
                    </Row>
                )} */}

                {kycStatusShow === "rejected" && (
                    <Row md="12" className="capping d-flex kycDetailDiv">
                        <Col md="2" className="kycDetailDivImg">
                            <img src={KycRejected} alt="KYC Approved" height="70px" width="auto" />
                        </Col>
                        <Col md="6">
                            <h3>Unfortunately, your KYC has been rejected</h3>
                            <span>Contact Admin for further information</span>
                        </Col>
                        <Col md="2">
                            <button className="btnPrimary" disabled>Support</button>
                        </Col>
                    </Row>
                )}
            </>
        </div>
    );
}



// import React, { useEffect, useState } from 'react';
// import { Col, Row } from 'react-bootstrap';
// import useAxiosHelper from '../../Common/AxiosHelper';
// import { useNavigate } from 'react-router-dom';
// import { ApiPaths } from '../../Config/ApiPath';
// import KycPending from "./../../Images/KycPending.png";
// import KycSubmitted from "./../../Images/KycSubmitted.png";
// import KycApproved from "./../../Images/KycApproved.png";
// import KycRejected from "./../../Images/KycRejected.png";

// export default function KyStatus() {
//     const [kycStatusShow, setKycStatusShow] = useState("");
//     const [kycDetails, setKycDetails] = useState({});
//     const [showPopup, setShowPopup] = useState(false); // New state for popup visibility
//     const { AxiosGet } = useAxiosHelper();
//     const navigate = useNavigate();

//     async function kycStatus() {
//         const res = await AxiosGet(ApiPaths.getKycStatus);
//         const currentStatus = res?.overall_kyc_status;
//         setKycStatusShow(currentStatus);
//         setKycDetails(res?.isApproved); // Store bank, pan, and address status details

//         // Show popup if status is "approved" and has not been shown before
//         if (currentStatus === "approved") {
//             setShowPopup(true);
//             // Hide the popup after 3 seconds
//             setTimeout(() => setShowPopup(false), 3000);
//         }
//     }

//     const handleKycClick = () => {
//         navigate('/dashboard/kyc');
//     };

//     useEffect(() => {
//         kycStatus();
//     }, []);

//     // Define status labels
//     const statusLabels = {
//         0: 'Pending',
//         1: 'Submitted',
//         2: 'Approved',
//         3: 'Rejected'
//     };

//     return (
//         <div>
//             <>
//                 <div className="viewCappingDiv"></div>

//                 {kycStatusShow === "pending" && (
//                     <Row md="12" className="capping d-flex kycDetailDiv">
//                         <Col md="2" className="kycDetailDivImg">
//                             <img src={KycPending} alt="KYC Pending" height="130px" width="auto" />
//                         </Col>
//                         <Col md="6">
//                             <h3>Complete Your KYC</h3>
//                             <span>Finish your KYC to gain full access. It's quick and easy!</span>
//                         </Col>
//                         <Col md="2">
//                             <button className="btnPrimary" onClick={handleKycClick}>Complete KYC</button>
//                         </Col>
//                         <div style={{ textAlign: "center", display:"flex", justifyContent:"space-evenly" }}>
//                             <p><strong>Bank :</strong> {statusLabels[kycDetails.bank] || 'Unknown'}</p>
//                             <p><strong>PAN :</strong> {statusLabels[kycDetails.pan] || 'Unknown'}</p>
//                             <p><strong>Address :</strong> {statusLabels[kycDetails.address] || 'Unknown'}</p>
//                         </div>
//                     </Row>
//                 )}

//                 {kycStatusShow === "submitted" && (
//                     <Row md="12" className="capping d-flex kycDetailDiv">
//                         <Col md="2" className="kycDetailDivImg">
//                             <img src={KycSubmitted} alt="KYC Submitted" height="130px" width="auto" />
//                         </Col>
//                         <Col md="6">
//                             <h3>KYC Submitted</h3>
//                             <span>Your KYC is under review. Verification may take some time.</span>
//                         </Col>
//                         <Col md="2">
//                             <button className="btnPrimary" disabled>Verification in Progress</button>
//                         </Col>
//                         <div style={{ textAlign: "center", display:"flex", justifyContent:"space-evenly"  }}>
//                             <p><strong>Bank KYC:</strong> {statusLabels[kycDetails.bank] || 'Unknown'}</p>
//                             <p><strong>PAN KYC:</strong> {statusLabels[kycDetails.pan] || 'Unknown'}</p>
//                             <p><strong>Address KYC:</strong> {statusLabels[kycDetails.address] || 'Unknown'}</p>
//                         </div>
//                     </Row>
//                 )}

//                 {/* {kycStatusShow === "approved" && showPopup && (
//                     <div className="kyc-popup" style={{
//                         position: "fixed",
//                         // top: "10%",
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         // backgroundColor: "#f0fff4",
//                         padding: "20px",
//                         borderRadius: "10px",
//                         zIndex: 1000,
//                         textAlign: "center"
//                     }}>
//                         <Row md="12" className="capping d-flex kycDetailDiv">
//                             <Col md="5" className="kycDetailDivImg">
//                                 <img src={KycApproved} alt="KYC Approved" height="60px" width="auto" />
//                             </Col>
//                             <Col md="6">
//                                 <h3>KYC Verified Successfully</h3>
//                             </Col>
//                         </Row>
//                     </div>
//                 )} */}

//                 {kycStatusShow === "rejected" && (
//                     <Row md="12" className="capping d-flex kycDetailDiv">
//                         <Col md="2" className="kycDetailDivImg">
//                             <img src={KycRejected} alt="KYC Approved" height="70px" width="auto" />
//                         </Col>
//                         <Col md="6">
//                             <h3>Unfortunately, your KYC has been rejected</h3>
//                             <span>Contact Admin for further information</span>
//                         </Col>
//                         <Col md="2">
//                             <button className="btnPrimary" disabled>Support</button>
//                         </Col>
//                     </Row>
//                 )}
//             </>
//         </div>
//     );
// }
