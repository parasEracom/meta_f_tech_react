import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const modalStyles = {
  display: "block",
  position: "fixed",
  zIndex: "1",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
};

const modalContentStyles = {
  // backgroundColor: "red",
  background: "linear-gradient(67.13deg, #383838 0%, #282828 100%)",
  borderRadius: "20px",
  margin: "15% auto",
  width: "100%",
  maxWidth: "500px",
  height: "500px",
  overflowY: "scroll",
};
const viewMoreButtonStyles = {
  width: "50%",
  padding: "10px 20px",
  fontSize: "16px",
  color: "white",
  border: "none",
  cursor: "pointer",
};
const closeButtonStyles = {
  color: "#aaa",
  float: "right",
  fontSize: "28px",
  fontWeight: "bold",
  cursor: "pointer",
};

const Modal = ({ show, handleClose, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  if (!show) return null;

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <span style={closeButtonStyles} onClick={handleClose}>
          &times;
        </span>
        {children}
        {/* {!isExpanded && (
          <button
            className="btnPrimary"
            style={viewMoreButtonStyles}
            onClick={() => navigate("/terms_conditions")}
          >
            View More
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Modal;
