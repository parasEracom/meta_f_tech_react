import { ethers } from "ethers";
import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";
// Example usage
export default async function getBalance(id) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      Data.providerLink
    ); // Replace with your preferred BSC node
    const userAddress = id; // Replace with the address you want to check

    const bnbBal = await provider.getBalance(userAddress);
    const bnbBalance = bnbBal / 1e18;
    Data.isDebug && console.log("BNB Balance:", bnbBalance, "BNB");

    // const usdtBalance = await getTokenBalance(provider, usdtContractAddress, userAddress);
    const contract = new ethers.Contract(
      ContractDetails.BUSD,
      ContractDetails.BUSD_ABI,
      provider
    );
    const balance = await contract.balanceOf(userAddress);
    const bal = (await balance) / 1e18;
    Data.isDebug && console.log("USDT Balance:", bal, "USDT");

    const tokenContract = new ethers.Contract(
      ContractDetails.token,
      ContractDetails.tokenABI,
      provider
    );
    const tokenBalance = await tokenContract.balanceOf(userAddress);
    const tokenBal = (await tokenBalance) / 1e18;
    Data.isDebug && console.log("token Balance:", tokenBal, "token");
    const walletBalance = { bnb: bnbBalance, usdt: bal, token: tokenBal };
    return walletBalance;
  } catch (e) {
    console.log(e);
  }
}
