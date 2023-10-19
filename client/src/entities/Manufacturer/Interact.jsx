


import RawMaterial from "../../contracts/RawMaterial.json";
import OrderRawMaterial from "../../contracts/RawMaterialOrder.json";
import MedicineContract from "../../contracts/MedicineContract.json";
// import TestContract from "../../contracts/TestContract.json";

import { customAlphabet } from 'nanoid'

    // Limit the Alphabets
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateUniqueId = customAlphabet(alphabet, 8);

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one


let rawMaterialContractAddress = import.meta.env.VITE_Supplier_RawMaterial_Address;
let orderRawMaterialContractAddress = import.meta.env.VITE_Supplier_OrderRawMaterial_Address;
let medicineContractAddress = import.meta.env.VITE_Manufacturer_MedicineContract_Address;
// let TestContractAddress = import.meta.env.VITE_TestContract_Address;

//===============================Order Raw Material======================
//Getting All Add Materials for order Raw Material
//Send Data in the Blockchain   
export const SendDataOrderRawMaterial = async(data)=>{
const{ManufactuerID,supplierID,ManufactuerName,orderDetails,totalPrice,OrderTime} = data;
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
const contract = new web3.eth.Contract(OrderRawMaterial.abi, orderRawMaterialContractAddress); // Create a new contract instance

    // Estimate the gas cost for the transaction
const gasEstimate = await contract.methods.placeOrderRawMaterial(ManufactuerID,supplierID,ManufactuerName,orderDetails,totalPrice,OrderTime)
.estimateGas({ from: accounts[0] });
return await contract.methods.placeOrderRawMaterial(ManufactuerID,supplierID,ManufactuerName,orderDetails,totalPrice,OrderTime)
 .send({ from: accounts[0], gas: gasEstimate});
} 

//Getting All Order View Request Data
export const viewOrderRawRequest = ()=>{
const contract = new web3.eth.Contract(OrderRawMaterial.abi, orderRawMaterialContractAddress);
let getAllOrderRawMaterialDetails = contract.methods.getAllOrderRawMaterialDetails().call().then((result)=>{
  return result;
});
 return getAllOrderRawMaterialDetails;
}

export const getAllMaterials = async()=>{
const contractAbi = RawMaterial.abi;
const contract = new web3.eth.Contract(contractAbi, rawMaterialContractAddress);
 let data = contract.methods.getAllMaterials().call().then((result) => {
  return result;
});
return data;
}
  

// Add Medicine Details in the Inventory
export const AddMedicineInventory = async (data) => {
  // walletAddress is the login user Address that can be helpful for adding medicine
  const { medicineName, medicineFormula, medicineDescription, medicineQuantity, manufacturerData, expiryDate, price, status,
    manufacturerAddress,manufacturerName } = data;
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress); // Create a new contract instance
  const gasEstimate = await contract.methods.addMedicineInventory(medicineName, medicineFormula, medicineDescription, medicineQuantity, price, manufacturerData, expiryDate, status).estimateGas({ from: accounts[0] });
  const receipt = await contract.methods.addMedicineInventory(medicineName, medicineFormula, medicineDescription, medicineQuantity, price, manufacturerData, expiryDate, status).send({
    from: accounts[0],
    gas: gasEstimate,
  }); 

  const count = await contract.methods.medicineCounter().call().then((id) => {
    const dataArray = []; // Create an empty array
    for (let i = 1; i <= Number(medicineQuantity); i++) {
      const uniqueId = generateUniqueId();
      const medicine = {
        medicineID: id,
        uniqueIdentifier: uniqueId,
        medicineName: medicineName,
        medicineFormula: medicineFormula,
        medicineDescription: medicineDescription,
        price: price,
        manufacturerDate: manufacturerData,
        expiryDate: expiryDate,
        orderDate: "null",
        distributorAddress: "0x0000000000000000000000000000000000000000",
        status: "Not Ordered",
        manufacturerAddress: manufacturerAddress
      };
      // manufacturerAddress: walletAddress
      dataArray.push(medicine);
    }
    AddMedicinewithUniqueNo(dataArray);
     return dataArray;
  });
  return count;
};

// Adding New Medicine in Blockchain
export const AddMedicinewithUniqueNo = async(data) => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress); // Create a new contract instance
  const gasEstimate = await contract.methods.addMedicine(data).estimateGas({ from: accounts[0] });
  const receipt = await contract.methods.addMedicine(data).send({from: accounts[0],gas: gasEstimate});

  return {data,Hash:receipt.transactionHash};
};

//Transfer or Update the Medicine
export const TransferMedicine = async(data) => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress); // Create a new contract instance
  const gasEstimate = await contract.methods.UpdateMedicine(data).estimateGas({ from: accounts[0] });
  const receipt = await contract.methods.UpdateMedicine(data).send({from: accounts[0],gas: gasEstimate});

  // return {data,Hash:receipt.transactionHash};
  return receipt;
}; 
//Delete Medicine Inventory Record
export const deleteMedicine = async(uniqueIdentifier) => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress); // Create a new contract instance
  const gasEstimate = await contract.methods.deleteMedicine(uniqueIdentifier).estimateGas({ from: accounts[0] });
  const receipt = await contract.methods.deleteMedicine(uniqueIdentifier).send({from: accounts[0],gas: gasEstimate});
  // return {data,Hash:receipt.transactionHash};
  return receipt;
}; 

// Getting Distributor Medicince for Inventory
export const getDistributorOrderMedicine = async (distributorAddress)=>{
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress);
  return await contract.methods.getAllDistributorMedicine(distributorAddress).call().then((result) => {;
    return result;
  });
}

// Getting Medicine
export const findMedicineUsingUniqueIdentifier = async (data)=>{
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress);
  return await contract.methods.findMedicine(data).call().then((result) => {;
    return result;
  });
}


// Getting Medicine
export const getMedicineUsingID = async (data)=>{
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress);
  return await contract.methods.getMedicinesByID(data).call().then((result) => {;
    return result;
  });
}



// Get the data of Added Medicine Inventory
export const getMedicineInventoryData = async(manufacturerAddress)=>{
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress); 
  let result = contract.methods.getAllMedicineInventory(manufacturerAddress).call().then((result) => {return result;});
    return result;
};


// Getting Medicine Count How much medicine is Add
export const getAddMedicineCount = async ()=>{
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress);
  return await contract.methods.getMedicineCount().call().then((result) => {;
    return result;
  });
}





// Getting Medicine
export const getAllMedicine = (manufacturerAddress)=>{
  const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress);
  let data = contract.methods.getAllMedicineInventory(manufacturerAddress).call().then((result) => {;
    return result;
  });
  return data;
}

// Update Medicine Data
export const updateMedicineData = async(data)=>{
  const{medicineID,medicineName,medicineFormula,medicineDesc,medicineQuantity,manufacturerDate,expiryDate,price} = data;
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
const contract = new web3.eth.Contract(MedicineContract.abi, medicineContractAddress); // Create a new contract instance
 
      // Estimate the gas cost for the transaction
const gasEstimate = await contract.methods.updateMedicine(medicineID,medicineName,medicineFormula,medicineDesc,medicineQuantity,manufacturerDate,expiryDate,price)
.estimateGas({ from: accounts[0] });

const result = await contract.methods.updateMedicine(medicineID,medicineName,medicineFormula,medicineDesc,medicineQuantity,manufacturerDate,expiryDate,price)
  .send({
    from: accounts[0],
    gas: gasEstimate,
  });
  return result;
}


