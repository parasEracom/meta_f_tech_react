import { ethers } from "ethers";
import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";
export default async function GetReferralData(id) {
  try {
    // Connect to an Ethereum node using a JSON-RPC provider
    const provider = new ethers.providers.JsonRpcProvider(Data.providerLink);

    // Get a signer from the provider
    const signer = provider.getSigner(id);

    // Create the contract instance
    const contractInstance = new ethers.Contract(
      ContractDetails.contract,
      ContractDetails.contractABI,
      signer
    );

    // Fetch contract data
    const referralData = await contractInstance.getReferrals(id);
    Data.isDebug && console.log("Referral data:", referralData);
    return referralData;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
