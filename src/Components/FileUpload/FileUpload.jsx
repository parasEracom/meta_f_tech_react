import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./FileUpload.css";
import { FiUploadCloud } from "react-icons/fi";
import { Col, Row } from "react-bootstrap";
import { MdOutlineModeEdit } from "react-icons/md";
import useAxiosHelper from "./../../Common/AxiosHelper";
import { ApiPaths } from "./../../Config/ApiPath";
import { BasicInfo, toastFailed, toastSuccess } from "./../../Config/BasicInfo";
import { useLocation, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

const FileUpload = () => {
  const { AxiosPost } = useAxiosHelper();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [amount, setAmount] = useState();
  const [formTransationId, setFormTransationId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [previews, setPreviews] = useState([]);
  // const [payableAmount, setPayableAmount] = useState();

  const onDrop = async (acceptedFiles) => {
    const compressedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const options = {
          maxSizeMB: 1, // Maximum file size in MB
          maxWidthOrHeight: 1024, // Maximum width or height in pixels
          useWebWorker: true,
        };
        try {
          return await imageCompression(file, options);
        } catch (err) {
          console.error("Error compressing image:", err);
          return file;
        }
      })
    );

    setFiles(compressedFiles);
    setPreviews(compressedFiles.map((file) => URL.createObjectURL(file)));
  };

  let location = useLocation();
  useEffect(() => {
    let props = location?.state?.myData && JSON?.parse(location?.state?.myData);
    // console.log("props", props);
    setAmount(props);
  }, []);

  const uploadFiles = async () => {
    if (formTransationId?.length > 0) {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("proof", file);
      });

      // Append additional data
      formData.append("amount", amount);
      formData.append("transaction_id", formTransationId);

      try {
        BasicInfo.isDebug &&   console.log("formData", formData);
        const response = await AxiosPost(ApiPaths.paymentRequest, formData);
        BasicInfo.isDebug && console.log("Upload success:", response);
        setFiles([]);
        setPreviews([]);
        setAmount("");
        setFormTransationId("");
        toastSuccess(response?.message);
        navigate("/dashboard");
      } catch (err) {
        console.error("Upload error:", err);
        setError("Failed to upload files. Please try again.");
      } finally {
        setUploading(false);
      }
    } else {
      toastFailed("Invalid Data");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <Row className="mt-5">
        <Col md="4" className="mb-4 mb-md-0">
          <div className="myProfileInputField">
            <span id="myProfileInputFieldTitle">Amount</span>
            <input
              id="myProfileInputFieldInput"
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <i id="myProfileInputFieldIcon">
              <MdOutlineModeEdit />
            </i>
          </div>
        </Col>
        <Col md="8">
          <div className="myProfileInputField">
            <span id="myProfileInputFieldTitle">Transaction Id/Hash</span>
            <input
              id="myProfileInputFieldInput"
              type="text"
              placeholder="Enter Transaction Id/Hash"
              value={formTransationId}
              onChange={(e) => setFormTransationId(e.target.value)}
            />
            <i id="myProfileInputFieldIcon">
              <MdOutlineModeEdit />
            </i>
          </div>
        </Col>
      </Row>
      <div className="file-upload-container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drop your files here</p>
        </div>
        <button
          className="upload-button"
          onClick={uploadFiles}
          disabled={uploading || files.length === 0}
        >
          <i>
            <FiUploadCloud />
          </i>
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
        {error && <p className="error-message">{error}</p>}
        <div className="previews">
          {previews.map((preview, index) => (
            <div key={index} className="preview">
              <img src={preview} alt={`Preview ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
