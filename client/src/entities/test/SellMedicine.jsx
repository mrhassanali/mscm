import React,{useEffect} from 'react';
import "../../css/Form.css";

export default function VerifyMedicine() {
    let pageTitle = "Sell Medicine";


// let dt = {
//     orderHistory:{
//         manufacturerAddress:manufacturerAddress,		  		  		
//         manufacturerName:manufacturerName,

//         distributorAddress:distributorAddress,
//         distributorName:distributorName,

//         retailorAddress:retailorAddress,
//         retailorName:retailorName,
//     },
//     medicineDetails:{
//         medicineID:medicineID,
//         medicineName:medicineName,
//         medicineFormula:medicineFormula,
//         medicineDescription:medicineDescription,
//         medicineManufacturerDate:medicineManufacturerDate,
//         medicineExpirtyDate:medicineExpirtyDate,
//     },
//     retailorAddress,
//     customerEmailAddress,
//     customerDetails,
// }

    useEffect(() => {
        document.title = "Sell Medicine";
    }, []);
  return (
    <div className="form-container">
        <h2>{pageTitle}</h2>
        <form action='#'>
            <div className='input-box'>
                <label>Medicine ID</label>
                <input type="text" placeholder="Enter Medicine ID" name="MedicineID" required />
            </div>
            <div className='input-box'>
                <label>Customer ID</label>
                <input type="text" placeholder="Enter Customer ID" name="CustomerID" required />
            </div>
            <div className='input-box'>
                <label>Customer Name</label>
                <input type="text" placeholder="Enter Customer Name" name="CustomerName" required />
            </div>
            <button>Sell Medicine</button>
        </form>
    </div>
  )
}
