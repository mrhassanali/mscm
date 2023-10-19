import React, { useEffect, useState } from "react";
import "../css/Form.css";
import "./Navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
import { BackgroundParticles } from "./index";

import {AddNewCustomer} from "../entities/Customer/Interact";

export default function Register() {
  const [register, setregister] = useState({});

  const navigate = useNavigate();

  let pageTitle = "Register";
  useEffect(() => {
    let pageTitle = "Register";
    document.title = pageTitle;
  }, []);

  // set the value on useState on input
  const InputEvent = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setregister((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // Prevent to Reload After Page Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    AddNewCustomer(register);
    console.log(register);
    e.target.reset();
  };

  return (
    <>
      {/* {<BackgroundParticles />} */}
      <div
        className="form-container"
        style={{ maxWidth: "110rem" }}
        onSubmit={handleSubmit}
      >
        <h2 style={{ color: "green" }}>{pageTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="metamask">MetaMask Address</label>
            <input
              type="text"
              placeholder="Enter 42 characters MetaMask wallet e.g 0x14c03422a3C64A7fF74d61525993B8......."
              name="walletAddress"
              value={register.walletAddress || ""}
              onChange={InputEvent}
              required
            />
          </div>
          <div className="column">
            <div className="input-box">
              <label htmlFor="customerName">Name</label>
              <input
                type="text"
                placeholder="Enter the Name"
                name="customerName"
                value={register.customerName || ""}
                onChange={InputEvent}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="fatherName">Father Name</label>
              <input
                type="text"
                placeholder="Enter Father Name"
                name="customerFatherName"
                value={register.customerFatherName || ""}
                onChange={InputEvent}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                type="text"
                placeholder="Enter Email Address"
                name="emailAddress"
                value={register.emailAddress || ""}
                onChange={InputEvent}
                required
              />
            </div>
          <div className="input-box">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={register.phoneNumber || ""}
              onChange={InputEvent}
              required
            />
          </div>
          <div className="column">
            <div className="input-box">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="Enter the Address"
                name="homeAddress"
                value={register.homeAddress || ""}
                onChange={InputEvent}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="password"
                value={register.password || ""}
                onChange={InputEvent}
                required
              />
            </div>
            
          </div>
          </div>
          <button type="submit">Register</button>
        </form>      
        <p style={{fontSize:"2.3rem"}}>if you has Already Account then login :
                <button type='button' className='btn btn-primary' 
                onClick={()=>navigate("/login")}>Login</button>
            </p>
      </div>
    </>
  );
}
