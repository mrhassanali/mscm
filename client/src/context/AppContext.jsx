import React,{useState} from 'react'; 
const AppContext = React.createContext(); // CreateContext();

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network


const AppProvider = ({children})=>{

    let[userData,setUserData] = useState({});
    let[accountBalence,setAccountBalence]=useState();

    let name = "Hassan Ali";

    function setUser(data){
        setUserData(data);
    }


let provider = null; 
const connectWallet = async () => {
    if (window.ethereum) {
        provider = window.ethereum;
    try {
            console.log("Ethereum successfully detected!");
            await provider.request({ method: "eth_requestAccounts" });
    }catch {
             console.error("User is not allowed");
        }
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else if (!process.env.production) {
        provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }

    return provider;
};

const walletBalence = async () => {
    const provider = await connectWallet();
    // Getting connected Account Address
    const accounts = await provider.request({method: "eth_accounts"});
    const address = accounts[0]
    // console.log("Connected account address: ", address);
    // Getting connected Account Balence
    const wei =  await new Web3(provider).eth.getBalance(address);
    const ether = await  new Web3(provider).utils.fromWei(wei,'ether');
    return{metamaskAccount:address,balence:ether}
  };

  

    return( 
        <AppContext.Provider value={{setUser,name,connectWallet,walletBalence}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };
