import React, { useEffect, useState } from 'react'
import "../../css/Table.css";
import {getDistributorAllOrders} from "./Interact";

import ModalComp from "../../components/Modal/ModalComp";
export default function ViewResponse() {
const[orderList,setOrderList] = useState();
 

const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);

const handleRowClick = (rowData) => {
  setSelectedRowData(rowData);
  setIsViewMoreModalOpen(true);
};

useEffect(()=>{
  let distributorAddresss = "0x97bF3e18D2D20e3F9E73202f840D79Ab7aae9525";
  getDistributorAllOrders(distributorAddresss).then((result)=>{
    setOrderList(result);
    console.log(result)
  })
},[]);


function showOrderDetails(){
const{
  orderID,
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
  <span><b>Order ID :</b> {orderID}</span> <br></br>
  <span><b>Distributor Name :</b> {distributorName}</span><br></br>
  <span><b>Distributor Address :</b> {distributorAddress}</span>
  <br></br>
  <h3>Order Details :</h3>
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

<div><span><b>Order Date : </b>{(new Date(orderDateTime).toLocaleString())}</span></div>
  
  <hr></hr>
  <div style={{float:"right"}}>
  <span><b>Total Price :</b></span> ${totalPrice}
  </div>
</>
  )
}


    return ( 
<>
{
  orderList?<div className="table-container">
  <table> 
     <thead>
         <tr>
             <th>OrderID</th>
             <th>Manufacturer Name</th>
             <th>Total Price</th>
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
                <td>{currValue.manufacturerName}</td>
                <td>{currValue.totalPrice}</td>
                <td>{currValue.orderStatus}</td>
                <td>
                <button type='button' className='btn btn-primary'
                onClick={()=>handleRowClick(currValue)}>View Details</button>
              
                  {/* <button type='btn' className='tablebtnred'>Decline</button> */}
                </td>
          </tr>
            )
          })
        }
     </tbody>
  </table>
</div>:"Not Found Any Order Yet"

}

<ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Order Details">
{selectedRowData && (showOrderDetails())}
</ModalComp>

</>
    )
  }
