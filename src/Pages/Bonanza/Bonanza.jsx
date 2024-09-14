import React, { useEffect, useState } from "react";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "../../Components/Loader/Loader";
import useAxiosHelper from "../../Common/AxiosHelper";
import { toastSuccess, toastFailed } from "../../Common/Data";

const Bonanza = () => {
  const [loading, setLoading] = useState(false);
  const [bonanzaData, setBonanzaData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const { AxiosGet, AxiosPost } = useAxiosHelper();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      setLoading(true);
      const tempRank = await AxiosGet(ApiPaths.bonanzaData);
      console.log(tempRank?.goals);
      setBonanzaData(tempRank?.goals);
    } catch (error) {
      console.error("Error fetching bonanza data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSelectChange = (rankId, value) => {
  //   setSelectedValues((prevSelectedValues) => ({
  //     ...prevSelectedValues,
  //     [rankId]: value,
  //   }));
  // };

  return (
    <>
      {loading ? <Loader /> : null}
      <section className="dashboard">
        <section className="history">
          <h1 className="textHeading">Rewards</h1>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Bonanza Name</th>
                  <th>Required/Total Business</th>
                  <th>Required/Total DIrects</th>
                  <th>Required/Total Teams</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {bonanzaData && bonanzaData.length > 0 ? (
                  bonanzaData.map((x, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{x?.bonanza_name}</td>
                      <td>
                        {x?.required_business}/{x?.totalBusiness}
                      </td>
                      <td>
                        {x?.required_direct}/{x?.totalDirects}
                      </td>
                      <td>
                        {x?.required_team}/{x?.totalTeam}
                      </td>
                      <td>{x?.status == 0 ? "Pending" : "Achieved"}</td>
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

                      {/* <td>
                        {x?.status == "0" ? (
                          "Pending"
                        ) : (
                          <>
                            {x?.rewardClaimStatus === 0 ? (
                              <button
                                className="btnPrimary"
                                onClick={() => handleClaimReward(x?.rankId)}
                              >
                                Claim
                              </button>
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
                      <td>{x?.startDate}</td>
                      <td>{x?.endDate}</td>
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

export default Bonanza;
