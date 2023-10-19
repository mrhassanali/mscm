import CustomerContract from "../../contracts/CustomerContract.json";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network

let customerContractAddress = import.meta.env.VITE_CustomerContract_Address;

// Add New Customer 
export const AddNewCustomer = async(data)=>{
   const{walletAddress,customerName,customerFatherName,emailAddress,phoneNumber,homeAddress,password} = data;
   const contract = new web3.eth.Contract(CustomerContract.abi, customerContractAddress);
   const gasEstimate = await contract.methods.addNewCustomer((walletAddress).toLowerCase(),customerName,customerFatherName,emailAddress,Number(phoneNumber),homeAddress,password).estimateGas({ from: accounts[0] });
      return await contract.methods.addNewCustomer((walletAddress).toLowerCase(),customerName,customerFatherName,emailAddress,Number(phoneNumber),homeAddress,password)
      .send({
        from: accounts[0],
        gas: gasEstimate,
      });
}

// Add New Customer 
export const UpdateCustomer = async(data)=>{
    const{walletAddress,customerName,customerFatherName,emailAddress,phoneNumber,homeAddress,password} = data;
    const contract = new web3.eth.Contract(CustomerContract.abi, customerContractAddress);
    const gasEstimate = await contract.methods.updateCustomerData((walletAddress).toLowerCase(),customerName,customerFatherName,emailAddress,Number(phoneNumber),homeAddress,password).estimateGas({ from: accounts[0] });
       return await contract.methods.updateCustomerData((walletAddress).toLowerCase(),customerName,customerFatherName,emailAddress,Number(phoneNumber),homeAddress,password)
       .send({
         from: accounts[0],
         gas: gasEstimate,
       });
 }
// Getting one Customer Data
export const getOneCustomerData = async (walletAddress)=>{
    const contract = new web3.eth.Contract(CustomerContract.abi, customerContractAddress);
     return await contract.methods.getCustomerData(walletAddress).call().then((result)=>{
        return result;
      }); 

 }
// Getting All Customer
export const getAllCustomerData = async()=>{
    const contract = new web3.eth.Contract(CustomerContract.abi, customerContractAddress);
    return await contract.methods.getAllCustomer().call().then((result) => {
      return result;
    });
}

// Getting Customer Count that how much total Customer
export const getCustomerCountData = async()=>{
    const contract = new web3.eth.Contract(CustomerContract.abi, customerContractAddress);
    return await contract.methods.getCustomerCount().call().then((result) => {
      return result;
    });
}

