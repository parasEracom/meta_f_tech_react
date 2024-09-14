import React, { useEffect, useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
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

const DirectTeam = () => {
  const [selectIncome, setSelectIncome] = useState(1);
  const [filterVisiblity, setFilterVisiblity] = useState(false);
  const [directTeamData, setDirectTeamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initValue, setInitValue] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState();
  const [history, setHistory] = useState([]); // To store the history
  const [selectLevel, setselectLevel] = useState("1");
  const [filterUserId, setFilterUserId] = useState("");
  const [filterjoinDate, setFilterjoinDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [uid, setUid] = useState(localStorage.getItem("userId"));
  const { AxiosPost, AxiosGet } = useAxiosHelper();
  const [paymentTransaction, setPaymentTransaction] = useState();
  // const [totalPages, setTotalPages] = useState(0);
  // const [pageNum, setPageNum] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [levelTeam, setLevelTeam] = useState([]);

  var dropdownData = [
    { name: "All", type: "" },
    { name: "Active", type: "1" },
    { name: "Inactive", type: "0" },
  ];
  const handlePagination = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    FetchTeam();
    // FetchData();
  }, []);
  // async function FetchData() {
  //   try {
  //     const body = {
  //       levels: selectLevel,
  //     };

  //     const res = await AxiosPost(ApiPaths.getLevels, body);
  //     setLevelTeam(res?.generationTeam[0]?.team);
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  // }
  async function FetchTeam(page = currentPage) {
    try {
      setLoading(true);

      const queryParams = {
        page,
        limit: 20,
        levels: "1",
      };
      const response = await AxiosGet(
        `${ApiPaths.getALlTeam}?${new URLSearchParams(queryParams).toString()}`
      );
      BasicInfo.isDebug && console.log(response?.data, "...");
      setDirectTeamData(response?.data);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      BasicInfo.isDebug && console.log("Error Occurred", error);
    } finally {
      setLoading(false);
    }
  }

  function filterReset() {
    setFilterUserId("");
    setFilterjoinDate("");
    setFilterStatus("");
    // FetchData();
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
                  {levelTeam.map((x, i) => {
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
          <div className="d-flex gap-2">
            {/* <button className="myTeamBtn" onClick={MyTeam}>
              My Team
            </button>
            <button className="myTeamBtn" onClick={handleBack}>
              Previous
            </button> */}
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
                  <th>Self Business</th>
                  <th>Team Business</th>
                </tr>
              </thead>
              <tbody>
                {directTeamData?.map((x, i) => {
                  return x.status == "1" ? (
                    <tr className="teamRow">
                      <td>{i + 1}</td>
                      <td
                        onClick={() => (
                          FetchTeam(x?.uid, "", "0"), setUid(x?.uid)
                        )}
                      >
                        <i style={{ fontSize: "25px", cursor: "pointer" }}>
                          <TbBinaryTree2 />
                        </i>
                      </td>

                      <td>{x.username}</td>
                      <td>{x.name}</td>
                      <td>{x.joining_date}</td>
                      <td>{x.Activation_date}</td>
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
                      <td>{x.joining_date}</td>
                      <td>{x.Activation_date}</td>
                      <td>{x.email}</td>
                      <td>{x.mobile}</td>
                      <td>{x?.self_investment}</td>

                      <td>{x?.business}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {directTeamData == 0 ? <p>No history yet</p> : null}
          </div>
          {directTeamData != null && (
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

export default DirectTeam;
