import React, { useState, useEffect } from "react";
import {Outlet, useLocation } from "react-router-dom";
import { TextTyping } from "../../components/Components";
import { Navbar, Card } from "../../components/index";
import {getAllData } from "./Interact";

import { useSelector } from "react-redux";

import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import {getCustomerCountData} from "../Customer/Interact";

const Admin = () => {
 const walletAddress = useSelector((state) => state.LoginLogout.walletAddress);

 const[Account,setAccount]=useState({metamaskAccount:null,balence:null});
 const[cardItem,setCardItem]=useState([]);

  let location = useLocation();

  const title = "Admin";
  const item = [
    {
      name: "Home",
      pathname: "/admin",
      icon:"bi bi-house-check-fill",
    },
    {
      name: "Add Users",
      pathname: "add-users",
      icon:"bi bi-people-fill",
    },
    {
      name: "View Users",
      pathname: "view-users",
      icon:"bi bi-eye-fill",
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
    
  };
  

  useEffect(() => {
    const viewUserData = async ()=>{
      let data = await getAllData();
      
      let admin = await data.filter(item=>item.role === "admin");
      let manufacturer = await data.filter(item=>item.role === "manufacturer");
      let distributor = await data.filter(item=>item.role === "distributor");
      let retailor = await data.filter(item=>item.role === "retailor");

      let customerCount = await getCustomerCountData();
      setCardItem([
        {
          cardTitle: "Admin",
          cardIcon: "fas fa-users-cog",
          total: admin.length,
        },
        {
          cardTitle: "Manufacturer",
          cardIcon: "fas fa-industry-alt",
          total: manufacturer.length,
        },
        {
          cardTitle: "Distributor",
          cardIcon: "fas fa-chart-network",
          total: distributor.length,
        },
        {
          cardTitle: "Retailor",
          cardIcon: "fas fa-store",
          total: retailor.length,
        },
        {
          cardTitle: "Customer",
          cardIcon: "fas fa-users",
          total: customerCount,
        },
      ])
    }
    viewUserData();
    connectWalletPressed();
  }, []);

 
  return (
    <>
      <Navbar title={title} item={item} />
      {location.pathname === "/admin" && (
        <>
        
          {/* <TextTyping /> */}


          <Card cardItem={cardItem} />
        </>
      )}
       <Outlet />
    </>
  );
};

export default Admin;
