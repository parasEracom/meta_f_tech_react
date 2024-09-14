import { toast } from "react-toastify";

export const Data = {
  isDebug: true,
  coinName: "OTN",
  // providerLink: "https://data-seed-prebsc-1-s1.binance.org:8545",
  // providerLink: "https://bsc-dataseed1.binance.org/",
  providerLink: "https://polygon-rpc.com/",
  privateKey:
    "71a348e99a6b290dc2e3ce937fe96dbe3b39aeb62624df693d7a35e66f2753c8",
  websiteLink: "https://nxtbot.io/",
  testnetLink: "https://testnet.bscscan.com/address/",
};

export const toastSuccess = (msg) => toast.success(msg);
export const toastFailed = (msg) => toast.error(msg);
