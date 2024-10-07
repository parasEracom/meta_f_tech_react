import React, { useEffect, useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import PaginationComponent from "./../../Components/PaginationControls/PaginationControls";
import useAxiosHelper from "../../Common/AxiosHelper";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { BasicInfo } from "../../Config/BasicInfo";
import moment from "moment/moment";
const ClaimedHistory = () => {
  const [selectIncome, setSelectIncome] = useState(1);
  const [tabsName, setTabsName] = useState("deposit");

  const [filterVisiblity, setFilterVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [runOnce, setRunOnce] = useState(true);
  const [paymentTransaction, setPaymentTransaction] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initValue, setInitValue] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { AxiosGet } = useAxiosHelper();
  const incomeData = useSelector((state) => state.incomeData.incomeWallet);
  const [companyData, setCompanyData] = useState([])


  async function CompanyInfo() {
    try {

      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  var x = 0;

  useEffect(() => {
    if (x === 0) {
      FetchData();
      CompanyInfo();
      x++;
    }
  }, []);
  const FetchData = async (page) => {
    try {
      setLoading(true);
      const filters = {
        tx_type: "withdrawal",
      };
      const queryParams = {
        page: page,
        limit: 20,
        ...filters,
      };
      const response = await AxiosGet(
        `${ApiPaths.getPaymentTransaction}?${new URLSearchParams(
          queryParams
        ).toString()}`
      );
      BasicInfo.isDebug && console.log("withdraw history", response);
      setPaymentTransaction(response?.data || []);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      BasicInfo.isDebug && console.error("Error fetching payment transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  function resetData() {
    setStartDate("");
    setEndDate("");

    FetchData();
  }
  return (
    <>
      {loading ? <Loader /> : null}
      <section className="dashboard">
        <div className="incomeSelectBox">
          <div></div>
          <button onClick={() => setFilterVisiblity(!filterVisiblity)}>
            {filterVisiblity ? "Hide Filters" : "Show Filters"}
            <i>
              {" "}
              <MdOutlineFilterList />
            </i>{" "}
          </button>
        </div>
        {filterVisiblity ? (
          <section className="filtersection inputPrimary">
            <Row>
              <Col lg="2" md="4" xs="12">
                <input
                  type="date"
                  name=""
                  id=""
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Col>
              <Col lg="2" md="4" xs="12">
                <input
                  type="date"
                  name=""
                  id=""
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Col>
              <Col lg="2" md="4" xs="6">
                <button onClick={() => FetchData()}>Search</button>
              </Col>
              <Col lg="2" md="4" xs="6">
                <button onClick={() => resetData()}>Reset</button>
              </Col>
            </Row>
          </section>
        ) : null}

        <section className="history">
          <h1 className="textHeading">Withdrawl History</h1>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Amount ({companyData?.currency_sign})</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentTransaction != null && Array.isArray(paymentTransaction)
                  ? paymentTransaction?.map((x, i) => {
                    return (
                      <tr>
                        <td>{i + 1 + 20 * (currentPage - 1)}</td>
                        {/* <td>{i + 1}</td> */}
                        <td>{parseFloat(x?.amount).toFixed(2)}</td>
                        <td>{x?.tx_type}</td>
                        {/* <td>{x?.subcription}</td> */}
                        {x?.status == "0" ? (
                          <td>Pending</td>
                        ) : x?.status == "1" ? (
                          <td style={{ color: "var(--bs-success)" }}>Success</td>
                        ) : (
                          <td style={{ color: "var(--bs-danger)" }}>Rejected</td>
                        )}
                        <td>{moment(x?.time).format("DD MMM YY (hh:mm:ss)")}</td>
                      </tr>
                    );
                  })
                  : ""}
              </tbody>
            </table>
            {paymentTransaction == 0 ? <p>No history yet</p> : null}
          </div>
          {paymentTransaction != null && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePagination}
            />
          )}
        </section>
      </section>
    </>
  );
};

export default ClaimedHistory;
