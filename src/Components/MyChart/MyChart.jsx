import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./MyChart.css";
import { Data } from "../../Common/Data";
import GetFloatValue from "../../Common/GetFloatValue";

const MyChart = (props) => {
  // console.log("props", props);
  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);
  const rootColor = rootStyles.getPropertyValue("--colorPrimary");

  const totalIncome = parseFloat(props?.totalIncome ?? 0);
  const totalInvestment = parseFloat(props?.totalInvestment ?? 0);
  const totalEarned = parseFloat(props?.totalEarned ?? 0);
  const growthBonus = parseFloat(props?.growthBonus || 0);

  const [companyData, setCompanyData] = useState([])
  useEffect(() => {
    CompanyInfo();
  }, []);
  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }

  // If both values are zero, provide default small non-zero values to avoid issues
  const data = [
    {
      title: "Total Earned",
      value: totalEarned > 0 ? totalEarned : 0,
      color: "#ef7f1b",
    },
    {
      title: "Total Income",
      value: totalIncome > 0 ? totalIncome : 0,
      color: rootColor,
    },
  ];

  // console.log("data", data);

  return (
    <div className="capping">
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
              fill: "grey",
              fontSize: "8px",
              fontWeight: "bold",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="cappingAbout">
          <div>
            <span style={{ background: rootColor }}></span>
            <p> Total Income</p>
          </div>
          <div>
            <span style={{ background: "#ef7f1b" }}></span>
            <p>Income</p>
          </div>
        </div>
      </div>

      <div className="cappingDetails cappingDetailsDashboard">
        <div>
          <div>
            <h1>{companyData?.currency} {growthBonus.toFixed(2)}</h1>
            <p>Total Income</p>
          </div>
        </div>
        {/* <div>
          <div>
            <h1>INR {totalIncome.toFixed(2)}</h1>
            <p>Total Value of Package</p>
          </div>
        </div> */}
        <div>
          <div>
            <h1>{companyData?.currency} {totalInvestment.toFixed(2)}</h1>
            <p>Total Package</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChart;
