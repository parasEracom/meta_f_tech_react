export default function ArrayToObject(walletArray) {
  const walletObject = {};
  walletArray.forEach((wallet) => {
    walletObject[wallet.slug] = wallet;
  });
  return walletObject;
}
