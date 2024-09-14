import React from "react";
import "./BonusSystem.css";
import { Row, Col } from "react-bootstrap";
import { HiArrowLongRight } from "react-icons/hi2";
import { BsLink45Deg } from "react-icons/bs";
import { ImTree } from "react-icons/im";
import { FiStar } from "react-icons/fi";
import { IoInfinite, IoRibbonSharp } from "react-icons/io5";
import { GiBowTieRibbon } from "react-icons/gi";
const BonusSystem = () => {
  return (
    <>
      <section className="dashboard">
        <h1 className="textHeading">Bonus system</h1>
        <Row id="bonusTopDiv" className="mx-0 mb mb-4">
          <Col md="2">
            <div className="mycard myteamRank mb">
              <h5 className="dashboardCardHeading">Your Rank</h5>
              {/* <img src={Rank}></img> */}
            </div>{" "}
          </Col>
          <Col md="8" className="mb">
            <div id="bonusTopMid">
              <div>
                <p>Plan</p>
                <div></div>
                <h5>0/100</h5>
              </div>
              <div>
                <p>1st level volume</p>
                <div></div>
                <h5>0/0</h5>
              </div>
              <div>
                <p>Main volume</p>
                <div></div>
                <h5>0/0</h5>
              </div>
              <div>
                <p>Side volume</p>
                <div></div>
                <h5>0/0</h5>
              </div>
            </div>
          </Col>
          <Col md="2" className="d-flex flex-column justify-content-between">
            <div id="bonusNextRank" className="mb">
              <p>NEXT RANK</p>
            </div>
            <div id="bonusNextRankUsd">
              <p>NEXT LEADER BONUS</p>
              <h5>USD0</h5>
            </div>
          </Col>
        </Row>
        <Row id="bonusLimit" className="m-0">
          <h5 className="dashboardCardHeading">Binary bonus limits</h5>
          <Row id="bonusLimitRow">
            <Col md="4" className="mb">
              <div id="bonusDate">
                <div id="bonusDateDiv1">
                  <p>START</p>
                  <p>END</p>
                </div>
                <div id="bonusDateDiv2">
                  <h5>20 Nov `22</h5>
                  <i>
                    <HiArrowLongRight />
                  </i>
                  <h5>27 Nov `22</h5>
                </div>
              </div>
            </Col>
            <Col md="8">
              <div id="bonusReceived">
                <p>TO BE RECEIVED</p>
                <div>
                  <h5>USD0/USD0</h5>
                  <div></div>
                  <h1>0%</h1>
                </div>
              </div>
            </Col>
          </Row>
        </Row>

        <Row className="mt-4">
          <Col md="4">
            <div className="bonusSystemBonusCard mb">
              <div>
                <h5 className="dashboardCardHeading">Direct bonus</h5>
                <i>
                  <BsLink45Deg />
                </i>
              </div>
              <h1>USD0</h1>
            </div>
          </Col>
          <Col md="4">
            <div className="bonusSystemBonusCard mb">
              <div>
                <h5 className="dashboardCardHeading">Binary bonus</h5>
                <i>
                  <ImTree />
                </i>
              </div>
              <h1>USD0</h1>
            </div>
          </Col>
          <Col md="4">
            <div className="bonusSystemBonusCard mb">
              <div>
                <h5 className="dashboardCardHeading">Leadership bonus</h5>
                <i>
                  <FiStar />
                </i>
              </div>
              <h1>USD0</h1>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="4">
            <div className="bonusSystemBonusCard mb">
              <div>
                <h5 className="dashboardCardHeading">Matching bonus</h5>
                <i>
                  <IoRibbonSharp />
                </i>
              </div>
              <h1>USD0</h1>
            </div>
          </Col>
          <Col md="4">
            <div className="bonusSystemBonusCard mb">
              <div>
                <h5 className="dashboardCardHeading">Fast start bonus</h5>
                <i>
                  <GiBowTieRibbon />
                </i>
              </div>
              <h1>USD0</h1>
            </div>
          </Col>
          <Col md="4">
            <div className="bonusSystemBonusCard mb">
              <div>
                <h5 className="dashboardCardHeading">Infinity bonus</h5>
                <i>
                  <IoInfinite />
                </i>
              </div>
              <h1>USD0</h1>
            </div>
          </Col>
        </Row>
        <h1 id="getBonus">How to get bonus?</h1>
        <section className="myteam">
          <div id="teamwithmail">
            <h1 className="textHeading">Bonus history</h1>
          </div>
          <section>
            <div className="table">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>date</th>
                    <th>time</th>
                    <th>type</th>
                    <th>level</th>
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

export default BonusSystem;
