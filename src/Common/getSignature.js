var CryptoJS = require("crypto-js");

const merchantKey = process.env.REACT_APP_MERCHANT_KEY;
const merchantId = process.env.REACT_APP_MERCHANT_ID;
function generateNonce() {
  return Math.random().toString(36).substring(2); // Random string
}

function generateSignature(queryString, merchantKey) {
  const hmac = CryptoJS.HmacSHA256(queryString, merchantKey);
  return CryptoJS.enc.Base64.stringify(hmac);
}

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

export default async function getSignature() {
  const myToken = localStorage.getItem("token");
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = generateNonce();
    const params = {
      "x-api-key": merchantId,
      "X-Timestamp": timestamp,
      "X-Nonce": nonce,
    };

    const sortedParams = sortObject(params);
    const queryString = new URLSearchParams(sortedParams).toString();
    const signature = generateSignature(queryString, merchantKey);
    // console.log("signature",signature)

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-api-key": merchantId,
      "X-Timestamp": timestamp,
      "X-Nonce": nonce,
      "X-Sign": signature,
      authorization: myToken,
    };
    return headers;
  } catch (e) {
    // console.log(e);
  }
}
