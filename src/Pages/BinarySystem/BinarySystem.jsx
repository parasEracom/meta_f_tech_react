import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { GiTeamIdea } from 'react-icons/gi'
import LeftLine from "./../../Images/leftLine.png"
import RightLine from "./../../Images/rightLine.png"
import CenterLine from "./../../Images/centerLine.png"
import Line from "./../../Images/line.png"
import "./BinarySystem.css"
const BinarySystem = () => {
    const [desktopTree, setDesktopTree] = useState('block')
    const [mobileTree, setMobileTree] = useState('block')
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }
    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(
            getWindowDimensions()
        );

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener("resize", handleResize);
            if (width > 768) {
                setDesktopTree('block');
                setMobileTree('none');
            } else {
                setDesktopTree('none');
                setMobileTree('block');
            }
            return () => window.removeEventListener("resize", handleResize);
        });
        return windowDimensions;
    }
    const { height, width } = useWindowDimensions();
    return (
        <>
            <section className="dashboard">
                <h1 className="textHeading">Binary map</h1>
                <div className='binarySystemFirsrDiv'>
                    <Row>
                        <Col md="6">
                            <h5 className="dashboardCardHeading">New partner team</h5>
                        </Col>
                        <Col md="6">
                            <div id="teamwithmail">
                                <div style={{ width: "100%" }}>
                                    <input type="text" placeholder="USERNAME OR EMAIL" />
                                </div>
                                <i><FiSearch /></i>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="binarySystemWaitingList">
                    <h5 className="dashboardCardHeading">Waiting list (24h)</h5>
                    <div>
                        <p>0</p>
                        <i><IoIosArrowDown /></i>
                    </div>
                </div>
                <section className="binarySystemTree mt-5" style={{ display: desktopTree }}>
                    <Row>
                        <Col md="3">

                            <div className="binarySystemTeamVolume">
                                <h5 className="dashboardCardHeading">Left team</h5>
                                <div>
                                    <i><RiMoneyDollarCircleFill /> </i>
                                    <h1>USD0</h1>
                                </div>
                                <div>
                                    <i><GiTeamIdea /> </i>
                                    <h1>0</h1>
                                </div>
                                <p>team valume <span>0%</span></p>
                            </div>
                        </Col>
                        <Col md="6">
                            <Row>
                                <div id="treeTopLevel">
                                    <img id="leftLine" src={LeftLine} alt="" />
                                    <div className="treeUser"><i><FaUserCircle /></i> </div>
                                    <img id="rightLine" src={RightLine} alt="" />
                                </div>
                            </Row>
                        </Col>
                        <Col md="3">

                            <div className="binarySystemTeamVolume">
                                <h5 className="dashboardCardHeading">Left team</h5>
                                <div>
                                    <i><RiMoneyDollarCircleFill /> </i>
                                    <h1>USD0</h1>
                                </div>
                                <div>
                                    <i><GiTeamIdea /> </i>
                                    <h1>0</h1>
                                </div>
                                <p>team valume <span>0%</span></p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2"></Col>
                        <Col md="3"><div className="treeUser"><i><FaUserCircle /></i> </div></Col>
                        <Col md="2"></Col>
                        <Col md="3"><div className="treeUser"><i><FaUserCircle /></i> </div></Col>
                        <Col md="2"></Col>
                    </Row>
                    <Row id="lastLevel" className='mt-4'>
                        <Col md="1"></Col>
                        <Col md="2"><div className="treeUser tree1"><i><FaUserCircle /></i> </div></Col>
                        <Col md="1"><img src={CenterLine} alt="" /></Col>
                        <Col md="2"><div className="treeUser tree1"><i><FaUserCircle /></i> </div></Col>
                        <Col md="2"><div className="treeUser tree1"><i><FaUserCircle /></i> </div></Col>
                        <Col md="1"><img src={CenterLine} alt="" /></Col>
                        <Col md="2"><div className="treeUser tree1"><i><FaUserCircle /></i> </div></Col>
                        <Col md="1"></Col>
                    </Row>
                </section>
                <section className="binaryTreeMobile" style={{ display: mobileTree }}>
                    <div id="binaryTreeMobileTop" className='d-flex justify-content-center flex-column align-items-center'>
                        <div className="treeUser"><i><FaUserCircle /></i> </div>
                        <img src={Line} alt="" />
                    </div>
                    <div id="binaryTreeMobileMid" className='d-flex justify-content-center'>
                        <div className="treeUser"><i><FaUserCircle /></i> </div>
                    </div>
                    <div id="binaryTreeMobileBottom" className='d-flex justify-content-center'>
                        <div className="treeUser"><i><FaUserCircle /></i> </div>
                        <img src={CenterLine} alt="logo.png " />
                        <div className="treeUser"><i><FaUserCircle /></i> </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default BinarySystem