import React, { useEffect, useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { Col, Row } from "react-bootstrap";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "./../../Components/Loader/Loader";
import "./GenerationTeam.css";
import PaginationComponent from "../../Components/PaginationControls/PaginationControls";
import useAxiosHelper from "../../Common/AxiosHelper";
import { toastFailed, toastSuccess } from "../../Config/BasicInfo";
import moment from "moment";
const GenerationTeam = () => {
  const [selectLevel, setSelectLevel] = useState(1);
  const [filterVisiblity, setFilterVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [levelTeam, setLevelTeam] = useState([]);
  const { AxiosGet, AxiosPost } = useAxiosHelper();
  const [level, setLevel] = useState("All");
  const [search, setSearch] = useState({
    search: "",
    name: "",
    username: "",
    startDateJoining: "",
    endDateJoining: "",
    status: "",
  });
  var dropdownData = [
    { name: "All", type: 0 },
    { name: "Level 1", type: "1" },
    { name: "Level 2", type: "2" },
    { name: "Level 3", type: "3" },
    { name: "Level 4", type: "4" },
    { name: "Level 5", type: "5" },
    { name: "Level 6", type: "6" },
    { name: "Level 7", type: "7" },
    { name: "Level 8", type: "8" },
    { name: "Level 9", type: "9" },
    { name: "Level 10", type: "10" },
    { name: "Level 11", type: "11" },
    { name: "Level 12", type: "12" },
    { name: "Level 13", type: "13" },
  ];
  const [companyData, setCompanyData] = useState([])
  useEffect(() => {
    CompanyInfo();
  }, []);
  async function CompanyInfo() {
    try {
      // const response = await AxiosGet(ApiPaths.getCompanyDetails);
      // // console.log(response, "llllllllll");
      // localStorage.setItem(
      //   "companyData",
      //   JSON.stringify(response?.company_info)
      // );
      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    let param = dropdownData[0].type;
    setSelectLevel(param);
    FetchData(param);
  }, [currentPage]);

  function fetchIncome(e) {
    setSelectLevel(e.target.value);
    FetchData(e.target.value);
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      FetchData(selectLevel);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, selectLevel]);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  async function FetchData(selectLevel) {
    try {
      setLoading(true);
      const filteredSearch = Object.fromEntries(
        Object.entries(search).filter(([key, value]) => value !== "")
      );
      var queryParams;
      if (selectLevel == 0) {
        queryParams = new URLSearchParams({
          page: currentPage,
          limit: 20,
          ...filteredSearch,
        });
      } else {
        queryParams = new URLSearchParams({
          levels: selectLevel,
          page: currentPage,
          limit: 20,
          ...filteredSearch,
        });
      }
      console.log(selectLevel);
      const queryString = queryParams.toString();

      const res = await AxiosGet(`${ApiPaths.getALlTeam}?${queryString}`);
      console.log(res, "level No.");
      if (res) {
        toastSuccess(res?.message);
        setLevelTeam(res?.data);
        setTotalPages(res?.totalPages || 1);
      }
    } catch (e) {
      toastFailed(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  function filterReset() {
    setSearch({
      search: "",
      name: "",
      username: "",
      startDateJoining: "",
      endDateJoining: "",
      status: "",
    });
    setCurrentPage(1);
    setLevel("All");
    // FetchData(selectLevel, 0);
  }

  return (
    <>
      {loading ? <Loader /> : null}
      <section className="dashboard">
        <div className="incomeSelectBox">
          <select
            name=""
            id=""
            value={selectLevel}
            onChange={(e) => fetchIncome(e)}
          >
            {dropdownData.map((x) => {
              return <option value={x.type}>{x.name}</option>;
            })}
          </select>
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
                  placeholder="Search"
                  name="search"
                  value={search.search}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="2" md="4">
                <input
                  type="text"
                  placeholder="Search By Name"
                  name="name"
                  value={search.name}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="2" md="4">
                <input
                  type="text"
                  placeholder="Search By User Id"
                  name="username"
                  value={search.username}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="2" md="4">
                <input
                  type="date"
                  placeholder="From Date"
                  name="startDateJoining"
                  value={search.startDateJoining}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="2" md="4">
                <input
                  type="date"
                  placeholder="End Date"
                  name="endDateJoining"
                  value={search.endDateJoining}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="2" md="4">
                <select
                  name="status"
                  id=""
                  value={search.status}
                  onChange={handleChange}
                >
                  <option value="">--Status--</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </Col>

              {/* <Col lg="2" md="4" xs="6">
             <button onClick={() => FetchData()}>Search</button>
           </Col> */}
              <Col lg="2" md="4" xs="6">
                <button onClick={filterReset}>Reset</button>
              </Col>
            </Row>
          </section>
        ) : null}
        <section className="history">
          <h1 className="textHeading">Generation Team</h1>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>

                  <th>User Id</th>
                  <th>Name</th>
                  <th>Join Date</th>
                  <th>Activation Date</th>
                  {/* <th>Level</th> */}
                  <th>Sponsor ID (Name)</th>
                  <th>Mobile Number</th>
                  <th>Self Business</th>
                  <th>Team Business</th>
                </tr>
              </thead>
              <tbody>
                {levelTeam.map((x, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + 20 * (currentPage - 1)}</td>

                      <td>{x.username}</td>
                      <td>{x?.name}</td>
                      {/* <td>{x.joining_date}</td> */}
                      <td>{moment(x?.joining_date).format("DD-MM-YYYY")}</td>
                      {/* <td>{moment(x?.Activation_date).format("DD-MM-YYYY")}</td> */}
                      <td>{x?.Activation_date ? moment(x.Activation_date).format("DD-MM-YYYY") : "-"}</td>

                      {/* <td>Level {x?.level}</td> */}

                      <td>
                      {x?.sponsor_username} ({x?.sponsor_name})
                    </td>
                    <td>{x.mobile}</td>

                      <td>  {x?.self_investment}</td>
                      <td>  {x?.business}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          


            {levelTeam == 0 ? <p>No history yet</p> : null}
          </div>
          {levelTeam.length > 0 && (
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

export default GenerationTeam;
