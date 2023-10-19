import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-modal';
Modal.setAppElement('#root'); // replace #root with the ID of your root element


// App.js
import React,{useState} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import {
  Admin,AddUsers,ViewUsers,
  // UpdateUserData,
  Manufacturer,Medicine,RawMaterial,
  Supplier,AddRawMaterial,SupplierInventory,ViewMaterialRequests,
  Distributor,DistributorMedicine,DistributorMedicineInventory,
  DistributeMedicine,
  Retailor,BuyMedicine,ViewOrderMedicine,
  RetailorInventory,RetailorMedicineOrder,
  Customer,VerifyMedicine,UpdateData
} from "./entities/index";
import "./App.css";
// component
import { Login, Register, Protected } from "./components/index";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import OrderPage from "./components/OrderPage";


// import LoadingBar from 'react-top-loading-bar'

export default function App() {
  // const [progress, setProgress] = useState(0);

  // let setProgressLoader = (value)=>{
  //   setProgress(value);
  // }
  
  return (
   <>

{/* <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(30)}
      /> */}
      {/* <button onClick={() => setProgress(progress + 10)}>Add 10%</button>
      <button onClick={() => setProgress(progress + 20)}>Add 20%</button>
      <button onClick={() => setProgress(100)}>Complete</button>
      <br /> */}

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


   <BrowserRouter>
   <Routes>
     {/* <Route path="/" element={<Protected Component={Home} />} /> */}
     <Route path="/" exact element={<Home />} >
        <Route path="/about-us" element={<About/>}/>
        <Route path="/contact-us" element={<Contact/>}/>
         <Route path="/login" exact element={<Login />} />
         <Route path="/signup" element={<Register />} />
      </Route>

     {/* <Route element={<ProtectedRoute/>}>
       <Route path="/admin/*" element={<Admin />}  />
     </Route> */}
  

  
  <Route path="/admin" element={<Protected Component={Admin}/>}> 
      <Route path="add-users" element={<AddUsers />} />
      <Route path="view-users" element={<ViewUsers />}/>
      {/* <Route path="view-users/:id" element={<UpdateUserData />}/> */}
    </Route>
     
     {/* Manufacturer Nested Routing */}
     <Route path="/manufacturer"element={<Protected Component={Manufacturer} />}>
       <Route path="medicine/*" element={<Medicine />} />
       <Route path="raw-material/*" element={<RawMaterial />} />
      </Route>

     {/* Supplier Nested Routing */}
     <Route path="/supplier" element={<Protected Component={Supplier} />}>
       <Route path="add-material" element={<AddRawMaterial />}/>
       <Route path="supplier-inventory" element={<SupplierInventory />}/>
       <Route path="view-material-request" element={<ViewMaterialRequests />}/>
     </Route>

     {/* Distributor Nested Routing */} 
     <Route path="/distributor" element={<Protected Component={Distributor} />}>
       <Route path="medicine/*" element={<DistributorMedicine />} />
       {/* <Route path="order-medicine" element={<RequestMedicine />} />
       <Route path="view-response" element={<ViewResponse />} /> */}
       <Route path="distributor-medicine-inventory" element={<DistributorMedicineInventory />} />
       <Route path="distribute-response" element={<DistributeMedicine />} />
       <Route path="medicine-order" element={<RetailorMedicineOrder />} />
     </Route>

     {/* Retailor Nested Routing */}
     <Route path="/retailor" element={<Protected Component={Retailor} />}>
       <Route path="buy-medicine" element={<BuyMedicine />} />
       <Route path="view-order-medicine" element={<ViewOrderMedicine />} />
       <Route path="retailor-inventory" element={<RetailorInventory />} />
     </Route>

     {/* Customer Nested Routing */}
     <Route path="/customer" element={<Protected Component={Customer} />}>
       <Route path="verify-medicine" element={<VerifyMedicine />} />
       <Route path="update-data" element={<UpdateData />} />
     </Route>

     <Route path="/*" element={<ErrorPage />} />
   </Routes>
   {/* <Footer/> */}
 </BrowserRouter>
   </>
  );
}
