import React, { useEffect, useState } from "react";
import "./Register.css";
import Logo from "./../../Images/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillEye,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiFillEyeInvisible,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { HiLockClosed } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import CopyFromtag from "../../Common/CopyFromtag";
import { BasicInfo, toastFailed, toastSuccess } from "./../../Config/BasicInfo";
import { ApiPaths } from "./../../Config/ApiPath";
import { setLoginDisplay } from "../../Redux/LoginSlice";
import { setRegisterDisplay } from "../../Redux/RegisterSlice";
import { setAuthToken } from "./../../Redux/StatusState";
import useAxiosHelper from "./../../Common/AxiosHelper";
import Modal from "../../Components/Modal";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import Select from "react-select";

import { useDispatch } from "react-redux";
import TermsCondition from "../TermsConditions/TermsCondition";
const Register = () => {
  const { AxiosPost, AxiosGet } = useAxiosHelper();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [sponsorId, setSponsorId] = useState("");
  const [checkSponsorExist, setCheckSponsorExist] = useState(false);
  const [sponsorError, setSponsorError] = useState("");
  const [nameError, setNameError] = useState("");
  const [usenameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [penCardError, setPenCardError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  const [termCheck, setTermCheck] = useState(false);
  const [username, setUsername] = useState("");
  const [usernamefield, setUsernameField] = useState("");
  const [pancardfield, setPancardField] = useState("");
  const [adharcardfield, setadharcardField] = useState("");
  const [sponsorUsername, setSponsorUsername] = useState("");
  const [pancard, setPancard] = useState("");
  const [adharcard, setadharcard] = useState("");
  const [passwordVisility, setPasswordVisiblity] = useState(false);
  const [confirmPasswordVisility, setConfirmPasswordVisiblity] =
    useState(false);
  const [error, setError] = useState("");

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerSuccessData, setRegisterSuccessData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    penCard: "",
    mobile: "",
  });
  const [bankDetailField, setBankDetailField] = useState("");
  const [branch, setBranch] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accNo, setAccNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");

  useEffect(() => {
    // Fetch country codes and names
    const countries = getCountries();
    const options = countries.map((code) => ({
      value: `+${getCountryCallingCode(code)}`,
      label: `${code} +${getCountryCallingCode(code)}`,
    }));
    setCountryOptions(options);
  }, [selectedCountry]);

  const handleCountryChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedCountry(selectedOption);
    // Optionally handle phone input update here
  };
  const openModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleRegisterChange = (event) => {
    try {
      const { name, value } = event.target;
      setRegisterData({
        ...registerData,
        [name]: value,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event) => {
    setAccountType(event.target.value);
    validateSelection(event.target.value);
  };

  const validateSelection = (value) => {
    if (value === "") {
      setError("Please select an option");
    } else {
      setError("");
    }
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      backgroundColor: state.isFocused ? "none" : "none",
      borderColor: state.isFocused ? "none" : "none",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: "none",
      },
      padding: "2px 0px",
    }),
  };

  useEffect(() => {
    const after = window.location.search.slice(
      window.location.search.indexOf("=") + 1
    );
    setSponsorId(after);
    if (after.length > 0) {
      onUserStoppedTyping(after);
    }
  }, []);
  const toastCopy = (msg) => toastSuccess(msg);
  const ChnageFun = () => {
    dispatch(setRegisterDisplay(false));
    dispatch(setLoginDisplay(true));
  };
  var x = 0;
  useEffect(() => {
    if (x == 0) {
      RegisterField();
      x++;
    }
  }, []);
  async function RegisterField() {
    const response = await AxiosGet(ApiPaths.registerfield);
    setUsernameField(response?.user_gen_method);
    setPancardField(response?.is_pancard_required);
    setBankDetailField(response?.is_bankdetails_required);
    setadharcardField(response?.is_aadhar_required);
  }
  const LoginRegister = async (e) => {
    e.preventDefault();
    let valid = checkValidation();
    if (valid) {
      setLoading(true);
      try {
        const body = {
          sponsor: sponsorId,
          name: registerData.name,
          email: registerData.email,
          username: sponsorUsername,
          mobile: `${selectedCountry?.value}${registerData?.mobile}`,
          password: registerData.password,
          pancard: pancard,
          adharcard:adharcard,
          bankName: bankName,
          accountNumber: accNo,
          ifscCode: ifscCode,
          holder: holderName,
          accountType: accountType,
          branch: branch,
        };
        console.log(body, "....");
        const res = await AxiosPost(ApiPaths.register, body);
        if (res.status == 200) {
          toastSuccess(res?.message);
          localStorage.setItem("token", res?.token);
          dispatch(setRegisterDisplay(false));
          dispatch(setAuthToken(res?.token));
          localStorage.setItem("userProfile", JSON.stringify(res?.User));
          setRegisterSuccess(true);
          setRegisterSuccessData(res?.User);
        }
      } catch (error) {
        console.error(error);
        toastFailed(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };
  async function onUserStoppedTyping(sponID) {
    setSponsorLoading(true);
    try {
      const body = {
        username: sponID,
      };
      const res = await AxiosPost(ApiPaths.checkSponsor, body);

      if (res.status == 200) {
        setCheckSponsorExist(true);
        setUsername(res?.name);
        setLoading(false);
        setSponsorLoading(false);
      }
    } catch (error) {
      console.error("error here", error);
    } finally {
      setSponsorLoading(false);
    }
  }
  const handleInputChange = (e) => {
    setSponsorError("");
    const value = e.target.value;
    setSponsorId(value);
    if (value?.length > 0) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingTimeout(
        setTimeout(() => {
          if (value.length > 0) {
            onUserStoppedTyping(value);
          } else {
            setCheckSponsorExist([]);
          }
        }, 500)
      );
    } else {
      setCheckSponsorExist("");
    }
  };
  let z = 0;

  function checkValidation() {
    if (registerData.confirmPassword.length === 0) {
      setconfirmPasswordError("Confirm password cannot be empty");
    } else {
      if (registerData.password === registerData.confirmPassword) {
        z++;
        setconfirmPasswordError("");
      } else {
        console.log("Password does not match");
        setconfirmPasswordError("Password does not match");
      }
    }
    if (accountType === "") {
      setError("Please select an option before submitting");
    } else {
      z++;
      console.log("Selected option:", accountType);
    }
    if (z == 2) {
      return true;
    } else {
      return false;
    }
  }

  function resetError() {
    setSponsorError("");
    setNameError("");
    setUsernameError("");
    setEmailError("");
    setMobileError("");
    setPasswordError("");
    setconfirmPasswordError("");
    setPenCardError("");
  }

  return (
    <>
      {loading ? <Loader /> : null}

      {registerSuccess ? (
        <section className="registerSuccessDetails">
          <div>
            <div id="successIcon">
              <i>
                <AiOutlineCheckCircle />
              </i>
              <h1>Success</h1>
            </div>
            <div id="successDetails">
              <p className="mb-4">
                Congratulations {registerSuccessData?.name ?? ""}, your account
                has been successfully created
              </p>

              <div>
                <p style={{ marginRight: "10px" }}>Name</p>
                <div>
                  <p>{registerSuccessData?.name}</p>
                </div>
              </div>
              <div>
                <p style={{ marginRight: "10px" }}>Username</p>
                <div>
                  <p id="registerSuccessUsername">
                    {registerSuccessData?.username}
                  </p>
                  <i
                    onClick={() => (
                      CopyFromtag("registerSuccessUsername"),
                      toastCopy("Text Copied !")
                    )}
                  >
                    <IoCopyOutline />
                  </i>
                </div>
              </div>

              <button
                onClick={() => (
                  setRegisterSuccess(false),
                  navigate(`/?ref=${registerSuccessData?.username ?? ""}`)
                )}
              >
                Continue
              </button>
            </div>
          </div>
        </section>
      ) : null}
      <Container id="logincontainer">
        <div className="registerContainerContent">
          <div className="registerContent">
            <a className="loginLogo" href={BasicInfo.websiteLink}>
              <img src={Logo} alt="logo.png" width="150px" height="100px" />
            </a>
            <p>sign Up your account</p>
            <form onSubmit={LoginRegister}>
              <Row>
                {checkSponsorExist == true ? (
                  <p
                    id="sponsorVerified"
                    style={{
                      color: "green",
                      marginLeft: "10px",
                      paddingBottom: "19px",
                    }}
                  >
                    {username}
                  </p>
                ) : (
                  <p
                    id="sponsorVerified"
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      paddingBottom: "19px",
                    }}
                  >
                    Sponsor not exist
                  </p>
                )}
                <Col md="4" className="inputs">
                  <>
                    <p className="registerInputError">{sponsorError}</p>

                    <div className="registerInput_inner">
                      <span id="myProfileInputFieldTitle">Sponsor ID</span>
                      <input
                        type="text"
                        id="sponsorId"
                        name="sponsorId"
                        placeholder="Sponsor ID"
                        value={sponsorId}
                        onChange={(e) => handleInputChange(e)}
                      />
                      {sponsorLoading ? (
                        <i id="sponsorLoading"></i>
                      ) : (
                        <i>
                          <AiOutlineUser />
                        </i>
                      )}
                    </div>
                  </>
                </Col>
                {usernamefield == "manual" ? (
                  <Col md="4" className="inputs">
                    <>
                      <div className="registerInput_inner">
                        <span id="myProfileInputFieldTitle">Username</span>
                        <input
                          type="text"
                          placeholder="Username"
                          id="username"
                          name="username"
                          value={sponsorUsername}
                          onChange={(e) => setSponsorUsername(e.target.value)}
                        />
                        <i>
                          <RiLockPasswordFill />
                        </i>
                      </div>
                    </>
                  </Col>
                ) : (
                  ""
                )}
                <Col md="4" className="inputs">
                  <div className="registerInput_inner">
                    <span id="myProfileInputFieldTitle">Name</span>

                    <input
                      type="text"
                      placeholder="Name"
                      id="name"
                      name="name"
                      value={registerData.name}
                      onChange={(e) => handleRegisterChange(e)}
                      pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                      title="Please enter a valid name"
                      required
                    />

                    <i>
                      <RiLockPasswordFill />
                    </i>
                  </div>
                </Col>
                <Col md="4" className="inputs">
                  <div className="registerInput_inner">
                    <span id="myProfileInputFieldTitle">Email ID</span>

                    <input
                      type="text"
                      placeholder="Email Id"
                      id="email"
                      name="email"
                      value={registerData.email}
                      onChange={(e) => handleRegisterChange(e)}
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      title="Please enter a valid email address"
                      required
                    />

                    <i>
                      <AiOutlineMail />
                    </i>
                  </div>
                </Col>
                <Col md="4" className="inputs">
                  <div className="registerInput_inner">
                    <span id="myProfileInputFieldTitle">Mobile No.</span>
                    <div style={{ alignItems: "center", display: "flex" }}>
                      <Select
                        options={countryOptions}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        styles={customStyles}
                        isSearchable
                      />
                      <input
                        type="number"
                        placeholder="Mobile No."
                        id="mobile"
                        name="mobile"
                        value={registerData.mobile}
                        onChange={(e) => handleRegisterChange(e)}
                        required
                      />
                    </div>

                    <i>
                      <AiOutlinePhone />
                    </i>
                  </div>
                </Col>{" "}
                {pancardfield == "yes" ? (
                  <Col md="4" className="inputs">
                    <>
                      <p className="registerInputError"></p>
                      <div className="registerInput_inner">
                        <span id="myProfileInputFieldTitle">Pan Card</span>

                        <input
                          type="text"
                          placeholder="Enter Pan Card"
                          id="pencard"
                          name="penCard"
                          value={pancard}
                          onChange={(e) => setPancard(e.target.value)}
                          pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$" // Indian PAN card format
                          title="Please enter a valid PAN card number"
                          required
                        />

                        <i>
                          <AiOutlineMail />
                        </i>
                      </div>
                    </>
                  </Col>
                ) : (
                  ""
                )}
                   {adharcardfield == "yes" ? (
                  <Col md="4" className="inputs">
                    <>
                      <p className="registerInputError"></p>
                      <div className="registerInput_inner">
                        <span id="myProfileInputFieldTitle">Aadhar Card</span>

                        <input
                          type="text"
                          placeholder="Enter Aadhar Card"
                          id="adharcard"
                          name="adharcard"
                          value={adharcard}
                          onChange={(e) => setadharcard(e.target.value)}
                          pattern="^[0-9]{12}$"  // Indian adharcard format
                          title="Please enter a valid Aadhar Card number"
                          required
                        />

                        <i>
                          <AiOutlineMail />
                        </i>
                      </div>
                    </>
                  </Col>
                ) : (
                  ""
                )}
                {bankDetailField == "yes" ? (
                  <>
                    <Col md="4" className="inputs">
                      <div className="registerInput_inner">
                        <span id="myProfileInputFieldTitle">Account No.</span>

                        <input
                          type="number"
                          name="accountNo"
                          placeholder="Account no"
                          value={accNo}
                          onChange={(e) => setAccNo(e.target.value)}
                          pattern="^\d{9,18}$" // Accepts account numbers between 9 and 18 digits
                          title="Please enter a valid account number"
                          required
                        />
                      </div>
                    </Col>
                    <Col md="4" className="inputs">
                      <div className="registerInput_inner">
                        <span id="myProfileInputFieldTitle">IFSC Code</span>
                        <input
                          name="ifsc code"
                          placeholder="IFSC Code"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value)}
                          pattern="^[A-Z]{4}0[A-Z0-9]{6}$" // IFSC code format in India
                          title="Please enter a valid IFSC code"
                          required
                        />
                      </div>
                    </Col>
                    <Col md="4" className="inputs">
                      <div className="registerInput_inner">
                        <span id="myProfileInputFieldTitle">Account Type</span>
                        <select
                          className="selectOption"
                          value={accountType}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose Bank Type</option>
                          <option value="Saving">Saving</option>
                          <option value="Current">Current</option>
                        </select>
                      </div>
                    </Col>
                    <Col md="4" className="inputs">
                      <div className="registerInput_inner">
                        <span id="myProfileInputFieldTitle">Bank Name</span>

                        <input
                          type="text"
                          name="bank name"
                          placeholder="Bank name"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                          title="Please enter a valid name"
                          required
                        />
                      </div>
                    </Col>
                    <Col md="4" className="inputs">
                      <div className="registerInput_inner">
                        <span id="myProfileInputFieldTitle">Branch Name</span>

                        <input
                          type="text"
                          name="branch name"
                          placeholder="Branch name"
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                          title="Please enter a valid branch name"
                          required
                        />
                      </div>
                    </Col>
                  </>
                ) : (
                  ""
                )}
                <Col md="4" className="inputs">
                  <div className="registerInput_inner">
                    <span id="myProfileInputFieldTitle">Password</span>

                    <input
                      type={passwordVisility ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      name="password"
                      value={registerData.password}
                      onChange={(e) => handleRegisterChange(e)}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                      title=" Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)"
                      required
                    />
                    <i>
                      <HiLockClosed />
                    </i>
                    <i
                      id="eyeIcon"
                      onClick={() => setPasswordVisiblity(!passwordVisility)}
                    >
                      {passwordVisility ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </i>
                  </div>
                </Col>
                <Col md="4" className="inputs">
                  <p className="registerInputError">{confirmPasswordError}</p>
                  <div className="registerInput_inner">
                    <span id="myProfileInputFieldTitle">Confirm Password</span>
                    <input
                      type={confirmPasswordVisility ? "text" : "password"}
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={(e) => handleRegisterChange(e)}
                      required
                    />
                    <i>
                      <HiLockClosed />
                    </i>
                    <i
                      id="eyeIcon"
                      onClick={() =>
                        setConfirmPasswordVisiblity(!confirmPasswordVisility)
                      }
                    >
                      {confirmPasswordVisility ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </i>
                  </div>
                </Col>
              </Row>

              <div className="form_check_data mb-3 ">
                <input
                  value={termCheck}
                  className="form_check_input"
                  type="checkbox"
                  id="rememberme"
                  onChange={(e) => setTermCheck(e.target.checked)}
                />
                <div className="d-flex gap-2">
                  <label className="form_check_label" for="rememberme">
                    I agree to the
                  </label>
                  <Link
                    onClick={openModal}
                    to="/terms_conditions"
                    style={{
                      color: "var(--btnBackground)",
                      fontSize: "15px",
                      borderBottom: "1px solid var(--btnBackground)",
                    }}
                  >
                    Terms and Conditions
                  </Link>
                  <Modal show={showModal} handleClose={closeModal}>
                    <TermsCondition />
                  </Modal>
                </div>
              </div>

              <div className="loginFooter_btn">
                <button
                  type="submit"
                  style={{ width: "30%" }}
                  disabled={!termCheck}
                  className="btnPrimary mt-3"
                >
                  Register
                </button>
                <p className="sign_log">Already have an account?</p>
                <Link onClick={ChnageFun} to="/" className="btnPrimary">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
