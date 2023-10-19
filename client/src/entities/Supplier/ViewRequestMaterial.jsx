import React,{useEffect,useState} from "react";
import "../../css/Table.css";
import ModalComp from "../../components/Modal/ModalComp";
import {viewOrderRawRequest,updateOrderStatus} from "./Interact";

import { useSelector } from "react-redux";

export default function ViewRequestMaterial() {
const[vieworder,setvieworder] = useState([]);
const[filterData,setfilterData] = useState([]); // filter data show only specific user data

const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);
const handleRowClick = (rowData) => {
  setSelectedRowData(rowData);
  setIsViewMoreModalOpen(true);
};

let fetchRawMaterialData = async()=>{
  let viewResponse = await viewOrderRawRequest();
  setvieworder(viewResponse);  
  console.log(viewResponse);
  }

  useEffect(()=>{
    fetchRawMaterialData();
  },[]);


  const {walletAddress,name} = useSelector((state) => state.LoginLogout);
  useEffect(()=>{
    let filteredOrders = vieworder.filter((order) =>
    Object.keys(order).includes("supplierID") && order.supplierID.toLowerCase() === walletAddress.toLowerCase()
    // order.supplierID === "0xBBDe65b2166E5B67aC2d9489040fbB0c9A3429E0"
  );
  setfilterData(filteredOrders);
  // console.log(filteredOrders);
 },[vieworder])


function handleFunc(status){
  let data = {
    orderID:selectedRowData.orderID,
    orderStatus:status
  }
  updateOrderStatus(data);
  // console.log(data);
  // fetchRawMaterialData();
  // setIsViewMoreModalOpen(false)
}

function OrderStatus() {
  const{orderStatus} = selectedRowData;
 
  let status = orderStatus;
  if (status === 'Pending') {
    return(
      <div>
      <button type="button" onClick={()=>{handleFunc("Accepted");setIsViewMoreModalOpen(false)}} className="btn btn-primary" style={{float:"right"}}>Accept</button>
      <button type="button" onClick={()=>handleFunc("Rejected")} className="btn btn-primary" style={{float:"right",backgroundColor:"red"}}>Reject</button>
      </div>
    );
  } else if (status === 'Rejected') {
    return <div>You have already rejected.</div>;
  }else if (status === 'Accepted') {
    return <div style={{background:"green",color:"white",padding:"3px"}}>You have already Accepted this Order.</div>;
  } else {
    return null; // Don't render anything if the status is something else
  }
}


function showOrderDetails(){
  const{orderID,manufacturerName,orderDetails,orderStatus,orderTime,totalPrice,supplierName} = selectedRowData;
  let materialDetails = JSON.parse(orderDetails);
  // console.log(selectedRowData);
return(
<>
<div style={{display:"flex",justifyContent:"space-between"}}>
  
  <span><b>Order ID :</b> {orderID}</span>
{OrderStatus()}
</div>
  <span><b>Manufacturer Name :</b> {manufacturerName}</span><br></br>
  <span><b>Supplier Name :</b> {supplierName}</span>
  <br></br>
  <h3>Material Details :</h3>
  <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
  {




  materialDetails.map((element,index)=>{
      const{createdDate,materialDesc,materialID,materialName,quantity,stock,supplierID,unitprice}= element;
      // console.log(element);
      return(
      <div style={{border:"1px solid black"}} key={index}>Material ID : {materialID} <br></br>
          Material Name : {materialName}<br></br>
          Material Description : {materialDesc}<br></br>
          Material Created Date : {createdDate}<br></br>
          Material Price : {unitprice}<br></br>
          Material Quantity : {quantity}<br></br>  
          Material Stock : {stock}<br></br>  
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

<div><span><b>Order Date : </b>{(new Date(orderTime).toLocaleString())}</span></div>
  
  <hr></hr>
  <div style={{float:"right"}}>
  <span><b>Total Price :</b></span> ${totalPrice}
  </div>
</>
  )
}

  return (
<>
<div className="table-container">
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th> Status</th>
            <th>Manufacturer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            // vieworder.map((element,index)=>{
              filterData.map((element,index)=>{
              const{orderID,manufacturerName,orderDetails,orderStatus,orderTime,totalPrice,supplierName} = element;
              const jsDateTime = new Date(orderTime);
              return(
                <tr key={index}>
                  <td>{orderID}</td>
                  <td>${totalPrice}</td>
                  <td>{jsDateTime.toLocaleString()}</td>
                  <td>{orderStatus}</td>
                  <td>{manufacturerName.length == 0?"unknown":manufacturerName}</td>
                  <td>
                  <button type="button" id="openModalBtn" className="btn btn-primary"
                  onClick={() => handleRowClick(element)}>View</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>

<ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Order Details">
{selectedRowData && (showOrderDetails())}
</ModalComp>
</>
  );
}


