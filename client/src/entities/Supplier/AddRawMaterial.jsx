import React,{useContext, useEffect,useState} from 'react' // 01 : import context
import "../../css/Form.css";
import { connectWallet } from './Interact';
import Web3 from 'web3'; 
import { sendTransactions} from "./Interact";
export default function AddRawMaterial() {



  const date = new Date();
const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);
// console.log(formattedDate); // Output: "20-04-2023"



  const handleSubmit = (e) => {
    e.preventDefault();
    // collect form Data
    const data = new FormData(e.target);
    const dt = {
      materialName: data.get("materialname"),
      materialDesc: data.get("description"),
      unitprice: data.get("unitprice"),
      quantity: data.get("quantity"),
      createdDate:formattedDate,
      stock:data.get("stock")
    };
    sendTransactions(dt)
    console.log(dt);
    e.target.reset();
  };

  return (
    <div className="form-container" style={{ maxWidth: "115rem" }}>
      <form onSubmit={handleSubmit}>
      <div className="column">
        <div className="input-box">
          <label>Name</label>
          <input type="text" name="materialname" placeholder="Enter Name"/>
        </div>
        <div className="input-box">
          <label>Unit Price</label>
          <input type="text" name="unitprice" placeholder="Enter price"/>
        </div>
        <div className="input-box">
          <label>Quantity</label>
          <input type="text" name="quantity" placeholder="Enter quantity"/>
        </div>
        </div> 
        <div className="input-box">
          <label>Description</label>
          <input type="text" name="description" placeholder="Enter Description"/>
        </div>
        <div className="input-box">
          <label>Stock</label>
          <select defaultValue={"DEFAULT"} name="stock" required>
              <option value="DEFAULT" disabled>Select Stock</option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out-of-Stock</option>
            </select>

        </div>
        {/* <div className="column"></div> */}
        <button>Add Raw Material</button>
      </form>
    </div>
  )
}
