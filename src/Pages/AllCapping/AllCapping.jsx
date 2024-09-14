import React, { useEffect, useState } from "react";
import "./AllCapping.css";
import AllUserStakes from "../../Common/AllUserStakes";
import DetailedChart from "../../Components/DetailedChart/DetailedChart";
import TimeToDate from "../../Common/TimeToData";
import Loader from "../../Components/Loader/Loader";
import GetAllMined from "../../Common/GetAllMined";
import GetAllClaimed from "../../Common/GetAllClaimed";
import MyChart from "../../Components/MyChart/MyChart";
import AllChart from "../../Components/MyChart/AllChart";
import liveRate from "../../Common/LiveRate";
const AllCapping = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [loading, setLoading] = useState();
  const [allStakingData, setAllStakingData] = useState();

  var x = 0;
  useEffect(() => {
    if (x === 0) {
      FetchData();
      x = 1;
    }
  }, []);

  async function FetchData() {
    setLoading(true);
    let tempArray = [];
    try {
      let stakingData = await AllUserStakes(walletAddress);
      console.log("stakingData", stakingData);

      let allMined = await GetAllMined(walletAddress);
      let allClaimed = await GetAllClaimed(walletAddress);

      let contractLiveRate = await liveRate(walletAddress);

      for (let i = 0; i < stakingData.length; i++) {
        let tempStake = parseFloat(stakingData?.[i]?.stakedToken) / 1e18;
        let tempDays = String(stakingData?.[i]?.duration);
        let tempLastClaim = TimeToDate(
          String(stakingData?.[i]?.lastClaimedTime)
        );
        let tempStartTime = TimeToDate(String(stakingData?.[i]?.startTime));
        let tempEndTime = TimeToDate(String(stakingData?.[i]?.endTime));
        let tempBonus = parseFloat(stakingData?.[i]?.bonus) / 1e18;
        let tempPaid = parseFloat(stakingData?.[i]?.paid) / 1e18;
        let tempAllMined = parseFloat(allMined?.[i]) / 1e18;
        let tempAllClaimed = parseFloat(allClaimed?.[i]) / 1e18;
        let allData = {
          stake: tempStake,
          days: tempDays,
          lastClaim: tempLastClaim,
          bonus: tempBonus,
          startTime: tempStartTime,
          paid: tempPaid,
          purchase: tempStake - tempBonus,
          endTime: tempEndTime,
          allMined: tempAllMined,
          allClaimed: tempAllClaimed,
          liveRate: contractLiveRate
        };
        tempArray.push(allData);
      }
      console.log(tempArray);
      setAllStakingData(tempArray);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Loader />}
      <section className="dashboard">
        {allStakingData?.map((x, i) => {
          return <AllChart data={x} />;
        })}
      </section>
    </>
  );
};

export default AllCapping;
