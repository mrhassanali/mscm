// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import web3
// import Web3 from 'web3';

// Admin 
import Admin from "./entities/Admin/Admin";
import AddUsers from "./entities/Admin/AddUsers";
import ViewUsers from "./entities/Admin/ViewUsers";
// Manufacturer
import Manufacturer from "./entities/Manufacturer/Manufacturer";
import Medicine from "./entities/Manufacturer/Medicine";
// import AddMedicine from "./entities/Manufacturer/AddMedicine";
import RequestRawMaterial from "./entities/Manufacturer/RequestRawMaterial";
import ViewRequest from "./entities/Manufacturer/ViewRequest";
import RawMaterial from "./entities/Manufacturer/RawMaterial";
import TransferMedicine from "./entities/Manufacturer/TransferMedicine";
// Supplier
import Supplier from "./entities/Supplier/Supplier";
import ViewMaterialRequests from "./entities/Supplier/ViewRequestMaterial";
// Distributor
import Distributor from "./entities/Distributor/Distributor";
import RequestMedicine from "./entities/Distributor/RequestMedicine";
import ViewResponse from "./entities/Distributor/ViewResponse";
import DistributeMedicine from "./entities/Distributor/DistributeMedicine";

// Retailor
import Retailor from "./entities/Retailor/Retailor";
import SellMedicine from "./entities/test/SellMedicine";
import RetailorInventory from "./entities/Retailor/RetailorInventory";
// Customer
import Customer from "./entities/Customer/Customer";
import VerifyMedicine from "./entities/Customer/VerifyMedicine";

// component
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Protected from "./components/Protected";

export default function App() {

  const handleChildDataChange = (data) => {
    // do something with the data
  };

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* Admin Nested Routing */}
        {/* <Route path="/" element={<Protected Component={Home} />} /> */}
        <Route path="/" element={<Protected Component={Home} />} />
        <Route path="/login" element={<Login onDataChange={handleChildDataChange}/>} />
        <Route path="/register" element={<Register />} />

        {/* Admin Nested Routing */}
        <Route path="/admin" element={<Protected Component={Admin} />}>
          <Route path="add-users" element={<AddUsers />} />
          <Route path="view-users" element={<ViewUsers />} />
        </Route> 

        {/* Manufacturer Nested Routing */}
        <Route path="/manufacturer" element={<Protected Component={Manufacturer} />}>
          <Route path="medicine/*" element={<Medicine />} />
          <Route path="raw-material/*" element={<RawMaterial />}/>
          <Route path="transfer-medicine/*" element={<TransferMedicine />}/>
        </Route>

        {/* Supplier Nested Routing */}
        <Route path="/supplier" element={<Protected Component={Supplier} />}>
          <Route path="view-material-request" element={<ViewMaterialRequests />} />
        </Route>

        {/* Distributor Nested Routing */}
        <Route path="/distributor" element={<Protected Component={Distributor} />}>
          <Route path="request-medicine" element={<RequestMedicine/>}/>
          <Route path="view-response" element={<ViewResponse/>}/>
          <Route path="distribute-response" element={<DistributeMedicine/>}/>
        </Route>

        {/* Retailor Nested Routing */}
        <Route path="/retailor" element={<Protected Component={Retailor} />}>
          <Route path="sell-medicine" element={<SellMedicine />} />
          <Route path="retailor-inventory" element={<RetailorInventory />} />
        </Route>

        {/* Customer Nested Routing */}
        <Route path="/customer" element={<Protected Component={Customer} />}>
          <Route path="verify-medicine" element={<VerifyMedicine />} />
        </Route>

        <Route path="/*" element={<ErrorPage />} />
        {/* <Route path="/*" element={<Navigate to="/" />} /> */}
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}
