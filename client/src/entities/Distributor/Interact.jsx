import Distributor from "../../contracts/Distributor.json";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network

let provider = null; 
// metaMask inject two thing in browser 1- window.web3 , 2- window.ethereum
// provider help me for (window.ethereum) shortcut
// let contractAddress = "0xb8A5fb55e83674D2065429A503853eDA8AAd2d70";
let distributorContractAddress = import.meta.env.VITE_DistributorContract_Address;

export const connectWallet = async () => {
    if (window.ethereum) {
      provider = window.ethereum;
      try {
        // await provider.enable();
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
    return provider;
};

// Place Order
export const placeDistributorOrder = async(data)=>{
const { distributorAddress,distributorLocation,distributorName,manufacturerAddress,manufacturerName,orderDetails,orderDateTime,totalPrice } = data;
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
const contract = new web3.eth.Contract(Distributor.abi, distributorContractAddress); // Create a new contract instance
const gasEstimate = await contract.methods.placeMedicineOrder(distributorAddress,distributorLocation,distributorName,manufacturerAddress,manufacturerName,orderDetails,orderDateTime,totalPrice).estimateGas({ from: accounts[0] });
const receipt = await contract.methods.placeMedicineOrder(distributorAddress,distributorLocation,distributorName,manufacturerAddress,manufacturerName,orderDetails,orderDateTime,totalPrice).send({
    from: accounts[0],
    gas: gasEstimate,
});

return {data,receipt}
// return {data}
}

// Getting Distributor All Order
export const getDistributorAllOrders = async (distributorAddress)=>{
const contract = new web3.eth.Contract(Distributor.abi, distributorContractAddress);
return await contract.methods.getDistributorAllOrder(distributorAddress).call().then((result) => {;
    return result;
});
}

// Getting Manufacturer All Order
export const getManufacturerAllOrders = async (manufacturerAddress)=>{
const contract = new web3.eth.Contract(Distributor.abi, distributorContractAddress);
return await contract.methods.getManufacturerAllOrder(manufacturerAddress).call().then((result) => {;
return result;
});
}


export const AcceptRejectOrder = async(data)=>{
    const{orderID,orderStatus, orderAcceptDateTime}= data;
    const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
    const contract = new web3.eth.Contract(Distributor.abi, distributorContractAddress); // Create a new contract instance
    const gasEstimate = await contract.methods.acceptMedicineOrder(orderID,orderStatus, orderAcceptDateTime).estimateGas({ from: accounts[0] });
    const receipt = await contract.methods.acceptMedicineOrder(orderID,orderStatus, orderAcceptDateTime).send({
        from: accounts[0],
        gas: gasEstimate,
    });

    return {data,receipt}
// return {data}
}
