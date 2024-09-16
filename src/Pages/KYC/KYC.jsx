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
//   const [previews, setPreviews] = useState({
//     bank: [],
//     pan: [],
//     addressFront: [],
//     addressBack: [],
//   });
//   const handleFilesChange = (newFiles, type) => {
//     setFiles(newFiles);
//     setPreviews((prevPreviews) => ({
//       ...prevPreviews,
//       [type]: newFiles.map((file) => URL.createObjectURL(file)),
//     }));
//   };
//   let x = 1
//   useEffect(() => {
//     if (x == 1) {
//       kycStatus();
//       x++
//     }
//   }, [])
//   async function kycStatus() {
//     const res = await AxiosGet(ApiPaths.getKycStatus);
//     console.log(res, "pppppppppp")
//     // setKycStatusShow(res?.overall_kyc_status);
//     // setKycDetails(res?.isApproved); // Store bank, pan, and address status details
//   }

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
//       setAccNo("");
//       setBankName("");
//       setIfscCode("");
//       setSelectedBankType("");
//       setHolderName("");
//       setFiles([]);
//       setPreviews((prevPreviews) => ({ ...prevPreviews, bank: [] }));
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
//       setPanNo("");
//       setFiles([]);
//       setPreviews((prevPreviews) => ({ ...prevPreviews, pan: [] }));
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
//       files.forEach((file) => {
//         formData.append("documentBack", file);
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
//       setSelectedValue("");
//       setName("");
//       setAddress("");
//       setIdNo("");
//       setFiles([]);
//       setPreviews((prevPreviews) => ({
//         ...prevPreviews,
//         addressFront: [],
//         addressBack: [],
//       }));
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
//         <Col lg="4" className="mb-2">
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
//         </Col>
//         <Col lg="6" className="mb-2">
//           {activeTab === "bank" && (
//             <div className="editProfile inputPrimary">
//               <h3>Bank Details</h3>
//               <label htmlFor="">Account no</label>
//               <input
//                 type="number"
//                 placeholder="Account no"
//                 value={accNo}
//                 onChange={(e) => setAccNo(e.target.value)}
//               />
//               {errors.accNo && <p className="error">{errors.accNo}</p>}

//               <label htmlFor="">IFSC Code</label>
//               <input
//                 placeholder="IFSC Code"
//                 value={ifscCode}
//                 onChange={(e) => setIfscCode(e.target.value)}
//               />
//               {errors.ifscCode && <p className="error">{errors.ifscCode}</p>}

//               <label htmlFor="">Bank Name</label>
//               <input
//                 type="text"
//                 placeholder="Bank Name"
//                 value={bankName}
//                 onChange={(e) => setBankName(e.target.value)}
//               />
//               {errors.bankName && <p className="error">{errors.bankName}</p>}

//               <label htmlFor="">Bank Type</label>

//               <select
//                 id="mySelect"
//                 value={selectedBankType}
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
//                 value={holderName}
//                 onChange={(e) => setHolderName(e.target.value)}
//               />
//               {errors.holderName && (
//                 <p className="error">{errors.holderName}</p>
//               )}

//               <label htmlFor="">Upload Document</label>
//               <div className="file-upload-container">
//                 <div {...getBankRootProps({ className: "dropzone" })}>
//                   <input {...getBankInputProps()} />
//                   <p>
//                     Drag 'n' drop bank document here, or click to select one
//                   </p>
//                 </div>
//                 {previews.bank.map((url, index) => (
//                   <img
//                     key={index}
//                     src={url}
//                     alt={`preview-${index}`}
//                     style={{ width: 100, height: 100, margin: 10 }}
//                   />
//                 ))}
//               </div>
//               <button className="btnPrimary" onClick={handleBank}>
//                 Submit
//               </button>
//             </div>
//           )}

//           {activeTab === "pan" && (
//             <div className="editProfile inputPrimary">
//               <h3>PAN Details</h3>
//               <label htmlFor="">Pan No</label>
//               <input
//                 type="text"
//                 placeholder="Pan No"
//                 value={panNo}
//                 onChange={(e) => setPanNo(e.target.value)}
//               />
//               {errors.panNo && <p className="error">{errors.panNo}</p>}

//               <label htmlFor="">Upload Document</label>
//               <div className="file-upload-container">
//                 <div {...getPanRootProps({ className: "dropzone" })}>
//                   <input {...getPanInputProps()} />
//                   <p>Drag 'n' drop PAN document here, or click to select one</p>
//                 </div>
//                 {previews.pan.map((url, index) => (
//                   <img
//                     key={index}
//                     src={url}
//                     alt={`preview-${index}`}
//                     style={{ width: 100, height: 100, margin: 10 }}
//                   />
//                 ))}
//               </div>
//               <button className="btnPrimary" onClick={handlePan}>
//                 Submit
//               </button>
//             </div>
//           )}

//           {activeTab === "address" && (
//             <div className="editProfile inputPrimary">
//               <h3>Address Details</h3>
//               <label htmlFor="">ID Type</label>
//               <select
//                 id="mySelect"
//                 value={selectedValue}
//                 onChange={(e) => setSelectedValue(e.target.value)}
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
//                 value={idNo}
//                 onChange={(e) => setIdNo(e.target.value)}
//               />
//               {errors.idNo && <p className="error">{errors.idNo}</p>}

//               <label htmlFor="">Name</label>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               {errors.name && <p className="error">{errors.name}</p>}

//               <label htmlFor="">Address</label>
//               <input
//                 type="text"
//                 placeholder="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               {errors.address && <p className="error">{errors.address}</p>}

//               <label htmlFor="">Upload Address Proof (Front)</label>
//               <div className="file-upload-container">
//                 <div {...getAddressFrontRootProps({ className: "dropzone" })}>
//                   <input {...getAddressFrontInputProps()} />
//                   <p>
//                     Drag 'n' drop address proof (front) here, or click to select
//                     one
//                   </p>
//                 </div>
//                 {previews.addressFront.map((url, index) => (
//                   <img
//                     key={index}
//                     src={url}
//                     alt={`preview-${index}`}
//                     style={{ width: 100, height: 100, margin: 10 }}
//                   />
//                 ))}
//               </div>

//               <label htmlFor="">Upload Address Proof (Back)</label>
//               <div className="file-upload-container">
//                 <div {...getAddressBackRootProps({ className: "dropzone" })}>
//                   <input {...getAddressBackInputProps()} />
//                   <p>
//                     Drag 'n' drop address proof (back) here, or click to select
//                     one
//                   </p>
//                 </div>
//                 {previews.addressBack.map((url, index) => (
//                   <img
//                     key={index}
//                     src={url}
//                     alt={`preview-${index}`}
//                     style={{ width: 100, height: 100, margin: 10 }}
//                   />
//                 ))}
//               </div>

//               <button className="btnPrimary" onClick={handleAddress}>
//                 Submit
//               </button>
//             </div>
//           )}
//         </Col>
//       </Row>
//     </section>
//   );
// };
// export default KYC;



import React, { useEffect, useState } from "react";
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
  const [holderName, setHolderName] = useState("");
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");

  const [previews, setPreviews] = useState({
    bank: [],
    pan: [],
    addressFront: [],
    addressBack: [],
  });
  const [kycStatus, setKycStatus] = useState({});

  const { AxiosPost, AxiosGet } = useAxiosHelper();

  useEffect(() => {
    // Fetch KYC status on component mount
    const fetchKycStatus = async () => {
      try {
        const res = await AxiosGet(ApiPaths.getKycStatus);
        setKycStatus(res);
      } catch (error) {
        console.error("Error fetching KYC status:", error);
      }
    };
    fetchKycStatus();
  }, []);

  const isSubmitEnabled = (type) => {
    if (kycStatus.overall_kyc_status === "pending") {
      if (type === "bank") return kycStatus.bankStatus === 0;
      if (type === "pan") return kycStatus.panStatus === 0;
      if (type === "address") return kycStatus.addressStatus === 0;
    }
    return false;
  };

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
        // Refresh KYC status after successful submission
        const res = await AxiosGet(ApiPaths.getKycStatus);
        setKycStatus(res);
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
        // Refresh KYC status after successful submission
        const updatedStatus = await AxiosGet(ApiPaths.getKycStatus);
        setKycStatus(updatedStatus);
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
        // Refresh KYC status after successful submission
        const updatedStatus = await AxiosGet(ApiPaths.getKycStatus);
        setKycStatus(updatedStatus);
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
            <button className="btnPrimary" onClick={() => setActiveTab("address")}>
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
              <button
                className="btnPrimary"
                onClick={handleBank}
                disabled={!isSubmitEnabled("bank")}
              >
                {isSubmitEnabled("bank") ? "Submit" : "Already Uploaded"}
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
              <button
                className="btnPrimary"
                onClick={handlePan}
                disabled={!isSubmitEnabled("pan")}
              >
                {isSubmitEnabled("pan") ? "Submit" : "Already Uploaded"}
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
                <option value="Aadhaar Card">Aadhaar</option>
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

              <button
                className="btnPrimary"
                onClick={handleAddress}
                disabled={!isSubmitEnabled("address")}
              >
                {isSubmitEnabled("address") ? "Submit" : "Already Uploaded"}
              </button>
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default KYC;
