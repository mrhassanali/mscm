import React,{useEffect, useState} from 'react';
import "../../css/Table.css";
import {viewOrderRawRequest} from "./Interact";
import ModalComp from "../../components/Modal/ModalComp";
import { useSelector } from "react-redux";

export default function OrderRawMaterialStatus() {
    const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const handleRowClick = (rowData) => {
      setSelectedRowData(rowData);
      setIsViewMoreModalOpen(true);
    };

    // const[viewrequest,setviewrequest] = useState([]);
    // const[orderDetails,setOrderDetails] = useState([]);
    const[filterData,setfilterData] = useState([]); // filter data show only specific user data


    const {walletAddress,name} = useSelector((state) => state.LoginLogout);
    useEffect(()=>{
    let fetchRawMaterialData = async()=>{
        viewOrderRawRequest().then((result)=>{
           let filteredOrders =  result.filter(order=> Object.keys(order).includes("manufacturerID") &&
            (order.manufacturerID).toLowerCase() === (walletAddress).toLowerCase()) 
          setfilterData(filteredOrders);
        //   console.log(result)
        //   console.log(filteredOrders)
        });
        } 
        fetchRawMaterialData();  
    
 },[walletAddress])



function showOrderDetails(){
    const{orderID,manufacturerName,orderDetails,orderStatus,orderTime,totalPrice,supplierID} = selectedRowData;
    let materialDetails = JSON.parse(orderDetails);
    // console.log(selectedRowData);
return(
<>
    <span><b>Order ID :</b> {orderID}</span> <br></br>
    <span><b>Manufacturer Name :</b> {manufacturerName}</span><br></br>
    <span><b>Supplier Name :</b> {supplierID}</span>
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
            {/* Material Description : {materialDesc}<br></br> */}
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
    <div className="table-container">
     <table>
        <thead>
            <tr>
                <th>OrderID</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            { 
                filterData.map((element,index)=>{
                    // let supplier = JSON.parse(element.OrderStatus);
                    // console.log(supplier);
                    return(
                        <tr key={index}>
                        <td>{element.orderID}</td>
                        <td>${element.totalPrice}</td>
                        <td>{element.supplierID}</td>
                        <td>{element.orderStatus}</td>
                        <td>
                            <button type='button' className='btn btn-primary'
                            onClick={() => handleRowClick(element)}>
                                View
                            </button>
                        </td>
                    </tr>
                    );
                })
            }
        </tbody>
     </table>

<ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Order Raw Material">
{selectedRowData && (showOrderDetails())}
</ModalComp>
</div>
  )
}
