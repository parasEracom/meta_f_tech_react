import React from 'react';
import "./InfoPage.css";

const InfoPage = (props) => {
    return (
        <section className='infoSection'>
            <div className='infoDiv'>
                <h1>{props.heading}</h1>
                <div className='infoContent'>
                    {
                        props.data
                    }
                </div>
                <button className="btnPrimary mt-4" style={{ fontWeight: "600" }} onClick={() => props.updateState(false)}>
                    Close
                </button>
            </div>
        </section>
    )
}

export default InfoPage