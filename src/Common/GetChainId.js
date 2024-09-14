import { ethers } from "ethers";
import { Data } from "./Data";

export default async function GetChainId() {
  try {
    if (window.ethereum) {
      window.provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable(); // Request user permission to access their accounts
    } else {
      Data.isDebug &&
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
    }
    const network = await window.provider.getNetwork();
    const chainId = network.chainId;
    Data.isDebug && console.log("Chain ID:", chainId);
    if (chainId == 137) {
      return true;
    } else {
      alert("please select your network Polygon Mainnet");
      return false;
    }
  } catch (e) {
    return false;
    Data.isDebug && console.log(e);
  }
}
