import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./MyTeam.css";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { IoInformationCircle } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { FiCopy, FiSearch } from "react-icons/fi";
import { CgDollar } from "react-icons/cg";
import { ImTree } from "react-icons/im";
import { RiTeamFill } from "react-icons/ri";
import Chart from "../../Components/Chart/Chart";
const MyTeam = () => {
  const [alertmsg, setAlertmsg] = useState("-130px");
  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };
  const AlertMsg = async () => {
    setAlertmsg("20px");
    let delayres = await delay(1000);
    setAlertmsg("-130px");
  };
  function Copycode() {
    var text = document.getElementById("headerLink").innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    // console.log(elem.value);
    document.body.removeChild(elem);
  }
  return (
    <>
      <section className="dashboard">
        {" "}
        <div className="alertMsg" style={{ top: alertmsg }}>
          Link Copied!
        </div>
        <h1 className="textHeading">Team Stats</h1>
        <Row className="myteamTopDiv m-0">
          <Col md="6">
            <Row>
              <Col md="4">
                <div className="mycard myteamRank mb">
                  <h5 className="dashboardCardHeading">Your Rank</h5>
                  {/* <img src={Rank1}></img> */}
                </div>
              </Col>
              <Col md="8" className="mb">
                <div className="mycard nextrank ">
                  <div id="nextrankWithIcon">
                    <i>
                      <HiArrowTrendingUp />
                    </i>
                    <h4>
                      Next rank - <span>M1</span>
                    </h4>
                  </div>
                  <div id="nextranktime">
                    <div>
                      <i>
                        <BsClock />
                      </i>
                      <div></div>
                    </div>
                    <h5>0%</h5>
                  </div>
                  <p>Remaining to next rank</p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Row id="teamUpline" className="mx-0">
              <p>YOUR UPLINER</p>
              <div>
                <h5>Ladyp2023</h5>
                <i>
                  <IoInformationCircle />
                </i>
              </div>
            </Row>
            <Row className="mx-0">
              <div className="p-0">
                <div
                  className="headerLinkDiv myteamLink"
                  onClick={() => (Copycode(), AlertMsg())}
                >
                  <div className="linktext">
                    <p>your referral link</p>
                    <h2 id="headerLink">maxpread.com/?ref=CryptoGoddess</h2>
                  </div>
                  <i>
                    <FiCopy />
                  </i>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
        <section className="teamLevel">
          <Row>
            <Col md="4">
              <div className="teamLevelCard mb">
                <div>
                  <p>1st level volume</p>
                  <i>
                    <CgDollar />
                  </i>
                </div>
                <h1>USD0</h1>
              </div>
            </Col>
            <Col md="4">
              <div className="teamLevelCard mb">
                <div>
                  <p>1st level partners</p>
                  <i style={{ fontSize: "22px" }}>
                    <RiTeamFill />
                  </i>
                </div>
                <h1>0</h1>
              </div>
            </Col>
            <Col md="4">
              <div className="teamLevelCard">
                <div>
                  <p>Partners Total</p>
                  <i style={{ fontSize: "22px" }}>
                    <ImTree />
                  </i>
                </div>
                <h1>0</h1>
              </div>
            </Col>
          </Row>
        </section>
        <section className="teamGraph">
          <Chart />
        </section>
        <section className="myteam">
          <div id="teamwithmail">
            <h1 className="textHeading">My Team</h1>
            <div>
              <input type="text" placeholder="USERNAME OR EMAIL" />
            </div>
            <i>
              <FiSearch />
            </i>
          </div>
          <section>
            <div className="table">
              <table style={{ width: "100%" }}>
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
          </section>
        </section>
      </section>
    </>
  );
};

export default MyTeam;
