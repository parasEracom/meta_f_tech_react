import { ethers } from "ethers";
import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";
import GetFloatValue from "./GetFloatValue";

export default async function GetAllClaimed(id) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      Data.providerLink
    );
    const signer = provider.getSigner(id);
    const contractInstance = new ethers.Contract(
      ContractDetails.contract,
      ContractDetails.contractABI,
      signer
    );

    const allClaimed = await contractInstance.getAllClaimed(id);
    Data.isDebug && console.log("allClaimed:", allClaimed);
    return allClaimed;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
