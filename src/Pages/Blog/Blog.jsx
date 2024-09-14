import React, { useEffect, useState } from 'react'
import "./Blog.css"
import { Col, Row } from 'react-bootstrap'
import MyNewsCard from '../../Components/MyNewsCard'
import axios from 'axios'
import { ApiPaths } from '../../Config'
import Loader from '../../Components/Loader/Loader'
const Blog = () => {

    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState([]);
    useEffect(() => {
        // FetchData();
        // console.log("userId", localStorage.getItem('userId'));
        checkData();
    }, [])

    function checkData() {
        let jsondata = localStorage.getItem("blogData");
        const data = JSON.parse(jsondata);
        // console.log("data111", data?.data)
        if (data) {
            setBlogData(data?.data);
            FetchData();
        } else {
            FetchData(true);
        }

    }

    function FetchData(load) {
        // console.log("load", load)
        if (load) {
            setLoading(true);
        }
        let userId = localStorage.getItem('userId');
        axios({
            method: "post",
            url: ApiPaths.blog,
            data: {
                u_id: userId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                setBlogData(response?.data?.data);
                localStorage.setItem("blogData", JSON.stringify(response?.data));
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
                Blog
            </h1>
            <Row>
                {
                    blogData?.map((x, i) => {
                        return <Col md="4" className='mb'><MyNewsCard date={x.added_on} heading={x.title} img={x.img} description={x.description} /></Col>
                    })
                }
            </Row>

        </section>
    )
}

export default Blog