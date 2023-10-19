import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { searchData } from "../../utils/FetchApi";
import { ModalCode } from "../../utils/CustomeScripts";
import { updateData, receivedData } from "../../utils/FetchApi";
 
export default function UpdateUserData() {
  const [formData, setFormData] = useState({
    id:"",
    name:"",
    fatherName:"",
    emailAddress:"",
    address:"",
    phoneNumber:"",
    role:"",
    password:"",
    city:"",
    postalCode:"",
    region:"",
    accountStatus:"",
    accountUpdatedDate:"",
    accountCreatedDate:""
  });

  let location = useLocation();
  let navigate = useNavigate();
  let data = location.state;
  // console.log(data);

  useEffect(() => {
    if(data.role === "admin"){
      setFormData({
        id:data.adminID,
        name:data.adminName,
        fatherName:data.fatherName,
        emailAddress:data.emailAddress,
        address:data.address,
        phoneNumber:data.phonenumber,
        role:data.role,
        password:data.password,
        city:data.city,
        postalCode:data.postalcode,
        region:data.region, 
        accountStatus:data.accountStatus,
        accountUpdatedDate:data.accountUpdatedDate,
        accountCreatedDate:data.accountCreatedDate
      });
    }else if(data.role === "manufacturer"){
      setFormData({
        id:data.manufacturerID,
        name:data.manufacturerName,
        fatherName:data.fatherName,
        emailAddress:data.emailAddress,
        address:data.address,
        phoneNumber:data.phonenumber,
        role:data.role,
        password:data.password,
        city:data.city,
        postalCode:data.postalcode,
        region:data.region,
        accountStatus:data.accountStatus,
        accountUpdatedDate:data.accountUpdatedDate,
        accountCreatedDate:data.accountCreatedDate
      });
    }else if(data.role === "distributor"){
      setFormData({
        id:data.distributorID,
        name:data.distributorName,
        fatherName:data.fatherName,
        emailAddress:data.emailAddress,
        address:data.address,
        phoneNumber:data.phonenumber,
        role:data.role,
        password:data.password,
        city:data.city,
        postalCode:data.postalcode,
        region:data.region,
        accountStatus:data.accountStatus,
        accountUpdatedDate:data.accountUpdatedDate,
        accountCreatedDate:data.accountCreatedDate
      });
    }else if(data.role === "supplier"){
      setFormData({
        id:data.supplierID,
        name:data.supplierName,
        fatherName:data.fatherName,
        emailAddress:data.emailAddress,
        address:data.address,
        phoneNumber:data.phonenumber,
        role:data.role,
        password:data.password,
        city:data.city,
        postalCode:data.postalcode,
        region:data.region,
        accountStatus:data.accountStatus,
        accountUpdatedDate:data.accountUpdatedDate,
        accountCreatedDate:data.accountCreatedDate
      });
    }else if(data.role === "retailor"){
      setFormData({
        id:data.retailorID,
        name:data.retailorName,
        fatherName:data.fatherName,
        emailAddress:data.emailAddress,
        address:data.address,
        phoneNumber:data.phonenumber,
        role:data.role,
        password:data.password,
        city:data.city,
        postalCode:data.postalcode,
        region:data.region,
        accountStatus:data.accountStatus,
        accountUpdatedDate:data.accountUpdatedDate,
        accountCreatedDate:data.accountCreatedDate
      });
    }else{
    }
    
    ModalCode();
  }, []);

  const styleTable = {
    textAlign: "left",
    margin: "0 1rem",
    fontSize: "2rem",
  };

  // input Event
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setFormData((preValue) => {
      return {
        // preValue Return the obj that match to name and value
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        // Check the role value and run the appropriate API call
        if (formData.role === "admin") {
          updateData("admin",formData);
        } else if (formData.role === "manufacturer") {
          updateData("manufacturer",formData);
        } else if (formData.role === "supplier") {
          updateData("supplier",formData);
        } else if (formData.role === "distributor") {
          updateData("distributor",formData);
        } else if (formData.role === "retailor") {
          updateData("retailor",formData);
        } else {
          // Run API call for other roles here
        }

    // Clear the input fields
    // e.target.reset();
    navigate("/admin/view-users/");
  };

  return (
    <div className="container">
      <table style={{ borderRadius: "2rem" }}>
        <tbody>
          <tr>
            <td style={styleTable}>ID</td>
            <td>{formData.id}</td>
          </tr>
          <tr>
            <td style={styleTable}>Name</td>
            <td>{formData.name}</td>
          </tr>
          <tr>
            <td style={styleTable}>Father Name</td>
            <td>{formData.fatherName}</td>
          </tr>
          <tr>
            <td style={styleTable}>Email Address</td>
            <td>{formData.emailAddress}</td>
          </tr>
          <tr>
            <td style={styleTable}>Phone Number</td>
            <td>{formData.phoneNumber}</td>
          </tr>
          <tr>
            <td style={styleTable}>Password</td>
            <td>{formData.password}</td>
          </tr>
          <tr>
            <td style={styleTable}>Role</td>
            <td>{formData.role}</td>
          </tr>
          <tr>
            <td style={styleTable}>Address</td>
            <td>{formData.address}</td>
          </tr>
          <tr>
            <td style={styleTable}>City</td>
            <td>{formData.city}</td>
          </tr>
          <tr>
            <td style={styleTable}>Region</td>
            <td>{formData.region}</td>
          </tr>
          <tr>
            <td style={styleTable}>Postal Code</td>
            <td>{formData.postalCode}</td>
          </tr>
          <tr>
            <td style={styleTable}>Account Status</td>
            <td>{formData.accountStatus}</td>
          </tr>
          <tr>
            <td style={styleTable}>Account Created Date</td>
            <td>{formData.accountCreatedDate}</td>
          </tr>
          <tr>
            <td style={styleTable}>Account updated</td>
            <td>{formData.accountUpdatedDate}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button
                style={{ float: "right" }}
                id="myBtn"
                type="button"
                className="btn btn-primary">
                Edit Record
              </button>
              <button
                style={{ float: "right" }}
                onClick={() => navigate("/admin/view-users/")}
                type="button"
                className="btn btn-secondary">
                Back
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Model Box */}
      <div id="myModal" className="modal">
        <div className="modal-content">
          {/* <div className="modal-header">
            <h1 className="modal-title">Modal title</h1>
          </div> */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label>MetaMask Wallet Address</label>
                <input
                  type="text"
                  name="id"
                  placeholder="Enter User Meta Mask Wallet Address"
                  value={formData.id}
                  onChange={inputEvent}
                />
              </div>
              <div className="column">
                <div className="input-box">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter User Name"
                    value={formData.name}
                    onChange={inputEvent}
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Father Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    placeholder="Father Name"
                    value={formData.fatherName}
                    onChange={inputEvent}
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    placeholder="Email Address"
                    value={formData.emailAddress}
                    onChange={inputEvent}
                    required
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Address</label>
                <input type="text" name="address" placeholder="Enter Address" 
                  value={formData.address}
                  onChange={inputEvent}/>
              </div>
              <div className="column">
                <div className="input-box">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    value={Number(formData.phoneNumber)}
                    onChange={inputEvent}
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Role</label>
                  {/* <select defaultValue={"DEFAULT"} name="role" required> */}
                  <select name="role" 
                  value={formData.role}
                  onChange={inputEvent} 
                  required>
                    <option value="DEFAULT" disabled>
                      {" "}
                      Select User Role{" "}
                    </option>
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
                    value={formData.password}
                    onChange={inputEvent}
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
                    value={formData.city}
                    onChange={inputEvent}
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Postal Code</label>
                  <input
                    type="number"
                    name="postalCode"
                    placeholder="Enter Postal Code"
                    value={Number(formData.postalCode)}
                    onChange={inputEvent}
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Region</label>
                  <input type="text" name="region" 
                    value={formData.region}
                    onChange={inputEvent}
                    />
                </div>
              </div>

              <div className="input-box">
                <label>Account Status</label>
                <select name="accountStatus" value={formData.accountStatus} onChange={inputEvent} required>
                  <option value="DEFAULT" disabled>
                    Select Status
                  </option>
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="close" type="button">
                  Close
                </button>
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
          {/* <div className="modal-footer"></div> */}
        </div>
      </div>
    </div>
  );
}
