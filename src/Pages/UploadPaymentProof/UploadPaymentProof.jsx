import React from "react";
import "./UploadPaymentProof.css";
import FileUpload from "./../../Components/FileUpload/FileUpload";
const UploadPaymentProof = () => {
  return (
    <div className="dashboard">
      <section className="mainContent p-3" style={{ marginBottom: "100px" }}>
        <div className="paymentProofData">
          <div className="paymentProofText">
            <h5>Thank you for your payment!</h5>

            <p>
              We appreciate your promptness. To complete the process, please
              upload your proof of payment using the form below. This helps us
              verify your transaction and ensures your account is updated
              without any delay.
            </p>

            <p>
              If you encounter any issues, feel free to contact our support
              team.
            </p>

            <p
              style={{
                color: "red",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              Note: Fill in your information carefully. Payment will not be
              refunded if you provide incorrect information.
            </p>
          </div>

          <div>
            <div className="uploadFileProof">
              <FileUpload />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UploadPaymentProof;
