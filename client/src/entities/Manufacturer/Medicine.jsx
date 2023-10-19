import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes, Route, Outlet } from "react-router-dom";
import {Card} from "../../components/index";
import { useLocation } from "react-router-dom";
import {
  AddMedicine,
  ViewMedicine,
  MedicineOrder,
} from "../index";

import ViewMedicineNextPage from "./ViewMedicineNextPage";
import SearchMedicine from "./SearchMedicine"

import {getAddMedicineCount} from "./Interact";

export default function Medicine() {
  const[cardItem,setCardItem] = useState([]);
  const item = [
    {
      name: "Add Medicine",
      pathname: "add-medicine",
      icon:"bi bi-plus-circle"
    },
    {
      name: "View Medicine",
      pathname: "view-medicine",
      icon:"bi bi-eye-fill"
    },
    {
      name: "View Order",
      pathname: "check-medicine-order",
      icon:"bi bi-bag-check-fill"
    },
    {
      name: "Search Medicine",
      pathname: "search-medicine",
      icon:"bi bi-search"
    }
  ];
  
  useEffect(()=>{
      const getAllMedicineCount = async ()=>{
        let data = await getAddMedicineCount();
        
        setCardItem(
          [
            {
              cardTitle: "Total Medicine",
              cardIcon: "fas fa-users-cog",
              total: data,
            },
            // {
            //   cardTitle: "Revenue",
            //   cardIcon: "fas fa-industry-alt",
            //   total: "$400",
            // }
          ]
        )
      }
      getAllMedicineCount();
  },[]);

  let location = useLocation();

  return ( 
    <div className="sidebar-container">
      <Sidebar item={item} />
      <div className="content">

      {
        location.pathname === "/manufacturer/medicine" && (
          <Card cardItem={cardItem} />
        )
      }

        <Routes>
          <Route path="add-medicine" element={<AddMedicine title={"Add Medicine"} />}/>
          <Route path="search-medicine" element={<SearchMedicine title={"Search Medicine"} />}/>
          <Route path="view-medicine/" element={<ViewMedicine title={"View Medicine"} />}/>
          <Route path="view-medicine/:id" element={<ViewMedicineNextPage title={"View Medicine"} />}/>
          <Route path="check-medicine-order" element={<MedicineOrder title={"View Medicine Order"} />}/>
        </Routes>
      {/* <Outlet /> */}
      </div>
    </div>
  );
}
