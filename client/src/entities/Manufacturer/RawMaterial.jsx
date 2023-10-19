import React, { useEffect,useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes, Route,useLocation  } from "react-router-dom";
import {OrderRawMaterial,OrderRawMaterialStatus} from "../../entities/index";

import AddUsers from "../../contracts/AddUsers.json";
import Web3 from "web3";

export default function RawMaterial() {
const[selectSupplier,setselectSupplier]=useState(null);
const[selectUser,setselectUser]=useState("");

let location = useLocation();
// console.log(location);

const getSupplierList = async () => {
  const addUserContractAddress = import.meta.env.VITE_Admin_AddUser_Contract_Address;
  const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
  const contract = new web3.eth.Contract(AddUsers.abi, addUserContractAddress);

  let data = await contract.methods.getSuppliers().call().then((result) => {
    // console.log(result)
    setselectSupplier(result);
    return result;
  });
  
  // console.log(data);
  return data;
};

  useEffect(()=>{
    getSupplierList();
  },[])


  let item = [
    {
      name : "check order",
      pathname : "check-order"
    }
  ]

 

  return (
    <div className="sidebar-container">
      <Sidebar item = {item}/>
      <div className="content">
        <Routes>
           <Route path="check-order" element={<OrderRawMaterialStatus />} />        
        </Routes>

        {
          location.pathname == "/manufacturer/raw-material" && (
          <> 
          <div className="table-container">
  <div>
  <label><b>Select Supplier : </b></label>
  <select name="role" defaultValue={"DEFAULT"} onChange={(e) => setselectUser(e.target.value)} required>
    <option value="DEFAULT" disabled>Select User Role</option>
    {
      selectSupplier?selectSupplier.map((element,index)=>{
        return(<option value={element.walletAddress} key={index}>{element.name} - {element.walletAddress}</option>)
      }):<option value={"no"} key={"0"}>Not Supplier Available & contact company</option>
    }
  </select>
  </div>
        <br></br>
        <br></br>
        
       <OrderRawMaterial supplierAddress = {selectUser}/>
      </div>
          </>
          )
        }

      </div>
    </div>
  );
}
