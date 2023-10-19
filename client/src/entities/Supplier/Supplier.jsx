import React, { useEffect,useContext,useState  } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TextTyping } from "../../components/Components";
import { Navbar } from "../../components/index";
import { connectWallet} from "./Interact";
import Web3 from "web3";

export default function Supplier() {
  const[web3Api,setWeb3Api] = useState({
    web3: null,
    provider: null,
  });
 const[Account,setAccount]=useState({
  metamaskAccount:null,
  balence:null
 });

   //connection with metamask
   const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWeb3Api({
      web3: new Web3(walletResponse),
      provider: walletResponse,
      // contract: AddUser,
    });
    // Getting connected Account Address
    const accounts = await walletResponse.request({method: "eth_accounts"});
    const address = accounts[0];
    // console.log("Connected account address: ", address);
    // Getting connected Account Balence
    const wei = await new Web3(walletResponse).eth.getBalance(accounts[0]);
    const ether = await new Web3(walletResponse).utils.fromWei(wei,'ether');
    setAccount({metamaskAccount: address,balence:ether});
    // console.log(ether);
  };
 
useEffect(() => {connectWalletPressed();}, []);


  let location = useLocation();
  let title = "Supplier";
  const item = [
    {
      name: "Home",
      pathname: "/supplier",
      icon:"bi bi-house-check-fill"
    },
    {
      name: "Add Material ",
      pathname: "add-material",
      icon:"bi bi-filetype-raw"
    },
    {
      name: "Inventory",
      pathname: "supplier-inventory",
      icon:"bi bi-card-checklist"
    },
    {
      name: "View Order",
      pathname: "view-material-request",
      icon:"bi bi-eye-fill"
    },
  ];



  return (
    <>
    <Navbar title={title} item={item} />
      {location.pathname === "/supplier" && (
        <>
          {/* <TextTyping /> */}
          <div style={{margin:'1.5rem'}}>
{
Account.metamaskAccount?"":<div style={{float:"right"}}>
  <button type="button" className="btn btn-primary" 
  onClick={()=>connectWalletPressed()}>Connect Metamask wallet</button>
</div>
}



{
  Account.metamaskAccount?<div style={{marginTop:"2rem auto",fontSize:"1.5rem"}}>
    <h1>Your Meta Mask Wallet Account is : <span style={{color:"green"}}>{Account.metamaskAccount}</span></h1>
    <h2>Balence : <span style={{color:"green"}}>{Account.balence}</span></h2>
  </div>:""  
}

</div>
        </>
      )}
      <Outlet />
    </>
  );
}
