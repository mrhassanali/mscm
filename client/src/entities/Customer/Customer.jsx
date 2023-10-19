import React, { useEffect } from "react";
import { Outlet ,useLocation} from "react-router-dom";
import { TextTyping } from "../../components/Components";
import {Navbar} from "../../components/index";

import {getOneCustomerData} from "./Interact";

import { useSelector } from "react-redux";

export default function Customer(){
  let loction = useLocation();
  let title = "Customer";
  const item = [
    {
      name: "Home",
      pathname: "/customer",
      icon:"bi bi-house-check-fill"
    },
    {
      name: "Verify Medicine",
      pathname: "verify-Medicine",
      icon:"bi bi-check-circle-fill"
    },
    {
      name: "Update",
      pathname: "update-data",
    },
  ];


let {walletAddress} = useSelector((state)=>state.LoginLogout);

  useEffect(()=>{
    getOneCustomerData(walletAddress).then(result=>{
      console.log(result)
    })
  },[]);


  return (
    <>
      <Navbar title={title} item={item} />
      {location.pathname === "/customer" && (
        <>
          <TextTyping />
          {/* <Card cardItem={cardItem} /> */}
        </>
      )}
      <Outlet />
    </>
  );
};

