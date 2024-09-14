import React from 'react'
import { RxCopy } from "react-icons/rx"
import { HiOutlineDownload } from "react-icons/hi"
import PDF from './../Images/pdf.pdf'
const PromoFlagCard = (props) => {
    return (
        <>
            <div className="promoCountry">
                <div>
                    <img src={props.img} alt="flag.png" />
                    <p>{props.name}</p>
                </div>
                <div>
                    <i><RxCopy /></i>
                    {
                        props.name == "Hindi" ?
                            <i><a href={PDF} download={true} style={{ color: "#9BFC57" }}><HiOutlineDownload /></a></i> :
                            <i><HiOutlineDownload /></i>
                    }
                </div>
            </div>
        </>
    )
}

export default PromoFlagCard