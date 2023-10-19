import React from 'react'
import { Sidebar } from '../../components';
import { Routes, Route, Outlet } from "react-router-dom";

import {RequestMedicine,ViewResponse} from "../index";

export default function DistributorMedicine() {

    const item = [
        {
          name: "Order Medicine",
          pathname: "order-medicine",
          icon:"bi bi-plus-circle"
        },
        {
          name: "Check Order",
          pathname: "view-response",
          icon:"bi bi-eye-fill"
        }
      ];
 
  return (
    <>
    <div className="sidebar-container">
      <Sidebar item={item} />
      <div className="content">

      {/* {
        location.pathname === "/manufacturer/medicine" && (
          <Card cardItem={cardItem} />
        )
      } */}

        <Routes>
          <Route path="order-medicine" element={<RequestMedicine title={"Order Medicine"} />}/>
          <Route path="view-response" element={<ViewResponse title={"View Response"} />}/>
          </Routes>
      <Outlet />
      </div>
    </div>
    </>
  )
}
