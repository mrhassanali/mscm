import Web3 from "web3"

let provider = null;

export const connectWallet = async () => {
if (window.ethereum) {
  provider = window.ethereum;
  try { 
    console.log("Ethereum successfully detected!");
    await provider.request({ method: "eth_requestAccounts" });
  } catch {
    console.error("User is not allowed");
  }
} else if (window.web3) {
  provider = window.web3.currentProvider;
} else if (!process.env.production) {
  provider = new Web3.providers.HttpProvider("http://localhost:7545");
}
return provider
};
  