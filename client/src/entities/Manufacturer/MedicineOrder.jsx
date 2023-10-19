import React,{useState,useEffect} from 'react';
import "../../css/Table.css";
import {getManufacturerAllOrders,AcceptRejectOrder} from "../Distributor/Interact";
import ModalComp from "../../components/Modal/ModalComp";
import { useSelector } from "react-redux";

export default function MedicineOrder() {
  const[orderList,setOrderList] = useState();
 

  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsViewMoreModalOpen(true);
  };

  const {walletAddress} = useSelector((state) => state.LoginLogout);

  useEffect(()=>{
    // let manufacturerAddress = "0xDc926363E0eB4241675601f836e91CEc77145718";
    getManufacturerAllOrders(walletAddress).then((result)=>{
      setOrderList(result);
      console.log(result)
    })
  },[]);




function showOrderDetails(){
  const{orderID,
    distributorAddress, distributorLocation,  distributorName,
    manufacturerAddress, manufacturerName, orderDetails,
    totalPrice,
    orderAcceptDateTime,
    orderDateTime,
    orderStatus
  } = selectedRowData;
    
let medicineOrderDetails = JSON.parse(orderDetails);
    
    return(
    <>
    <div style={{display:"flex",justifyContent:"space-between"}}>
          <span><b>Order ID :</b> {orderID}</span> 
          {
          orderStatus === "Pending"?<div>
          <button type='button' className='btn btn-primary' 
          onClick={()=>AcceptReject("Accepted")}>Accept</button>
          <button type='button' className='btn btn-danger' 
          onClick={()=>AcceptReject("Rejected")}>Reject</button>
          </div>:""
        }
        
      </div>
      <span><b>Distributor Name :</b> {distributorName}</span><br></br>
      <span><b>Distributor Address :</b> {distributorAddress}</span><br></br>
      <span><b>Distributor Location :</b> {distributorLocation}</span>
      <br></br>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <h3>Order Details : </h3>
        <span><b>Order Date : </b>{(new Date(orderDateTime).toLocaleString())}</span>
      </div>
      {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}> */}
      <div className='Modalcard'>
      {
      medicineOrderDetails.map((element,index)=>{
          const{medicineID,medicineName,medicineFormula,medicineDescription,quantity,
            manufacturerData,expiryDate,status,manufacturer,price}= element;
          // console.log(element);
          return(
          <div style={{border:"1px solid black"}} key={index}>
              <b>Medicine ID : </b>          {medicineID} <br></br>
              <b>Medicine Name : </b>        {medicineName}<br></br>
              <b>Medicine Created Date : </b>{manufacturerData}<br></br>
              <b>Medicine Price : </b>       {price}<br></br>
              <b>Medicine Quantity : </b>    {quantity}<br></br>  
              <b>Expirty Date: </b>          {expiryDate}<br></br>  
              <b>Manufacturer Address : </b> {manufacturer}<br></br>  
              </div>
          )
      })
      }
      </div>
    <br></br>
    {
      orderStatus==="Accepted"?<div style={{backgroundColor:"green",color:"white",padding:"3px",borderRadius:"5px"}}>
      <span><b>Order Status : </b>{orderStatus}</span>
    </div>:<div style={{backgroundColor:"red",color:"white",padding:"3px",borderRadius:"5px"}}>
      <span><b>Order Status : </b>{orderStatus}</span>
    </div>
    }
      <hr></hr>
      <div style={{float:"right"}}>
      <span><b>Total Price :</b></span> ${totalPrice}
      </div>
    </>
      )
    }


const AcceptReject = (message)=>{
 let dt = {
  orderID:selectedRowData.orderID,
  orderStatus:message, 
  orderAcceptDateTime:new Date().toISOString()
 }
 AcceptRejectOrder(dt);
 console.log(dt);
}

  return (
<>
{
  orderList?<div className="table-container">
  <table> 
     <thead>
         <tr>
             <th>orderID</th>
             <th>Distributor Names</th>
             <th>Total Price</th>
             <th>Order Date</th>
             <th>Status</th>
             <th>Action</th>
         </tr>
     </thead>
     <tbody>
        {
          orderList.map((currValue,index)=>{
            return(
              <tr key={index}>
                <td>{currValue.orderID}</td>
                <td>{currValue.distributorName}</td>
                <td>${currValue.totalPrice}</td>
                <td>{(new Date(currValue.orderDateTime).toLocaleString())}</td>
                <td>{currValue.orderStatus}</td>
                <td>
                  <button type='button' className='btn btn-primary'
                   onClick={()=>handleRowClick(currValue)}>View Detail &amp; Accept/Reject</button>
                </td>
          </tr>
            )
          })
        }
     </tbody>
  </table>
</div>:<h1 style={{fontSize:"2.5rem",color:"red",margin:"10rem auto",textAlign:"center"}}>Not Found Any Order</h1>
}

<ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Order Details">
{selectedRowData && (showOrderDetails())}
</ModalComp>

</>
  )
}
