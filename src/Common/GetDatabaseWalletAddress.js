import axios from "axios";
import { ApiPaths } from "../Config";
import { Data } from "./Data";

export default async function GetDatabaseWalletAddress() {
    let userId = localStorage.getItem("userId");
    Data.isDebug && console.log("user id", userId);
    axios({
      method: "post",
      url: ApiPaths.userWalletInfo,
      data: {
        u_id: 18,
      },
      headers: {
         "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        Data.isDebug && console.log("response",response);
        return response?.data?.wallet_address;
      })
      .catch(function (response) {
      });
}