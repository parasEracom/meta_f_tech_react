import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Data } from "../../Common/Data";
import GetFloatValue from "../../Common/GetFloatValue";
const AllCaping = (props) => {
    Data.isDebug && console.log("data", props);
    const propsData = props?.data;
    const root = document.documentElement;
    const rootStyles = getComputedStyle(root);
    const rootColor = rootStyles.getPropertyValue("--colorPrimary");
    const chartMinedValue = propsData?.stake - propsData?.allMined;

    const data = [
        {
            title: "Mined",
            value: parseFloat(propsData?.allMined ?? 0.00000000001),
            color: rootColor,
        },

        {
            title: "Staking",
            value: parseFloat(chartMinedValue ?? 0.00000000001),
            color: "grey",
        },
    ];

    return (
        <div className="capping mb-4">
            <div className="cappingGraphDiv">
                <div style={{ height: "120px" }}>
                    <PieChart
                        animate={true}
                        animationDuration={2000}
                        data={data}
                        lineWidth={30}
                        paddingAngle={2}
                        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                        labelStyle={{
                            fill: "#fff",
                            fontSize: "5px",
                            fontFamily: "sans-serif",
                            fontSize: "8px",
                            fontWeight: "bold",
                            borderRadius: "50%",
                            background: "red !important",
                        }}
                    />
                </div>
                <div className="cappingAbout ">
                    <div>
                        <span style={{ background: "grey" }}></span>
                        <p>Staking</p>
                    </div>
                    <div>
                        <span style={{ background: rootColor }}></span>
                        <p>Mined</p>
                    </div>
                </div>
            </div>

            <div className="cappingDetails cappingDetailsDashboard">
                <div>
                    <div>
                        <h1>
                            {GetFloatValue(propsData?.stake - propsData?.allMined)} {Data?.coinName}
                        </h1>
                        <h3>
                            INR  {GetFloatValue((propsData?.stake - propsData?.allMined) * propsData?.liveRate, 4)}
                        </h3>
                        <p>Staking</p>
                    </div>
                    <div>
                        <h1>
                            {GetFloatValue(propsData?.allClaimed, 4)} {Data?.coinName}
                        </h1>
                        <h3>INR  {GetFloatValue(propsData?.allClaimed * propsData?.liveRate, 4)}</h3>
                        <p>Claimed</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h1>
                            {GetFloatValue(propsData?.allMined - propsData?.allClaimed)} {Data?.coinName}
                        </h1>
                        <h3>
                            INR {" "}
                            {GetFloatValue((propsData?.allMined - propsData?.allClaimed) * propsData?.liveRate, 4)}
                        </h3>
                        <p>Mined</p>
                    </div>
                    <div>
                        <h1>
                            {parseFloat(propsData?.stake / 720).toFixed(4)} {Data?.coinName}
                        </h1>
                        <h3>INR  {GetFloatValue((propsData?.stake * propsData?.liveRate) / 720, 4)}</h3>
                        <p>Daily Mining</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCaping;
