import React, { useEffect, useState } from "react";
import ModalComp from "../../components/Modal/ModalComp";

import {getAllData} from "../Admin/Interact"; //Getting All User Data from AddUser Admin Interact.jsx
import {getDistributorOrderMedicine} from "../Manufacturer/Interact";
import {RetailorPlaceOrder} from "./Interact";
import {getAllOrderinRetailor} from "./Interact";


import { useSelector } from "react-redux";

export default function OrderMedicine() {
const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);

const[selectDistributor,setSelectDistributor]=useState({
  walletAddress:"",
  name:"",
});

const[distributorList,setDistributorList] = useState(null);// Distributor List blow;


const[manufacturerInventory,setManufacturerInventory]= useState([]);
const[getRetailorOrder,setGetRetailorOrder] = useState([]);
const[arrays1,setArrays1] = useState();
const[arrays2,setArrays2] = useState();
const[updatedArr,setUpdatedArr] = useState();


useEffect(()=>{
  if(selectDistributor.walletAddress){
      getDistributorOrderMedicine(selectDistributor.walletAddress).then((result)=>{
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
          console.log(myArr2)
          setArrays2(myArr2);
      }else{
          setGetRetailorOrder(false);
      }   
  });
  }   
},[selectDistributor.walletAddress]);



useEffect(() => {
    if (arrays2) {
    arrays2.forEach((item2) => {
      let index = arrays1.findIndex(item1 => item1.uniqueIdentifier === item2.uniqueIdentifier);
 
      if (index >= 0) { arrays1.splice(index, 1);}
    });
    console.log("Updated arrays1:", arrays1);
    setUpdatedArr(arrays1);
  }else{
    setUpdatedArr(manufacturerInventory);
  }
}, [arrays1, arrays2]);


const handleRowClick = (rowData) => {
  setSelectedRowData(rowData);
  setIsViewMoreModalOpen(true);
  // console.log(rowData);
};
const[productList,setproductList] = useState([]);
const[totalAmount,settotalAmount]= useState(null); 

// Filter the only Distributor for Selecting purpose
useEffect(()=>{
let fetchRawMaterialData = async()=>{
    let viewResponse = await getAllData();
    let filteredOrders = await viewResponse.filter((order) =>
        Object.keys(order).includes("role") &&
        order.role === "distributor"
    );
    // console.log(filteredOrders);
    setDistributorList(filteredOrders);
}   
fetchRawMaterialData();
},[])

   // Fetching All User Data
useEffect(()=>{
    if(selectDistributor.walletAddress){
        getDistributorOrderMedicine(selectDistributor.walletAddress).then((result)=>{
            if(result.length > 0){
                setproductList(result);
                // console.log(result)

            }else{
                setproductList(false);
            }
        })
    }  
},[selectDistributor]);


   

 
const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  // Define a function to update the cart in localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Define a function to add a product to the cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const index = cart.findIndex((item) => item.uniqueIdentifier === product.uniqueIdentifier);
    if (index === -1) {
      // If the product isn't in the cart yet, add it with a quantity of 1
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart); // Update cart in localStorage
    } else {
      // If the product is already in the cart, do not add it again
      console.log("Product is already in the cart");
      alert("Already Medicine in Cart")
    }
  };
  const removeFromCart = (product) => {
    // Check if the product is in the cart
    const index = cart.findIndex((item) => item.materialID === product.materialID);
    if (index === -1) return;
    // If the product is in the cart, decrement its quantity
    const updatedCart = [...cart];
    if (updatedCart[index].quantity === 1) {
      // If the quantity would go to 0, remove the product from the cart
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index].quantity -= 1;
    }
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Update cart in localStorage
  };

  // Define a function to calculate the total price of the cart
  const calculateTotal = () => {
    const total = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    settotalAmount(total);
    return total;
  };
  useEffect(() => {
    calculateTotal();
  }, [cart]);

 
  const {walletAddress,name} = useSelector((state) => state.LoginLogout);
async function OrderNow(){
  let PurchaseArray = [];
  for(var i = 0; i<cart.length; i++){
    let dt = {
    retailorOrderID:1,
    retailorAddress:walletAddress,
    retailorName:name,
    retailorLocation:"null",
    
    distributorAddress:cart[i].distributorAddress,
    
    uniqueIdentifier:cart[i].uniqueIdentifier,
    medicineDetails:JSON.stringify(cart[i]),// Accept Medicien JSON.stringify() Array
    retailorOrderDateTime:new Date().toISOString(),
    retailorOrderStatus:"Pending",// Pending / Rejected / Accepted
    OrderAcceptRejectDate:"null",
    retailorPurchasetotalPrice:cart[i].price,
    orderHistory:JSON.stringify({
      manufacturerAddress:cart[i].manufacturerAddress,
      manufacturerName:cart[i].manufactName,
      manufacturerLocation:"null",
      
      distributorAddress:selectDistributor.walletAddress,
      distributorName:selectDistributor.name,
      distributorLocation:selectDistributor.distributorLocation,
    }),
  };
  PurchaseArray.push(dt);
}
//  retailorAddress:"0x59d313D31bcBe36a66c32dC1aDe0e2ef59f0062e",
//  console.log(PurchaseArray);
  let response = await RetailorPlaceOrder(PurchaseArray);
  console.log(response);
  // console.log(PurchaseArray);

    window.localStorage.removeItem('cart'); //clear localstorage item
    setCart([]); //clear cart

  }

    function viewMedicineDataModal(){    
        const{medicineName,medicineDescription,expiryDate,medicineFormula,
          manufacturerDate,manufacturerAddress,
          medicineID,price}  = selectedRowData;
        return(    
            <div>
                <div>
                    <div><b>Medicine ID :</b> <span>{medicineID}</span></div>
                    <div><b>Medicine Name :</b> <span>{medicineName}</span></div>
                    <div><b>Description :</b> <span>{medicineDescription}</span></div>
                    <div><b>Formula :</b> <span>{medicineFormula}</span></div>
                    <div><b>Unit Price :</b> <span>${price}</span></div>
                    <div><b>Quantity :</b> <span>1</span></div>
                    <div><b>Manufacturer Date :</b> <span>{manufacturerDate}</span></div>
                    <div><b>Expiry Date :</b> <span>{expiryDate}</span></div>
               
<div className='modalCardStyle'>
      <span><b>Manufacturer Address :</b> {manufacturerAddress}</span>
</div>

                </div>
            </div>
        )
    }

   
return (
   <>
<br></br>
<br></br>
  <div style={{maxWidth:"100rem",margin:"auto"}}>
  <label><b>Select Distributor : </b></label>
  <select name="role" defaultValue={"DEFAULT"} onChange={(e) => {
    let changeAddress = e.target.value;
    let selectedDistributor = distributorList.find(manufacturer => manufacturer.walletAddress === changeAddress);

    let manufactName = selectedDistributor ? selectedDistributor.name : '';
    
    setSelectDistributor({
      walletAddress:changeAddress,
      name:manufactName
    });

  }} required>
    <option value="DEFAULT" disabled>Select User Role</option>
    {
      distributorList?distributorList.map((element,index)=>{
        return(<option value={element.walletAddress} key={index}>{element.name} - {element.walletAddress}</option>)
      }):<option value={"no"} key={"0"}>Not Supplier Available & contact company</option>
    }
  </select>
  </div>


{
(selectDistributor.walletAddress)?
<div className="table-container">
<br></br>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Price</th>
      <th>Manufacturer Date</th>
      <th>Expiry Date</th>
      <th>Add to Cart</th>
    </tr>
  </thead>
  <tbody>
    {
    updatedArr.map((product,index) => (
        <tr key={index}>
        <td>{product.uniqueIdentifier}</td>
        <td>{product.medicineName}</td>
        <td>${product.price}</td>
        <td>{product.manufacturerDate}</td>
        <td>{product.expiryDate}</td>
        <td>
          <button type="button" className="btn btn-primary" onClick={()=>handleRowClick(product)}>View</button>
          <button type="button" className="btn btn-primary" onClick={() => addToCart(product)}>Add</button>
          <button type="button" className="btn btn-danger" onClick={() => removeFromCart(product)}>Remove</button>
           </td>
      </tr>
    ))
    }
  </tbody>
</table>
{cart.length > 0 && (
  <div>
    <br></br>
    <h2 style={{fontSize:"2.3rem"}}>Cart</h2>
    <br></br>
    <table>
      <thead> 
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          {/* <th>Quantity</th> */}
          <th>Total</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item,index) => (
          <tr key={index}>
            <td>{item.uniqueIdentifier}</td>
            <td>{item.medicineName}</td>
            <td>${item.price}</td>
            <td>${(item.price * item.quantity)}</td>
            <td><button onClick={() => removeFromCart(item)}>Remove</button></td>
          </tr>
        ))}
        <tr>
          <td colSpan="3"><b>Total:</b></td>
          <td>${totalAmount}</td>
        </tr>
      </tbody>
    </table>
    <div>
      {/* <form onSubmit={handleSubmit}>
        <label>Name:</label>
          <input type="text" value={deliveryInfo.name} onChange={handleNameChange}/><br />
        <label>Address:</label>
          <input type="text" value={deliveryInfo.address} onChange={handleAddressChange}/><br />
        <label>Phone:</label>
        <input type="text" value={deliveryInfo.phone} onChange={handlePhoneChange}/><br />
        <button type="submit">Submit</button>
      </form> */}
    </div>
    <br></br>
    <button onClick={() => OrderNow()} className="orderButton">({cart.length}) Order</button>
  </div>
)}
</div>:<h1 style={{textAlign:"center",marginTop:"8px",fontSize:"3rem",color:"green"}}>Please Select Distributor for Purchase Medicine</h1>
}





    <ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Medicine Details">
  {selectedRowData && (viewMedicineDataModal())}
</ModalComp>
   </>
  );
}
