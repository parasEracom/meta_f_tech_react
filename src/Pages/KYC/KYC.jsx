import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import "./KYC.css";
import Loader from "../../Components/Loader/Loader";
import useAxiosHelper from "../../Common/AxiosHelper";
import { ApiPaths } from "../../Config/ApiPath";
import { BasicInfo, toastFailed, toastSuccess } from "../../Config/BasicInfo";

const KYC = () => {
  const [activeTab, setActiveTab] = useState("bank");
  const [loading, setLoading] = useState(false);
  const [accNo, setAccNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");
  const [idNo, setIdNo] = useState("");
  const [nomineeIdNo, setNomineeIdNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [idDocumentType, setIdDocumentType] = useState("");
  const [selectedBankType, setSelectedBankType] = useState("");
  const [holderName, setHolderName] = useState("");
  const [name, setName] = useState("");
  const { AxiosPost, AxiosGet } = useAxiosHelper();
  const [files, setFiles] = useState([]);
  const [backFiles, setBackFiles] = useState([]);

  const [nomineeName, setNomineeName] = useState("");
  const [nomineeRelationship, setNomineeRelationship] = useState("");
  const [nomineeAddress, setNomineeAddress] = useState("");
  // const [nomineeFiles, setNomineeFiles] = useState([]);
  // const [nomineePreviews, setNomineePreviews] = useState([]);
  const [nomineeStatus, setNomineeStatus] = useState(0);
  const [nomineeDetails, setNomineeDetails] = useState();

  const [previews, setPreviews] = useState({
    bank: [],
    pan: [],
    addressFront: [],
    addressBack: [],
    nomineeFront: [],
    nomineeBack: [],
  });
  const [bankStatus, setBankStatus] = useState();
  const [panStatus, setPanStatus] = useState();
  const [addressStatus, setAddressStatus] = useState();
  const [isApproved, setIsApproved] = useState();

  const [bankDetails, setBankDetails] = useState();
  const [panDetails, setPanDetails] = useState();
  const [addressDetails, setAddressDetails] = useState();
  var x = 0;
  useEffect(() => {
    if (x == 0) {
      fetchKycDetails();
      x++;
    }
  }, []);
  const fetchKycDetails = async () => {
    try {
      setLoading(true);

      const KycDetails = await AxiosGet(ApiPaths.getKycStatus);
      BasicInfo.isDebug && console.log(KycDetails, "Check Kyc Status");
      setBankDetails(KycDetails?.bankDetails);
      setPanDetails(KycDetails?.panDetails);
      setNomineeDetails(KycDetails?.nomineeDetails)
      setAddressDetails(KycDetails?.addressDetails);
      setBankStatus(KycDetails?.bankStatus);
      setPanStatus(KycDetails?.panStatus);
      setNomineeStatus(KycDetails?.nomineeStatus);
      setAddressStatus(KycDetails?.addressStatus);
      setIsApproved(KycDetails?.isApproved);
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
      toastFailed(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleFilesChange = (newFiles, type) => {
    BasicInfo.isDebug && console.log(type, "...........................kjkjkjkjjkkj");
    if (type == "addressBack") {
      setBackFiles(newFiles);
    }
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
      BasicInfo.isDebug && console.error("Error submitting bank details:", e);
      toastFailed(e?.response?.data?.message);
    } finally {
      setLoading(false);
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
      BasicInfo.isDebug && console.error("Error submitting PAN details:", e);
      toastFailed(e?.response?.data?.message);
    } finally {
      setLoading(false);
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
      backFiles.forEach((backfile) => {
        formData.append("documentBack", backfile);
      });
      const resp = await AxiosPost(ApiPaths.getAddressDetails, formData);
      if (resp) {
        toastSuccess(resp?.message);
      }
    } catch (e) {
      BasicInfo.isDebug && console.error("Error submitting address details:", e);
      toastFailed(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleNominee = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nomineeName", nomineeName);
      formData.append("relationship", nomineeRelationship);
      formData.append("idDocumentType", idDocumentType);
      formData.append("idDocumentNumber", nomineeIdNo);

      files.forEach((file) => {
        formData.append("documentFront", file);
      });
      backFiles.forEach((backfile) => {
        formData.append("documentBack", backfile);
      });


      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }


      const response = await AxiosPost(ApiPaths.getNomineeDetails, formData);
      console.log(response, "nomineeeeeeeeeeeeeee")
      if (response) {
        toastSuccess(response?.message);
      }
    } catch (e) {
      BasicInfo.isDebug && console.error("Error submitting nominee details:", e);
      toastFailed(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const onDrop = async (acceptedFiles, type) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png']; // JPEG and PNG MIME types
    const imageFiles = acceptedFiles.filter(file => 
      acceptedImageTypes.includes(file.type) || 
      file.name.endsWith('.jpg') || 
      file.name.endsWith('.jpeg')
    );
  
    const compressedFiles = await Promise.all(
      imageFiles.map(async (file) => {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);
          return compressedFile;
        } catch (err) {
          BasicInfo.isDebug && console.error("Error compressing image:", err);
          return file; // Return the original file if compression fails
        }
      })
    );

    if (type === "addressFront") {
      setFiles(compressedFiles); // Keep front files in `files`
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        addressFront: compressedFiles.map((file) => URL.createObjectURL(file)),
      }));
    } else if (type === "addressBack") {
      setBackFiles(compressedFiles); // Store back files in `backFiles`
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        addressBack: compressedFiles.map((file) => URL.createObjectURL(file)),
      }));

    } else if (type === "nomineeFront") {
      setFiles(compressedFiles); // Keep front files in `files`
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        nomineeFront: compressedFiles.map((nomineefile) => URL.createObjectURL(nomineefile)),
      }));
    } else if (type === "nomineeBack") {
      setBackFiles(compressedFiles); // Store back files in `backFiles`
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        nomineeBack: compressedFiles.map((nomineefile) => URL.createObjectURL(nomineefile)),
      }));

    } else {
      handleFilesChange(compressedFiles, type); // Keep existing logic for other types
    }
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
  const {
    getRootProps: getNomineeFrontRootProps,
    getInputProps: getNomineeFrontInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "nomineeFront"),
  });
  const {
    getRootProps: getNomineeBackRootProps,
    getInputProps: getNomineeBackInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "nomineeBack"),
  });


  return (
    <section className="dashboard" style={{ paddingTop: "10px" }}>
      {loading && <Loader />}

      <Row className="mt-4 d-flex justify-content-center">
        <Col lg="9" className="mb-2">
          <div
            className="tabButton"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              padding: '10px',
            }}
          >
            <button
              className="btnPrimary"
              style={{
                flex: '1 1 auto',
                padding: '10px 20px',
                minWidth: '100px',
                maxWidth: '150px',
                fontSize: '1em',
                margin: '5px',
              }}
              onClick={() => setActiveTab('bank')}
            >
              Bank KYC
            </button>
            <button
              className="btnPrimary"
              style={{
                flex: '1 1 auto',
                padding: '10px 20px',
                minWidth: '100px',
                maxWidth: '150px',
                fontSize: '1em',
                margin: '5px',
              }}
              onClick={() => setActiveTab('pan')}
            >
              Pan KYC
            </button>
            <button
              className="btnPrimary"
              style={{
                flex: '1 1 auto',
                padding: '10px 20px',
                minWidth: '100px',
                maxWidth: '150px',
                fontSize: '1em',
                margin: '5px',
              }}
              onClick={() => setActiveTab('address')}
            >
              Address KYC
            </button>
            <button
              className="btnPrimary"
              style={{
                flex: '1 1 auto',
                padding: '10px 20px',
                minWidth: '100px',
                maxWidth: '150px',
                fontSize: '1em',
                margin: '5px',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setActiveTab('nominee')}
            >
              Nominee KYC
            </button>
          </div>
          {activeTab === "bank" && (
            <div className="editProfile inputPrimary">
              <h3>Bank Details</h3>

              {isApproved?.bank == 2 ? (
                <p style={{ color: "green", fontSize: "15px" }}>
                  Bank KYC is approved
                </p>
              ) : isApproved?.bank == 3 ? (
                <>
                  <p className="error">Bank KYC is rejected</p>
                  {/* Add reason for rejection if available */}
                  {bankDetails?.reason && (
                    <p className="error">Rejection Reason: {bankDetails.reason}</p>
                  )}
                </>
              ) : bankStatus == 1 ? (
                <p className="error">
                  Bank KYC is already Submitted, wait for approval.
                </p>
              ) : (
                ""
              )}

              {/* Allow re-entry if status is rejected (bankStatus == 3) */}
              <label htmlFor="">Account No</label>
              <input
                type="number"
                placeholder="Account No"
                value={accNo || (isApproved?.bank == 3 ? "" : bankDetails?.accountNumber)} // Clear Account No if rejected
                onChange={(e) => setAccNo(e.target.value)}
              />
              {errors.accNo && <p className="error">{errors.accNo}</p>}

              <label htmlFor="">IFSC Code</label>
              <input
                placeholder="IFSC Code"
                value={ifscCode || (isApproved?.bank == 3 ? "" : bankDetails?.ifscCode)} // Clear IFSC Code if rejected
                onChange={(e) => setIfscCode(e.target.value)}
              />
              {errors.ifscCode && <p className="error">{errors.ifscCode}</p>}

              <label htmlFor="">Bank Name</label>
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName || (isApproved?.bank == 3 ? "" : bankDetails?.bankName)} // Clear Bank Name if rejected
                onChange={(e) => setBankName(e.target.value)}
              />
              {errors.bankName && <p className="error">{errors.bankName}</p>}

              <label htmlFor="">Bank Type</label>
              <select
                id="mySelect"
                value={selectedBankType || (isApproved?.bank == 3 ? "" : bankDetails?.accountType)} // Reset Bank Type if rejected
                onChange={(e) => setSelectedBankType(e.target.value)}
              >
                <option>Choose Bank Type</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
              </select>
              {errors.selectedBankType && <p className="error">{errors.selectedBankType}</p>}

              <label htmlFor="">Holder Name</label>
              <input
                type="text"
                placeholder="Holder Name"
                value={holderName || (isApproved?.bank == 3 ? "" : bankDetails?.holderName)} // Clear Holder Name if rejected
                onChange={(e) => setHolderName(e.target.value)}
              />
              {errors.holderName && <p className="error">{errors.holderName}</p>}

              <label htmlFor="">Upload Document</label>
              <div className="file-upload-container">
                {/* Re-enable document upload if bank KYC is rejected */}
                {bankStatus == 0 || isApproved?.bank == 3 ? (
                  <>
                    <div {...getBankRootProps({ className: "dropzone" })}>
                      <input {...getBankInputProps()} />
                      <p>
                        {/* Drag 'n' drop bank document here, or click to select one */}
                        Upload Bank document here (.jpg, .jpeg & .png)
                      </p>
                    </div>
                  </>
                ) : null}

                {/* Show previews or existing document */}
                {previews.bank.length > 0 ? (
                  previews.bank.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`preview-${index}`}
                      style={{ width: 100, height: 100, margin: 10 }}
                    />
                  ))
                ) : bankDetails?.document && isApproved?.bank !== 3 ? ( // Hide old document if rejected
                  <img
                    src={bankDetails?.document}
                    alt="Bank Document"
                    style={{ width: 100, height: 100, margin: 10 }}
                  />
                ) : 
                null}
              </div>

              {bankStatus == 1 || bankStatus == 2 || isApproved?.bank == 1 || isApproved?.bank == 2 ? (
                <button
                  style={{ display: "none" }}
                  className="btnPrimary"
                  onClick={handleBank}
                >
                  Submit
                </button>
              ) : (
                <button className="btnPrimary" onClick={handleBank}>
                  Submit
                </button>
              )}

            </div>
          )}

          {activeTab === "pan" && (
            <div className="editProfile inputPrimary">
              <h3>PAN Details</h3>

              {isApproved?.pan == 2 ? (
                <p style={{ color: "green", fontSize: "15px" }}>
                  PAN KYC is approved
                </p>
              ) : isApproved?.pan == 3 ? (
                <>
                  <p className="error">PAN KYC is rejected</p>
                  {/* Display rejection reason */}
                  {panDetails?.reason && (
                    <p className="error">Rejection Reason: {panDetails.reason}</p>
                  )}
                </>
              ) : panStatus == 1 ? (
                <p className="error">
                  PAN KYC is already submitted, wait for approval.
                </p>
              ) : (
                ""
              )}

              {/* Allow re-upload if status is rejected (panStatus == 3) */}
              <label htmlFor="">PAN No</label>
              <input
                type="text"
                placeholder="PAN No"
                value={panNo || (isApproved?.pan == 3 ? "" : panDetails?.panNumber)} // Clear PAN No if rejected
                onChange={(e) => setPanNo(e.target.value)}
              />
              {errors.panNo && <p className="error">{errors.panNo}</p>}

              <label htmlFor="">Upload Document</label>
              <div className="file-upload-container">
                {panStatus == 0 || isApproved?.pan == 3 ? ( // Re-enable upload if status is rejected
                  <>
                    <div {...getPanRootProps({ className: "dropzone" })}>
                      <input {...getPanInputProps()} />
                      <p>
                        {/* Drag 'n' drop PAN document here, or click to select one */}
                        Upload PAN document here (.jpg, .jpeg & .png)
                      </p>
                    </div>
                  </>
                ) : null}

                {/* Show previews or existing document */}
                {previews?.pan?.length > 0 ? (
                  previews?.pan?.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`preview-${index}`}
                      style={{ width: 100, height: 100, margin: 10 }}
                    />
                  ))
                ) : panDetails?.document && isApproved?.pan !== 3 ? ( // Hide old document if rejected
                  <img
                    src={panDetails?.document}
                    alt="PAN Document"
                    style={{ width: 100, height: 100, margin: 10 }}
                  />
                ) : null}
              </div>

              {panStatus == 1 || panStatus == 2 || isApproved?.pan == 1 || isApproved?.pan == 2 ? (
                <button
                  style={{ display: "none" }}
                  className="btnPrimary"
                  onClick={handlePan}
                >
                  Submit
                </button>
              ) : (
                <button className="btnPrimary" onClick={handlePan}>
                  Submit
                </button>
              )}
            </div>
          )}

          {activeTab === "address" && (
            <div className="editProfile inputPrimary">
              <h3>Address Details</h3>

              {isApproved?.address == 2 ? (
                <p style={{ color: "green", fontSize: "15px" }}>
                  Address KYC is approved
                </p>
              ) : isApproved?.address == 3 ? (
                <>
                  <p className="error">Address KYC is rejected</p>
                  {addressDetails?.reason && (
                    <p className="error">Rejection Reason: {addressDetails.reason}</p>
                  )}
                </>
              ) : addressStatus == 1 ? (
                <p className="error">
                  Address KYC is Submitted, wait for approval.
                </p>
              ) : (
                ""
              )}

              <label htmlFor="">ID Type</label>
              <select
                id="mySelect"
                value={selectedValue || (isApproved?.address == 3 ? "" : addressDetails?.idType)} // Clear if rejected
                onChange={(e) => setSelectedValue(e.target.value)}
                required
              >
                <option value="">Choose ID Type</option>
                <option value="Adhar Card">Aadhaar</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driver License</option>
              </select>
              {errors.selectedValue && <p className="error">{errors.selectedValue}</p>}

              <label htmlFor="">ID Number</label>
              <input
                type="text"
                placeholder="ID Number"
                value={idNo || (isApproved?.address == 3 ? "" : addressDetails?.idNumber)} // Clear if rejected
                onChange={(e) => setIdNo(e.target.value)}
                required
              />
              {errors.idNo && <p className="error">{errors.idNo}</p>}

              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name || (isApproved?.address == 3 ? "" : addressDetails?.name)} // Clear if rejected
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="error">{errors.name}</p>}

              <label htmlFor="">Address</label>
              <input
                type="text"
                placeholder="Address"
                value={address || (isApproved?.address == 3 ? "" : addressDetails?.address)} // Clear if rejected
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className="error">{errors.address}</p>}

              {/* Front Document Upload */}
              <label htmlFor="">Upload Document (Front)</label>
              <div className="file-upload-container">
                {addressStatus == 0 || isApproved?.address == 3 ? (
                  <>
                    <div {...getAddressFrontRootProps({ className: "dropzone" })}>
                      <input {...getAddressFrontInputProps()} />
                      <p>
                        {/* Drag 'n' drop address front document here, or click to select one */}
                        Upload Address front document here (.jpg, .jpeg, or .png)
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
                  </>
                ) : (
                  addressDetails?.documentFront && isApproved?.address !== 3 && (
                    <img
                      src={addressDetails.documentFront}
                      alt="address-front-preview"
                      style={{ width: 100, height: 100, margin: 10 }}
                    />
                  )
                )}
              </div>

              {/* Back Document Upload */}
              <label htmlFor="">Upload Document (Back)</label>
              <div className="file-upload-container">
                {addressStatus == 0 || isApproved?.address == 3 ? (
                  <>
                    <div {...getAddressBackRootProps({ className: "dropzone" })}>
                      <input {...getAddressBackInputProps()} />
                      <p>
                      Upload Address back document here (.jpg, .jpeg, or .png)
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
                  </>
                ) : (
                  addressDetails?.documentBack && isApproved?.address !== 3 && (
                    <img
                      src={addressDetails.documentBack}
                      alt="document-back-preview"
                      style={{ width: 100, height: 100, margin: 10 }}
                    />
                  )
                )}
              </div>
              {addressStatus == 1 || isApproved?.address == 1 || addressStatus == 2 || isApproved?.address == 2 ? (
                <button
                  style={{ display: "none" }}
                  className="btnPrimary"
                  onClick={handleAddress}
                >
                  Submit
                </button>
              ) : (
                <button className="btnPrimary" onClick={handleAddress}>
                  Submit
                </button>
              )}
            </div>
          )}

          {activeTab === "nominee" && (
            <div className="editProfile inputPrimary">
              <h3>Nominee Details</h3>

              {isApproved?.nominee == 2 ? (
                <p style={{ color: "green", fontSize: "15px" }}>
                  Nominee Details are approved
                </p>
              ) : isApproved?.nominee == 3 ? (
                <>
                  <p className="error">Nominee Details are rejected</p>
                  {nomineeDetails?.reason && (
                    <p className="error">Rejection Reason: {nomineeDetails.reason}</p>
                  )}
                </>
              ) : nomineeStatus == 1 ? (
                <p className="error">Nominee Details are Submitted, wait for approval.</p>
              ) : (
                ""
              )}

              <label htmlFor="">Nominee Name</label>
              <input
                type="text"
                placeholder="Nominee Name"
                value={nomineeName || (isApproved?.nominee == 3 ? "" : nomineeDetails?.nomineeName)} // Clear if rejected
                onChange={(e) => setNomineeName(e.target.value)}
              />

              <label htmlFor="">Relationship</label>
              <input
                type="text"
                placeholder="Relationship"
                value={nomineeRelationship || (isApproved?.nominee == 3 ? "" : nomineeDetails?.relationship)} // Clear if rejected
                onChange={(e) => setNomineeRelationship(e.target.value)}
              />

              <label htmlFor="">ID Type</label>
              <select
                id="mySelect"
                value={idDocumentType || nomineeDetails?.idDocumentType}
                onChange={(e) => setIdDocumentType(e.target.value)}
                required
              >
                <option value="">Choose ID Type</option>
                <option value="Adhar Card">Aadhaar</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driver License</option>
              </select>
              {errors.idDocumentType && <p className="error">{errors.idDocumentType}</p>}

              <label htmlFor="">ID Number</label>
              <input
                type="text"
                placeholder="ID Number"
                value={nomineeIdNo || (isApproved?.nominee == 3 ? "" : nomineeDetails?.idDocumentNumber)} // Clear if rejected
                onChange={(e) => setNomineeIdNo(e.target.value)}
                required
              />
              {errors.idDocumentNumber && <p className="error">{errors.idDocumentNumber}</p>}

              {/* Front Document Upload */}
              <label htmlFor="">Upload Document (Front)</label>
              <div className="file-upload-container">
                {nomineeStatus == 0 || isApproved?.nominee == 3 ? (
                  <>
                    <div {...getNomineeFrontRootProps({ className: "dropzone" })}>
                      <input {...getNomineeFrontInputProps()} />
                      <p>
                      Upload Nominee front document here (.jpg, .jpeg, or .png)
                      </p>
                    </div>
                    {previews.nomineeFront.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`preview-${index}`}
                        style={{ width: 100, height: 100, margin: 10 }}
                      />
                    ))}
                  </>
                ) : (
                  nomineeDetails?.documentFront && isApproved?.nominee !== 3 && (
                    <img
                      src={nomineeDetails.documentFront}
                      alt="nominee-front-preview"
                      style={{ width: 100, height: 100, margin: 10 }}
                    />
                  )
                )}
              </div>

              {/* Back Document Upload */}
              <label htmlFor="">Upload Document (Back)</label>
              <div className="file-upload-container">
                {nomineeStatus == 0 || isApproved?.nominee == 3 ? (
                  <>
                    <div {...getNomineeBackRootProps({ className: "dropzone" })}>
                      <input {...getNomineeBackInputProps()} />
                      <p>
                        {/* Drag 'n' drop nominee document back side here, or click to select one */}
                        Upload Nominee back document here (.jpg, .jpeg, or .png)

                      </p>
                    </div>
                    {previews.nomineeBack.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`preview-${index}`}
                        style={{ width: 100, height: 100, margin: 10 }}
                      />
                    ))}
                  </>
                ) : (
                  nomineeDetails?.documentBack && isApproved?.nominee !== 3 && (
                    <img
                      src={nomineeDetails.documentBack}
                      alt="nominee-back-preview"
                      style={{ width: 100, height: 100, margin: 10 }}
                    />
                  )
                )}
              </div>

              {nomineeStatus == 1 || isApproved?.nominee == 1 || nomineeStatus == 2 || isApproved?.nominee == 2 ? (
                <button
                  style={{ display: "none" }}
                  className="btnPrimary"
                  onClick={handleNominee}
                >
                  Submit
                </button>
              ) : (
                <button className="btnPrimary" onClick={handleNominee}>
                  Submit
                </button>
              )}
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default KYC;
