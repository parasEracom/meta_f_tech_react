import { ethers } from "ethers";
import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";

export default async function liveRate(id) {
  try {
    // Connect to an Ethereum node using a JSON-RPC provider
    const provider = new ethers.providers.JsonRpcProvider(Data.providerLink);

    // Get a signer from the provider
    const signer = provider.getSigner(ContractDetails.contract);

    // Create the contract instance
    const contractInstance = new ethers.Contract(
      ContractDetails.contract,
      ContractDetails.contractABI,
      signer
    );
    const liveRate = await contractInstance.liveRate();
    const scaler = 100000000;
    console.log("rate is ", liveRate);
    Data.isDebug &&
      console.log("Contract data:", parseFloat(liveRate / scaler));
    return parseFloat(liveRate / scaler).toFixed(4);
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
