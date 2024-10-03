import React, { useEffect, useState } from "react";
import "./Incomes.css";
import { MdOutlineFilterList } from "react-icons/md";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import { GrNext, GrPrevious } from "react-icons/gr";
import liveRate from "../../Common/LiveRate";
import useAxiosHelper from "../../Common/AxiosHelper";
import { setIncomeWallet } from "../../Redux/IncomeWallet";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Components/PaginationControls/PaginationControls";
import { BasicInfo } from "../../Config/BasicInfo";
import moment from "moment/moment";

const Incomes = () => {
  const { AxiosGet } = useAxiosHelper();
  const dispatch = useDispatch();
  const [selectIncome, setSelectIncome] = useState("");
  const [filterVisiblity, setFilterVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initValue, setInitValue] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState();
  const [data, setData] = useState([]);
  const [incomeLiveRate, setIncomeLiveRate] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentTransaction, setPaymentTransaction] = useState();
  const incomeData = useSelector((state) => state.incomeData.incomeWallet);
  const [currentIncome, setCurrentIncome] = useState("");
  const incomeWallets = incomeData.filter(
    (wallet) => wallet.wallet_type === "income"
  );

  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    
    CompanyInfo();
  }, []);

  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }
  var x = 0;
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  useEffect(() => {
    if (x == 0) {
      fetchHistory();
      x++;
    }
  }, [selectIncome == "" ? incomeWallets[0]?.slug : selectIncome, currentPage]);

  async function fetchIncome() {
    const res = await AxiosGet(ApiPaths.getWallets);
    if (res) {
      dispatch(setIncomeWallet(res?.wallets));
    }
  }

  const handleChange = (e) => {
    setSelectIncome(e.target.value);
  };
  async function fetchHistory(page = currentPage) {
    try {
      setLoading(true);

      const filters = {
        source: selectIncome == "" ? incomeWallets[0]?.slug : selectIncome,
        // start_date: startDate,
        // end_date: endDate,
      };
      BasicInfo.isDebug && console.log(filters, "filters");
      const queryParams = {
        page,
        limit: 20,
        ...filters,
      };

      const response = await AxiosGet(
        `${ApiPaths.getPaymentTransaction}?${new URLSearchParams(
          queryParams
        ).toString()}`
      );
      setCurrentIncome(response?.creditSum);
      setPaymentTransaction(response?.data || []);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching payment transactions:", error);
    } finally {
      setLoading(false);
    }
  }
  function resetData() {
    setStartDate("");
    setEndDate("");
    // fetchHistory();
  }
  return (
    <>
      {loading ? <Loader /> : null}
      <section className="dashboard">
        <div className="incomeSelectBox">
          <select
            name=""
            id=""
            value={selectIncome}
            onChange={(e) => handleChange(e)}
          >
            {incomeWallets.map((x, i) => {
              return <option value={x?.slug}>{x?.name}</option>;
            })}
          </select>
          <button onClick={() => setFilterVisiblity(!filterVisiblity)}>
            {filterVisiblity ? "Hide Filters" : "Show Filters"}
            <i>
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
                <button onClick={() => fetchHistory(selectIncome)}>
                  Search
                </button>
              </Col>
              <Col lg="2" md="4" xs="6">
                <button onClick={() => resetData()}>Reset</button>
              </Col>
            </Row>
          </section>
        ) : null}
        <section className="history">
          <div className="historyContent">
            <h1 className="textHeading"></h1>
            <h4>
              Total Income: <span> {currentIncome} {companyData?.currency}</span>
            </h4>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Amount ({companyData?.currency_sign})</th>
                  <th>From</th>
                  <th>Level</th>
                  {/* <th>Hash</th> */}
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentTransaction?.map((x, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + 20 * (currentPage - 1)}</td>
                      <td>{parseFloat(x?.amount).toFixed(2)}</td>

                      <td>{x?.from}</td>
                      <td>{x?.level}</td>
                      {/* <td>
                        <a
                          href={`https://polygonscan.com/tx/${x?.tx_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {abbreviatedHash}
                        </a>
                      </td> */}
                      <td>{moment(x?.updatedAt).format("DD MMM YY")}</td>
                    </tr>
                  );
                })}
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

export default Incomes;
