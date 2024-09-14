import ContractDetails from "../Contracts/ContractDetails";
import { Data } from "./Data";
import { ethers } from "ethers";

export default async function ClaimFund(id) {
  try {
    const bscTestnetRpcUrl = Data.providerLink; // BSC Testnet endpoint

    const provider = new ethers.providers.JsonRpcProvider(bscTestnetRpcUrl);

    // Create a wallet instance from the private key and provider
    const wallet = new ethers.Wallet(Data.privateKey, provider);

    // Contract ABI and address
    const contractABI = ContractDetails.contractABI;
    const contractAddress = ContractDetails.contract; // Address of the deployed contract

    // Connect to the deployed contract
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    console.log("contract", contract);
    // Function to interact with the contract

    // Call the contract function with custom gas price and gas limit
    const result = await contract.claimForUser(id, {
      gasPrice: ethers.utils.parseUnits("10", "gwei"), // Example gas price: 10 Gwei
      gasLimit: 2000000, // Example gas limit: 2 million
    });

    console.log("Transaction successful. Result:", result);
    return true;
  } catch (error) {
    console.error("Error calling contract function:", error);
    return false;
  }
}
