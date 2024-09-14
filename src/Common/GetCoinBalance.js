import { ethers } from "ethers";
import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";
// Example usage
export default async function GetCoinBalance(id) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      Data.providerLink
    ); // Replace with your preferred BSC node
    const userAddress = id; // Replace with the address you want to check

    const tokenContract = new ethers.Contract(
      ContractDetails.token,
      ContractDetails.tokenABI,
      provider
    );
    const tokenBalance = await tokenContract.balanceOf(userAddress);
    const tokenBal = (await tokenBalance) / 1e18;
    
    Data.isDebug && console.log("token Balance:", tokenBal, "token");
    return tokenBal;
  } catch (e) {
    console.log(e);
  }
}
