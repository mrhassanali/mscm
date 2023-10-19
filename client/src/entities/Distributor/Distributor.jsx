import React from "react";
import { Outlet } from "react-router-dom";
import { TextTyping } from "../../components/Components";
import Navbar from "../../components/Navbar/Navbar";

export default function Distributor() {
  const title = "Distributor";
  const item = [
    {
      name: "Home",
      pathname: "/distributor",
      icon:"bi bi-house-check-fill"
    },
    {
      name: "Medicine",
      pathname: "medicine",
      icon:"bi bi-capsule"
    },
    {
      name: "Medicine Inventory",
      pathname: "distributor-medicine-inventory",
      icon:"bi bi-card-checklist"
    },
    {
      name: "Medicine Order",
      pathname: "medicine-order",
      // icon:""
    }
  ];

  return (
    <>
      <Navbar title={title} item={item} />
      {/* <TextTyping /> */}
      <Outlet />
    </>
  );
}
