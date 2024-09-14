import { ethers } from "ethers";
import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";

export default async function getContractData(id) {
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

    // Fetch contract data
    const userData = await contractInstance.users(id);
    const userMined = await contractInstance.userMined(id);
    const userClaimed = await contractInstance.userClaimed(id);
    const allUserStakes = await contractInstance.getUserStakes(id);
    const liveRate = await contractInstance.liveRate();
    const totalStaking = await contractInstance.totalStaking();
    const totalUsers = await contractInstance.totalUsers();

    // Assemble the data object
    const data = {
      userData: userData,
      userMined: userMined,
      userClaimed: userClaimed,
      liveRate: liveRate,
      totalStaking: totalStaking,
      totalUsers: totalUsers,
      allUserStakes: allUserStakes,
    };

    Data.isDebug && console.log("Contract data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
