import React, { useEffect, useState } from "react";
import ModalComp from "../../components/Modal/ModalComp";


import {getAllData} from "../Admin/Interact"; //Getting All User Data from AddUser Admin Interact.jsx
import {getAllMedicine} from "../Manufacturer/Interact"; // Getting All Medicine
import {placeDistributorOrder} from "./Interact";

import { useSelector } from "react-redux";
export default function OrderMedicine() {
const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);

const[selectManufacturer,setselectManufacturer]=useState({
  walletAddress:"",
  name:"",
});
const[manufacturerList,setmanufacturerList] = useState(null);

const handleRowClick = (rowData) => {
  setSelectedRowData(rowData);
  setIsViewMoreModalOpen(true);
  // console.log(rowData);
};
const[productList,setproductList] = useState([]);
const[totalAmount,settotalAmount]= useState(null); 



// Filter the only Manufacturer
useEffect(()=>{
let fetchRawMaterialData = async()=>{
    let viewResponse = await getAllData();
    let filteredOrders = await viewResponse.filter((order) =>
        Object.keys(order).includes("role") &&
        order.role === "manufacturer"
    );
    // console.log(filteredOrders);
    setmanufacturerList(filteredOrders);
}   
fetchRawMaterialData();
},[])

   // Fetching All User Data
    // Select Option Box then data will be show;
    useEffect(() => {
      const getMedicineData = async () => {
        if (selectManufacturer.walletAddress) {
          let data = await getAllMedicine(selectManufacturer.walletAddress);
          console.log(data);
          setproductList(data);
        }
      };
      getMedicineData();
    }, [selectManufacturer]);
  

 
const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  // Define a function to update the cart in localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Define a function to add a product to the cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const index = cart.findIndex((item) => item.medicineID === product.medicineID);
    if (index === -1) {
      // If the product isn't in the cart yet, add it with a quantity of 1
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart); // Update cart in localStorage
    } else {
      // If the product is already in the cart, increment its quantity
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart); // Update cart in localStorage
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
  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      settotalAmount(total);
      return total;
    };
    calculateTotal();
  }, [cart]);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cart)
  };

 
  const {walletAddress,name} = useSelector((state) => state.LoginLogout);
async function OrderNow(){
  // distributorAddress:"0x97bF3e18D2D20e3F9E73202f840D79Ab7aae9525",
    let dt = {
      distributorAddress:(walletAddress).toLowerCase(),
      distributorLocation:"Pakistan",
      distributorName:name,

      manufacturerAddress:(selectManufacturer.walletAddress).toLowerCase(),
      manufacturerName:selectManufacturer.name,

      orderDetails:JSON.stringify(cart),
      orderDateTime:new Date().toISOString(),
      totalPrice:totalAmount,
    };
    // distributorAddress,distributorLocation,distributorName,
    // manufacturerAddress,manufacturerName,
    // orderDetails,orderDateTime,totalPrice
  
   let d = await placeDistributorOrder(dt);

        // console.log(dt);

    window.localStorage.removeItem('cart'); //clear localstorage item
    setCart([]); //clear cart

  }

  function viewMedicineDataModal(){    
const{medicineName,medicineDescription,expiryDate,medicineFormula,manufacturerData,manufacturer,medicineID,price,quantity}  = selectedRowData;
return(    <div>
  <div>
    <div><b>Medicine ID :</b> <span>{medicineID}</span></div>
    <div><b>Medicine Name :</b> <span>{medicineName}</span></div>
    <div><b>Description :</b> <span>{medicineDescription}</span></div>
    <div><b>Formula :</b> <span>{medicineFormula}</span></div>
    <div><b>Unit Price :</b> <span>{price}</span></div>
    <div><b>Quantity :</b> <span>{quantity}</span></div>
    <div><b>Manufacturer Date :</b> <span>{manufacturerData}</span></div>
    <div><b>Expiry Date :</b> <span>{expiryDate}</span></div>
    <div><b>Manufacturer Address :</b> <span>{manufacturer}</span></div>

  </div>
</div>)
  }

   
  return (
   <>

<br></br>
<br></br>
<form>
<div style={{maxWidth:"100rem",margin:"auto"}}>
  <label><b>Select Manufacturer : </b></label>
  <select name="role" defaultValue={"DEFAULT"} onChange={(e) => {
    let changeAddress = e.target.value;
    let selectedManufacturer = manufacturerList.find(manufacturer => manufacturer.walletAddress === changeAddress);

    let manufactName = selectedManufacturer ? selectedManufacturer.name : '';
    
    setselectManufacturer({
      walletAddress:changeAddress,
      name:manufactName
    });

  }} required>
    <option value="DEFAULT" disabled>Select User Role</option>
    {
      manufacturerList?manufacturerList.map((element,index)=>{
        return(<option value={element.walletAddress} key={index}>{element.name} - {element.walletAddress}</option>)
      }):<option value={"no"} key={"0"}>Not Supplier Available & contact company</option>
    }
  </select>
  </div>
</form>
  {/* <h1 style={{fontSize:"2.3rem"}}>Order Page</h1> */}

{
  productList.length > 0?<>
  
  <div className="table-container">
  <br></br>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Manufacturer Date</th>
        <th>Add to Cart</th>
      </tr>
    </thead>
    <tbody>
      {productList.map((product,index) => (

          <tr key={product.medicineID}>
          <td>{product.medicineID}</td>
          <td>{product.medicineName}</td>
          <td>${product.price}</td>
          <td>{product.quantity}</td>
          <td>{product.manufacturerData}</td>
          <td>
            <button type="button" className="btn btn-primary" onClick={()=>handleRowClick(product)}>View</button>
            <button type="button" className="btn btn-primary" onClick={() => addToCart(product)}>Add</button>
            <button type="button" className="btn btn-danger" onClick={() => removeFromCart(product)}>Remove</button>
            {/* <button onClick={() => addToCart(product)}>View</button> &nbsp; */}
            {/* <button onClick={() => addToCart(product)}>Add</button> &nbsp; */}
            {/* <button onClick={() => removeFromCart(product)}>Remove</button> */}
          </td>
        </tr>
      ))}
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
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item,index) => (
            <tr key={index}>
              <td>{item.medicineID}</td>
              <td>{item.medicineName}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => removeFromCart(item)}>-</button>
                {item.quantity}
                <button onClick={() => addToCart(item)}>+</button>
              </td>
              <td>${(item.price * item.quantity)}</td>
              <td><button onClick={() => removeFromCart(item)}>Remove</button></td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">Total:</td>
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
</div>
  </>:<h1 style={{textAlign:"center",marginTop:"8px"}}>Please Select Manufacturer</h1>
}

    <ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View Medicine Details">
  {selectedRowData && (viewMedicineDataModal())}
</ModalComp>
   </>
  );
}
