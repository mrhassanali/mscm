import React, { useState, useEffect } from "react";
import "../../css/Table.css";
import ModalComp from "../../components/Modal/ModalComp";
import {
  getAllOrderinRetailor,
  sellMedicineToCustomer,
  getSellMedicineCustomer,
} from "./Interact";

import { useSelector } from "react-redux";
export default function RetailorInventory() {
  const [customerForm, setCustomerForm] = useState({});

  const [arrays1, setArrays1] = useState();
  const [arrays2, setArrays2] = useState();
  const [updatedArr, setUpdatedArr] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCustomerForm((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const { walletAddress, name } = useSelector((state) => state.LoginLogout);
  useEffect(() => {
    document.title = "Inventory";
    // let distributorAddress = "0x97bF3e18D2D20e3F9E73202f840D79Ab7aae9525";
    
    getAllOrderinRetailor().then((result) => {
      if (result.length > 0) {
        // console.log(result);
        let filteredOrders = result.filter(
          (order) =>
            order.retailorAddress.toLowerCase() === walletAddress.toLowerCase() && order.retailorOrderStatus === "Accepted"
        );

        let myArr = [];
        for (var i = 0; i < filteredOrders.length; i++) {
          let medicine = {
            OrderAcceptRejectDate: filteredOrders[i].OrderAcceptRejectDate,
            distributorAddress: filteredOrders[i].distributorAddress,
            medicineDetails: filteredOrders[i].medicineDetails,
            orderHistory: filteredOrders[i].orderHistory,
            retailorAddress: filteredOrders[i].retailorAddress,
            retailorLocation: filteredOrders[i].retailorLocation,
            retailorName: filteredOrders[i].retailorName,
            retailorOrderDateTime: filteredOrders[i].retailorOrderDateTime,
            retailorOrderID: filteredOrders[i].retailorOrderID,
            retailorOrderStatus: filteredOrders[i].retailorOrderStatus,
            retailorPurchasetotalPrice:
            filteredOrders[i].retailorPurchasetotalPrice,
            uniqueIdentifier: filteredOrders[i].uniqueIdentifier,
          };
          myArr.push(medicine);
        }
        setArrays1(myArr);
      } else {
        setArrays1([]);
      }
    });

    getSellMedicineCustomer().then((result) => {
      if (result.length > 0) {
        // console.log(result);
        let filteredOrders = result.filter((order) => order.retailorAddress.toLowerCase() === walletAddress.toLowerCase());
        

        // console.log(filteredOrders);

        let myArr2 = [];
        for (var i = 0; i < filteredOrders.length; i++) {
          let medicine = {
            customerAddress: filteredOrders[i].customerAddress,
            customerEmailAddress: filteredOrders[i].customerEmailAddress,
            customerName: filteredOrders[i].customerName,
            customerOrderDate: filteredOrders[i].customerOrderDate,
            medicineDetails: filteredOrders[i].medicineDetails,
            medicineOrderHistory: filteredOrders[i].medicineOrderHistory,
            medicinePrice: filteredOrders[i].medicinePrice,
            retailorAddress: filteredOrders[i].retailorAddress,
            sellID: filteredOrders[i].sellID,
            sellStatus: filteredOrders[i].sellStatus,
            uniqueIdentifier: filteredOrders[i].uniqueIdentifier,
          };
          myArr2.push(medicine);
        }
        // console.log(filteredOrders);
        setArrays2(myArr2);
      } else {
        setArrays2([]);
      }
    });
  }, []);

  useEffect(() => {

    if (arrays1 && arrays2) {
      arrays2.forEach((item2) => {
        let index = arrays1.findIndex((item1) => {
          return item1.uniqueIdentifier == item2.uniqueIdentifier;
        });

        if (index >= 0) {
          arrays1[index].status = item2.sellStatus;
          arrays1[index].customerAddress = item2.customerAddress,
          arrays1[index].customerEmailAddress = item2.customerEmailAddress,
          arrays1[index].customerName = item2.customerName,
          arrays1[index].customerOrderDate = item2.customerOrderDate
        }
      });
      setUpdatedArr(arrays1);
      // console.log(arrays1);
    }
  }, [arrays1, arrays2]);

  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [cart, setCart] = useState([]); // Adding Element in Cart
  useEffect(() => {
    // IF the page is refresh then cart will be destroy
    setCart([]);
  }, []);

  const handleCheckboxChange = (event, currValue) => {
    if (event.target.checked) {
      // Add the item to the cart
      const {
        medicineDetails,
        orderHistory,
        retailorAddress,
        retailorName,
        retailorPurchasetotalPrice,
      } = currValue;
      const {
        medicineID,
        medicineName,
        medicineFormula,
        medicineDescription,
        manufacturerDate,
        expiryDate,
        uniqueIdentifier,
      } = JSON.parse(medicineDetails);
      const dt = {
        medicineOrderHistory: JSON.stringify([
          {
            manufacturerAddress: JSON.parse(orderHistory).manufacturerAddress,
            manufacturerName: JSON.parse(orderHistory).manufacturerName,
            distributorAddress: JSON.parse(orderHistory).distributorAddress,
            distributorName: JSON.parse(orderHistory).distributorName,
            retailorAddress: retailorAddress,
            retailorName: retailorName,
          }
        ]),
        medicineDetails: JSON.stringify([
          {
          medicineID: medicineID,
          medicineName: medicineName,
          medicineFormula: medicineFormula,
          medicineDescription: medicineDescription,
          medicineManufacturerDate: manufacturerDate,
          medicineExpiryDate: expiryDate,
        }
        ]),
        medicinePrice: Number(retailorPurchasetotalPrice),
        customerAddress: "",
        customerEmailAddress: "",
        customerName: "",

        retailorAddress: (walletAddress).toLowerCase(),

        customerOrderDate: new Date().toISOString(),
        sellStatus: "sold",
        uniqueIdentifier: uniqueIdentifier,
        sellID: 1,
      };
      setCart((prevCart) => [...prevCart, dt]);
    } else {
      // Remove the item from the cart
      setCart((prevCart) =>
        prevCart.filter(
          (item) => item.uniqueIdentifier !== currValue.uniqueIdentifier
        )
      );
    }
  };

  const [isTrasferModalOpen, setIsTransferModalOpen] = useState(false);
  const TransferMedicines = () => {
    setIsTransferModalOpen(true);
    // console.log(cart);
  };

  const handleViewModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsViewMoreModalOpen(true);
  };

  let handleSellMedicine = (e) => {
    e.preventDefault();
    // console.log(cart);
    // console.log(customerForm);

    for (var i = 0; i < cart.length; i++) {
      cart[i].customerAddress = customerForm.customerAddress.toLowerCase();
      cart[i].customerEmailAddress = customerForm.customerEmailAddress;
      cart[i].customerName = customerForm.customerName;
    }
    console.log(cart);
    sellMedicineToCustomer(cart);
    // console.log(d);
    setCart([]);
    setIsTransferModalOpen(false);
    setCustomerForm({});
  };

  return (
    <>
      <button onClick={TransferMedicines} className="orderButton">
        ({cart.length}) Sell
      </button>

      {updatedArr && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Select Medicine</th>
                <th>Medicine ID</th>
                <th>Medicine Names</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {updatedArr.map((currValue, index) => {
                const { medicineDetails } = currValue;

                const { medicineName } = JSON.parse(medicineDetails);

                return (
                  <tr key={index}>
                    <td>
{
  currValue.status=="sold"?<b>Sold</b>:
  <input
  type="checkbox"
  onChange={(event) =>
    handleCheckboxChange(event, currValue)
  }
  checked={cart.some((item) =>
      item.uniqueIdentifier === currValue.uniqueIdentifier
  )}
/>
}
                    </td>
                    <td>{currValue.uniqueIdentifier}</td>
                    <td>{medicineName}</td>
                    <td>1</td>
                    <td>${currValue.retailorPurchasetotalPrice}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleViewModal(currValue)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ModalComp
        isOpen={isViewMoreModalOpen}
        onClose={() => setIsViewMoreModalOpen(false)}
        title="View Order Status"
      >
        {selectedRowData && (
          <>
            <div>
              <span>
                Unique Identifier : {selectedRowData.uniqueIdentifier}
              </span>{" "}
              <br></br>
              {/* <span>Medicine ID : {selectedRowData.medicineID}</span> <br></br> */}
              <span>
                Medicine Name :{" "}
                {JSON.parse(selectedRowData.medicineDetails).medicineName}
              </span>{" "}
              <br></br>
              {/* <span>Medicine Description : {selectedRowData.medicineDescription}</span> <br></br> */}
              <span>
                Medicine Formula :{" "}
                {JSON.parse(selectedRowData.medicineDetails).medicineFormula}
              </span>{" "}
              <br></br>
              <span>
                Price : {selectedRowData.retailorPurchasetotalPrice}
              </span>{" "}
              <br></br>
              <span>
                Manufacturer Date :{" "}
                {JSON.parse(selectedRowData.medicineDetails).manufacturerDate}
              </span>{" "}
              <br></br>
              <span>
                Expiry Date :{" "}
                {JSON.parse(selectedRowData.medicineDetails).expiryDate}
              </span>{" "}
              <br></br>
              <div className="modalCardStyle">
                <span>
                  <b>Manufacturer Address :</b>{" "}
                  {
                    JSON.parse(selectedRowData.medicineDetails)
                      .manufacturerAddress
                  }
                </span>
                <span>
                  <b>Manufacturer Name :</b>{" "}
                  {JSON.parse(selectedRowData.medicineDetails).manufacturerName}
                </span>
                <span>
                  <b>Distributor Address :</b>{" "}
                  {selectedRowData.distributorAddress}
                </span>
                <span>
                  <b>Status :</b> {selectedRowData.retailorOrderStatus}
                </span>
                <span>
                  <b>Order Date :</b>{" "}
                  {new Date(
                    selectedRowData.retailorOrderDateTime
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="modalCardStyle">
                <span>
                  <b>Distributor Address :</b>{" "}
                  {selectedRowData.distributorAddress}
                </span>
                <span>
                  <b>Distributor Name :</b>{" "}
                  {JSON.parse(selectedRowData.orderHistory).distributorName}
                </span>
                <span>
                  <b>Status :</b> {selectedRowData.retailorOrderStatus}
                </span>
                <span>
                  <b>Order Date :</b>{" "}
                  {new Date(
                    selectedRowData.retailorOrderDateTime
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="modalCardStyle">
                <span>
                  <b>Retailor Address :</b> {selectedRowData.retailorAddress}
                </span>
                <span>
                  <b>Retailor Name :</b> {selectedRowData.retailorName}
                </span>
                <span>
                  <b>Retailor Location :</b> {selectedRowData.retailorLocation}
                </span>
                <span>
                  <b>Retailor Order Date :</b>{" "}
                  {new Date(
                    selectedRowData.retailorOrderDateTime
                  ).toLocaleString()}
                </span>
                <span>
                  <b>Retailor Order Status :</b>{" "}
                  {selectedRowData.retailorOrderStatus}
                </span>
              </div>
              {
                selectedRowData.customerAddress?
              <div className="modalCardStyle">
              <span>
                <b>Customer Address :</b> {selectedRowData.customerAddress}
              </span>
              <span>
                <b>Customer Name :</b> {selectedRowData.customerName}
              </span>
              <span>
                <b>Customer Email Address :</b> {selectedRowData.customerEmailAddress}
              </span>
              <span>
                <b>Customer Sell Date :</b>{" "}
                {new Date(
                  selectedRowData.OrderAcceptRejectDate
                ).toLocaleString()}
              </span>
              <span>
                <b>Retailor Order Status :</b> Sold
              </span>
            </div>:""
              }
            </div>
          </>
        )}
      </ModalComp>

      <ModalComp
        isOpen={isTrasferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        title="Sell Medicine"
      >
        {cart.length > 0 ? (
          <>
            <table>
              <tbody>
                <tr>
                  <td colSpan={10}>
                    <h3>Selected Medicine</h3>
                  </td>
                </tr>
                <tr>
                  {cart.map((element, index) => {
                    // console.log(JSON.parse(cart[0].medicineDetails)[0].medicineName)
                    // let total = JSON.parse(cart[0].medicineDetails)[0].medicineName
                    // console.log(cart[index].medicinePrice);
                    // let totalPrice = 0;
                    //  totalPrice += cart[index].medicinePrice;
                    //  console.log(totalPrice)
                    return (
                      <td key={index} style={{ textAlign: "left" }}>
                        <b>Medicine Name : </b>{JSON.parse(cart[index].medicineDetails)[index].medicineName} <br></br>
                        <b>Medicine ID : </b>
                        {element.uniqueIdentifier}
                      </td>
                    );
                  })}
                </tr>
                <td colSpan={10}>
                    <h3>Total Price: 710</h3>
                  </td>

              </tbody>
            </table>

            <form
              action="#"
              style={{ marginTop: "1rem" }}
              onSubmit={handleSellMedicine}
            >
              <div className="column" style={{ columnWidth: "40rem" }}>
                <div className="input-box">
                  <label>Customer Address</label>
                  <input
                    type="text"
                    name="customerAddress"
                    placeholder="Enter Distributor Address"
                    value={customerForm.customerAddress || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Customer Email Address</label>
                  <input
                    type="email"
                    name="customerEmailAddress"
                    placeholder="Enter Customer Email Address"
                    value={customerForm.customerEmailAddress || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="column" style={{ columnWidth: "40rem" }}>
                <div className="input-box">
                  <label>Customer Name :</label>
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Enter customer Name"
                    value={customerForm.customerName || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Date</label>
                  <input
                    type="date"
                    name="orderDate"
                    placeholder="Enter Order Date"
                    // defaultValue={new Date().toISOString().substr(0, 10)}
                    value={
                      customerForm.orderDate ||
                      new Date().toISOString().substr(0, 10)
                    }
                    onChange={handleChange}
                    disabled
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Transfer
              </button>
            </form>
          </>
        ) : (
          <h2 style={{ color: "red", textAlign: "center" }}>
            Please Select Medicine
          </h2>
        )}
      </ModalComp>
    </>
  );
}
