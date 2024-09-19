import React, { useEffect, useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import useAxiosHelper from "../../Common/AxiosHelper";
import { BasicInfo } from "../../Config/BasicInfo";
import PaginationComponent from "../../Components/PaginationControls/PaginationControls";

const FundTransferHistory = ({ key }) => {
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentTransaction, setPaymentTransaction] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { AxiosGet } = useAxiosHelper();
  const incomeData = useSelector((state) => state.incomeData?.incomeWallet);
  const [search, setSearch] = useState({
    startDate: "",
    endDate: "",
  });
  const [companyData, setCompanyData] = useState();

  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    CompanyInfo()
  }, []);
  useEffect(() => {
    BasicInfo.isDebug &&  console.log(key);
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

  const FetchData = async (page) => {
    try {
      const filteredSearch = Object.fromEntries(
        Object.entries(search).filter(([key, value]) => value !== "")
      );

      const filters = {
        source: "fund_transfer",
        ...filteredSearch,
      };
      const queryParams = {
        page: page,
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
                  <th>Amount ({companyData?.currency_sign})</th>
                  <th>Send / Received</th>
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
                      {x?.debit_credit == "debit" ? (
                        <td style={{ textAlign: "center" }}>
                          Send to {x?.from} ( {x?.name} )
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          Received from ( {x?.from} )
                        </td>
                      )}
                      <td style={{ textAlign: "center" }}>{x?.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      style={{
                        textAlign: "center",
                      }}
                      colSpan="3"
                    >
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
      </section>
    </>
  );
};

export default FundTransferHistory;
