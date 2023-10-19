import React,{useState,useEffect} from 'react';
import "../../css/Table.css";
 

import {getDistributorOrderMedicine,

    getAllMedicine} from "../Manufacturer/Interact";
import {getAllOrderinRetailor} from "./Interact";

export default function RetailorInventory() {



    const[manufacturerInventory,setManufacturerInventory]= useState([]);
    const[getRetailorOrder,setGetRetailorOrder] = useState([]);
    const[arrays1,setArrays1] = useState();
    const[arrays2,setArrays2] = useState();
    const[updatedArr,setUpdatedArr] = useState();
    
    
    useEffect(()=>{
        
        let distributorAddress = "0x97bF3e18D2D20e3F9E73202f840D79Ab7aae9525";

        
        getAllMedicine(distributorAddress).then((result)=>{
            if(result.length > 0){
                let filteredOrders = result.filter((order) =>
            Object.keys(order).includes("distributorAddress") &&
            order.distributorAddress === "0x97bF3e18D2D20e3F9E73202f840D79Ab7aae9525"
          );
          console.log(filteredOrders);
            }else{
                setManufacturerInventory(false);
            }
        });


        
     

          getDistributorOrderMedicine(distributorAddress).then((result)=>{
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
              // console.log(result);
              let myArr2 = [];
              for(var i=0;i<result.length;i++){
                  let medicine = {
                      OrderAcceptRejectDate:   result[i].OrderAcceptRejectDate,
                      distributorAddress:      result[i].distributorAddress,
                      medicineDetails:         result[i].medicineDetails,
                      orderHistory:            result[i].orderHistory,
                      retailorAddress:         result[i].retailorAddress,
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
            // arrays1.splice(index,1);
            console.log(manufacturerInventory.slice(index,index+1));
           let newArry =  manufacturerInventory.slice(index,index+1)
           setUpdatedArr(newArry);
          }
        });
        // console.log(arrays1);
      }
      },[arrays1,arrays2]);

  return (
   <>
    {
        updatedArr && <div className="table-container">
        <table> 
           <thead>
               <tr>
                   <th>Medicine ID</th>
                   <th>Medicine Names</th>
                   <th>Quantity</th>
                   <th>Price</th>
                   <th>Stock</th>
                   <th>Details</th>
               </tr>
           </thead>
           <tbody>
               {
                updatedArr.map((currValue,index)=>{
                    return(
                <tr key={index}>
                   <td>{currValue.uniqueIdentifier}</td>
                   <td>{currValue.medicineName}</td>
                   <td>1</td>
                   <td>${currValue.price}</td>
                   <td>Available</td>
                   <td>
                    <button type='button' className='btn btn-primary'>View Details</button>
                    </td>
               </tr>
                    )
                })
               }
           </tbody>
        </table>
   </div>
    }
   </>
  )
}
