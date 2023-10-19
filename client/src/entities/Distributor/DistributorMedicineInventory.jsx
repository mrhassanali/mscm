import React,{useState,useEffect} from 'react'
import ModalComp from '../../components/Modal/ModalComp';

import{getDistributorOrderMedicine} from "../Manufacturer/Interact";
import {getAllOrderinRetailor} from "../Retailor/Interact";
import { useSelector } from 'react-redux';
export default function MedicineInventory() {
    const[manufacturerInventory,setManufacturerInventory]= useState([]);
    const[getRetailorOrder,setGetRetailorOrder] = useState([]);

    const[arrays1,setArrays1] = useState();
    const[arrays2,setArrays2] = useState();

    
  const {walletAddress} = useSelector((state) => state.LoginLogout);
    useEffect(()=>{
        document.title = "Inventory";
        // let distributorAddress = "0x97bF3e18D2D20e3F9E73202f840D79Ab7aae9525";
        getDistributorOrderMedicine(walletAddress).then((result)=>{
            if(result.length > 0){
                setManufacturerInventory(result);
                let myArr = [];
                for(var i=0;i<result.length;i++){
                    let medicine = {
                        distributorAddress:result[i].distributorAddress,
                        expiryDate:result[i].expiryDate,
                        manufacturerAddress:result[i].manufacturerAddress,
                        manufacturerDate:result[i].manufacturerDate,
                        medicineDescription:result[i].medicineDescription,
                        medicineFormula:result[i].medicineFormula,
                        medicineID:result[i].medicineID,
                        medicineName:result[i].medicineName,
                        orderDate:result[i].orderDate,
                        price:result[i].price,
                        status:result[i].status,
                        uniqueIdentifier:result[i].uniqueIdentifier,
                    }
                    myArr.push(medicine)
                }
                setArrays1(myArr);
                
            }else{
                setManufacturerInventory(false);
            }
        });

        getAllOrderinRetailor().then((result)=>{
            if(result.length > 0){
                setGetRetailorOrder(result);
                console.log(result);
                let myArr2 = [];
                for(var i=0;i<result.length;i++){
                    let medicine = {
                        OrderAcceptRejectDate:   result[i].OrderAcceptRejectDate,
                        distributorAddress:      (result[i].distributorAddress).toLowerCase(),
                        medicineDetails:         result[i].medicineDetails,
                        orderHistory:            result[i].orderHistory,
                        retailorAddress:         (result[i].retailorAddress).toLowerCase(),
                        retailorLocation:        result[i].retailorLocation,
                        retailorName:            result[i].retailorName,
                        retailorOrderDateTime:   result[i].retailorOrderDateTime,
                        retailorOrderID:         result[i].retailorOrderID,
                        retailorOrderStatus:     result[i].retailorOrderStatus,
                        retailorPurchasetotalPrice:            result[i].retailorPurchasetotalPrice,
                        uniqueIdentifier:        result[i].uniqueIdentifier,

                    }
                    myArr2.push(medicine)
                }
                setArrays2(myArr2);
                
            }else{
                setGetRetailorOrder(false);
            }
        });

    },[]);


useEffect(()=>{
if(arrays1 && arrays2){ 
    arrays2.forEach(item2 => {
    let index = arrays1.findIndex((item1)=>{
        return item1.uniqueIdentifier == item2.uniqueIdentifier
    });

    if(index >= 0){
        arrays1[index].name = "Hassan";
        arrays1[index].retailorAddress = item2.retailorAddress;
        arrays1[index].retailorName = item2.retailorName;
        arrays1[index].retailorLocation = item2.retailorLocation;
        arrays1[index].retailorOrderStatus = item2.retailorOrderStatus;
        arrays1[index].status = item2.retailorOrderStatus;
        arrays1[index].retailorOrderDateTime = item2.retailorOrderDateTime;
        arrays1[index].distributorName = JSON.parse(item2.orderHistory).distributorName;
        arrays1[index].manufacturerName = JSON.parse(item2.orderHistory).manufacturerName;
    }
    });
    console.log(arrays1);
}
},[arrays1,arrays2]);
    


const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);

const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsViewMoreModalOpen(true);
};

  return (
    <>
    {
        arrays1?<div style={{width:"80%",margin:"2rem auto"}}>
        <table>
        <thead>
            <tr>
                <th>MedicineID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Expiry Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
           {
            arrays1 && arrays1.map((currValue,index)=>{
                return(
                    <tr key={index}>
                        <td>{currValue.uniqueIdentifier}</td>
                        <td>{currValue.medicineName}</td>
                        <td>${currValue.price}</td>
                        <td>
                            {
                            (currValue.status === "Accepted"?"Sold":"Available")
                            }</td>
                        <td>{currValue.expiryDate}</td>
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
    </div>:<h1>Not Any Medicine</h1>
    }




<ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Medicine Details">
{
  selectedRowData && <>
  <table>
    <tbody>
        <tr>
            <td  style={{textAlign:"left"}}><b>Medicine ID</b></td>
            <td>{selectedRowData.uniqueIdentifier}</td>
        </tr>
        <tr>
            <td  style={{textAlign:"left"}}><b>Medicine Name</b></td>
            <td>{selectedRowData.medicineName}</td>
        </tr>
        <tr>
            <td  style={{textAlign:"left"}}><b>Formula</b></td>
            <td>{selectedRowData.medicineFormula}</td>
        </tr>
        <tr>
            <td  style={{textAlign:"left"}}><b>Price</b></td>
            <td>${selectedRowData.price}</td>
        </tr>
        <tr>
            <td  style={{textAlign:"left"}}><b>Manufacturer Date</b></td>
            <td>{selectedRowData.manufacturerDate}</td>
        </tr>
        <tr>
            <td  style={{textAlign:"left"}}><b>Expiry Date</b></td>
            <td>{selectedRowData.expiryDate}</td>
        </tr>
        <tr>
            <td  style={{textAlign:"center",color:"Green"}} colSpan={3}><b>Currently Medicine is Available to the Retailor {selectedRowData.retailorAddress}</b></td>
        </tr>
    </tbody>
  </table>   
  <div>
   
   
    <div className='modalCardStyle'>
        <span><b>Manufacturer Address :</b> {selectedRowData.manufacturerAddress}</span>
        <span><b>Distributor Address :</b> {selectedRowData.distributorAddress}</span>
        <span><b>Status :</b> {selectedRowData.status}</span>
        <span><b>Order Date :</b> {selectedRowData.orderDate}</span>
    </div>
   {
    selectedRowData.retailorAddress? <div className='modalCardStyle'>
    <span><b>Retailor Address :</b> {selectedRowData.retailorAddress}</span>
    <span><b>Retailor Name :</b> {selectedRowData.retailorName}</span>
    <span><b>Retailor Location :</b> {selectedRowData.retailorLocation}</span>
    <span><b>Status :</b> {selectedRowData.status}</span>
    <span><b>Order Date :</b> {new Date(selectedRowData.retailorOrderDateTime).toLocaleString()}</span>
</div>:""
   }

  </div>
  </>
}
</ModalComp>

    </>
  )
}
