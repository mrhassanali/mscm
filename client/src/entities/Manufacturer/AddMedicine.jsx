import React, { useEffect } from "react";
import "../../css/Form.css";
import {AddMedicineInventory,getMedicineUsingID} from "./Interact";
import { useSelector } from "react-redux";

export default function AddMedicine(props) {

  const getMedicineData = async ()=>{
    let data = await getMedicineUsingID(11);
    console.log(data)
  }
  useEffect(() => {
    document.title = "View Medicine";
    getMedicineData();
  }, []);

  
  useEffect(() => {
    document.title = props.title;
  }, []);

  const {walletAddress,name} = useSelector((state) => state.LoginLogout);
  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const data = new FormData(e.target);
    const dt = { 
      medicineName: data.get("medicineName"),
      medicineFormula: data.get("medicineFormula"),
      medicineDescription: data.get("medicineDesc"),
      medicineQuantity: Number(data.get("medicineQuantity")),
      manufacturerData: data.get("manufacturerDate"),
      expiryDate: data.get("expiryDate"),
      price: Number(data.get("price")),
      status: data.get("stock"),
      manufacturerAddress:(walletAddress).toLowerCase(),
      manufacturerName:name,
    };


    // const medicineID = await event.arguments[0].medicineID;
    let returnData = async () => {
        let AddMedicineInventoryResponse = await AddMedicineInventory(dt);
        console.log(AddMedicineInventoryResponse);
      }    
    returnData(dt);
    console.log(dt);
  };
  
  

  return (
    <div className="form-container" style={{maxWidth:"110rem"}}>
      <h2>{props.title}</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Medicine Name</label>
          <input
            type="text"
            name="medicineName"
            placeholder="Enter Medicine Name"
            required
          />
        </div>
        <div className="input-box">
          <label>Medicine Formula</label>
          <input
            type="text"
            name="medicineFormula"
            placeholder="Enter Medicine Formula"
            required
          />
        </div>
        <div className="input-box">
          <label>Medicine Description</label>
          <textarea name="medicineDesc" placeholder="Enter Medicine Description"></textarea>
        </div>
        <div className="column">
        <div className="input-box">
          <label>Medicine Quantity</label>
          <input
            type="text"
            name="medicineQuantity"
            placeholder="Enter Medicine Quantity"
            required
          />
        </div>
          <div className="input-box">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter Medicine Price"
              required
            />
          </div>
          <div className="input-box">
            <label>Stock</label>
            <select defaultValue={"DEFAULT"} name="stock" required>
              <option value="DEFAULT" disabled>
                {" "}
                Select Stock{" "}
              </option>
              <option value="available">Available</option>
              <option value="out-of-stock">out-of-stock</option>
            </select>
          </div>
        </div>
        <div className="column">
          <div className="input-box">
            <label>Manufacturer Data</label>
            <input
              type="date"
              name="manufacturerDate"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="input-box">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              placeholder="Enter birth date"
              required
            />
          </div>
        </div>
        <button>Add Medicine</button>
      </form>
    </div>
  );
}
