import Retailor from "../../contracts/Retailor.json";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network

let retailorContractAddress = import.meta.env.VITE_RetailorContract_Address;
 
// Place Order for Medicine by the retailor
export const RetailorPlaceOrder = async (data) => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(Retailor.abi, retailorContractAddress); // Create a new contract instance
  
  // let data = [
  //   {
  //     retailorOrderID: 1,
  //     retailorAddress: "0x59d313D31bcBe36a66c32dC1aDe0e2ef59f0062e",
  //     retailorName: "Distributor 1",
  //     retailorLocation: "M.Garh",

  //     distributorAddress:"0x97bF3e18D2D20e3F9E73202f840D79Ab7aae9525",
      

  //     uniqueIdentifier: "zo67NhVW",
  //     medicineDetails: "Hassan Ali",
  //     retailorOrderDateTime: "2023-05-07T09:08:18.760Z",
  //     retailorOrderStatus: "Pending",
  //     OrderAcceptRejectDate:"null",
  //     retailorPurchasetotalPrice: "222",
  //     orderHistory: "orderhistory details"
  //   }
  // ]
  
  const gasEstimate = await contract.methods.placeRetailorOrder(data).estimateGas({ from: accounts[0] });
  const receipt = await contract.methods.placeRetailorOrder(data).send({
    from: accounts[0],
    gas: gasEstimate,
  });
  return(data,receipt.status)
}

// Retailor can update the medicine price that they purchase
export const UpdateMedicinePriceRetailor = async ({uniqueIdentifier,medicineDetails}) => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(Retailor.abi, retailorContractAddress); // Create a new contract instance
  const gasEstimate = await contract.methods.updateMedicinePrice(uniqueIdentifier,medicineDetails).estimateGas({ from: accounts[0] });
  const receipt = await contract.methods.updateMedicinePrice(uniqueIdentifier,medicineDetails).send({
    from: accounts[0],
    gas: gasEstimate,
  });
  return(data,receipt.status)
}

// Distributor can Accept or Reject the Medicine Order that placed by Retailor
export const AcceptRejectOrderDistributor = async ({retailorOrderID,retailorOrderStatus,OrderAcceptRejectDate}) => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(Retailor.abi, retailorContractAddress); // Create a new contract instance
  const gasEstimate = await contract.methods.AcceptRejectOrder(retailorOrderID,retailorOrderStatus,OrderAcceptRejectDate).estimateGas({ from: accounts[0] });
  const receipt = await contract.methods.AcceptRejectOrder(retailorOrderID,retailorOrderStatus,OrderAcceptRejectDate).send({
    from: accounts[0],
    gas: gasEstimate,
  });
  return(receipt,receipt.status)
}

// Getting All Order Details by Retailor Order and Manufacturer Place
export const getAllOrderinRetailor = async () => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(Retailor.abi, retailorContractAddress); // Create a new contract instance
  return await contract.methods.getAllOrder().call().then((result)=>{
    return result;
  })
}

// Getting All Order Details by Retailor Order and Manufacturer Place
export const findMedicineUniqueIdentifier = async ({uniqueIdentifier}) => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(Retailor.abi, retailorContractAddress); // Create a new contract instance
  return await contract.methods.getAllOrder(uniqueIdentifier).call().then((result)=>{
    return result;
  })
}
// Sell Medicine to the Customer
export const sellMedicineToCustomer = async (data) => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(Retailor.abi, retailorContractAddress); // Create a new contract instance
  const gasEstimate = await contract.methods.sellInventoryMedicine(data).estimateGas({ from: accounts[0] });
  const receipt = await contract.methods.sellInventoryMedicine(data).send({
    from: accounts[0],
    gas: gasEstimate,
  });
  return(data,receipt.status)
}
// Getting All Sell Medicine To Customer Array
export const getSellMedicineCustomer = async () => {
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(Retailor.abi, retailorContractAddress); // Create a new contract instance
  return await contract.methods.getAllSellMedicine().call().then((result)=>{
    return result;
  })
}

// Check Medicine Details by customer
export const customerVerifyMedicine = async (uniqueIdentifier)=>{
  const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
  const contract = new web3.eth.Contract(Retailor.abi, retailorContractAddress); // Create a new contract instance
  return await contract.methods.customerFindMedicine(uniqueIdentifier).call().then((result)=>{
    return result;
  })
}