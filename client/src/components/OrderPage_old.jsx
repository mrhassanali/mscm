import React, { useEffect, useState } from "react";

export default function OrderPage() {
  // Create a state variable to hold the user's cart
  const [cart, setCart] = useState([]);
  
  // Create a state variable to hold the delivery information
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Define an example list of products
  const productList = [
    { id: 1, name: "Product 1", quantity: 10, price: 10.99 },
    { id: 2, name: "Product 2", quantity: 100, price: 5.99 },
    { id: 3, name: "Product 3", quantity: 20, price: 8.99 },
  ];

  // Define a function to add a product to the cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const index = cart.findIndex((item) => item.id === product.id);
    if (index === -1) {
      // If the product isn't in the cart yet, add it with a quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      // If the product is already in the cart, increment its quantity
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
    }
  };

  // Define a function to remove a product from the cart
  const removeFromCart = (product) => {
    // Check if the product is in the cart
    const index = cart.findIndex((item) => item.id === product.id);
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
  };

  // Define a function to calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // Define a function to update the delivery information
  const handleDeliveryInfoChange = (event) => {
    const { name, value } = event.target;
    setDeliveryInfo((prevDeliveryInfo) => ({
      ...prevDeliveryInfo,
      [name]: value,
    }));
  };

  // Define a function to handle the checkout button click
  const handleCheckout = () => {
    console.log("Order submitted with the following delivery info:");
    console.log(deliveryInfo);
  };

  return (
    <div>
      <h1>Order Page</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
        {productList.map((product) => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>${product.price.toFixed(2)}</td>
          <td>{product.quantity}</td>
          <td>
            <button onClick={() => addToCart(product)}>Add</button>
            <button onClick={() => removeFromCart(product)}>Remove</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {cart.length > 0 && (
    <div>
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromCart(item)}>-</button>
                {item.quantity}
                <button onClick={() => addToCart(item)}>+</button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">Total:</td>
            <td>${calculateTotal().toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={()=>console.log(cart)}>Order</button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )}
</div>
  )
}