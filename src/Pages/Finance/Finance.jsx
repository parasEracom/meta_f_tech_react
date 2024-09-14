import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CgDollar } from "react-icons/cg";
import { RiExchangeDollarLine } from "react-icons/ri";
import { ImTree } from "react-icons/im";
import "./Finance.css";
import axios from "axios";
import { ApiPaths } from "../../Config";
const Finance = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [myRank, setMyRank] = useState();
  const [incomeInfo, setIncomeInfo] = useState(false);
  const [incomeHeading, setIncomeHeading] = useState(false);
  const [incomeData, setIncomeData] = useState(false);

  useEffect(() => {
    // FetchData();
    // console.log("userId", localStorage.getItem('userId'));
    checkData();
  }, [])
  function checkData() {
    let jsondata = localStorage.getItem("dashboardData");
    const data = JSON.parse(jsondata);
    // console.log("data", data)
    if (data) {
      setDashboardData(data);
      setMyRank(data?.profile?.[0]?.my_rank);
      FetchData();
    } else {
      FetchData();
    }

  }

  function FetchData() {
    // setLoading(true);
    let userId = localStorage.getItem('userId');
    axios({
      method: "post",
      url: ApiPaths.dashboard,
      data: {
        u_id: userId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        // console.log(response);
        setDashboardData(response?.data);
        setMyRank(response?.data?.profile?.[0]?.my_rank);
        localStorage.setItem("dashboardData", JSON.stringify(response?.data));
        setLoading(false);
      })
      .catch(function (response) {
        setLoading(false);
      });
  }
  return (
    <section className="dashboard">
      <h1 className="textHeading">Finance</h1>
      <Row>
        <Col md="4" className="mb">
          <div className="financeMainAccountCard">
            <div id="dollar">
              <h5 className="dashboardCardHeading">Main Wallet</h5>
              <i id="dollarIcon">
                <CgDollar />
              </i>
            </div>
            <h1>USD {parseFloat(dashboardData?.wallets?.main_wallet).toFixed(2)}</h1>
            <hr></hr>
            <div className="btnDiv gap-3">
              <button className="btnPrimary mr-4">Deposit</button>
              <button className="btnSecondary">Transfer</button>
            </div>
          </div>
        </Col>
        <Col md="4" className="mb">
          <div className="financeMainAccountCard">
            <div id="dollar">
              <h5 className="dashboardCardHeading">Fund Wallet</h5>
              <i id="dollarIcon">
                <CgDollar />
              </i>
            </div>
            <h1>USD {parseFloat(dashboardData?.wallets?.fund_wallet).toFixed(2)}</h1>
            <hr></hr>
            <div className="btnDiv gap-3">
              <button className="btnPrimary mr-4">Withdraw</button>
              <button className="btnSecondary">Transfer</button>
            </div>
          </div>
        </Col>
        <Col md="4" className="mb">
          <div className="financeMainAccountCard">
            <div id="dollar">
              <h5 className="dashboardCardHeading">Package Wallet</h5>
              <i id="dollarIcon">
                <CgDollar />
              </i>
            </div>
            <h1>USD {parseFloat(dashboardData?.wallets?.package_wallet).toFixed(2)}</h1>
            <hr></hr>
            <div className="btnDiv gap-3">
              <button className="btnPrimary mr-4">Withdraw</button>
              <button className="btnSecondary">Transfer</button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        {dashboardData?.incomes && Object.keys(dashboardData?.incomes)?.map((key) => (
          <Col md="4" key={key}>
            <div className="financeDailyIncome mb-3">
              <div>
                <h5 className="dashboardCardHeading" style={{ textTransform: "capitalize" }}>{key.replace(/_/g, ' ')}</h5>
                <i>
                  <RiExchangeDollarLine />
                </i>
              </div>
              <h1 className="usd">USD {parseFloat(dashboardData?.incomes[key]).toFixed(2)}</h1>
            </div>
          </Col>
        ))}


      </Row>
      {/* <div className="earnstats mb-4">
        <div id="earnstatsDiv">
          <h5 className="dashboardCardHeading">Earn Stats</h5>
          <div>
            <p>All time</p>
            <p>Today</p>
            <p>Week</p>
            <p>Month</p>
            <p>Year</p>
          </div>
        </div>
        <div className="earnStatsGraph">
          <div>
            <div>
              <h5
                className="dashboardCardHeading"
                style={{ fontSize: "13px", fontWeight: "500" }}
              >
                INVESTED
              </h5>
              <h1>USD:0</h1>
            </div>
            <div className="earngraph">
              <div></div>
            </div>
          </div>
          <div id="earngraph2">
            <div>
              <h5
                className="dashboardCardHeading"
                style={{ fontSize: "13px", fontWeight: "500" }}
              >
                EARNED
              </h5>
              <h1>USD:0</h1>
            </div>
            <div className="earngraph">
              <div></div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <section className="history">
        <h1 className="textHeading">History</h1>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>date</th>
                <th>time</th>
                <th>operation</th>
                <th>account</th>
                <th>ammount</th>
                <th>status</th>
              </tr>
            </thead>
          </table>
          <p>No history yet</p>
        </div>
      </section> */}
    </section>
  );
};

export default Finance;
