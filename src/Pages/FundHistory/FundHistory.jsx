// import React, { useEffect, useState } from "react";
// import { MdOutlineFilterList } from "react-icons/md";
// import { ApiPaths } from "../../Config/ApiPath";
// import Loader from "../../Components/Loader/Loader";
// import PaginationComponent from "./../../Components/PaginationControls/PaginationControls";
// import useAxiosHelper from "../../Common/AxiosHelper";
// import { useSelector, useDispatch } from "react-redux";
// import { Container, Row, Col } from "react-bootstrap";
// import { BasicInfo } from "../../Config/BasicInfo";
// const FundHistory = ({ status }) => {
//   const [selectIncome, setSelectIncome] = useState(1);
//   const [tabsName, setTabsName] = useState("deposit");

//   const [filterVisiblity, setFilterVisiblity] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [runOnce, setRunOnce] = useState(true);
//   const [paymentTransaction, setPaymentTransaction] = useState();

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [initValue, setInitValue] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageNum, setPageNum] = useState();
//   const [currentPage, setCurrentPage] = useState(1);

//   const { AxiosGet } = useAxiosHelper();
//   const incomeData = useSelector((state) => state.incomeData.incomeWallet);
//   const [companyData, setCompanyData] = useState([])
//   useEffect(() => {
//     CompanyInfo();
//   }, []);
//   async function CompanyInfo() {
//     try {

//       const data = localStorage.getItem("companyData");
//       // console.log(JSON.parse(data));
//       setCompanyData(JSON.parse(data));
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // const handleTabChange = (tabName) => {
//   //   setTabsName(tabName);
//   //   localStorage.setItem("historyTab", tabName);
//   // };

//   const handlePagination = (page) => {
//     setCurrentPage(page);
//   };

//   var x = 0;

//   useEffect(() => {
//     if (x === 0) {
//       FetchData();
//       x++;
//     }
//   }, [status]);
//   const FetchData = async (page = currentPage) => {
//     try {
//       const filters = {
//         source: "add_fund",
//         status: status,
//       };
//       const queryParams = {
//         // page,
//         // limit: 20,
//         wallet_type:"fund_wallet",
//         // ...filters,
//       };
//       if (startDate && endDate) {
//         queryParams.startDate = startDate;
//         queryParams.endDate = endDate;
//       }
//       setLoading(true);

//       const response = await AxiosGet(
//         `${ApiPaths.getPaymentTransaction}?${new URLSearchParams(
//           queryParams
//         ).toString()}`
//       );
//       BasicInfo.isDebug && console.log("Fund history", response);

//       setPaymentTransaction(response?.data || []);
//       setTotalPages(response?.totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching payment transactions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   function resetData() {
//     setStartDate("");
//     setEndDate("");

//     FetchData();
//   }

//   return (
//     <>
//       {loading ? <Loader /> : null}

//       <section>
//         <div className="incomeSelectBox">
//           <button onClick={() => setFilterVisiblity(!filterVisiblity)}>
//             {filterVisiblity ? "Hide Filters" : "Show Filters"}
//             <i>
//               {" "}
//               <MdOutlineFilterList />
//             </i>{" "}
//           </button>
//         </div>
//         {filterVisiblity ? (
//           <section className="filtersection inputPrimary">
//             <Row>
//               <Col lg="2" md="4" xs="12">
//                 <input
//                   type="date"
//                   name=""
//                   id=""
//                   placeholder="Start Date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </Col>
//               <Col lg="2" md="4" xs="12">
//                 <input
//                   type="date"
//                   name=""
//                   id=""
//                   placeholder="End Date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </Col>
//               <Col lg="2" md="4" xs="6">
//                 <button onClick={() => FetchData()}>Search</button>
//               </Col>
//               <Col lg="2" md="4" xs="6">
//                 <button onClick={() => resetData()}>Reset</button>
//               </Col>
//             </Row>
//           </section>
//         ) : null}

//         <section className="history">
//           <h1 className="textHeading">
//             {status == 0 ? "Pending" : "Approved"} Fund Requests
//           </h1>
//           <div className="table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Amount ({companyData?.currency} )</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paymentTransaction != null && Array.isArray(paymentTransaction)
//                   ? paymentTransaction?.map((x, i) => {
//                       return (
//                         <tr>
//                           <td>{i + 1}</td>
//                           <td>{parseFloat(x?.amount).toFixed(2)}</td>
//                           <td>{new Date(x?.updatedAt).toLocaleDateString()}</td>
//                         </tr>
//                       );
//                     })
//                   : ""}
//               </tbody>
//             </table>
//             {paymentTransaction == 0 ? <p>No history yet</p> : null}
//           </div>
//           {paymentTransaction != null && (
//             <PaginationComponent
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePagination}
//             />
//           )}
//         </section>
//       </section>
//     </>
//   );
// };

// export default FundHistory;





























import React, { useEffect, useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { ApiPaths } from "./../../Config/ApiPath";
import Loader from "./../../Components/Loader/Loader";
import PaginationComponent from "./../../Components/PaginationControls/PaginationControls";
import useAxiosHelper from "./../../Common/AxiosHelper";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// import "./FundHistory.css";
import { BasicInfo } from "./../../Config/BasicInfo";
import { AiOutlineClose } from "react-icons/ai";
import { FiMaximize2 } from "react-icons/fi";
import moment from "moment";

const OverallFundHistory = () => {
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentTransaction, setPaymentTransaction] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image
  const { AxiosGet } = useAxiosHelper();
  const incomeData = useSelector((state) => state.incomeData?.incomeWallet);
  const [search, setSearch] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    FetchData(currentPage);
  }, [currentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const AddFilter = () => {
    const queryParams = {
      page: currentPage,
      limit: 20,
      ...Object.fromEntries(
        Object.entries(search).filter(
          ([_, value]) => value !== "" && value !== 0
        )
      ),
    };
    FetchData(queryParams);
  };

  const FetchData = async (page = currentPage) => {
    try {
      const filteredSearch = Object.fromEntries(
        Object.entries(search).filter(([key, value]) => value !== "")
      );

      const filters = {
        wallet_type: "fund_wallet",
        ...filteredSearch,
      };
      const queryParams = {
        page,
        limit: 20,
        ...filters,
      };

      setLoading(true);
      const response = await AxiosGet(
        `${ApiPaths.getPaymentTransaction}?${new URLSearchParams(
          queryParams
        ).toString()}`
      );
      BasicInfo.isDebug && console.log("Fund history", response);

      setPaymentTransaction(response?.data || []);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching payment transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  function resetData() {
    setSearch({
      startDate: "",
      endDate: "",
    });
  }

  useEffect(() => {
    if (search.startDate === "" && search.endDate === "") {
      FetchData();
    }
  }, [search]);
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on search
    FetchData(1);
  };

  const openImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl); // Set selected image for popup
  };

  const closeImagePopup = () => {
    setSelectedImage(null); // Close popup by setting image to null
  };

  return (
    <>
      {loading && <Loader />}

      <section>
        <div className="incomeSelectBox">
          <button onClick={() => setFilterVisibility(!filterVisibility)}>
            {filterVisibility ? "Hide Filters" : "Show Filters"}
            <i>
              <MdOutlineFilterList />
            </i>
          </button>
        </div>
        {filterVisibility && (
          <section className="filtersection inputPrimary">
            <Row>
              <Col lg="2" md="4" xs="12">
                <input
                  type="date"
                  placeholder="From Date"
                  name="startDate"
                  value={search.startDate}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="2" md="4" xs="12">
                <input
                  type="date"
                  placeholder="End Date"
                  name="endDate"
                  value={search.endDate}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="2" md="4" xs="6">
                <button onClick={AddFilter}>Search</button>
              </Col>
              <Col lg="2" md="4" xs="6">
                <button onClick={resetData}>Reset</button>
              </Col>
            </Row>
          </section>
        )}

        <section className="history">
          <h1 className="textHeading">Fund History</h1>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Amount ($)</th>
                  <th>Status</th>
                  <th>Tx ID</th>
                  <th>Proof</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentTransaction.length ? (
                  paymentTransaction.map((x, i) => (
                    <tr key={i}>
                      <td style={{ textAlign: "center" }}>{i + 1}</td>
                      <td style={{ textAlign: "center" }}>
                        {parseFloat(x?.amount).toFixed(2)}
                      </td>
                      {x?.source == "topup" ? (
                        <td>Topup</td>
                      ) : x?.tx_type == "p2p" && x?.debit_credit == "debit" ? (
                        <td style={{ textAlign: "center" }}>
                          Send to {x?.from} ( {x?.name} )
                        </td>
                      ) : x?.tx_type == "p2p" && x?.debit_credit == "credit" ? (
                        <td>Received from {x?.from}</td>
                      ) : x?.tx_type == "income" &&
                        x?.source == "add_fund" &&
                        x?.status == 1 ? (
                        <td>Approved</td>
                      ) : x?.tx_type == "income" &&
                        x?.source == "generate_fund" ? (
                        <td>Received from {x?.from}</td>
                      ) : (
                        <td>Received from {x?.to_from}</td>
                      )}

                      <td style={{ textAlign: "center" }}>{x?.reqest_tx_Id}</td>
                      {x?.source == "add_fund" && x?.tx_type !== "p2p" ? (
                        <td className="proofView">
                          <img
                            src={x?.proofUrl}
                            width={50}
                            height={50}
                            style={{ cursor: "pointer", objectFit: "contain" }}
                          />
                          <i onClick={() => openImagePopup(x?.proofUrl)}>
                            <FiMaximize2 />
                          </i>
                        </td>
                      ) : (
                        <td></td>
                      )}
                      <td style={{ textAlign: "center" }}>{moment(x?.time).format("DD-MM-YYYY")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="3">
                      No history yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {paymentTransaction.length > 0 && (
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePagination}
              />
            )}
          </div>
        </section>

        {/* Image Popup */}
        {selectedImage && (
          <div className="popup">
            <div className="popup-content">
              <span className="close-icon" onClick={closeImagePopup}>
                <AiOutlineClose />
              </span>
              <img src={selectedImage} alt="proof" className="popup-image" />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default OverallFundHistory;





// import React, { useEffect, useState } from "react";
// import { MdOutlineFilterList } from "react-icons/md";
// import { ApiPaths } from "./../../Config/ApiPath";
// import Loader from "./../../Components/Loader/Loader";
// import PaginationComponent from "./../../Components/PaginationControls/PaginationControls";
// import useAxiosHelper from "./../../Common/AxiosHelper";
// import { useSelector } from "react-redux";
// import { Row, Col } from "react-bootstrap";
// // import "./FundHistory.css";
// import { BasicInfo } from "./../../Config/BasicInfo";
// import { AiOutlineClose } from "react-icons/ai";
// import { FiMaximize2 } from "react-icons/fi";

// const FundHistory = ({ status }) => {
//   const [filterVisibility, setFilterVisibility] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [paymentTransaction, setPaymentTransaction] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image
//   const { AxiosGet } = useAxiosHelper();
//   const incomeData = useSelector((state) => state.incomeData?.incomeWallet);
//   const [search, setSearch] = useState({
//     startDate: "",
//     endDate: "",
//   });

//   useEffect(() => {
//     FetchData(currentPage);
//   }, [status, currentPage]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     setSearch((prev) => ({ ...prev, [name]: value }));
//   };

//   const AddFilter = () => {
//     const queryParams = {
//       page: currentPage,
//       limit: 20,
//       ...Object.fromEntries(
//         Object.entries(search).filter(
//           ([_, value]) => value !== "" && value !== 0
//         )
//       ),
//     };
//     FetchData(queryParams);
//   };

//   const FetchData = async (page) => {
//     try {
//       const filteredSearch = Object.fromEntries(
//         Object.entries(search).filter(([key, value]) => value !== "")
//       );

//       const filters = {
//         source: "add_fund",
//         status: status,
//         ...filteredSearch,
//       };
//       const queryParams = {
//         page: page,
//         limit: 20,
//         ...filters,
//       };

//       setLoading(true);
//       const response = await AxiosGet(
//         `${ApiPaths.getPaymentTransaction}?${new URLSearchParams(
//           queryParams
//         ).toString()}`
//       );
//       BasicInfo.isDebug && console.log("Fund history", response);

//       setPaymentTransaction(response?.data || []);
//       setTotalPages(response?.totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching payment transactions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePagination = (page) => {
//     setCurrentPage(page);
//   };

//   function resetData() {
//     setSearch({
//       startDate: "",
//       endDate: "",
//     });
//   }

//   useEffect(() => {
//     if (search.startDate === "" && search.endDate === "") {
//       FetchData();
//     }
//   }, [search]);
//   const handleSearch = () => {
//     setCurrentPage(1); // Reset to first page on search
//     FetchData(1);
//   };

//   const openImagePopup = (imageUrl) => {
//     setSelectedImage(imageUrl); // Set selected image for popup
//   };

//   const closeImagePopup = () => {
//     setSelectedImage(null); // Close popup by setting image to null
//   };

//   return (
//     <>
//       {loading && <Loader />}

//       <section>
//         <div className="incomeSelectBox">
//           <button onClick={() => setFilterVisibility(!filterVisibility)}>
//             {filterVisibility ? "Hide Filters" : "Show Filters"}
//             <i>
//               <MdOutlineFilterList />
//             </i>
//           </button>
//         </div>
//         {filterVisibility && (
//           <section className="filtersection inputPrimary">
//             <Row>
//               <Col lg="2" md="4" xs="12">
//                 <input
//                   type="date"
//                   placeholder="From Date"
//                   name="startDate"
//                   value={search.startDate}
//                   onChange={handleChange}
//                 />
//               </Col>
//               <Col lg="2" md="4" xs="12">
//                 <input
//                   type="date"
//                   placeholder="End Date"
//                   name="endDate"
//                   value={search.endDate}
//                   onChange={handleChange}
//                 />
//               </Col>
//               <Col lg="2" md="4" xs="6">
//                 <button onClick={AddFilter}>Search</button>
//               </Col>
//               <Col lg="2" md="4" xs="6">
//                 <button onClick={resetData}>Reset</button>
//               </Col>
//             </Row>
//           </section>
//         )}

//         <section className="history">
//           <h1 className="textHeading">Fund History</h1>
//           <div className="table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Amount ($)</th>
//                   <th>Tx ID</th>
//                   <th>Proof</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paymentTransaction.length ? (
//                   paymentTransaction.map((x, i) => (
//                     <tr key={i}>
//                       <td style={{ textAlign: "center" }}>{i + 1}</td>
//                       <td style={{ textAlign: "center" }}>
//                         {parseFloat(x?.amount).toFixed(2)}
//                       </td>
//                       <td style={{ textAlign: "center" }}>{x?.reqest_tx_Id}</td>
//                       <td className="proofView">
//                         <img
//                           src={x?.proofUrl}
//                           width={50}
//                           height={50}
//                           style={{ cursor: "pointer", objectFit: "contain" }}
//                         />
//                         <i onClick={() => openImagePopup(x?.proofUrl)}>
//                           <FiMaximize2 />
//                         </i>
//                       </td>
//                       <td style={{ textAlign: "center" }}>{x?.time}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td style={{ textAlign: "center" }} colSpan="3">
//                       No history yet
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//             {paymentTransaction.length > 0 && (
//               <PaginationComponent
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePagination}
//               />
//             )}
//           </div>
//         </section>

//         {/* Image Popup */}
//         {selectedImage && (
//           <div className="popup">
//             <div className="popup-content">
//               <span className="close-icon" onClick={closeImagePopup}>
//                 <AiOutlineClose />
//               </span>
//               <img src={selectedImage} alt="proof" className="popup-image" />
//             </div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// };

// export default FundHistory;
