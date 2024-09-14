import React, { useEffect, useState } from 'react';
import './WalletTransfer.css';
import { ethers } from "ethers";
import Loader from '../../Components/Loader/Loader';
import ContractDetails from '../../Contracts/ContractDetails';
import getAddress from '../../Common/GetAddress';
import { Data, toastFailed, toastSuccess } from '../../Common/Data';
import GetChainId from '../../Common/GetChainId';
import GetUSDTBalance from '../../Common/GetUsdtBalance';
import GetUserData from '../../Common/GetUserData';
import GetFloatValue from '../../Common/GetFloatValue';
import { ApiPaths } from '../../Config';
import axios from 'axios';
const WalletTransfer = () => {

    const [amount, setAmount] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [receiverAddressError, setReceiverAddressError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [loading, setLoading] = useState(false);
    const [addressExist, setAddressExist] = useState(0);
    const [sponsorLoading, setSponsorLoading] = useState(false);
    const walletAddress = localStorage.getItem('walletAddress');
    const [addressLoading, setAddressLoading] = useState(false);
    const [repurchaseWallet, setRepurchaseWallet] = useState(0);
    const [userWalletAddress, setUserWalletAddress] = useState('');
    const { BigInt } = window;
    useEffect(() => {
        FetchData();
    }, []);

    async function FetchData() {
        try {
            const userData = await GetUserData(walletAddress);
            const repurchase = await GetFloatValue(userData?.repurchaseWallet / 1e18);
            setRepurchaseWallet(repurchase);
            setAmount('');
            setReceiverAddress('');
            setAddressExist(0)
        } catch (e) {
            console.log(e)
        }
    }
    async function checkExist(address) {
        setAddressLoading(true);
        try {
            const userData = await FetchUserData(address);
            console.log("userData", userData)
            if (userData) {
                setAddressExist(1)
            } else {
                setAddressExist(2)
            }
            setAddressLoading(false);
        } catch (e) {
            console.log(e)
            setAddressLoading(false);
        }
    }

    async function checkValidation() {
        if (amount > 0 && receiverAddress) {
            let chain = GetChainId();
            if (chain) {
                let walletAdd = await getAddress();
                if (walletAddress == walletAdd) {
                    WalletTransfer();
                } else {
                    toastFailed('Please connet your wallet')
                }
            }
        } else {
            toastFailed('Invalid Data')
        }
    }

    async function WalletTransfer() {
        try {
            console.log("addressExist", userWalletAddress)
            if (addressExist == 1) {
                setLoading(true)
                let newAmount = BigInt(amount * 1e18);
                const { ethereum } = window;
                console.log("newAmount", newAmount)
                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const contractInstance = new ethers.Contract(
                        ContractDetails.contract,
                        ContractDetails.contractABI,
                        signer
                    );
                    let inc = await contractInstance.transferRepurchaseWalletBalance(
                        userWalletAddress,
                        newAmount,
                    );
                    await inc.wait();
                    console.log(inc.hash)
                    toastSuccess("Transaction Successful");
                    FetchData();
                    setLoading(false);

                    // console.log("Tr Hash : " + inc.hash);
                }
            } else {
                toastFailed('Please check username');
            }

        } catch (error) {
            Data.isDebug && console.log("error12", error);
            alert("something went wrong");
            setLoading(false);

        }
    }
    async function FetchUserData(recAdd) {
        try {
            setAddressLoading(true);
            const response = await axios({
                method: "post",
                url: ApiPaths.userWalletInfoByUsername,
                data: {
                    username: recAdd,
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            Data.isDebug && console.log("response", response);

            if (response?.data?.res === "success") {
                setUserWalletAddress(response?.data?.wallet_address);
                setAddressLoading(false);
                return true;
            } else {
                setUserWalletAddress(response?.data?.message);
                setLoading(false);
                setAddressLoading(false);
                return false;
            }
        } catch (error) {
            console.log("error", error);
            setAddressLoading(false);
            return false;
        }
    }


    const handleInputChange = (e) => {
        setAddressExist(0);
        const value = e.target.value;
        setReceiverAddress(value);
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(
            setTimeout(() => {
                if (value.length > 0) {
                    checkExist(value);
                } else {
                    // setCheckSponsorExist([])
                }
            }, 500)
        );
    };
    return (
        <section className="dashboard">
            {
                loading ? <Loader /> : null
            }

            <div className="addfundDiv inputPrimary">
                <h1> Wallet Transfer</h1>
                <div className='addfundDivFundWallet'>
                    <p>Repurchase Wallet</p>
                    <p>{repurchaseWallet}</p>
                </div>
                <label htmlFor="Amount">Receiver Username</label>
                {
                    addressExist == 0 ? null :
                        addressExist == 1 ?
                            <p id="sponsorVerified">{userWalletAddress}</p>
                            :
                            <p id="sponsorVerified" style={{ color: "red" }}>{userWalletAddress}</p>
                }
                <div className="loginInput_inner">
                    <input style={{ borderRadius: "5px", padding: "10px !important" }} min={1} required type="text" placeholder='Receiver Username' value={receiverAddress} onChange={(e) => handleInputChange(e)} />
                    {
                        addressLoading ?
                            <i id="sponsorLoading">
                            </i>
                            : null
                    }
                </div>
                <p className='errorMsg'>{receiverAddressError}</p>
                <label htmlFor="Amount">Amount</label>
                <input min={1} required type="number" placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                <p className='errorMsg'>{amountError}</p>
                <button className="btnPrimary mt-3" onClick={() => checkValidation()}>Transfer</button>
            </div>
        </section>
    )
}

export default WalletTransfer