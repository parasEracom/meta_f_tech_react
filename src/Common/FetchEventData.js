import ContractDetails from "../Contracts/ContractDetails";

const { Web3 } = require("web3");

async function FetchEventData(eventName, userAddress, reffer = false) {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc.ankr.com/bsc_testnet_chapel")
  );

  const contract = new web3.eth.Contract(
    ContractDetails.contractABI,
    ContractDetails.contract
  );
  try {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    // console.log("Current block number:", latestBlockNumber);

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
      //   console.log(
      //     `Fetching events from block ${fromBlock} to block ${toBlock}`
      //   );

      // Collect all promises
      promises.push(
        contract.getPastEvents(eventName, {
          fromBlock,
          toBlock,
        })
      );
    }

    // Wait for all promises to resolve
    const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
    const validResults = results.filter((result) => !(result instanceof Error));

    // Flatten the array of events and update state
    const eventData = validResults.flat();
    console.log("All fetched data:", eventData);
    let eventLenght = eventData.length;
    let userData = [];
    for (let i = 0; i < eventLenght; i++) {
      let checkUser;
      if (reffer) {
        checkUser = eventData[i].returnValues.referrer;
      } else {
        checkUser = eventData[i].returnValues.user;
      }
      if (userAddress == checkUser) {
        let blockNumber = eventData[i].blockNumber;

        try {
          const block = await web3.eth.getBlock(blockNumber);
          const timestamp = Number(block.timestamp);
          const date = new Date(timestamp * 1000);
          const formattedDate = date
            .toISOString()
            .replace("T", " ")
            .substring(0, 19);

          console.log(`Block ${blockNumber} was mined on: ${formattedDate}`);
          userData.push({
            data: eventData[i].returnValues,
            transactionTime: formattedDate,
          });
        } catch (error) {
          console.error(`Error fetching block timestamp: ${error}`);
        }
      }
    }
    return userData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export default FetchEventData;
