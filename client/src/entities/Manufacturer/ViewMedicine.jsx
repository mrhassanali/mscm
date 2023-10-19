import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../css/Table.css";
import { Link } from "react-router-dom";
import {getMedicineInventoryData} from "./Interact";
import ModalComp from "../../components/Modal/ModalComp";
import { useSelector } from "react-redux"; // Redux Toolkit

import Web3 from "web3";

export default function ViewMedicine() {
  let navigate = useNavigate();
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsViewMoreModalOpen(true);
  };
  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsUpdateModalOpen(true);
  };

  
  const [medicine, setmedicine] = useState([]);

   // Fetching All User Data
   
  const {walletAddress,name} = useSelector((state) => state.LoginLogout);
   const getMedicineData = async ()=>{

    // let manufacturerAddress = "0xDc926363E0eB4241675601f836e91CEc77145718";
    let data = await getMedicineInventoryData(walletAddress);
    setmedicine(data);
    // console.log(data);    
  }
  useEffect(() => {
    document.title = "View Medicine";
    getMedicineData();
  }, [walletAddress]);


function showMedicine(){
  const{
    medicineID,medicineName,medicineFormula,medicineDescription,quantity,manufacturerData,expiryDate,manufacturer,price
   } = selectedRowData;
 

  let tdStyle = {
    textAlign:"left",
    width:"300px"
  }
  let tdStyle2 = {
    textAlign:"left"
  }
return(
  <div>
    <table style={{fontSize:"2.2rem"}}>
<tbody>
<tr>
  <td style={tdStyle}><b>Medicine id</b></td>
  <td style={tdStyle2}>{medicineID}</td>
</tr>
<tr>
  <td style={tdStyle}><b>Medicine Name</b></td>
  <td style={tdStyle2}>{medicineName}</td>
</tr>
<tr>
  <td style={tdStyle}><b>Medicine Formula</b></td>
  <td style={tdStyle2}>{medicineFormula}</td>
</tr>
<tr>
  <td style={tdStyle}><b>Medicine Quantity</b></td>
  <td style={tdStyle2}>{quantity}</td>
</tr>
<tr>
  <td style={tdStyle}><b>Medicine Description</b></td>
  <td style={tdStyle2}>{medicineDescription}</td>
</tr>
<tr>
  <td style={tdStyle}><b>Medicine Price</b></td>
  <td style={tdStyle2}>{price}</td>
</tr>
<tr>
  <td style={tdStyle}><b>Medicine Manufacturer Date</b></td>
  {/* <td style={tdStyle2}>{(new Date(manufacturerDate)).toLocaleDateString()}</td> */}
  <td style={tdStyle2}>{manufacturerData}</td>
</tr>
<tr>
  <td style={tdStyle}><b>Medicine Expirty Date</b></td>
  {/* <td style={tdStyle2}>{(new Date(expiryDate)).toLocaleDateString()}</td> */}
  <td style={tdStyle2}>{expiryDate}</td>
</tr>
</tbody>
</table>
  </div>
)


setSelectedRowData(null);
setIsUpdateModalOpen(false);

}

const handleSubmit = (e) => {
  e.preventDefault();
  // collect form Data
  const data = new FormData(e.target);
  const dt = {
    medicineName: data.get("Name"),
    medicineFormula: data.get("formula"),
    medicineDesc: data.get("description"),
    quantity: data.get("quantity"),
    manufacturerDate: data.get("manufacturerDate"),
    expiryDate: data.get("expiryDate"),
    medicineID:selectedRowData.medicineID,
    price: data.get("price"),
    manufacturerID:selectedRowData.manufacturerID
  };

  // updateMedicineData(dt);
  // updateData("medicine",dt);

  console.log(dt);
  // Clear the input fields
  // e.target.reset();
  
  
setSelectedRowData(null);
setIsUpdateModalOpen(false);
};


//
const inputEvent = (event) => {
  const { name, value } = event.target;
  setSelectedRowData((preValue) => {
    return {
      // preValue Return the obj that match to name and value
      ...preValue,
      [name]: value,
    };
  });
};


function updateMedicine(){
  const{medicineName,medicineFormula,medicineDescription,quantity,manufacturerData,expiryDate,manufacturer,price,stock} = selectedRowData;

  return(
    <div>
    <form onSubmit={handleSubmit}>
    <div className="column">
      <div className="input-box">
        <label>Medicine Name</label>
        <input
          type="text"
          name="medicineName"
          placeholder="Enter Medicine Name"
          value={medicineName}
          onChange={inputEvent}
          required
        />
      </div>
      <div className="input-box">
        <label>Medicine Formula</label>
        <input
          type="text"
          name="medicineFormula"
          placeholder="Enter Medicine Formula"
          value={medicineFormula}
          onChange={inputEvent}
          required
        />
      </div>
      <div className="input-box">
        <label>Medicine Quantity</label>
        <input
          type="text"
          name="quantity"
          placeholder="Enter Medicine Quantity"
          value={quantity}
          onChange={inputEvent}
          required
        />
      </div>
      </div>
      <div className="input-box">
        <label>Medicine Description</label>
        <input
         type="text"
          name="medicineDescription"
          placeholder="Enter Description Description"
          value={medicineDescription}
          onChange={inputEvent}
          required
        />
      </div>
      <div className="column">
        <div className="input-box">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={inputEvent}
            required
          />
        </div>
        <div className="input-box">
          <label>Manufacturer Data</label>
          <input
            type="date"
            name="manufacturerDate"
            value={manufacturerData}
            // value={selectedRowData.manufacturerDate}
            onChange={inputEvent}
            required
          />
        </div>
        <div className="input-box">
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            placeholder="Enter birth date"
            value={expiryDate}
            onChange={inputEvent}
            required
          />
        </div>
      </div>
      
      <div className="input-box">
            <label>Stock</label>
            <select defaultValue={stock} name="stock" required>
              <option value="DEFAULT" disabled>Select Stock</option>
              <option value="available">Available</option>
              <option value="out-of-stock">out-of-stock</option>
            </select>
          </div>



<div style={{display:"flex",justifyContent:"flex-end",marginBottom:"5px"}}>
  <button type="submit" className="modelBtn primary-model-btn">Submit</button>
</div>
  
    </form>
  </div> 
  )
  navigate("/manufacturer/medicine/view-medicine/");
}
  return (
    <div className="table-container">
      {/* <h1>{props.title}</h1> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine Names</th>
            <th>Formula</th>
            {/* <th>Description</th> */}
            <th>Quantity</th>
            {/* <th>Date</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicine.map((element, index) => {
      const{medicineID,medicineName,medicineFormula,quantity} = element;

            return (
              <tr key={index}>
                <td>{medicineID}</td>
                <td>{medicineName}</td>
                <td>{medicineFormula}</td>
                <td>{quantity}</td>
                <td style={{textAlign:"right",width:"21rem"}}>

<button type="btn" className="btn btn-primary" onClick={() => handleRowClick(element)}>View </button>
<button id="editbtn" type="button"className="btn btn-primary"onClick={() => handleEditClick(element)}>Update</button>
{/* Sending States to the Next Page */}
<Link to={`${medicineID}`} state={element}>
<button type="button" className="btn btn-primary">Transfer </button>
</Link>


                </td>
              </tr>
            );
          })}
        </tbody>
      </table> 

<ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Medicine">
{selectedRowData && (showMedicine())}
</ModalComp>

      {/* Update Modal */}
<ModalComp isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}
title="Update Medicine">
{selectedRowData && (updateMedicine())}
</ModalComp>

      {/* Your table code here */}

      <Outlet/>
    </div>
  );
}
