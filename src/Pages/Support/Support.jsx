import React, { useEffect, useState } from 'react'
import "./Support.css"
import axios from 'axios';
import { ApiPaths } from '../../Config';
import Loader from '../../Components/Loader/Loader';
import { toastFailed, toastSuccess } from '../../Common/Data';
const Support = () => {
    const [loading, setLoading] = useState(false);
    const [supportType, setSupportType] = useState([]);
    const [supportTableData, setSupportTableData] = useState([]);
    const [selectedSupport, setSelectedSupport] = useState("income");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [messageChat, setMessageChat] = useState("");
    const [messageError, setMessageError] = useState("");
    const [messageChatLoading, setMessageChatLoading] = useState(false);
    const [ticketId, setTicketId] = useState("");
    const [ticketData, setTicketData] = useState([]);
    const [user, setUser] = useState("");
    useEffect(() => {
        // console.log("userId", localStorage.getItem('userId'));
        checkData();
        FetchSupportTable();
    }, [])
    function checkData() {
        let jsondata = localStorage.getItem("supportData");
        const data = JSON.parse(jsondata);
        // console.log("data", data)
        if (data) {
            setSupportType(data);
            FetchData();
        } else {
            FetchData();
        }

    }

    function FetchData() {
        // setLoading(true);
        let userId = localStorage.getItem('userId');
        axios({
            method: "post",
            url: ApiPaths.supportType,
            data: {
                u_id: userId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                // console.log(response.data?.data);
                setSupportType(response?.data?.data);
                localStorage.setItem("supportData", JSON.stringify(response?.data?.data));
                setLoading(false);
            })
            .catch(function (response) {
                // console.log(response);
                setLoading(false);
            });
    }
    function FetchSupportTable() {
        // setLoading(true);
        let userId = localStorage.getItem('userId');
        axios({
            method: "post",
            url: ApiPaths.supportList,
            data: {
                u_id: userId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                // console.log(response);
                setSupportTableData(response?.data?.statements);
                setLoading(false);
            })
            .catch(function (response) {
                // console.log(response);
                setLoading(false);
            });
    }
    function SupportFunc() {
        setLoading(true);
        let userId = localStorage.getItem('userId');
        axios({
            method: "post",
            url: ApiPaths.support,
            data: {
                u_id: userId,
                message: message,
                support_type: selectedSupport
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                // console.log(response);
                if (response?.data?.res == "success") {
                    toastSuccess(response?.data?.message);
                    setMessage('');
                    FetchSupportTable();
                } else {
                    toastFailed(response?.data?.message)
                }
                setLoading(false);
            })
            .catch(function (response) {
                // console.log(response);
                setLoading(false);
            });
    }
    function SupportChatFunc() {
        setMessageChatLoading(true);
        let userId = localStorage.getItem('userId');
        axios({
            method: "post",
            url: ApiPaths.supportChat,
            data: {
                u_id: userId,
                message: messageChat,
                ticket: ticketData?.ticket
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                // console.log(response);
                if (response?.data?.res == "success") {
                    toastSuccess(response?.data?.message);
                    setMessageChat('');
                } else {
                    toastFailed(response?.data?.message)
                }
                setMessageChatLoading(false);
            })
            .catch(function (response) {
                // console.log(response);
                setMessageChatLoading(false);
            });
    }
    function ShowMessagefunc(data) {
        setTicketData(data);
        // console.log("data", data);
        setTicketId(data?.ticket)
        setShowMessage(true)
    }
    function ShowMessagefuncSend(data) {
        // console.log("data", data);
        setTicketId(data?.ticket)
        setShowMessage(true)
    }
    return (
        <>
            {
                loading ? <Loader /> : null
            }
            {
                showMessage ? <div className="otpSection">
                    <div className='otpContainer'>
                        <h1>{ticketId}</h1>
                        <p>Please send your message here regarding this ticket</p>
                        <textarea aria-expanded={false} rows={5} type="text" placeholder='Write your text here' value={messageChat} onChange={(e) => setMessageChat(e.target.value)} />
                        <p className='errorMsg'>{messageError}</p>
                        {
                            messageChatLoading ? <div className='otpLoading'></div> :
                                <div>
                                    <button className="btnSecondary" onClick={() => (setMessageChat(''), setShowMessage(false))}>Cancel</button>
                                    <button className="btnPrimary" onClick={() => SupportChatFunc()}>Submit</button>
                                </div>
                        }
                    </div>
                </div> : null
            }

            <section className="dashboard">
                <h1 className="textHeadingWithMargin mt-0">Support</h1>
                <section className="supportSection">

                    <label htmlFor="">Support Type</label>
                    <select value={selectedSupport} onChange={(e) => setSelectedSupport(e.target.value)} style={{ textTransform: "capitalize" }}>
                        {
                            supportType && supportType?.map((x) => {
                                return <option value={x?.type} style={{ textTransform: "capitalize" }}>{x?.type}</option>
                            })
                        }
                    </select>
                    {/* <input type="text" placeholder='Subject' /> */}
                    <textarea placeholder='Write your query here' className='mt-3' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div>
                        <button onClick={SupportFunc} className='btnPrimary d-block' style={{ width: "auto", padding: '12px 50px', marginLeft: "auto" }}>Submit</button>
                    </div>
                </section>

                <section className="history mt-4">
                    <h1 className="textHeading">History</h1>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Type</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Reply</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    supportTableData && supportTableData?.map((x, i) => {
                                        return <tr>
                                            <td>{x.ticket}</td>
                                            <td style={{ textTransform: "capitalize" }}>{x.type}</td>
                                            <td>{x.message}</td>
                                            {
                                                x.reply_status == "0" ?
                                                    <td>Not Replied</td> :
                                                    <td>Replied</td>
                                            }
                                            <td>{x.reply}</td>
                                            <td className='d-flex gap-2'>
                                                <button className='btnPrimary m-0' style={{ boxShadow: "none", padding: "7px 14px" }} onClick={() => ShowMessagefunc(x)}>Send</button>

                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        {
                            supportTableData?.length == 0 ?
                                <p>No history yet</p> : null
                        }
                    </div>
                    {/* <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                    <button onClick={() => localStorage.setItem('userId', user)} className='btnSecondary m-0' style={{ boxShadow: "none", padding: "7px 14px" }}>View</button> */}
                </section>
            </section>

        </>
    )
}

export default Support