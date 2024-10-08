import React, { useEffect, useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { Col, Row } from "react-bootstrap";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Data, toastSuccess } from "../../Common/Data";
import "./DirectTeam.css";
import { TbBinaryTree2 } from "react-icons/tb";
import { FaUsersSlash } from "react-icons/fa6";
import useAxiosHelper from "./../../Common/AxiosHelper";
import PaginationComponent from "../../Components/PaginationControls/PaginationControls";
import { BasicInfo } from "../../Config/BasicInfo";
import moment from "moment";

const DirectTeam = () => {
  const [selectIncome, setSelectIncome] = useState(1);
  const [filterVisiblity, setFilterVisiblity] = useState(false);
  const [directTeamData, setDirectTeamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterUserId, setFilterUserId] = useState("");
  const [filterjoinDate, setFilterjoinDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [uid, setUid] = useState(localStorage.getItem("userId"));
  const { AxiosPost, AxiosGet } = useAxiosHelper();
  const [selfBussTransaction, setSelfBussTransaction] = useState(0);
  const [teamBussTransaction, setTeamBussTransaction] = useState(0);
  const [companyData, setCompanyData] = useState();

  const [levelTeam, setLevelTeam] = useState([]);

  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }

  var dropdownData = [
    { name: "All", type: "" },
    { name: "Active", type: "1" },
    { name: "Inactive", type: "0" },
  ];

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    CompanyInfo();
    fetchAllDataTotals()
  }, []);

  useEffect(() => {
    FetchTeam();
  }, [currentPage]);

  async function FetchTeam(page = currentPage) {
    try {
      setLoading(true);

      const queryParams = {
        page,
        limit: 20,
        levels: "1",
        ...(filterUserId && { username: filterUserId }),
        ...(filterStatus && { status: filterStatus }),
      };
      const response = await AxiosGet(
        `${ApiPaths.getALlTeam}?${new URLSearchParams(queryParams).toString()}`
      );
      BasicInfo.isDebug && console.log(response?.data, "...");

      // Set the direct team data
      setDirectTeamData(response?.data);


    } catch (error) {
      BasicInfo.isDebug && console.log("Error Occurred", error);
    } finally {
      setLoading(false);
    }
  }

  const fetchAllDataTotals = async () => {
    try {
      setLoading(true);
      const queryParams = {
        limit: 20,
        levels: "1",
        ...(filterUserId && { username: filterUserId }),
        ...(filterStatus && { status: filterStatus }),
      };
      const response = await AxiosGet(
        `${ApiPaths.getALlTeam}?${new URLSearchParams(queryParams).toString()}`
      );
      BasicInfo.isDebug && console.log(response?.data, "...");

      // Set the direct team data
      setDirectTeamData(response?.data);

      // Calculate total self business (sum of self_investment)
      const totalSelfBusiness = response?.data.reduce((sum, user) => {
        return sum + (user?.self_investment || 0); // Add self_investment if it exists
      }, 0);

      // Calculate total team business (sum of business)
      const totalTeamBusiness = response?.data.reduce((sum, user) => {
        return sum + (user?.business || 0); // Add team business if it exists
      }, 0);

      // Set the total self and team business values
      setSelfBussTransaction(totalSelfBusiness);
      setTeamBussTransaction(totalTeamBusiness);

      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      BasicInfo.isDebug && console.error("Error fetching all data totals:", error);
    }
  };

  function filterReset() {
    setFilterUserId("");
    // setFilterjoinDate("");
    setFilterStatus("");
    setCurrentPage(1);
    FetchTeam();
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
              <Col lg="2" md="4">
                <input
                  type="text"
                  placeholder="User ID"
                  value={filterUserId}
                  onChange={(e) => setFilterUserId(e.target.value)}
                />
              </Col>

              <Col lg="2" md="4">
                <select
                  name=""
                  id=""
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  {dropdownData.map((x, i) => {
                    return <option value={x.type}>{x.name}</option>;
                  })}
                </select>
              </Col>

              <Col lg="2" md="4" xs="6">
                <button onClick={() => FetchTeam()}>Search</button>
              </Col>
              <Col lg="2" md="4" xs="6">
                <button onClick={filterReset}>Reset</button>
              </Col>
            </Row>
          </section>
        ) : null}

        <section className="history">
          {/* <div className="d-flex gap-2"></div> */}
          {/* <div className="totalCalcDiv">
            <span> Self Business: {selfBussTransaction || 0} {companyData?.currency}</span>
            <span> Team Business: {teamBussTransaction || 0} {companyData?.currency}</span>
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 className="textHeading">Direct Team</h1>
          </div>

          <div className="historyContent">
            <h1 className="textHeading"></h1>
            <div style={{ textAlign: "end" }}>
              <h4>
                Self Business: <span>{selfBussTransaction || 0} {companyData?.currency}</span>
              </h4>
              <h4>
                Team Business: <span>{teamBussTransaction || 0} {companyData?.currency}</span>
              </h4>
            </div>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Direct Team</th>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Join Date</th>
                  <th>Activation Date</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Self Business ({companyData?.currency_sign})</th>
                  <th>Team Business ({companyData?.currency_sign})</th>
                </tr>
              </thead>
              <tbody>
                {directTeamData?.map((x, i) => {
                  return x.status == "1" ? (
                    <tr className="teamRow">
                      <td>{i + 1 + 20 * (currentPage - 1)}</td>
                      <td
                        onClick={() => (
                          FetchTeam(x?.uid, "", "0"), setUid(x?.uid),
                          console.log("Data==>", x?.uid)
                        )}
                      >
                        <i style={{ fontSize: "25px", cursor: "pointer" }}>
                          <TbBinaryTree2 />
                        </i>
                      </td>

                      <td>{x.username}</td>
                      <td>{x.name}</td>
                      <td>{moment(x.joining_date).format("DD MMM YY")}</td>
                      <td> {x?.Activation_date
                        ? moment(x.Activation_date).format("DD MMM YY")
                        : "-"}</td>
                      <td>{x.email}</td>
                      <td>{x.mobile}</td>
                      <td>{x?.self_investment}</td>

                      <td>{x?.business}</td>
                    </tr>
                  ) : (
                    <tr style={{ color: "red" }}>
                      <td>{i + 1}</td>
                      <td
                        onClick={() => (
                          FetchTeam(x?.id, "", "0"), setUid(x?.id)
                        )}
                      >
                        <i style={{ fontSize: "25px", cursor: "pointer" }}>
                          <TbBinaryTree2 />
                        </i>
                      </td>
                      <td>{x.username}</td>
                      <td>{x.name}</td>
                      <td>{moment(x.joining_date).format("DD MMM YY")}</td>
                      <td> {x?.Activation_date
                        ? moment(x.Activation_date).format("DD MMM YY")
                        : "-"}</td>
                      <td>{x.email}</td>
                      <td>{x.mobile}</td>
                      <td>{x?.self_investment}</td>

                      <td>{x?.business}</td>
                    </tr>
                  );
                })}
                {/* {directTeamData?.map((x, i) => (
                  <tr key={x.uid || x.id} className={x.status === "1" ? "teamRow" : "text-danger"}>
                    <td>{i + 1}</td>
                    <td onClick={() => (FetchTeam(x.uid || x.id, "", "0"), setUid(x.uid || x.id))}>
                      <i style={{ fontSize: "25px", cursor: "pointer" }}>
                        <TbBinaryTree2 />
                      </i>
                    </td>
                    <td>{x.username}</td>
                    <td>{x.name}</td>
                    <td>{moment(x.joining_date).format("DD-MM-YYYY")}</td>
                    <td> {x.Activation_date ? moment(x.Activation_date).format("DD-MM-YYYY") : "-"}</td>
                    <td>{x.email}</td>
                    <td>{x.mobile}</td>
                    <td>{x.self_investment}</td>
                    <td>{x.business}</td>
                  </tr>
                ))} */}

              </tbody>
            </table>
            {directTeamData == 0 ? <p>No history found</p> : ""}
          </div>

          <div className="pagination-wrapper">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePagination}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default DirectTeam;
