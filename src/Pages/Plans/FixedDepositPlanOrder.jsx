import React, { useEffect, useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import PaginationComponent from "../../Components/PaginationControls/PaginationControls";
import { BasicInfo } from "../../Config/BasicInfo";
import useAxiosHelper from "../../Common/AxiosHelper";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
const FixedDepositPlanOrder = () => {
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
  const [companyData, setCompanyData] = useState([])
  useEffect(() => {
    CompanyInfo();
  }, []);
  async function CompanyInfo() {
    try {
           const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }
  const { AxiosGet } = useAxiosHelper();

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  var x = 0;

  useEffect(() => {
    if (x === 0) {
      FetchData();
      x++;
    }
  }, []);
  const FetchData = async (page = currentPage) => {
    try {
      const queryParams = {
        page,
        limit: 20,
        planId:3
      };
      if (startDate && endDate) {
        queryParams.startDate = startDate;
        queryParams.endDate = endDate;
      }
      setLoading(true);

      const response = await AxiosGet(
        `${ApiPaths.getOrders}?${new URLSearchParams(queryParams).toString()}`
      );
      BasicInfo.isDebug && console.log("order history", response);
      setPaymentTransaction(response?.data || []);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching payment transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  function resetData() {
    setStartDate("");
    setEndDate("");
    FetchData(currentPage);
  }

  return (
    <>
      {loading ? <Loader /> : null}
      <section style={{ marginTop: " 20px" }}>
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
          <h1 className="textHeading">Active Package Details</h1>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Amount ({companyData?.currency_sign})</th>
                  <th>Package</th>
                  <th>Order Date</th>
                  <th>Maturity Date</th>
                  {/* <th>Earned Incomes</th>
                  <th>Pending Incomes</th>
                  <th>Total Incomes</th> */}
                  <th>Status</th>
                  <th>Date</th>
                  <th>Username(name)</th>
                </tr>
              </thead>
              <tbody>
                {paymentTransaction != null && Array.isArray(paymentTransaction)
                  ? paymentTransaction?.map((x, i) => {
                    return (
                      <tr>
                        {/* <td>{parseInt(incomeData?.start_from) + 1 + i}</td> */}

                        <td>{i + 1}</td>
                        <td>{parseFloat(x?.amount).toFixed(2)}</td>
                        <td>{x?.package_type}</td>
                        <td>{moment(x?.order_Date).format("DD MMM YY")}</td>
                        <td>{x?.maturity_Date} Months</td>
                        {/* <td>{x?.earned_income}</td>
                        <td>{x?.pending_income}</td>
                        <td>{x?.total_income}</td> */}
                        {x?.status == "0" ? (
                          <td>Pending</td>
                        ) : x?.status == "1" ? (
                          <td style={{ color: "green" }}>Success</td>
                        ) : (
                          <td style={{ color: "red" }}>Rejected</td>
                        )}
                        <td>{new Date(x?.order_Date).toLocaleDateString()}</td>
                        <td>
                          {x?.username}({x?.name})
                        </td>
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

export default FixedDepositPlanOrder;
