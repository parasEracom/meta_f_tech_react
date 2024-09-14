import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./DetailedChart.css";
import { Data } from "../../Common/Data";
import GetFloatValue from "../../Common/GetFloatValue";
const DetailedChart = (props) => {
  Data.isDebug && console.log("dat1111a", props);
  const stakingData = props.data;
  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);
  const rootColor = rootStyles.getPropertyValue("--colorPrimary");
  const chartMinedValue = stakingData?.stake - stakingData?.allMined;
  const data = [
    {
      title: "Mined",
      value: parseFloat(stakingData?.allMined ?? 0.00000000001),
      color: rootColor,
    },
    {
      title: "Staking",
      value: parseFloat(chartMinedValue ?? 0.00000000001),
      color: "grey",
    },
  ];
  function addTime(oldTime, day) {
    try {
      let days = parseInt(day);
      let match = oldTime.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}),\s?(\d{1,2}):(\d{2}):(\d{2})\s?(am|pm)$/i);
      if (!match) {
        throw new Error("Invalid date format");
      }

      let [, month, dayOfMonth, year, hours, minutes, seconds, meridiem] = match;
      month = parseInt(month) - 1; // Adjust month index (JavaScript months are zero-based)
      hours = parseInt(hours);
      if (meridiem.toLowerCase() === "pm" && hours < 12) {
        hours += 12;
      }

      let originalDate = new Date(year, month, dayOfMonth, hours, minutes, seconds);
      originalDate.setDate(originalDate.getDate() + days);

      return originalDate.toLocaleString();
    } catch (e) {
      console.log(e);
      return null;
    }
  }


  return (
    <div>
      <div className="StakingDetailsTimeDiv">
        <div>
          <p>Start Time</p>
          <p>{stakingData.startTime}</p>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
          <p>Maturity</p>
          <p>{stakingData.endTime}</p>
        </div>
      </div>
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
                {GetFloatValue(stakingData.stake, 2)} {Data?.coinName}
              </h1>
              <p>Total Staking</p>
            </div>
            <div>
              <h1>
                {GetFloatValue(stakingData.allMined, 2)} {Data?.coinName}
              </h1>
              <p>Total Mined</p>
            </div>
          </div>
          <div>
            <div>
              <h1>
                {GetFloatValue(stakingData.purchase, 2)} {Data?.coinName}
              </h1>
              <p>Purchase</p>
            </div>
            <div>
              <h1>
                {GetFloatValue(stakingData.allClaimed, 2)} {Data?.coinName}
              </h1>
              <p>Claimed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedChart;
