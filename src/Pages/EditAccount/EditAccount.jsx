import React, { useEffect, useState } from 'react';
import './EditAccount.css';
import { ApiPaths } from '../../Config';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader';
import { toastFailed, toastSuccess } from '../../Common/Data';
const EditAccount = () => {
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const [accountType, setAccountType] = useState('1');
    const [accountTypeError, setAccountTypeError] = useState('');
    const [loading, setLoading] = useState(false);
    function resetError() {
        setAddressError('');
        setAccountTypeError('');
    }
    function setAccountFunc() {
        // console.log('paymentType', address);
        resetError();
        if (address.length == 0) {
            setAddressError('Address cannot be empty');
        }
        if (accountType == "1") {
            setAccountTypeError('Please select account type');
        }

        if (address.length > 0 && accountType !== "1") {
            setLoading(true);
            let token = localStorage.getItem('token');
            axios({
                method: "post",
                url: ApiPaths.setAccount,
                data: {
                    account: address,
                    account_type: accountType
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token
                },
            })
                .then(function (response) {
                    // console.log(response);
                    if (response?.data?.res == "success") {
                        setAddress('');

                        toastSuccess(response?.data?.message);
                    } else {
                        toastFailed(response?.data?.message);
                    }
                    setLoading(false);
                })
                .catch(function (response) {
                    toastFailed('Something went wrong')
                    setLoading(false);
                });
        }
    }
    return (
        <section className="dashboard">
            {
                loading ? <Loader /> : null
            }

            <div className="addfundDiv inputPrimary">
                <h1>Edit Account</h1>
                <label htmlFor="Method">Account Type</label>
                <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option value="1">Select Acount Type</option>
                    <option value="TRC20">TRC20 USDT ADDRESS</option>
                    <option value="BEP20">BEP20 USDT ADDRESS</option>
                </select>
                <p className='errorMsg'>{accountTypeError}</p>
                <label htmlFor="address">Address</label>
                <input min={1} required type="number" name="" id="" placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                <p className='errorMsg'>{addressError}</p>
                <button className="btnPrimary mt-3" onClick={setAccountFunc}>Add Fund</button>
            </div>
        </section>
    )
}

export default EditAccount