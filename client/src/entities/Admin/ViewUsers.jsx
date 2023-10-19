import React, { useEffect, useState } from "react";
import "../../css/Table.css";
//Getting Modal component
import ModalComp from "../../components/Modal/ModalComp";
import { getAllData ,updateUserData} from "./Interact";

function ViewUsers() {
  const [updateData, setUpdateData] = useState({
    walletAddress:"",
    name:"",
    fatherName:"",
    emailAddress:"",
    address:"",
    phoneNumber:"",
    role:"",
    password:"",
    city:"",
    postalCode:"",
    accountStatus:""
  });

  //for Modal component if they true the model open otherwise not open
const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);
const handleRowClick = (rowData) => {
  setSelectedRowData(rowData);
  setIsViewMoreModalOpen(true);
  console.log(rowData);
};
const handleUpdateClick=(rowData)=>{
  setSelectedRowData(rowData);
  setIsUpdateModalOpen(true);
  setUpdateData({
    walletAddress:rowData.walletAddress,
    name:rowData.name,
    fatherName:rowData.fatherName,
    emailAddress:rowData.emailAddress,
    address:rowData.homeaddress,
    phoneNumber:rowData.phonenumber,
    role:rowData.role,
    password:rowData.password,
    city:rowData.city,
    postalCode:rowData.postalcode,
    accountStatus:rowData.accountStatus
  });

}

  const [user, setUser] = useState([]);
  const [selectUser, setSelectUser] = useState("admin");

  // Fetching All User Data
  const viewUserData = async ()=>{
    let data = await getAllData();

    let filterData = await (data.filter(item => item.role === selectUser));
    setUser(filterData);
  }

  useEffect(() => {
    document.title = "View Users";
    viewUserData();
  }, [selectUser]);

  
  // input Event
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setUpdateData((preValue) => {
      return {
        // preValue Return the obj that match to name and value
        ...preValue,
        [name]: value,
      };
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const dt = {
    walletAddress: data.get("walletAddress"),
    name: data.get("name"),
    fatherName: data.get("fatherName"),
    emailAddress: data.get("emailAddress"),
    address: data.get("emailAddress"),
    phoneNumber: data.get("phoneNumber"),
    role: data.get("role"),
    password: data.get("password"),
    city: data.get("city"),
    postalCode: data.get("postalCode"),
    accountStatus: data.get("accountStatus")
  };

  updateUserData(dt);
  console.log(dt)
}


  return (
    <>
      <div className="table-container">
  <div>
          <label><b>Select User : </b></label>
          <select style={{height:"4rem",width:"80%"}} name="role" defaultValue={selectUser} onChange={(e) => {setSelectUser(e.target.value); }}required>
            <option value="DEFAULT" disabled>Select User Role</option>
            <option value="admin">Admin</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="supplier">Supplier</option>
            <option value="distributor">Distributor</option>
            <option value="retailor">Retailor</option>
          </select>
  </div> 

        <br></br>
        <br></br>
        {
          user.length>0?<table>
          <thead>
            <tr>
              <th style={{ width: "40rem" }}>Metamaskwallet Address</th>
              <th style={{ width: "40rem" }}>Name</th>
              <th style={{ width: "40rem" }}>Role</th>
              <th style={{ width: "40rem" }}>Status</th>
              <th style={{ width: "40rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
          {user.map((element, index) => {
  return (
    <tr key={index}>
      <td >{element.walletAddress}</td>   
      <td>{element.name}</td>
      <td>{element.role}</td>
      <td>{element.accountStatus?"Active":"Disabled"}</td>
       <td>
          <button type="button" className="btn btn-primary" onClick={()=>handleRowClick(element)}>View</button>
          <button type="button" className="btn btn-primary" onClick={()=>handleUpdateClick(element)}>Update</button>
      </td>
     
    </tr>
  );
})}
          </tbody>
        </table>:<h1>Not Currently Not Available Any {selectUser}</h1>
        }
      </div>
 
{/* For view only user Data */}
<ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View User Data">
  {selectedRowData &&  <div>
      <div><b>MetaMask Wallet Address :</b> <span>{selectedRowData.walletAddress}</span></div>
      <div><b>Name :</b> <span>{selectedRowData.name}</span></div>
      <div><b>Father Name :</b> <span>{selectedRowData.fatherName}</span></div>
      <div><b>Email Address :</b> <span>{selectedRowData.emailAddress}</span></div>
      <div><b>Phone Number :</b> <span>{selectedRowData.phonenumber}</span></div>
      <div><b>Role :</b> <span>{selectedRowData.role}</span></div>
      <div><b>City :</b> <span>{selectedRowData.city}</span></div> 
      <div><b>Address :</b> <span>{selectedRowData.homeaddress}</span></div>
      <div><b>Postal Code :</b> <span>{selectedRowData.postalcode}</span></div>
      <div><b>Region :</b> <span>{"unknown"}</span></div>
      <div><b>Account Status :</b> <span>{selectedRowData.accountStatus?"Active":"Disabled"}</span></div>
      <div><b>Password :</b> <span>{selectedRowData.password}</span></div>
  </div>}
</ModalComp>

{/* For Update the user Data */}
<ModalComp isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}
title="Update User Data">
{selectedRowData &&  <form onSubmit={handleSubmit}>
      
      <div className="column">
      <div className="input-box">
        <label>MetaMask Wallet Address</label>
        <input type="text" name="walletAddress" placeholder="Enter User Meta Mask Wallet Address"
          value={updateData.walletAddress}
          onChange={inputEvent}
        />
        
        <div className="input-box">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter User Name"
            value={updateData.name}
            onChange={inputEvent}
            required/>
        </div>
        <div className="input-box">
          <label>Father Name</label>
          <input
            type="text"
            name="fatherName"
            placeholder="Father Name"
            value={updateData.fatherName}
            onChange={inputEvent}
            required/>
        </div>
      </div>
  
      </div>
      <div className="column">
        <div className="input-box">
          <label>Email Address</label>
          <input type="email" name="emailAddress" placeholder="Email Address"
            value={updateData.emailAddress}
            onChange={inputEvent}
            required />
        </div>
  
        <div className="input-box">
          <label>Phone Number</label>
          <input type="number" name="phoneNumber" placeholder="Enter Phone Number"
            value={Number(updateData.phoneNumber)}
            onChange={inputEvent}
            required
          />
        </div>
  
        <div className="input-box">
          <label>Role</label>
          <select name="role" value={updateData.role} onChange={inputEvent} required>
            <option value="DEFAULT" disabled>Select User Role</option>
            <option value="admin">Admin</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="supplier">Supplier</option>
            <option value="distributor">Distributor</option>
            <option value="retailor">Retailor</option>
          </select>
        </div>
      </div>
  
      <div className="column">
      <div className="input-box">
          <label>City</label>
          <input type="text" name="city" placeholder="Enter city"
            value={updateData.city}
            onChange={inputEvent}
            required/>
        </div>
  
      <div className="input-box">
        <label>Address</label>
        <input type="text" name="address" placeholder="Enter Address" 
          value={updateData.address}
          onChange={inputEvent}
          />
      </div>
  
        <div className="input-box">
          <label>Postal Code</label>
          <input type="number" name="postalCode" placeholder="Enter Postal Code"
            value={Number(updateData.postalCode)}
            onChange={inputEvent}
            required/>
        </div>
      </div>
  
  
      <div className="column">
  
        {/* <div className="input-box">
          <label>Region</label>
          <input type="text" name="region" />
        </div> */}
  
  <div className="input-box">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter Password"
            value={updateData.password}
            onChange={inputEvent}
            required/>
        </div>
  
  <div className="input-box">
        <label>Account Status</label>
        <select name="accountStatus" 
        value={updateData.accountStatus} 
        onChange={inputEvent} 
        required>
          <option value="DEFAULT" disabled>Select Status</option>
          <option value="true">Active</option>
          <option value="false">Disabled</option>
        </select>
      </div>
      </div>
  
  <div style={{display:"flex",justifyContent:"flex-end"}}>
  <button type="submit" className="modelBtn primary-model-btn">Submit</button>
  </div>
  
    </form>
    }
</ModalComp>

    </>
  );
}

export default ViewUsers;
