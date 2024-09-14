import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton } from 'react-share';
import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
} from "@coreui/react";
import Facebook from './../Images/facebook.png';
import Twitter from './../Images/twitter.png';
import Whatsapp from './../Images/whatsapp.png';
import Telegram from './../Images/telegram.png';
import { FaShareAlt } from "react-icons/fa";
import { useEffect } from 'react';
const ReferralComponent = ({ link }) => {
    const [visible, setVisible] = useState(false);

    const [referralLink, setReferralLink] = useState('');

    const generateReferralCode = () => {
        const code = Math.random().toString(36).substring(2, 8);
        return `https://example.com/signup?ref=${code}`;
    };

        // let x = 0
        // useEffect(() => {
        //     if (x == 0) {
        //         console.log(link, "Link")
        //         x++
        //     }
        // }, [])

    return (
        <div>
            <div className="d-flex" style={{ columnGap: "15px" }}>
                <>
                    <i onClick={() => setVisible(!visible)}><FaShareAlt /></i>

                    <CModal
                        alignment="center"
                        visible={visible}
                        onClose={() => setVisible(false)}
                        aria-labelledby="VerticallyCenteredExample"
                    >
                        <CModalHeader>
                            <CModalTitle id="VerticallyCenteredExample">
                                Share Referral Code
                            </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div className="SelectWalletDiv refDiv">
                                <FacebookShareButton url={link} quote="">
                                    <img src={Facebook} alt="Facebook" />
                                </FacebookShareButton>

                                <TwitterShareButton url={link} title="">
                                    <img src={Twitter} alt="Twitter" />
                                </TwitterShareButton>

                                <WhatsappShareButton url={link} title="">
                                    <img src={Whatsapp} alt="Whatsapp" />
                                </WhatsappShareButton>

                                <TelegramShareButton url={link} title="">
                                    <img src={Telegram} alt="Telegram" />
                                </TelegramShareButton>

                            </div>
                        </CModalBody>
                    </CModal>
                </>
            </div>


        </div>
    );
};

export default ReferralComponent;
