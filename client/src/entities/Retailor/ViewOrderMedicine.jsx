import React,{useState,useEffect} from 'react'
import ModalComp from '../../components/Modal/ModalComp';

import {getAllOrderinRetailor} from "./Interact";
import { useSelector } from 'react-redux';
export default function ViewOrderMedicine() {
const[medicineOrderList,setMedicineOrderList] = useState();

let {walletAddress} = useSelector((state)=>state.LoginLogout);
useEffect(()=>{
    let fetchRawMaterialData = async()=>{
        let viewResponse = await getAllOrderinRetailor();
        let filteredOrders = await viewResponse.filter((order) =>
            Object.keys(order).includes("retailorAddress") &&
            (order.retailorAddress).toLowerCase() === (walletAddress).toLowerCase()
            // order.retailorAddress === "0x59d313D31bcBe36a66c32dC1aDe0e2ef59f0062e"
        );
        // console.log(filteredOrders);
        setMedicineOrderList(filteredOrders);

    }   
    fetchRawMaterialData();
    },[])

const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);

const handleViewModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsViewMoreModalOpen(true);
};

  return (
    <>
   
  {
    medicineOrderList? <div className="table-container">
    <table> 
       <thead>
           <tr>
               <th>order ID</th>
               <th>Medicine ID</th>
               <th>Distributor Name</th>
               <th>Order Date</th>
               <th>Price</th>
               <th>Status</th>
               <th>Action</th>
           </tr>
       </thead>
       <tbody>
           {
               medicineOrderList.map((currValue,index)=>{
                   return(
                       <tr key={index}>
               <td>{currValue.retailorOrderID}</td>
               <td>{currValue.uniqueIdentifier}</td>
               <td>{JSON.parse(currValue.orderHistory).distributorName}</td>
               <td>{new Date(currValue.retailorOrderDateTime).toLocaleString()}</td>
               <td>${currValue.retailorPurchasetotalPrice}</td>
               <td style={{backgroundColor:"#f6f5f5"}}>{currValue.retailorOrderStatus}</td>
               <td>
                   <button type='button' className='btn btn-primary'
                   onClick={()=>handleViewModal(currValue)}>View Details</button>
               </td>
           </tr>
                   )
               })
           }
       </tbody>
    </table>
</div>:"Not any order found"
  }

<ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Order Status">
{
  selectedRowData && <>
  <div>
    <span>Unique Identifier : {selectedRowData.uniqueIdentifier}</span> <br></br>
    {/* <span>Medicine ID : {selectedRowData.medicineID}</span> <br></br> */}
    <span>Medicine Name : {JSON.parse(selectedRowData.medicineDetails).medicineName}</span> <br></br>
    {/* <span>Medicine Description : {selectedRowData.medicineDescription}</span> <br></br> */}
    <span>Medicine Formula : {JSON.parse(selectedRowData.medicineDetails).medicineFormula}</span> <br></br>
    <span>Price : {selectedRowData.retailorPurchasetotalPrice}</span> <br></br>
    <span>Manufacturer Date : {JSON.parse(selectedRowData.medicineDetails).manufacturerDate}</span> <br></br>
    <span>Expiry Date : {JSON.parse(selectedRowData.medicineDetails).expiryDate}</span> <br></br>
   
    <div className='modalCardStyle'>
      <span><b>Manufacturer Address :</b> {JSON.parse(selectedRowData.medicineDetails).manufacturerAddress}</span>
      <span><b>Manufacturer Name :</b> {JSON.parse(selectedRowData.medicineDetails).manufacturerName}</span>
      <span><b>Distributor Address :</b> {selectedRowData.distributorAddress}</span>
      <span><b>Status :</b> {selectedRowData.retailorOrderStatus}</span>
      <span><b>Order Date :</b> {new Date(selectedRowData.retailorOrderDateTime).toLocaleDateString()}</span>
    </div>

    <div className='modalCardStyle'>
      <span><b>Retailor Address :</b> {selectedRowData.retailorAddress}</span>
      <span><b>Retailor Name :</b> {selectedRowData.retailorName}</span>
      <span><b>Retailor Location :</b> {selectedRowData.retailorLocation}</span>
    </div>

  </div>
  </>
}
</ModalComp>
    </>
  )
}
