import AddUsers from "../../contracts/AddUsers.json";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network

let contractAddress = import.meta.env.VITE_Admin_AddUser_Contract_Address;

// Add New User
export const sendTransactions = async(data)=>{
    const{metamaskwallet,name,fatherName,emailAddress,address,phoneNumber,role,password,city,postalCode,region,accountstatus} = data;
    const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
   // contractAddress Replace with the address of the deployed AddUser contract
    const contract = new web3.eth.Contract(AddUsers.abi, contractAddress); // Create a new contract instance

    // Estimate the gas cost for the transaction
    const gasEstimate = await contract.methods
    .addUser(name,fatherName,emailAddress,phoneNumber,password,role,address,city,postalCode,accountstatus,metamaskwallet)
      .estimateGas({ from: accounts[0] });

    // Call the `addUser` function on the contract
    const result = await contract.methods
    .addUser(name,fatherName,emailAddress,phoneNumber,password,role,address,city,postalCode,accountstatus,metamaskwallet)
      .send({
        from: accounts[0],
        gas: gasEstimate,
      });
      return result;
}
// Get All User Data
export const getAllData = async()=>{
  const contract = new web3.eth.Contract(AddUsers.abi, contractAddress);
  return await contract.methods.getAllUsers().call().then((result) => {
    return result;
  });
}

// Update User Data
export const updateUserData = async(data)=>{
  const{walletAddress,name,fatherName,emailAddress,address,phoneNumber,role,password,city,postalCode,accountStatus} = data;
  // contractAddress Replace with the address of the deployed AddUser contract
  const contract = new web3.eth.Contract(AddUsers.abi, contractAddress); // Create a new contract instance
  // Estimate the gas cost for the transaction
  const gasEstimate = await contract.methods
  .updateUserDetails(name,fatherName,emailAddress,phoneNumber,password,address,city,postalCode,Boolean(accountStatus),role,walletAddress)
  .estimateGas({ from: accounts[0] });


  // Call the `updateUserDetails` function on the contract
  const result = await contract.methods
  .updateUserDetails(name,fatherName,emailAddress,phoneNumber,password,address,city,postalCode,Boolean(accountStatus),role,walletAddress)
    .send({
      from: accounts[0],
      gas: gasEstimate,
    });
    return result;
}
