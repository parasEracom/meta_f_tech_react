import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "./Slot.css";
import { Row, Col } from "react-bootstrap";
import { GiCycle } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";
import { Data } from "../../Common/Data";

const Slot = () => {
    let x = 0;
    const [slotData, setSlotData] = useState();
    const [loading, setLoading] = useState(false);
    const [g1Data, setG1Data] = useState([]);
    const [g1Cycles, setG1Cycles] = useState([]);
    const [g2Data, setG2Data] = useState([]);
    const [g2Cycles, setG2Cycles] = useState([]);
    const [g3Data, setG3Data] = useState([]);
    const [g3Cycles, setG3Cycles] = useState([]);
    const g1Value = [20, 40, 80, 160, 320, 640];
    useEffect(() => {
        if (x === 0) {
            checkData();
            x = 1;
        }
    }, []);

    function checkData() {
        let jsondata = localStorage.getItem("slotData");
        const data = JSON.parse(jsondata);
        if (data) {
            setSlotData(data);
            FetchData();
        } else {
            FetchData(true);
        }
    }

    function FetchData(checkload) {
        if (checkload) {
            setLoading(true);
        }
        let userId = localStorage.getItem("userId");
        Data.isDebug && console.log("user id", userId);
        axios({
            method: "post",
            url: "https://gambitbot.io/beta2/jhg7q/user/matrix_data",
            data: {
                u_id: 3,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                Data.isDebug && console.log(response);
                const data = response?.data[0];
                setSlotData(data);
                G1Calculation(data['g1'])
                G2Calculation(data['g2'])
                G3Calculation(data['g3'])
                localStorage.setItem("slotData", JSON.stringify(data));
                setLoading(false);
            })
            .catch(function (response) {
                Data.isDebug && console.log(response);
                setLoading(false);
            });
    }
    function G1Calculation(data) {
        console.log("data g1", data);
        let g1CycleCount = [];
        const result = [];

        for (const key1 in data) {
            const obj1 = data[key1];
            const row = [];

            for (const key2 in obj1) {
                const obj2 = obj1[key2];
                var nestedObj = [];

                nestedObj = obj2;
                row.push(nestedObj);
            }

            result.push(row);
        }
        console.log("reult 1", result);
        for (let i = 0; i < result.length; i++) {
            g1CycleCount.push(result[i].length);
        }
        // console.log("g1CycleCount", g1CycleCount)
        setG1Cycles(g1CycleCount);
        setG1Data(result);
    }
    function G2Calculation(data) {
        console.log("data g2", data);

        let g2CycleCount = [];
        const result = [];

        for (const key1 in data) {
            const obj1 = data[key1];
            const row = [];

            for (const key2 in obj1) {
                const obj2 = obj1[key2];
                var nestedObj = [];

                nestedObj = obj2;
                row.push(nestedObj);
            }

            result.push(row);
        }
        console.log("reult", result);
        for (let i = 0; i < result.length; i++) {
            g2CycleCount.push(result[i].length);
        }
        console.log("g2CycleCount", g2CycleCount)
        setG2Cycles(g2CycleCount);
        setG2Data(result);
    }
    function G3Calculation(data) {
        // console.log("data g3", data);

        let g3CycleCount;
        const result = [];

        for (const key1 in data) {
            const obj1 = data[key1];
            const row = [];

            for (const key2 in obj1) {
                const obj2 = obj1[key2];
                var nestedObj = [];

                nestedObj = obj2;
                row.push(nestedObj);
            }

            result.push(row);
        }
        // console.log("reult 3", result);
        for (let i = 0; i < result.length; i++) {
            g3CycleCount = result[i].length;
        }
        // console.log("g3CycleCount", g3CycleCount)
        setG3Cycles(g3CycleCount);
        setG3Data(result);
    }
    return (
        <>
            <section>
                <h1 className="textHeadingWithMargin">G-1</h1>
                <Row>
                    {g1Data && g1Cycles ?
                        g1Data?.map((data, i) => {
                            return <Col md="4 p-2">
                                <div className="slotDiv">
                                    <div className="slotViewDiv">
                                        <p>INR  {slotData?.plan[i]?.pool_package} </p>
                                        <Link to="/dashboard/slot"> <button>View</button> </Link>
                                    </div>
                                    <div className="slotContentDiv">
                                        {[...Array(4)].map((_, index) => (
                                            <span
                                                className={
                                                    g1Data[i]?.[g1Cycles[i] - 1]?.[index]
                                                        ? "activeSpan"
                                                        : "inActiveSpan"
                                                }
                                            ></span>
                                        ))}
                                    </div>
                                    <div className="slotAmountDiv">
                                        <p>INR  {g1Data[i]?.[g1Cycles[i] - 1]?.length > 0 ? (g1Data[i]?.[g1Cycles[i] - 1]?.length * slotData?.plan[i]?.pool_package) : 0} </p>
                                        <p>{g1Cycles[i]}  <i><GiCycle /></i></p>
                                    </div>
                                </div>
                            </Col>
                        }) : null

                    }
                </Row>
            </section>
            <section>
                <h1 className="textHeadingWithMargin">G-2</h1>
                <Row>
                    {g2Data &&
                        g2Data?.map((data, i) => {
                            return <Col md="4 p-2" key={i}>
                                <div className="slotDiv">
                                    <div className="slotViewDiv">
                                        <p>INR  {g1Value[i]}</p>
                                        <button>View</button>
                                    </div>
                                    <div className="slotContentTreeDiv">
                                        <div className="mb-3">
                                            <Row style={{ width: "100%" }}>
                                                {[...Array(2)].map((_, index) => {
                                                    let obj = [];
                                                    if (g2Data && g2Data[1] && g2Data[i][0]) {
                                                        obj = Object.keys(g2Data[i][0]);
                                                    }
                                                    let ind = obj[index]
                                                    // console.log("ind.222222222222222222222222", data)
                                                    return (
                                                        <>
                                                            <Col xs="6">
                                                                <div>
                                                                    <div className="treeFirstDiv">
                                                                        <span
                                                                            className={
                                                                                ind ? "activeSpan" : "inActiveSpan"
                                                                            }
                                                                        ></span>
                                                                    </div>
                                                                    <div className="treeSecondDiv mt-3">
                                                                        <span
                                                                            className={
                                                                                data?.[0]?.[ind][0]
                                                                                    ? "activeSpan"
                                                                                    : "inActiveSpan"
                                                                            }
                                                                        ></span>
                                                                        <span
                                                                            className={
                                                                                data?.[0]?.[ind][1]
                                                                                    ? "activeSpan"
                                                                                    : "inActiveSpan"
                                                                            }
                                                                        ></span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </>
                                                    );
                                                })}
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="slotAmountDiv">
                                        <p>INR  50.0000 </p>
                                        <p>{g2Cycles?.[i]}<i><GiCycle /></i></p>
                                    </div>
                                </div>
                            </Col>
                        })
                    }
                </Row>
            </section>
            <section>
                <h1 className="textHeadingWithMargin">G-3</h1>
                <Row>
                    <Col md="4 p-2">
                        <div className="slotDiv">
                            <div className="slotViewDiv">
                                <p>INR  10</p>
                                <button>View</button>
                            </div>
                            <div className="slotContentDiv">
                                {g3Data &&
                                    [...Array(3)].map((_, index) => (
                                        <span
                                            className={
                                                g3Data[0]?.[g3Data[0].length - 1]?.[index]
                                                    ? "activeSpan"
                                                    : "inActiveSpan"
                                            }
                                        ></span>
                                    ))}
                            </div>
                            <div className="slotAmountDiv">
                                <p>INR  {(g3Data?.[0]?.[g3Data[0].length - 1].length) * 10} </p>
                                <p>{g3Cycles}  <i><GiCycle /></i></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    );
};

export default Slot;
