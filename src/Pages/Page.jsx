import React from "react";
import ABI from "./../Contracts/USDTABI.json";
import ContractDetails from "../Contracts/ContractDetails";
const { Web3 } = require("web3");

// Replace 'YOUR_BSC_NODE_URL' with your BSC node URL
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc.ankr.com/bsc_testnet_chapel")
);

// Replace 'CONTRACT_ADDRESS' with your contract's address
const contractAddress = "0x0B04AC9bdf86De7998af73c2f0124ef532323826";

const contract = new web3.eth.Contract(
  ContractDetails.contractABI,
  ContractDetails.contract
);

// Example usage: Get current block number
const ContractEvents = () => {
  let myData = [];
  const fetchData = async () => {
    try {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      console.log("Current block number:", latestBlockNumber);

      const chunkSize = 2000;
      const blockFromFetch = 37611201;
      const blockToFetch = parseInt(latestBlockNumber);
      let promises = [];

      for (
        let fromBlock = blockFromFetch;
        fromBlock <= blockToFetch;
        fromBlock += chunkSize
      ) {
        const toBlock = Math.min(fromBlock + chunkSize - 1, blockToFetch);
        console.log(
          `Fetching events from block ${fromBlock} to block ${toBlock}`
        );

        // Collect all promises
        promises.push(
          contract.getPastEvents("Staked", {
            fromBlock,
            toBlock,
          })
        );
      }

      // Wait for all promises to resolve
      const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
      const validResults = results.filter(
        (result) => !(result instanceof Error)
      );

      // Flatten the array of events and update state
      const eventData = validResults.flat();
      console.log("All fetched data:", eventData);
      myData = eventData;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button onClick={fetchData}>Click</button>;
      <button onClick={() => console.log(myData)}>My Data</button>;
    </>
  );
};
export default ContractEvents;
