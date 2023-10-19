import RawMaterial from "../../contracts/RawMaterial.json";
import RawMaterialOrder from "../../contracts/RawMaterialOrder.json";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network

let provider = null;
// metaMask inject two thing in browser 1- window.web3 , 2- window.ethereum
// provider help me for (window.ethereum) shortcut
let rawMaterialContractAddress = import.meta.env.VITE_Supplier_RawMaterial_Address;
let orderRawMaterialContractAddress = import.meta.env.VITE_Supplier_OrderRawMaterial_Address;
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
//Send Data in the Blockchain 
export const sendTransactions = async(data)=>{
  const{materialName,materialDesc,unitprice,quantity,createdDate,stock} = data;
   let unitOfPrice =  Number(unitprice);
   let availableQuantity = Number(quantity);
 // contractAddress Replace with the address of the deployed AddUser contract
const contract = new web3.eth.Contract(RawMaterial.abi, rawMaterialContractAddress); // Create a new contract instance
    // Estimate the gas cost for the transaction
const gasEstimate = await contract.methods.addMaterial(materialName,materialDesc,unitOfPrice,availableQuantity,createdDate,stock)
.estimateGas({ from: accounts[0] });
    // Call the `addUser` function on the contract
const result = await contract.methods.addMaterial(materialName,materialDesc,unitOfPrice,availableQuantity,createdDate,stock)
.send({
    from: accounts[0],
    gas: gasEstimate,
  });
      return result;
} 
//Getting All Add Materials
export const getAllMaterials = async(supplierAddress)=>{
const contract = new web3.eth.Contract(RawMaterial.abi, rawMaterialContractAddress);
// let data = contract.methods.getAllMaterials().call({from:"0x4316C320ee4dCBBbCA596F37872b13C22d7249d6"}).then((result) => {
  let data = contract.methods.getAllMaterials().call({from:supplierAddress}).then((result) => {
  // console.log('Data:', result);
  return result;
});
return data;
}
// Update Material Data
export const updateMaterialData = async(data)=>{
  const{materialID,materialName,materialDesc,unitprice,quantity,createdDate,stock} = data;
  let MaterialID =  Number(materialID);
  let unitOfPrice =  Number(unitprice);
  let availableQuantity = Number(quantity);

const contract = new web3.eth.Contract(RawMaterial.abi, rawMaterialContractAddress); // Create a new contract instance
const gasEstimate = await contract.methods.updateMaterial(MaterialID,materialName,materialDesc,unitOfPrice,availableQuantity,createdDate,stock)
.estimateGas({ from: accounts[0] });

  // Call the `updateMaterial` function on the contract
const result = await contract.methods.updateMaterial(MaterialID,materialName,materialDesc,unitOfPrice,availableQuantity,createdDate,stock)
.send({
    from: accounts[0],
    gas: gasEstimate,
  });
    return accounts;
}

//Getting All Order View Request Data
export const viewOrderRawRequest = ()=>{
  const contract = new web3.eth.Contract(RawMaterialOrder.abi, orderRawMaterialContractAddress);
  let getAllOrderRawMaterialDetails = contract.methods.getAllOrderRawMaterialDetails().call().then((result)=>{
    return result;
  }); 
   return getAllOrderRawMaterialDetails;
  }

export const updateOrderStatus = async ({ orderID, orderStatus }) => {
// Convert orderID to a number if needed
const id = Number(orderID);
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
// Get a list of accounts on the network
const accounts = await web3.eth.getAccounts();
// Create a new instance of the contract
const contract = new web3.eth.Contract(RawMaterialOrder.abi, orderRawMaterialContractAddress);
// Estimate the gas cost for the transaction
const gasEstimate = await contract.methods.updateOrderStatus(id, orderStatus).estimateGas({ from: accounts[0] });
// Send the transaction to the network
const result = await contract.methods.updateOrderStatus(id, orderStatus).send({
  from: accounts[0],
  gas: gasEstimate,
});

return result;
};