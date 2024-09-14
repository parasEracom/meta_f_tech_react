import React, { useEffect, useState } from 'react'
import './GameDevelopmentBonus.css'
import { ApiPaths } from '../../Config';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader';
const GameDevelopmentBonus = () => {

    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState([]);
    const [myRank, setMyRank] = useState();
    const [incomeInfo, setIncomeInfo] = useState(false);
    const [incomeHeading, setIncomeHeading] = useState(false);
    const [infoData, setInfoData] = useState();
    const [incomeData, setIncomeData] = useState(false);
    useEffect(() => {
        // console.log("userId", localStorage.getItem('userId'));
        FetchData();
    }, []);

    function FetchData() {
        setLoading(true);
        let userId = localStorage.getItem('userId');
        axios({
            method: "post",
            url: ApiPaths.developmentBonus,
            data: {
                u_id: userId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                setDashboardData(response?.data?.data);
                setLoading(false);
            })
            .catch(function (response) {
                setLoading(false);
            });
    }
    return (
        <section className="dashboard">
            {
                loading ? <Loader /> : null
            }
            <h5 id="developmentBonusHeading">Gambit Development Bonus</h5>
            <section>
                <div className="table">
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Direct</th>
                                <th>Income Monthly(INR )</th>
                                <th>Condition</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dashboardData && dashboardData?.map((x, i) => {
                                    return <tr>
                                        <td>{x.gambit_rank}</td>
                                        <td>{x.gambit_direct}</td>
                                        <td>{x.gambit_income}</td>
                                        <td>{x.gambit_reward}</td>
                                        <td>{x.status}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
    )
}

export default GameDevelopmentBonus