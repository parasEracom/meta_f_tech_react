import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./Profile.css";
import User from "./../../Images/user.png";
import { ApiPaths } from "./../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import useAxiosHelper from "./../../Common/AxiosHelper";
import { BasicInfo, toastFailed, toastSuccess } from "./../../Config/BasicInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUserPersonalInfo } from "./../../Redux/ProfileDataSlice";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FiCopy } from "react-icons/fi";
import CopyFromtag from "../../Common/CopyFromtag";
import { HiLockClosed } from "react-icons/hi";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import moment from "moment";
import { FaUpload } from "react-icons/fa"; // Upload icon


const Profile = () => {
  const dispatch = useDispatch();
  const { AxiosGet, AxiosPost } = useAxiosHelper();
  const [activeTab, setActiveTab] = useState("password");
  const [loading, setLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileMobile, setProfileMobile] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const profileData = useSelector(
    (state) => state.profileData.userPersonalInfo
  );
  // console.log("Updated profile data: ", profileData); // Check if profileImageUrl is available

  // const userProfile = useSelector((state) => state.user.userProfile); // Access the updated user profile

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [bankDetailField, setBankDetailField] = useState("");
  const [branch, setBranch] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accNo, setAccNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // For uploading profile image
  const [imagePreview, setImagePreview] = useState(null); // Image preview
  const [profileImg, setProfileImg] = useState(); // New Profile Image 


  useEffect(() => {
    setProfileEmail(profileData?.email);
    setProfileName(profileData?.name);
    setProfileMobile(profileData?.mobile);
    // setImagePreview(profileData.profileImageUrl || null);
    setProfileImg(profileData.profileImg || User)
  }, [profileData]);
  const checkPasswordDataIsValid = () => {
    if (
      oldPassword?.length > 0 &&
      newPassword?.length > 0 &&
      confirmPassword?.length > 0
    ) {
      if (newPassword === confirmPassword) {
        return true;
      } else {
        toastFailed("New password and confirm password should be the same");
        return false;
      }
    } else {
      toastFailed("Invalid Data");
      return false;
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
  const checkProfileValid = () => {
    let x = 0;

    if (profileName.length === 0) {
      setNameError("Name cannot be empty");
    } else if (profileName.length >= 3) {
      const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
      if (regex.test(profileName)) {
        x++;
      } else {
        setNameError("Invalid name");
      }
    } else {
      setNameError("Name should be atleast 3 characters");
    }

    if (profileEmail.length === 0) {
      setEmailError("Email cannot be empty");
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex.test(profileEmail)) {
        x++;
      } else {
        setEmailError("Invalid email");
      }
    }

    if (profileMobile == null || profileMobile.length == 0) {
      setMobileError("Phone number must be valid");
    } else {
      x++;
    }
    if (x === 3) {
      return true;
    } else {
      return false;
    }
  };
  const EditBankDetails = async () => {
    try {
      const body = {
        accountNumber: accNo,
        ifscCode: ifscCode,
        bankName: bankName,
        holder: holderName,
        accountType: accountType,
        branch: branch,
      };
      console.log(body);
      const res = await AxiosPost(ApiPaths.updateBankDetails, body);
      if (res) {
        toastSuccess(res?.message);
      }
    } catch (error) {
      console.log(error);
      toastFailed(error?.response?.data?.message);
    }
  };
  const EditProfile = async () => {
    let status = checkProfileValid();
    if (status) {
      try {
        setLoading(true);
        const body = {
          name: profileName,
          email: profileEmail,
          mobile: profileMobile,
        };
        console.log(profileData, "..profiledata");
        const response = await AxiosPost(ApiPaths.updateProfile, body);
        console.log(response, "response of profile data");
        toastSuccess(response?.message);
      } catch (error) {
        toastFailed(error?.response?.message);
      } finally {
        setLoading(false);
        setAccNo("");
        setBankName("");
        setIfscCode("");
        setAccountType("");
        setHolderName("");
        setBranch("");
      }
    }
  };

  const ChangePassword = async () => {
    let valid = checkPasswordDataIsValid();
    if (valid) {
      setPasswordLoading(true);
      try {
        const formData = {
          currentPassword: oldPassword,
          newPassword: newPassword,
        };
        const response = await AxiosPost(ApiPaths.changePassword, formData);
        toastSuccess(response?.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (e) {
        console.error("ChangePassword", e);
        toastFailed(e?.response?.data?.message);
      } finally {
        setPasswordLoading(false);
      }
    }
  };

  ////////////////////////////////////

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      // const maxSize = 2 * 1024 * 1024; // 2MB
      if (!validTypes.includes(file.type)) {
        toastFailed("Please upload a valid image (jpg, png, jpeg)");
        return;
      }
      // if (file.size > maxSize) {
      //   toastFailed("File size exceeds 2MB");
      //   return;
      // }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create image preview
    }
  };

  const uploadProfilePhoto = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profileImg", selectedFile);
      setLoading(true);

      try {
        const res = await AxiosPost(ApiPaths.uploadProfileImage, formData);
        toastSuccess(res?.message);
        BasicInfo.isDebug &&  console.log("Upload message:", res);
        getProfile()
        // setProfileImg(profileData.profileImg )
      } catch (error) {
        toastFailed(error?.message);
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      toastFailed("Please select a file to upload");
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await AxiosGet(ApiPaths.getProfile);
      BasicInfo.isDebug && console.log("Profile Data:", response);
      setProfileImg(response?.profileImg)
    } catch (error) {
      BasicInfo.isDebug && console.error("Error fetching Profile data:", error);
      toastFailed(error?.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="dashboard" style={{ paddingTop: "10px" }}>
      {loading && <Loader />}
      <div className="topProfile">
        <img src={profileImg || User} alt="PRofile" />
        <h5>{profileData?.username}</h5>
        <p>-{profileData?.name}</p>
      </div>
      <Row className="mt-4">
        <Col lg="6" className="mb-2">
          <div className="tabButtons">
            <button
              className="btnPrimary"
              onClick={() => setActiveTab("password")}
            >
              Change Password
            </button>
            <button
              className="btnPrimary"
              onClick={() => setActiveTab("image")}
            >
              Change Profile Picture
            </button>
           <button
              className="btnPrimary"
              onClick={() => setActiveTab("profile")}
            >
              Edit E-mail
            </button>
            {/*   <button
              className="btnPrimary"
              onClick={() => setActiveTab("bankDetails")}
            >
              Bank Details{" "}
            </button> */}
          </div>
          {activeTab === "password" && (
            <div className="passwordDiv">
              <h3>Change Password</h3>
              <div className="passwordItems">
                <label htmlFor="oldPassword">Old Password</label>
                <div style={{ display: "block" }}>
                  <div className="inputPassword">
                    <input
                      autoComplete="off"
                      id="oldPassword"
                      type={oldPasswordType}
                      placeholder="Enter Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <i id="passwordIcon">
                      <HiLockClosed />
                    </i>
                    {oldPasswordType === "password" ? (
                      <i
                        id="myProfileInputFieldIcon"
                        onClick={() => setOldPasswordType("text")}
                      >
                        <IoEyeOff />
                      </i>
                    ) : (
                      <i
                        id="myProfileInputFieldIcon"
                        onClick={() => setOldPasswordType("password")}
                      >
                        <IoEye />
                      </i>
                    )}
                  </div>
                  <div className="partition"></div>
                </div>
              </div>
              <div className="passwordItems">
                <label htmlFor="newPassword">New Password</label>
                <div style={{ display: "block" }}>
                  <div className="inputPassword">
                    <input
                      autoComplete="off"
                      id="newPassword"
                      type={newPasswordType}
                      placeholder="Enter New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <i id="passwordIcon">
                      <HiLockClosed />
                    </i>
                    {newPasswordType === "password" ? (
                      <i
                        id="myProfileInputFieldIcon"
                        onClick={() => setNewPasswordType("text")}
                      >
                        <IoEyeOff />
                      </i>
                    ) : (
                      <i
                        id="myProfileInputFieldIcon"
                        onClick={() => setNewPasswordType("password")}
                      >
                        <IoEye />
                      </i>
                    )}
                  </div>
                  <div className="partition"></div>
                </div>
              </div>
              <div className="passwordItems">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div style={{ display: "block" }}>
                  <div className="inputPassword">
                    <input
                      autoComplete="off"
                      id="confirmPassword"
                      type={confirmPasswordType}
                      placeholder="Enter Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <i id="passwordIcon">
                      <HiLockClosed />
                    </i>
                    {confirmPasswordType === "password" ? (
                      <i
                        id="myProfileInputFieldIcon"
                        onClick={() => setConfirmPasswordType("text")}
                      >
                        <IoEyeOff />
                      </i>
                    ) : (
                      <i
                        id="myProfileInputFieldIcon"
                        onClick={() => setConfirmPasswordType("password")}
                      >
                        <IoEye />
                      </i>
                    )}
                  </div>
                  <div className="partition"></div>
                </div>
              </div>
              <button className="btnPrimary mt-5" onClick={ChangePassword}>
                Update
              </button>
            </div>
          )}
          {activeTab === "image" && (
            <div className="passwordDiv">
              <h3 className="mb-4">Upload Profile Image</h3>

              <div className="form-group mb-3">
                <label htmlFor="imageUpload" style={{ color: "var(--textColor)" }} className="form-label mb-2">Choose Image </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  aria-label="Profile Image Upload"
                  className="form-control"
                  onChange={handleFileChange}
                />
                <p style={{ color: "var(--textColor)", fontSize: "xx-small" }}>Accepted Types (jpg, png, jpeg)</p>
              </div>

              <button
                className="btnPrimary btn-block mt-4"
                onClick={uploadProfilePhoto}
              >
                Upload
              </button>
              {loading && <Loader />}
              {imagePreview && (
                <div className="d-flex justify-content-center mt-4">
                  <img src={imagePreview} alt="Profile Preview" height="100px" className=" rounded" />
                </div>
              )}
            </div>

          )}

          {activeTab === "profile" && (
            <div className="editProfile inputPrimary">
              <h3>Edit Profile</h3>
              {/* <label htmlFor="">User Id</label>
              <input
                contentEditable={false}
                type="text"
                placeholder="User Id"
                value={profileData?.username}
              />
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
              <p className="registerInputError">{nameError}</p> */}

              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
              />
              <p className="registerInputError">{emailError}</p>

              {/* <label htmlFor="">Contact Number</label>

              <PhoneInput
                id="phoneInput"
                international
                countryCallingCodeEditable={false}
                defaultCountry="IN"
                value={profileMobile}
                onChange={setProfileMobile}
              />
              <p className="registerInputError">{mobileError}</p> */}

              <button onClick={EditProfile} className="btnPrimary">
                Update
              </button>
            </div>
          )}
          {activeTab === "bankDetails" && (
            <div className="editProfile inputPrimary">
              <h3>Edit Bank Details</h3>
              <label htmlFor="">Account No.</label>
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
              <label htmlFor="">IFSC Code </label>
              <input
                name="ifsc code"
                placeholder="IFSC Code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
                pattern="^[A-Z]{4}0[A-Z0-9]{6}$" // IFSC code format in India
                title="Please enter a valid IFSC code"
                required
              />

              <label htmlFor="">Account Type</label>
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

              <label htmlFor="">Bank Name</label>

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
              <label htmlFor="">Branch Name</label>

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

              <button onClick={EditBankDetails} className="btnPrimary">
                Update
              </button>
            </div>
          )}
        </Col>
        <Col lg="6" className="mb-2">
          {activeTab === "account" ? null : (
            <div className="basicInfo mb-3">
              <h3>Basic Info</h3>
              <div className="basicInfoDetails">
                <p>Username</p>
                <h1>:</h1>
                <p>{profileData?.username}</p>
              </div>
              <div className="basicInfoDetails">
                <p>Name</p>
                <h1>:</h1>
                <p>{profileData?.name}</p>
              </div>
              <div className="basicInfoDetails">
                <p>Mobile No.</p>
                <h1>:</h1>
                <p>{profileData?.mobile}</p>
              </div>
              <div className="basicInfoDetails">
                <p>Email</p>
                <h1>:</h1>
                <p>{profileData?.email}</p>
              </div>
              <div className="basicInfoDetails">
                <p>Joining Date</p>
                <h1>:</h1>
                <p>{moment(profileData?.joining_date).format("DD MMM YYYY")}</p>
              </div>
              <div className="basicInfoDetails">
                <p>Activation Date</p>
                <h1>:</h1>
                <p>{moment(profileData?.Activation_date).format("DD MMM YYYY")}</p>
              </div>

              <div
                style={{ border: "1px solid #252525" }}
                className="headerLinkDiv"
                onClick={() => CopyFromtag("profileLink")}
              >
                <div className="linktext">
                  <p>Your referral link</p>
                  <h2 id="profileLink">
                    {`${window.location.origin}/register?ref=${profileData?.username}`}
                  </h2>
                </div>
                <i>
                  <FiCopy />
                </i>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default Profile;
