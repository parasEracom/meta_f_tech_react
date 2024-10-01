import React, { useEffect, useState } from "react";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import useAxiosHelper from "../../Common/AxiosHelper";
import { toastSuccess, toastFailed } from "../../Common/Data";
import moment from "moment/moment";
import { BasicInfo } from "../../Config/BasicInfo";

const Ranks = () => {
  const [loading, setLoading] = useState(false);
  const [rewardData, setRewardData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [companyData, setCompanyData] = useState();

  const { AxiosGet, AxiosPost } = useAxiosHelper();



  useEffect(() => {
    FetchData();
    CompanyInfo();
  }, []);

  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }


  const FetchData = async () => {
    try {
      setLoading(true);
      const tempRank = await AxiosGet(ApiPaths.getRanks);
      setRewardData(tempRank);
    } catch (error) {
      BasicInfo.isDebug && console.error("Error fetching payment transactions:", error);
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
      BasicInfo.isDebug && console.log("selectedValue?.rankId", selectedValue);
      const body = {
        item: selectedValue,
        rankId: rankId,
      };
      const response = await AxiosPost(ApiPaths.claimReward, body);
      toastSuccess("Reward claimed successfully");
      FetchData();
      BasicInfo.isDebug && console.log("Reward claimed:", response);
    } catch (error) {
      toastFailed("Error claiming reward");
      BasicInfo.isDebug && console.error("Error claiming reward:", error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <section className="dashboard">
        <section className="history">
          <h1 className="textHeading">Ranks</h1>
          <div className="table">
            <table>
              <thead>
                {rewardData &&
                  Array.isArray(rewardData) &&
                  rewardData.length > 0 && (
                    <tr>
                      <th>S.No</th>
                      <th>Rank</th>
                      <th>Total Business ({companyData?.currency_sign})</th>
                      <th>1-3 Level/ Required Business ({companyData?.currency_sign}) </th>
                      <th>4-10 Level/ Required Business ({companyData?.currency_sign})</th>
                      {/* <th>Power Line / Business</th>
                      <th>Weaker Line / Business</th>
                      <th>Rewards</th> */}
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
                      <td>
                        {x?.required_business}
                      </td>
                      <td>{x?.top} / {x?.required_business / 2}
                      </td>
                      <td>{x?.down} / {x?.required_business / 2}
                      </td>

                      {/* <td>
                        {x?.status == "0" ? (
                          "Pending"
                        ) : (
                          <>
                            {x?.rewardClaimStatus === 0 ? (
                              // <button
                              //   className="btnPrimary"
                              //   onClick={() => handleClaimReward(x?.rankId)}
                              // >
                              //   Claim
                              // </button>
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
                      </td> */}
                      <td>
                        {x?.status == "0" ? (
                          "Pending"
                        ) : (
                          <>
                            {x?.rewardClaimStatus === 0 ? (
                              // <button
                              //   className="btnPrimary"
                              //   onClick={() => handleClaimReward(x?.rankId)}
                              // >
                              //   Claim
                              // </button>
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
                          ? moment(x.rewardAchievedDate).format("DD MMM YY")
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

export default Ranks;
