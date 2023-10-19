import React, {useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TextTyping } from "../../components/Components";
import {Navbar,Card} from "../../components/index";


import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Manufacturer() {
 const[Account,setAccount]=useState({metamaskAccount:null,balence:null});

  const location = useLocation();

  const title = "Manufacturer";
  const item = [
    {
      name: "Home",
      pathname: "/manufacturer",
      icon:"bi bi-house-check-fill",
    },
    {
      name: "Medicine",
      pathname: "medicine",
      icon:"bi bi-capsule"
    },
    {
      name: "Raw Material",
      pathname: "raw-material",
      icon:"bi bi-filetype-raw"
    },
  ];

 


   //connection with metamask
   let {connectWallet,walletBalence} = useContext(AppContext);
   const connectWalletPressed = async () => {
     let {balence,metamaskAccount} = await walletBalence();
     setAccount(prevState=>(
       {
         metamaskAccount: metamaskAccount,
         balence:balence
       }
     ));
    //  console.log(metamaskAccount);
   };

   useEffect(()=>{
    connectWalletPressed();

  },[])

  return (
    <>
      <Navbar title={title} item={item} />
      {location.pathname === "/manufacturer" && (
        <>
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
