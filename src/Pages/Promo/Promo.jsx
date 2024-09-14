import React, { useEffect, useState } from 'react'
import "./Promo.css"
import pr3 from "./../../Images/pr3.png"
import pr2 from "./../../Images/pr2.png"
import m1 from "./../../Images/m1.png"
import m2 from "./../../Images/m2.png"
import m3 from "./../../Images/m3.png"
import m4 from "./../../Images/m4.png"
import m5 from "./../../Images/m5.png"
import m6 from "./../../Images/m6.png"
import m7 from "./../../Images/m7.png"
import m8 from "./../../Images/m8.png"
import m9 from "./../../Images/m9.png"
import pdgpagelarge from "./../../Images/pdgpagelarge.jpg"
import PDF from "./../../Images/pdf.pdf"
import { Col, Row } from 'react-bootstrap'
import MyPromoMaterialCard from '../../Components/MyPromoMaterialCard'
const Promo = () => {
    const [dashboardData, setDashboardData] = useState('');

    useEffect(() => {
        let jsondata = localStorage.getItem("dashboardData");
        const data = JSON.parse(jsondata);
        setDashboardData(data);
    }, [])

    return (
        <section className="dashboard">
            <h1 className="textHeadingWithMargin mt-0">
                Presentation
            </h1>
            <section id='PresentationSection'>
                <h5 className="dashboardCardHeading">Presentation</h5>
                <a onClick={() => window.open(dashboardData?.pdf, '_blank')}><img src={pdgpagelarge} alt="pdg.jpg" /></a>
                <div className="presentationPdfCountry">

                </div>
            </section>
            <h1 className="textHeadingWithMargin">Online promo materials</h1>
            <div id="promoBanner">
                <h5 className="dashboardCardHeading">Banners</h5>
                <img src={pr3} alt="" />
                <a href={pr2} download={true}><button style={{ width: '300px', margin: "auto", display: 'block' }} className='btnSecondary'>Download</button></a>
            </div>
            <h1 className="textHeadingWithMargin">Offline promo materials</h1>
            <Row className='mt-3'>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m1} name="Logo files" /></Col>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m2} name="Jacket" /></Col>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m3} name="T-Shirt" /></Col>
            </Row>
            <Row className='mt-3'>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m4} name="Notebook" /></Col>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m5} name="Pen" /></Col>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m6} name="Cap" /></Col>
            </Row>
            <Row className='mt-3'>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m7} name="Cup" /></Col>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m8} name="Rollup" /></Col>
                <Col md="4" className='mb'><MyPromoMaterialCard img={m9} name="Presswall" /></Col>
            </Row>
        </section>
    )
}

export default Promo