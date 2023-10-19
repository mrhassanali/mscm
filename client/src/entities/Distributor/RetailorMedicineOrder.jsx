import React,{useState,useEffect} from 'react'
import {getAllOrderinRetailor} from "../Retailor/Interact";
import ModalComp from '../../components/Modal/ModalComp';

import {AcceptRejectOrderDistributor} from "../Retailor/Interact";
import { useSelector } from 'react-redux';
export default function RetailorMedicineOrder() {
const[medicineOrderList,setMedicineOrderList] = useState();


const {walletAddress} = useSelector((state) => state.LoginLogout);
    useEffect(()=>{
        let fetchRawMaterialData = async()=>{
            let viewResponse = await getAllOrderinRetailor();
            let filteredOrders = await viewResponse.filter((order) =>
                Object.keys(order).includes("distributorAddress") &&
                (order.distributorAddress).toLowerCase() === (walletAddress).toLowerCase()
                // order.distributorAddress === "0x97bF3e18D2D20e3F9E73202f840D79Ab7aae9525"
            );
            console.log(filteredOrders);
            setMedicineOrderList(filteredOrders);

        }   
        fetchRawMaterialData();
        },[])




const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);

const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsViewMoreModalOpen(true);
};

function AcceptRejectOrder(message){
  let order = {
    retailorOrderID:selectedRowData.retailorOrderID,
    retailorOrderStatus:message,
    OrderAcceptRejectDate:new Date().toISOString()

  }
  AcceptRejectOrderDistributor(order);
}

  return (
    <>
{
    medicineOrderList? <div className="table-container">
    <table> 
       <thead>
           <tr>
               <th>OrderID</th>
               <th>Medicine ID</th>
               <th>Distributor Name</th>
               <th>Total Price</th>
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
                    <td>${currValue.retailorPurchasetotalPrice}</td>
                    {
                        (currValue.retailorOrderStatus == "Pending")?
                        <td style={{background:"#f2f2f2"}}>{currValue.retailorOrderStatus}</td>:
                        <td style={{background:"#71cce1",color:"white"}}>{currValue.retailorOrderStatus}</td>
                    }
                    <td>
                    <button type='button' className='btn btn-primary'
                    onClick={()=>handleRowClick(currValue)}>View</button>
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
{
  selectedRowData && <>
  <div style={{display:"flex",justifyContent:"space-between"}}>
    <span>Unique Identifier : {selectedRowData.uniqueIdentifier}</span> <br></br>
{
  selectedRowData.retailorOrderStatus == "Pending"?    <span>
  <button type='button' className='btn btn-primary' onClick={()=>AcceptRejectOrder("Accepted")}>Accept</button>
  <button type='button' className='btn btn-danger' onClick={()=>AcceptRejectOrder("Rejected")}>Reject</button>
</span>:<h4>{`You have Already ${selectedRowData.retailorOrderStatus}`}</h4>
}
  </div>
  <div>
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
