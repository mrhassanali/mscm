import React, { useEffect, useState } from "react";
import {getAllMaterials,SendDataOrderRawMaterial,viewOrderRawRequest} from "./Interact";
import ModalComp from "../../components/Modal/ModalComp";
import RawMaterial from "../../contracts/RawMaterial.json";
import Web3 from "web3";
import { useSelector } from "react-redux";

export default function OrderRawMaterial(props) {
  const[supplierAddress,setsupplierAddress] = useState(props.supplierAddress);

const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);


const handleRowClick = (rowData) => {
  setSelectedRowData(rowData);
  setIsViewMoreModalOpen(true);
  // console.log(rowData);
};
const[productList,setproductList] = useState([]);
const[totalAmount,settotalAmount]= useState(null); 


  const getRawMaterial = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://localhost:7545"));
    const contract = new web3.eth.Contract(RawMaterial.abi,import.meta.env.VITE_Supplier_RawMaterial_Address);

    let data = await contract.methods.getAllMaterials().call({ from: supplierAddress });
    // writing condition for displaying the message if data not found
    if(data.length == 0){
      setproductList([]);
    }else{
      setproductList(data);
    }
  };

    // Call getRawMaterial whenever the supplierAddress prop changes
useEffect(() => {
  setsupplierAddress(props.supplierAddress);
}, [props.supplierAddress]);

  // Call getRawMaterial whenever the supplierAddress prop changes
  useEffect(() => {getRawMaterial();}, [supplierAddress]);
  
 
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  // Define a function to update the cart in localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Define a function to add a product to the cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const index = cart.findIndex((item) => item.materialID === product.materialID);
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
  const calculateTotal = () => {
    const total = cart.reduce((total, item) => {
      return total + item.unitprice * item.quantity;
    }, 0);
    settotalAmount(total);
    return total;
  };
  useEffect(() => {
    calculateTotal();
  }, [cart]);


  const handleSubmit = (event) => {
    event.preventDefault();
  };

 
  
  const {walletAddress,name} = useSelector((state) => state.LoginLogout);
  
  function OrderNow(){
    let dt = {
      orderDetails:JSON.stringify(cart),
      totalPrice:totalAmount,
      OrderTime:new Date().toISOString(),
      ManufactuerID:(walletAddress).toLowerCase(),
      ManufactuerName:name,
      supplierID:(supplierAddress).toLowerCase()
    };
    
      // supplierName:"Hassan Ali"
      // ManufactuerID:"0xDc926363E0eB4241675601f836e91CEc77145718",
      // ManufactuerName:"test manufacture",
  
    SendDataOrderRawMaterial(dt);

        console.log(dt);
        // console.log("cart"+JSON.parse(cart));

    window.localStorage.removeItem('cart'); //clear localstorage item
    setCart([]); //clear cart

  }

  function viewUserDataModal(){
    const{materialName,materialDesc,unitprice,quantity,createdDate,stock} = selectedRowData;
return(    <div>
  <div>
    <div><b>Material Name :</b> <span>{materialName}</span></div>
    <div><b>Description :</b> <span>{materialDesc}</span></div>
    <div><b>Unit Price :</b> <span>{unitprice}</span></div>
    <div><b>Quantity :</b> <span>{quantity}</span></div>
    <div><b>Created Date :</b> <span>{createdDate}</span></div>
    <div><b>Stock :</b> <span>{stock}</span></div>
  </div>
</div>)
  }

   
  return (
   <>
 {
  (productList.length > 0) ?<div>
  {/* <h1 style={{fontSize:"2.3rem"}}>Order Page</h1> */}
  <br></br>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Stock</th>
        <th>Add to Cart</th>
      </tr>
    </thead>
    <tbody>
      {productList.map((product) => (
        <tr key={product.materialID}>
          <td>{product.materialID}</td>
          <td>{product.materialName}</td>
          <td>${product.unitprice}</td>
          <td>{product.quantity}</td>
          <td>{product.stock}</td> 
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
          {cart.map((item) => (
            <tr key={item.materialID}>
              <td>{item.materialID}</td>
              <td>{item.materialName}</td>
              <td>${item.unitprice}</td>
              <td>
                <button onClick={() => removeFromCart(item)}>-</button>
                {item.quantity}
                <button onClick={() => addToCart(item)}>+</button>
              </td>
              <td>${(item.unitprice * item.quantity)}</td>
              <td><button onClick={() => removeFromCart(item)}>Remove</button></td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">Total:</td>
            {/* <td>${calculateTotal()}</td> */}
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
      <button onClick={() => OrderNow()} className="orderButton">({cart.length})Order</button>
    </div>
  )}
</div>:<h1>Your Selected Supplier Currently doesn't Available Material Yet. Please Select Another Supplier</h1>
 }

    <ModalComp isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}
title="View User Data">
  {selectedRowData && (viewUserDataModal())}
</ModalComp>
   </>
  );
}
