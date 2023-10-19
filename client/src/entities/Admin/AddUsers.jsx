import React from "react";
import "../../css/Form.css";
import {sendTransactions } from "./Interact";

export default function AddUsers() {
  let pageTitle = "Add Users";
  document.title = pageTitle; 

  const handleSubmit = (e) => {
    e.preventDefault();
    // collect form Data
    const data = new FormData(e.target);
    const dt = {
      metamaskwallet: (data.get("metamaskwallet")).toLowerCase(),
      name: data.get("name"),
      fatherName: data.get("fatherName"),
      emailAddress: data.get("emailAddress"),
      address: data.get("emailAddress"),
      phoneNumber: data.get("phoneNumber"),
      role: data.get("role"),
      password: data.get("password"),
      city: data.get("city"),
      postalCode: data.get("postalCode"),
      region: data.get("region"),
      accountstatus: data.get("accountstatus")
    };

    let result = sendTransactions(dt);
    // console.log(result);
    // console.log(dt);
    e.target.reset();
  };

  return (
    <div className="form-container" style={{ maxWidth: "115rem" }}>
      {/* <h2>{pageTitle}</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label>MetaMask Wallet Address</label>
          <input
            type="text"
            name="metamaskwallet"
            placeholder="Enter User Meta Mask Wallet Address"
          />
        </div>
        <div className="column">
          <div className="input-box">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter User Name"
              required
            />
          </div>
          <div className="input-box">
            <label>Father Name</label>
            <input
              type="text"
              name="fatherName"
              placeholder="Father Name"
              required
            />
          </div>
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              required
            />
          </div>
        </div>
        <div className="input-box">
          <label>Address</label>
          <input type="text" name="address" placeholder="Enter Address" />
        </div>
        <div className="column">
          <div className="input-box">
            <label>Phone Number</label>
            <input type="number" name="phoneNumber" placeholder="Enter Phone Number" required/>
          </div>
          <div className="input-box">
            <label>Role</label>
            <select defaultValue={"DEFAULT"} name="role" required>
              <option value="DEFAULT" disabled>Select User Role</option>
              <option value="admin">Admin</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="supplier">Supplier</option>
              <option value="distributor">Distributor</option>
              <option value="retailor">Retailor</option>
            </select>
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
            />
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>City</label>
          
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              required
            />
          </div>
          <div className="input-box">
            <label>Postal Code</label>
            <input
              type="number"
              name="postalCode"
              placeholder="Enter Phone Number"
              required
            />
          </div>
          
          <div className="input-box">
            <label>Account Status</label>
            <select defaultValue={"DEFAULT"} name="accountstatus" required>
              <option value="DEFAULT" disabled>
                Select Status
              </option>
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>
        <button>Add User</button>
      </form>
    </div>
  );
}
