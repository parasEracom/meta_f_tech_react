import React, { useEffect, useState } from "react";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import useAxiosHelper from "../../Common/AxiosHelper";
import { toastSuccess, toastFailed } from "../../Common/Data";
import moment from "moment";

const Reward = () => {
  const [loading, setLoading] = useState(false);
  const [rewardData, setRewardData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const { AxiosGet, AxiosPost } = useAxiosHelper();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      setLoading(true);
      const tempRank = await AxiosGet(ApiPaths.getRanks);
      setRewardData(tempRank);
    } catch (error) {
      console.error("Error fetching payment transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (rankId, value) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [rankId]: value,
    }));
  };

  const handleClaimReward = async (rankId) => {
    const selectedValue = selectedValues[rankId];
    try {
      if (!selectedValue || selectedValue === "Select") {
        toastFailed("No option selected.");
        return;
      }
      console.log("selectedValue?.rankId", selectedValue);
      const body = {
        item: selectedValue,
        rankId: rankId,
      };
      const response = await AxiosPost(ApiPaths.claimReward, body);
      toastSuccess("Reward claimed successfully");
      FetchData();
      console.log("Reward claimed:", response);
    } catch (error) {
      toastFailed("Error claiming reward");
      console.error("Error claiming reward:", error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <section className="dashboard">
        <section className="history">
          <h1 className="textHeading">Royality</h1>
          <div className="table">
            <table>
              <thead>
                {rewardData &&
                  Array.isArray(rewardData) &&
                  rewardData.length > 0 && (
                    <tr>
                      <th>S.No</th>
                      <th>Rank</th>
                      {/* <th>Total Business</th>
                      <th>Power Line / Business</th>
                      <th>Weaker Line / Business</th> */}
                      <th>Royality</th>
                      <th>Status</th>
                      <th>Achieved Date</th>
                      {/* <th>Claim Date</th>
                      <th>Approval Date</th> */}
                    </tr>
                  )}
              </thead>
              <tbody>
                {rewardData &&
                Array.isArray(rewardData) &&
                rewardData.length > 0 ? (
                  rewardData.map((x, i) => (
                    <tr key={x?.rankId}>
                      <td>{i + 1}</td>
                      <td>{x?.rankname}</td>
                      {/* <td>{x?.required_business}</td>
                      <td>
                        {x?.topLegBusiness}/{(x?.required_business * 60) / 100}
                      </td>
                      <td>
                        {x?.otherLegsBusiness}/
                        {(x?.required_business * 40) / 100}
                      </td> */}
                      {/* {x?.status == "0" ? (
                        <td>
                          {" "}
                          {x?.instant_income?.amount}/
                          {x?.instant_income?.reward_item}
                        </td>
                      ) : (
                        <>
                          {x?.rewardClaimStatus == 1 ? (
                            <td>
                              {x?.selected_item == "amount"
                                ? x?.instant_income?.amount
                                : x?.instant_income?.reward_item}
                            </td>
                          ) : (
                            <td>
                              {x?.instant_income?.status === 1 ? (
                                <select
                                  defaultValue="Select"
                                  style={{ borderRadius: "5px", width: "100%" }}
                                  onChange={(e) =>
                                    handleSelectChange(
                                      x?.rankId,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="Select" disabled>
                                    Select
                                  </option>
                                  <option value="amount">
                                    {x?.instant_income?.amount}
                                  </option>
                                  <option value="reward_item">
                                    {x?.instant_income?.reward_item}
                                  </option>
                                </select>
                              ) : null}
                            </td>
                          )}
                        </>
                      )} */}
                             <td>{x?.royalty_income?.amount}</td>


                      <td>
                        {x?.status == "0" ? (
                          "Pending"
                        ) : (
                          <>
                            {x?.rewardClaimStatus === 0 ? (
                             "Achived"
                            ) : (
                              <>
                                {x?.paid === 0 ? (
                                  <div
                                    style={{ color: "yellow", border: "none" }}
                                  >
                                    Claim Requested
                                  </div>
                                ) : x?.paid === 2 ? (
                                  <div style={{ color: "red", border: "none" }}>
                                    Rejected
                                  </div>
                                ) : (
                                  <div
                                    style={{ color: "green", border: "none" }}
                                  >
                                    Achieved
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </td>
                      {/* <td>{x?.rewardAchievedDate}</td> */}
                      <td>
                        {x?.rewardAchievedDate && x.rewardAchievedDate !== '-'
                          ? moment(x.rewardAchievedDate).format("DD-MM-YYYY")
                          : '-'}
                      </td>
                      {/* <td>{x?.rewardClaimDate}</td>
                      <td>{x?.rewardApprovalDate}</td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No history yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  );
};

export default Reward;
