import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setaccount } from '../Redux/Accounts'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { IoWallet } from "react-icons/io5"
import { providers } from "ethers"
import Change from '../Common/StringToSub'
import { Data, toastFailed } from '../Common/Data'

const ConnectButton = () => {
  const [web3Modal, setWeb3Modal] = useState(null)
  const acc = useSelector((state) => state.account.value)
  const dispatch = useDispatch()

  const checkWalletIsConnected = () => {
    const { ethereum } = window
    if (!ethereum) {
      console.log("Make sure you have MetaMask installed")
      toastFailed("Make sure you have MetaMask installed")
      return
    }
  }

  useEffect(() => {
    checkWalletIsConnected()
  }, [])

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "05f311673625f063cd5c0736f5bb17b0",
        }
      },
    }

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    })

    setWeb3Modal(newWeb3Modal)
  }, [])

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet()
    }
  }, [web3Modal])

  async function connectWallet() {
    try {
      const provider = await web3Modal.connect()
      addListeners(provider)
      const ethersProvider = new providers.Web3Provider(provider)
      const userAddress = await ethersProvider.getSigner().getAddress()
      dispatch(setaccount(userAddress))
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toastFailed("Failed to connect wallet")
    }
  }

  function addListeners(provider) {
    provider.on("accountsChanged", (accounts) => {
      window.location.reload()
    })
    provider.on("chainChanged", () => {
      window.location.reload()
    })
  }

  function linkBlockchain() {
    window.open(Data?.testnetLink + acc)
  }

  return (
    <>
      <p style={{ display: "none" }} id='connectButtonAddressCopy'>{acc}</p>
      {
        acc != null ?
          <span id="connectButtonAddress" onClick={linkBlockchain} style={{ cursor: "pointer" }}><i><IoWallet /></i>{Change(acc)}
          </span> :
          <button onClick={connectWallet} className='btnConnect'>Connect</button>
      }
    </>
  )
}

export default ConnectButton
