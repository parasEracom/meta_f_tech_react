import { ethers } from "ethers";
import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";
import GetFloatValue from "./GetFloatValue";

export default async function userClaimed(id) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(Data.providerLink);
    const signer = provider.getSigner(id);
    const contractInstance = new ethers.Contract(
      ContractDetails.contract,
      ContractDetails.contractABI,
      signer
    );

    const userClaimedTemp = await contractInstance.userClaimed(id);
    let userClaimed = GetFloatValue(userClaimedTemp / 1e18, 2);
    Data.isDebug && console.log("userClaimed:", userClaimed);
    return userClaimed;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
