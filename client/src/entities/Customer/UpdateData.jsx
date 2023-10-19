import React,{useState,useEffect} from 'react'
import ModalComp from '../../components/Modal/ModalComp';

import {getOneCustomerData} from "./Interact";
import { useSelector } from 'react-redux';

import {UpdateCustomer} from "./Interact";

export default function UpdateData() {
const[userData,setUserData] = useState();





let {walletAddress} = useSelector((state)=>state.LoginLogout);
useEffect(()=>{
    getOneCustomerData(walletAddress).then(result=>{
        setUserData(result);
        console.log(result);
    })
},[walletAddress]);


const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);

const handleViewClick = (rowData) => {
  setSelectedRowData(rowData);
  setIsViewMoreModalOpen(true);
};

const [updateCustomer, setUpdateCustomer] = useState({
    walletAddress:"",
    customerName:"",
    customerFatherName:"",
    emailAddress:"",
    phoneNumber:0,
    homeAddress:"",
    password:"",
});

  // set the value on useState on input
  const InputEvent = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUpdateCustomer((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

const handleUpdateClick = (rowData) => {
    setSelectedRowData(rowData);
    setUpdateCustomer({
        walletAddress:(rowData.walletAddress).toLowerCase(),
        customerName:rowData.name,
        customerFatherName:rowData.fatherName,
        emailAddress:rowData.emailAddress,
        phoneNumber:Number(rowData.phoneNumber),
        homeAddress:rowData.homeAddress,
        password:rowData.password,
    })
    setIsUpdateModalOpen(true);
  };

  let handleSubmit = (event)=>{
    event.preventDefault();
    UpdateCustomer(updateCustomer);
    console.log(updateCustomer);
  }

  return (
    <>
    {
        userData?<div className='table-container'>
        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Customer Address</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>{userData.name}</td>
                <td>{userData.walletAddress}</td>
                <td>{userData.accountStatus}</td>
                <td>
<button type='button' className='btn btn-primary' onClick={()=>handleViewClick(userData)}>View</button>
<button type='button' className='btn btn-primary' onClick={()=>handleUpdateClick(userData)}>Update</button>
{/* <button type='button' className='btn btn-primary' onClick={()=>handleViewClick(userData)}>Change Password</button> */}

                </td>
            </tr>
            </tbody>
        </table>
    </div>:"Loading..."
    }


 <ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View User Data">
{selectedRowData && (
<div style={{display:"inline-block"}}>
    <div><b> Name : </b>{selectedRowData.name}</div>
    <div><b> Father Name : </b>{selectedRowData.fatherName}</div>
    <div><b> Email Address : </b>{selectedRowData.emailAddress}</div>
    <div><b> Phone Number : </b>{selectedRowData.phoneNumber}</div>
    <div><b> Role : </b>{selectedRowData.role}</div>
    <div><b> Home Address : </b>{selectedRowData.homeAddress}</div>
    <div><b> Account Status : </b>{selectedRowData.accountStatus}</div>
    <div><b> Wallet Address : </b>{selectedRowData.walletAddress}</div>
</div>)}
</ModalComp>



<ModalComp isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}
title="Update Data">
{selectedRowData && (
    <>
        <form onSubmit={handleSubmit}>
          <div className="column">
            <div className="input-box">
              <label htmlFor="customerName">Name</label>
              <input
                type="text"
                placeholder="Enter the Name"
                name="customerName"
                value={updateCustomer.customerName}
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
                value={updateCustomer.customerFatherName}
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
                value={updateCustomer.emailAddress}
                onChange={InputEvent}
                required
              />
            </div>
          </div>
          <div className="column">
          <div className="input-box">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={updateCustomer.phoneNumber}
              onChange={InputEvent}
              required
            />
          </div>
            <div className="input-box">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="Enter the Address"
                name="homeAddress"
                value={updateCustomer.homeAddress}
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
                value={updateCustomer.password}
                onChange={InputEvent}
                required
              />
            </div>
          </div>
          
          <div style={{display:"flex",justifyContent:"flex-end"}}>
  <button type="submit" className="modelBtn primary-model-btn">Update Customer Data</button>
  </div>

        </form>      
    </>
)}
</ModalComp>

    </>
  )
}
