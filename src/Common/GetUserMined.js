import { ethers } from "ethers";
import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";
import GetFloatValue from "./GetFloatValue";

export default async function GetUserMined(id) {
  try {
    // Connect to an Ethereum node using a JSON-RPC provider
    const provider = new ethers.providers.JsonRpcProvider(
      Data.providerLink
    );

    // Get a signer from the provider
    const signer = provider.getSigner(id);

    // Create the contract instance
    const contractInstance = new ethers.Contract(
      ContractDetails.contract,
      ContractDetails.contractABI,
      signer
    );

    const userMinedTemp = await contractInstance.userMined(id);

    const userMined =  GetFloatValue(userMinedTemp / 1e18, 2);

    Data.isDebug && console.log("Contract data userMined:", userMined);

    return userMined;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
