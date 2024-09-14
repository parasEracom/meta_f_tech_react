import BUSD_ABI from "../Contracts/BUSD_ABI.json";
import contractABI from "../Contracts/contract_ABI.json";
import tokenABI from "../Contracts/Token_ABI.json";

// const arr  = {contract:"0x7928986fe9728c35cD49a0240281f03351Ce5672",contractABI:contractABI,BUSD:"0xe37b70Ef457899F0afdFB71CEd2671CFA84ef770",BUSD_ABI:BUSD_ABI}
///===========testnet============/////////////
// const arr = {
//   contract: "0x834c68786F027bbdA6c2d0F745B02698D8C298E2",
//   contractABI: contractABI,
//   BUSD: "0x325a4deFFd64C92CF627Dd72d118f1b8361c5691",
//   BUSD_ABI: BUSD_ABI,
//   token: "0x7263f0797012aF8C6a0Aa9C79Ed86B8354F4E295",
//   tokenABI: tokenABI,
// };

////////////////mainnet//////////////////
const arr = {
  contract: "0x8daF3F4a80fCBD3e24b26B80A7CCea74d07551c2",
  contractABI: contractABI,
  BUSD: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  BUSD_ABI: BUSD_ABI,
  token: "0x51aeD0Ac7dB5fEeD992a7224a063FBBaB82237c0",
  tokenABI: tokenABI,
};

export const ContractDetails = arr;

// Action creators are generated for each case reducer function

export default ContractDetails;
