import React, { useEffect, useState } from 'react'
import "./News.css"
import News2 from "./../../Images/news2.png"
import { Col, Row } from 'react-bootstrap'
import MyNewsCard from '../../Components/MyNewsCard'
import axios from 'axios'
import { ApiPaths } from '../../Config'
import Loader from '../../Components/Loader/Loader'
const News = () => {

    const [loading, setLoading] = useState(false);
    const [newsFetchData, setNewsFetchData] = useState([]);
    useEffect(() => {
        // FetchData();
        // console.log("userId", localStorage.getItem('userId'));
        checkData();
    }, [])

    function checkData() {
        let jsondata = localStorage.getItem("newsData");
        const data = JSON.parse(jsondata);
        // console.log("data111", data)
        if (data) {
            setNewsFetchData(data);
            FetchData();
        } else {
            FetchData();
        }

    }

    function FetchData() {
        setLoading(true);
        let userId = localStorage.getItem('userId');
        axios({
            method: "post",
            url: ApiPaths.news,
            data: {
                u_id: userId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                // console.log("news", response)
                setNewsFetchData(response?.data?.data?.articles);
                localStorage.setItem("newsData", JSON.stringify(response?.data?.data?.articles));
                setLoading(false);
            })
            .catch(function (response) {
                // console.log(response);
                setLoading(false);
            });
    }
    return (
        <section className="dashboard">
            {
                loading ? <Loader /> : null
            }
            <h1 className="textHeadingWithMargin mt-0">
                Market News
            </h1>
            <Row style={{ rowGap: '20px' }}>
                {
                    newsFetchData && newsFetchData?.map((x, i) => {
                        return <Col md="4" className='mb'><MyNewsCard date={x?.added_on} heading={x?.title} img={x?.urlToImage} description={x?.description} /></Col>
                    })
                }
            </Row>

        </section>
    )
}

export default News