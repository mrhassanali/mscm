import React from "react";
import {useLocation, Outlet } from "react-router-dom";
import { TextTyping } from "../../components/Components";
import Navbar from "../../components/Navbar/Navbar";

import { useSelector } from "react-redux";

export default function Retailor() {
  let location = useLocation();
  const title = "Retailor";
  const item = [
    {
      name: "Home",
      pathname: "/retailor",
      icon:"bi bi-house-check-fill"
    },
    {
      name: "Buy Medicine",
      pathname: "buy-medicine",
      icon:"bi bi-capsule"
    },
    {
      name: "View Order Medicine",
      pathname: "view-order-medicine",
      icon:"bi bi-eye-fill"
    },
    {
      name: "Inventory",
      pathname: "retailor-inventory",
      icon:"bi bi-card-checklist"
    }
    
  ];

  const walletAddress = useSelector((state) => state.LoginLogout.walletAddress);
  
  return (
    <>
      <Navbar title={title} item={item} />
     {
       location.pathname == "/retailor" && (
       <>
{/* <TextTyping /> */}
<br></br>
{
  walletAddress?<div style={{marginTop:"2rem auto",fontSize:"1.5rem"}}>
    <h1>Your Meta Mask Wallet Account is : <span style={{color:"green"}}>{walletAddress}</span></h1>
    {/* <h2>Balence : <span style={{color:"green"}}>{Account.balence}</span></h2> */}
  </div>:""  
}
       </>
       )
     }
      <Outlet />
    </>
  );
}
