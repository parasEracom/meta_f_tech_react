import React, { useEffect, useState } from 'react'
import { Data } from '../../Common/Data';
import axios from 'axios';
import { ApiPaths } from '../../Config';
import { IoIosNotifications } from 'react-icons/io';
import './NotificationPage.css'
import Loader from '../../Components/Loader/Loader';
import { TbDatabaseOff } from 'react-icons/tb';
import { IoNotificationsOffOutline } from 'react-icons/io5';
const NotificationPage = () => {
    const [notificationData, setNotificationData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        FetchData();
    }, [])

    function FetchData() {
        setLoading(true)
        let userId = localStorage.getItem('userId');
        axios({
            method: "post",
            url: ApiPaths.notification,
            data: {
                u_id: userId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                Data.isDebug && console.log(response);
                setNotificationData(response?.data);
                setLoading(false);
            })
            .catch(function (response) {
                Data.isDebug && console.log(response);
                setLoading(false);
            });
    }
    return (
        <section className="dashboard">
            {
                loading ? <Loader /> : null
            }
            {
                Array.isArray(notificationData?.data) && notificationData?.data.length > 0 ? notificationData?.data?.map((x, i) => {
                    return <div className='notificationDiv'>
                        <i><IoIosNotifications /></i>
                        <div><h5>{x?.title}</h5>
                            <p>{x?.message.replace(/<\/?p>/g, '').replace(/<\/?br>/g, "\n")}</p>
                        </div>

                    </div>
                }) : <center className='noData'><i><IoNotificationsOffOutline /></i><p>Data not found</p></center>
            }
        </section>
    )
}

export default NotificationPage