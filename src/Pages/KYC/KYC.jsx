import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import "./KYC.css";
import Loader from "../../Components/Loader/Loader";
import useAxiosHelper from "../../Common/AxiosHelper";
import { ApiPaths } from "../../Config/ApiPath";
import { toastFailed, toastSuccess } from "../../Config/BasicInfo";

const KYC = () => {
  const [activeTab, setActiveTab] = useState("bank");
  const [loading, setLoading] = useState(false);
  const [accNo, setAccNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");
  const [idNo, setIdNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedBankType, setSelectedBankType] = useState("");
  const [bankType, setBankType] = useState("");
  const [fileName, setFileName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [name, setName] = useState("");
  const { AxiosPost } = useAxiosHelper();
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState({
    bank: [],
    pan: [],
    addressFront: [],
    addressBack: [],
  });

  const handleFilesChange = (newFiles, type) => {
    setFiles(newFiles);
    setPreviews((prevPreviews) => ({
      ...prevPreviews,
      [type]: newFiles.map((file) => URL.createObjectURL(file)),
    }));
  };

  const handleBank = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("accountNumber", accNo);
      formData.append("ifscCode", ifscCode);
      formData.append("bankName", bankName);
      formData.append("accountType", selectedBankType);
      formData.append("holderName", holderName);
      files.forEach((file) => {
        formData.append("document", file);
      });
      const response = await AxiosPost(ApiPaths.getBankDetails, formData);
      if (response) {
        toastSuccess(response?.message);
      }
    } catch (e) {
      console.error("Error submitting bank details:", e);
      toastFailed(e?.response?.data?.message);
    } finally {
      setLoading(false);
      setAccNo("");
      setBankName("");
      setIfscCode("");
      setSelectedBankType("");
      setHolderName("");
      setFiles([]);
      setPreviews((prevPreviews) => ({ ...prevPreviews, bank: [] }));
    }
  };

  const handlePan = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("panNumber", panNo);
      files.forEach((file) => {
        formData.append("document", file);
      });
      const res = await AxiosPost(ApiPaths.getPanCardDetails, formData);
      if (res) {
        toastSuccess(res?.message);
      }
    } catch (e) {
      console.error("Error submitting PAN details:", e);
      toastFailed(e?.response?.data?.message);
    } finally {
      setLoading(false);
      setPanNo("");
      setFiles([]);
      setPreviews((prevPreviews) => ({ ...prevPreviews, pan: [] }));
    }
  };

  const handleAddress = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("idType", selectedValue);
      formData.append("idNumber", idNo);
      formData.append("name", name);
      formData.append("address", address);
      files.forEach((file) => {
        formData.append("documentFront", file);
      });
      files.forEach((file) => {
        formData.append("documentBack", file);
      });
      const resp = await AxiosPost(ApiPaths.getAddressDetails, formData);
      if (resp) {
        toastSuccess(resp?.message);
      }
    } catch (e) {
      console.error("Error submitting address details:", e);
      toastFailed(e?.response?.data?.message);
    } finally {
      setLoading(false);
      setSelectedValue("");
      setName("");
      setAddress("");
      setIdNo("");
      setFiles([]);
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        addressFront: [],
        addressBack: [],
      }));
    }
  };

  const onDrop = async (acceptedFiles, type) => {
    const compressedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);
          return compressedFile;
        } catch (err) {
          console.error("Error compressing image:", err);
          return file;
        }
      })
    );
    handleFilesChange(compressedFiles, type);
  };

  const { getRootProps: getBankRootProps, getInputProps: getBankInputProps } =
    useDropzone({ onDrop: (acceptedFiles) => onDrop(acceptedFiles, "bank") });
  const { getRootProps: getPanRootProps, getInputProps: getPanInputProps } =
    useDropzone({ onDrop: (acceptedFiles) => onDrop(acceptedFiles, "pan") });
  const {
    getRootProps: getAddressFrontRootProps,
    getInputProps: getAddressFrontInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "addressFront"),
  });
  const {
    getRootProps: getAddressBackRootProps,
    getInputProps: getAddressBackInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "addressBack"),
  });

  return (
    <section className="dashboard" style={{ paddingTop: "10px" }}>
      {loading && <Loader />}

      <Row className="mt-4">
        <Col lg="4" className="mb-2">
          <div className="tabButton">
            <button className="btnPrimary" onClick={() => setActiveTab("bank")}>
              Bank KYC
            </button>
            <button className="btnPrimary" onClick={() => setActiveTab("pan")}>
              Pan KYC
            </button>
            <button
              className="btnPrimary"
              onClick={() => setActiveTab("address")}
            >
              Address KYC
            </button>
          </div>
        </Col>
        <Col lg="6" className="mb-2">
          {activeTab === "bank" && (
            <div className="editProfile inputPrimary">
              <h3>Bank Details</h3>
              <label htmlFor="">Account no</label>
              <input
                type="number"
                placeholder="Account no"
                value={accNo}
                onChange={(e) => setAccNo(e.target.value)}
              />
              {errors.accNo && <p className="error">{errors.accNo}</p>}

              <label htmlFor="">IFSC Code</label>
              <input
                placeholder="IFSC Code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />
              {errors.ifscCode && <p className="error">{errors.ifscCode}</p>}

              <label htmlFor="">Bank Name</label>
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              {errors.bankName && <p className="error">{errors.bankName}</p>}

              <label htmlFor="">Bank Type</label>

              <select
                id="mySelect"
                value={selectedBankType}
                onChange={(e) => setSelectedBankType(e.target.value)}
              >
                <option>Choose Bank Type</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
              </select>
              {errors.selectedBankType && (
                <p className="error">{errors.selectedBankType}</p>
              )}

              <label htmlFor="">Holder Name</label>
              <input
                type="text"
                placeholder="Holder Name"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
              />
              {errors.holderName && (
                <p className="error">{errors.holderName}</p>
              )}

              <label htmlFor="">Upload Document</label>
              <div className="file-upload-container">
                <div {...getBankRootProps({ className: "dropzone" })}>
                  <input {...getBankInputProps()} />
                  <p>
                    Drag 'n' drop bank document here, or click to select one
                  </p>
                </div>
                {previews.bank.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    style={{ width: 100, height: 100, margin: 10 }}
                  />
                ))}
              </div>
              <button className="btnPrimary" onClick={handleBank}>
                Submit
              </button>
            </div>
          )}

          {activeTab === "pan" && (
            <div className="editProfile inputPrimary">
              <h3>PAN Details</h3>
              <label htmlFor="">Pan No</label>
              <input
                type="text"
                placeholder="Pan No"
                value={panNo}
                onChange={(e) => setPanNo(e.target.value)}
              />
              {errors.panNo && <p className="error">{errors.panNo}</p>}

              <label htmlFor="">Upload Document</label>
              <div className="file-upload-container">
                <div {...getPanRootProps({ className: "dropzone" })}>
                  <input {...getPanInputProps()} />
                  <p>Drag 'n' drop PAN document here, or click to select one</p>
                </div>
                {previews.pan.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    style={{ width: 100, height: 100, margin: 10 }}
                  />
                ))}
              </div>
              <button className="btnPrimary" onClick={handlePan}>
                Submit
              </button>
            </div>
          )}

          {activeTab === "address" && (
            <div className="editProfile inputPrimary">
              <h3>Address Details</h3>
              <label htmlFor="">ID Type</label>
              <select
                id="mySelect"
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option value="">Choose ID Type</option>
                <option value="Adhar Card">Aadhaar</option>
                <option value="Passport">Passport</option>
                <option value="Driver License">Driver License</option>
              </select>
              {errors.selectedValue && (
                <p className="error">{errors.selectedValue}</p>
              )}

              <label htmlFor="">ID Number</label>
              <input
                type="text"
                placeholder="ID Number"
                value={idNo}
                onChange={(e) => setIdNo(e.target.value)}
              />
              {errors.idNo && <p className="error">{errors.idNo}</p>}

              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="error">{errors.name}</p>}

              <label htmlFor="">Address</label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className="error">{errors.address}</p>}

              <label htmlFor="">Upload Address Proof (Front)</label>
              <div className="file-upload-container">
                <div {...getAddressFrontRootProps({ className: "dropzone" })}>
                  <input {...getAddressFrontInputProps()} />
                  <p>
                    Drag 'n' drop address proof (front) here, or click to select
                    one
                  </p>
                </div>
                {previews.addressFront.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    style={{ width: 100, height: 100, margin: 10 }}
                  />
                ))}
              </div>

              <label htmlFor="">Upload Address Proof (Back)</label>
              <div className="file-upload-container">
                <div {...getAddressBackRootProps({ className: "dropzone" })}>
                  <input {...getAddressBackInputProps()} />
                  <p>
                    Drag 'n' drop address proof (back) here, or click to select
                    one
                  </p>
                </div>
                {previews.addressBack.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    style={{ width: 100, height: 100, margin: 10 }}
                  />
                ))}
              </div>

              <button className="btnPrimary" onClick={handleAddress}>
                Submit
              </button>
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default KYC;



// import React, { useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import { useDropzone } from "react-dropzone";
// import imageCompression from "browser-image-compression";
// import "./KYC.css";
// import Loader from "../../Components/Loader/Loader";
// import useAxiosHelper from "../../Common/AxiosHelper";
// import { ApiPaths } from "../../Config/ApiPath";
// import { toastFailed, toastSuccess } from "../../Config/BasicInfo";

// const KYC = () => {
//   const [activeTab, setActiveTab] = useState("bank");
//   const [loading, setLoading] = useState(false);
//   const [accNo, setAccNo] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [errors, setErrors] = useState({});
//   const [address, setAddress] = useState("");
//   const [idNo, setIdNo] = useState("");
//   const [panNo, setPanNo] = useState("");
//   const [selectedValue, setSelectedValue] = useState("");
//   const [selectedBankType, setSelectedBankType] = useState("");
//   const [bankType, setBankType] = useState("");
//   const [fileName, setFileName] = useState("");
//   const [holderName, setHolderName] = useState("");
//   const [name, setName] = useState("");
//   const { AxiosPost, AxiosGet } = useAxiosHelper();
//   const [files, setFiles] = useState([]);
//   const [backFiles, setBackFiles] = useState([]);
//   const [previews, setPreviews] = useState({
//     bank: [],
//     pan: [],
//     addressFront: [],
//     addressBack: [],
//   });
//   const [bankStatus, setBankStatus] = useState();
//   const [panStatus, setPanStatus] = useState();
//   const [addressStatus, setAddressStatus] = useState();
//   const [isApproved, setIsApproved] = useState();

//   const [bankDetails, setBankDetails] = useState();
//   const [panDetails, setPanDetails] = useState();
//   const [addressDetails, setAddressDetails] = useState();
//   var x = 0;
//   useEffect(() => {
//     if (x == 0) {
//       fetchKycDetails();
//       x++;
//     }
//   }, []);
//   const fetchKycDetails = async () => {
//     try {
//       setLoading(true);

//       const BankkycDetails = await AxiosGet(ApiPaths.getBankKycDetails);
//       console.log(BankkycDetails, "bank details");
//       setBankDetails(BankkycDetails?.bankDetails);
//       setPanDetails(BankkycDetails?.panDetails);
//       setAddressDetails(BankkycDetails?.addressDetails);
//       setBankStatus(BankkycDetails?.bankStatus);
//       setPanStatus(BankkycDetails?.panStatus);
//       setAddressStatus(BankkycDetails?.addressStatus);
//       setIsApproved(BankkycDetails?.isApproved);
//     } catch (error) {
//       console.log(error);
//       toastFailed(error?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleFilesChange = (newFiles, type) => {
//     console.log(type, "...........................kjkjkjkjjkkj");
//     if (type == "addressBack") {
//       setBackFiles(newFiles);
//     }
//     setFiles(newFiles);
//     setPreviews((prevPreviews) => ({
//       ...prevPreviews,
//       [type]: newFiles.map((file) => URL.createObjectURL(file)),
//     }));
//   };

//   const handleBank = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("accountNumber", accNo);
//       formData.append("ifscCode", ifscCode);
//       formData.append("bankName", bankName);
//       formData.append("accountType", selectedBankType);
//       formData.append("holderName", holderName);
//       files.forEach((file) => {
//         formData.append("document", file);
//       });
//       const response = await AxiosPost(ApiPaths.getBankDetails, formData);
//       if (response) {
//         toastSuccess(response?.message);
//       }
//     } catch (e) {
//       console.error("Error submitting bank details:", e);
//       toastFailed(e?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePan = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("panNumber", panNo);
//       files.forEach((file) => {
//         formData.append("document", file);
//       });
//       const res = await AxiosPost(ApiPaths.getPanCardDetails, formData);
//       if (res) {
//         toastSuccess(res?.message);
//       }
//     } catch (e) {
//       console.error("Error submitting PAN details:", e);
//       toastFailed(e?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddress = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("idType", selectedValue);
//       formData.append("idNumber", idNo);
//       formData.append("name", name);
//       formData.append("address", address);
//       files.forEach((file) => {
//         formData.append("documentFront", file);
//       });
//       backFiles.forEach((backfile) => {
//         formData.append("documentBack", backfile);
//       });
//       const resp = await AxiosPost(ApiPaths.getAddressDetails, formData);
//       if (resp) {
//         toastSuccess(resp?.message);
//       }
//     } catch (e) {
//       console.error("Error submitting address details:", e);
//       toastFailed(e?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDrop = async (acceptedFiles, type) => {
//     const compressedFiles = await Promise.all(
//       acceptedFiles.map(async (file) => {
//         const options = {
//           maxSizeMB: 1,
//           maxWidthOrHeight: 1024,
//           useWebWorker: true,
//         };
//         try {
//           const compressedFile = await imageCompression(file, options);
//           return compressedFile;
//         } catch (err) {
//           console.error("Error compressing image:", err);
//           return file;
//         }
//       })
//     );
//     handleFilesChange(compressedFiles, type);
//   };

//   const { getRootProps: getBankRootProps, getInputProps: getBankInputProps } =
//     useDropzone({ onDrop: (acceptedFiles) => onDrop(acceptedFiles, "bank") });
//   const { getRootProps: getPanRootProps, getInputProps: getPanInputProps } =
//     useDropzone({ onDrop: (acceptedFiles) => onDrop(acceptedFiles, "pan") });
//   const {
//     getRootProps: getAddressFrontRootProps,
//     getInputProps: getAddressFrontInputProps,
//   } = useDropzone({
//     onDrop: (acceptedFiles) => onDrop(acceptedFiles, "addressFront"),
//   });
//   const {
//     getRootProps: getAddressBackRootProps,
//     getInputProps: getAddressBackInputProps,
//   } = useDropzone({
//     onDrop: (acceptedFiles) => onDrop(acceptedFiles, "addressBack"),
//   });

//   return (
//     <section className="dashboard" style={{ paddingTop: "10px" }}>
//       {loading && <Loader />}

//       <Row className="mt-4">
//         <Col lg="6" className="mb-2">
//           <div className="tabButton">
//             <button className="btnPrimary" onClick={() => setActiveTab("bank")}>
//               Bank KYC
//             </button>
//             <button className="btnPrimary" onClick={() => setActiveTab("pan")}>
//               Pan KYC
//             </button>
//             <button
//               className="btnPrimary"
//               onClick={() => setActiveTab("address")}
//             >
//               Address KYC
//             </button>
//           </div>
//           {activeTab === "bank" && (
//             <div className="editProfile inputPrimary">
//               <h3>Bank Details</h3>
//               {isApproved?.bank == 1 ? (
//                 <p style={{ color: "green", fontSize: "15px" }}>
//                   Bank Kyc is submitted and approved
//                 </p>
//               ) : isApproved?.bank == 2 ? (
//                 <p className="error">Bank Kyc is rejected</p>
//               ) : bankStatus == 1 ? (
//                 <p className="error">Bank Kyc is already Submitted</p>
//               ) : (
//                 ""
//               )}

//               <label htmlFor="">Account no</label>
//               <input
//                 type="number"
//                 placeholder="Account no"
//                 value={accNo || bankDetails?.accountNumber}
//                 onChange={(e) => setAccNo(e.target.value)}
//               />
//               {errors.accNo && <p className="error">{errors.accNo}</p>}

//               <label htmlFor="">IFSC Code</label>
//               <input
//                 placeholder="IFSC Code"
//                 value={ifscCode || bankDetails?.ifscCode}
//                 onChange={(e) => setIfscCode(e.target.value)}
//               />
//               {errors.ifscCode && <p className="error">{errors.ifscCode}</p>}

//               <label htmlFor="">Bank Name</label>
//               <input
//                 type="text"
//                 placeholder="Bank Name"
//                 value={bankName || bankDetails?.bankName}
//                 onChange={(e) => setBankName(e.target.value)}
//               />
//               {errors.bankName && <p className="error">{errors.bankName}</p>}

//               <label htmlFor="">Bank Type</label>

//               <select
//                 id="mySelect"
//                 value={selectedBankType || bankDetails?.accountType}
//                 onChange={(e) => setSelectedBankType(e.target.value)}
//               >
//                 <option>Choose Bank Type</option>
//                 <option value="Saving">Saving</option>
//                 <option value="Current">Current</option>
//               </select>
//               {errors.selectedBankType && (
//                 <p className="error">{errors.selectedBankType}</p>
//               )}

//               <label htmlFor="">Holder Name</label>
//               <input
//                 type="text"
//                 placeholder="Holder Name"
//                 value={holderName || bankDetails?.holderName}
//                 onChange={(e) => setHolderName(e.target.value)}
//               />
//               {errors.holderName && (
//                 <p className="error">{errors.holderName}</p>
//               )}
//               <label htmlFor="">Upload Document</label>
//               <div className="file-upload-container">
//                 {bankStatus == 0 && (
//                   <>
//                     <div {...getBankRootProps({ className: "dropzone" })}>
//                       <input {...getBankInputProps()} />
//                       <p>
//                         Drag 'n' drop bank document here, or click to select one
//                       </p>
//                     </div>
//                   </>
//                 )}
//                 {previews.bank.length > 0 ? (
//                   previews.bank.map((url, index) => (
//                     <img
//                       key={index}
//                       src={url}
//                       alt={`preview-${index}`}
//                       style={{ width: 100, height: 100, margin: 10 }}
//                     />
//                   ))
//                 ) : bankDetails?.document ? (
//                   <img
//                     src={bankDetails.document}
//                     alt="Bank Document"
//                     style={{ width: 100, height: 100, margin: 10 }}
//                   />
//                 ) : null}
//               </div>

//               {bankStatus == 1 || isApproved?.bank == 1 ? (
//                 <button
//                   style={{ display: "none" }}
//                   className="btnPrimary"
//                   onClick={handleBank}
//                 >
//                   Submit
//                 </button>
//               ) : (
//                 <button className="btnPrimary" onClick={handleBank}>
//                   Submit
//                 </button>
//               )}
//             </div>
//           )}

//           {activeTab === "pan" && (
//             <div className="editProfile inputPrimary">
//               <h3>PAN Details</h3>
//               {isApproved?.pan == 1 ? (
//                 <p style={{ color: "green", fontSize: "15px" }}>
//                   Pan Kyc is submitted and approved
//                 </p>
//               ) : isApproved?.pan == 2 ? (
//                 <p className="error">Pan Kyc is rejected</p>
//               ) : panStatus == 1 ? (
//                 <p className="error">Pan Kyc is already Submitted</p>
//               ) : (
//                 ""
//               )}
//               <label htmlFor="">Pan No</label>
//               <input
//                 type="text"
//                 placeholder="Pan No"
//                 value={panNo || panDetails?.panNumber}
//                 onChange={(e) => setPanNo(e.target.value)}
//               />
//               {errors.panNo && <p className="error">{errors.panNo}</p>}

//               <label htmlFor="">Upload Document</label>
//               <div className="file-upload-container">
//                 {panStatus == 0 && (
//                   <>
//                     <div {...getPanRootProps({ className: "dropzone" })}>
//                       <input {...getPanInputProps()} />
//                       <p>
//                         Drag 'n' drop bank document here, or click to select one
//                       </p>
//                     </div>
//                   </>
//                 )}
//                 {previews?.pan?.length > 0 ? (
//                   previews?.pan?.map((url, index) => (
//                     <img
//                       key={index}
//                       src={url}
//                       alt={`preview-${index}`}
//                       style={{ width: 100, height: 100, margin: 10 }}
//                     />
//                   ))
//                 ) : panDetails?.document ? (
//                   <img
//                     src={panDetails?.document}
//                     alt="Pan Document"
//                     style={{ width: 100, height: 100, margin: 10 }}
//                   />
//                 ) : null}
//               </div>

//               {panStatus == 1 || isApproved?.pan == 1 ? (
//                 <button
//                   style={{ display: "none" }}
//                   className="btnPrimary"
//                   onClick={handlePan}
//                 >
//                   Submit
//                 </button>
//               ) : (
//                 <button className="btnPrimary" onClick={handlePan}>
//                   Submit
//                 </button>
//               )}
//             </div>
//           )}

//           {activeTab === "address" && (
//             <div className="editProfile inputPrimary">
//               <h3>Address Details</h3>
//               {isApproved?.address == 1 ? (
//                 <p style={{ color: "green", fontSize: "15px" }}>
//                   Address Kyc is submitted and approved
//                 </p>
//               ) : isApproved?.address == 2 ? (
//                 <p className="error">Address Kyc is rejected</p>
//               ) : addressStatus == 1 ? (
//                 <p className="error">Address Kyc is already Submitted</p>
//               ) : (
//                 ""
//               )}

//               <label htmlFor="">ID Type</label>
//               <select
//                 id="mySelect"
//                 value={selectedValue || addressDetails?.idType}
//                 onChange={(e) => setSelectedValue(e.target.value)}
//                 required
//               >
//                 <option value="">Choose ID Type</option>
//                 <option value="Adhar Card">Aadhaar</option>
//                 <option value="Passport">Passport</option>
//                 <option value="Driver License">Driver License</option>
//               </select>
//               {errors.selectedValue && (
//                 <p className="error">{errors.selectedValue}</p>
//               )}
//               <label htmlFor="">ID Number</label>
//               <input
//                 type="text"
//                 placeholder="ID Number"
//                 value={idNo || addressDetails?.idNumber}
//                 onChange={(e) => setIdNo(e.target.value)}
//                 required
//               />
//               {errors.idNo && <p className="error">{errors.idNo}</p>}
//               <label htmlFor="">Name</label>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name || addressDetails?.name}
//                 required
//                 onChange={(e) => setName(e.target.value)}
//               />
//               {errors.name && <p className="error">{errors.name}</p>}
//               <label htmlFor="">Address</label>
//               <input
//                 type="text"
//                 placeholder="Address"
//                 value={address || addressDetails?.address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               {errors.address && <p className="error">{errors.address}</p>}
//               <label htmlFor="">Upload Document(front)</label>
//               <div className="file-upload-container">
//                 {addressStatus == 0 ? (
//                   <>
//                     <div
//                       {...getAddressFrontRootProps({ className: "dropzone" })}
//                     >
//                       <input {...getAddressFrontInputProps()} />
//                       <p>
//                         Drag 'n' drop Address front document here, or click to
//                         select one
//                       </p>
//                     </div>
//                     {previews.addressFront.map((url, index) => (
//                       <img
//                         key={index}
//                         src={url}
//                         alt={`preview-${index}`}
//                         style={{ width: 100, height: 100, margin: 10 }}
//                       />
//                     ))}
//                   </>
//                 ) : (
//                   // This part handles when addressStatus != 0
//                   <img
//                     src={addressDetails?.documentFront} // Assuming addressDetails.documentFront holds the preview when not uploading
//                     alt="address-front-preview"
//                     style={{ width: 100, height: 100, margin: 10 }}
//                   />
//                 )}
//               </div>
//               <label htmlFor="">Upload Document(back)</label>
//               <div className="file-upload-container">
//                 {addressStatus == 0 ? (
//                   <>
//                     <div
//                       {...getAddressBackRootProps({ className: "dropzone" })}
//                     >
//                       <input {...getAddressBackInputProps()} />
//                       <p>
//                         Drag 'n' drop bank document here, or click to select one
//                       </p>
//                     </div>
//                     {previews.addressBack.map((url, index) => (
//                       <img
//                         key={index}
//                         src={url}
//                         alt={`preview-${index}`}
//                         style={{ width: 100, height: 100, margin: 10 }}
//                       />
//                     ))}
//                   </>
//                 ) : (
//                   <img
//                     src={addressDetails?.documentBack}
//                     alt="document-back-preview"
//                     style={{ width: 100, height: 100, margin: 10 }}
//                   />
//                 )}
//               </div>
//               {addressStatus == 1 || isApproved?.address == 1 ? (
//                 <button
//                   style={{ display: "none" }}
//                   className="btnPrimary"
//                   onClick={handleAddress}
//                 >
//                   Submit
//                 </button>
//               ) : (
//                 <button className="btnPrimary" onClick={handleAddress}>
//                   Submit
//                 </button>
//               )}
//             </div>
//           )}
//         </Col>
//       </Row>
//     </section>
//   );
// };

// export default KYC;
