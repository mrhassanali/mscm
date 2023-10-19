import React, { useState, useEffect } from "react";
import "../../css/Form.css";

import { customerVerifyMedicine } from "../Retailor/Interact";

export default function VerifyMedicine() {
  const [searchResult, setSearchResult] = useState();
  const [medicineDetails,setMedicineDetails]= useState();

  let pageTitle = "Verify Medicine";

  useEffect(() => {
    document.title = "Verify Medicine";
  }, []);

  let searchMedicine = async (uniqueIdentifier) => {
    customerVerifyMedicine(uniqueIdentifier).then((result)=>{
      setSearchResult(result);
      console.log(result);
      console.log(JSON.parse(result.medicineDetails)[0].medicineName);

    });
    console.log(uniqueIdentifier);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let uniqueIdentifier = data.get("uniqueIdentifier");
    searchMedicine(uniqueIdentifier);
  };


  let searchResultFunc = ()=>{
    return(
      <div className="form-container">
  <table>
    <tbody>
      <tr>
        <td className="result-table-td">Medicine ID</td>
        <td>{searchResult.uniqueIdentifier}</td>
      </tr>
      <tr>
        <td className="result-table-td">Medicine Name</td>
        <td>{JSON.parse(searchResult.medicineDetails)[0].medicineName}</td>
      </tr>
      <tr>
        <td className="result-table-td">Medicine Formula</td>
        <td>{JSON.parse(searchResult.medicineDetails)[0].medicineFormula}</td>
      </tr>
      <tr>
        <td className="result-table-td">Medicine Description</td>
        <td>{JSON.parse(searchResult.medicineDetails)[0].medicineDescription}</td>
      </tr>
      <tr>
        <td className="result-table-td">Medicine Price</td>
        <td>{searchResult.medicinePrice}</td>
      </tr>
      <tr> 
        <td className="result-table-td">Manufacturer Date</td>
        <td>{JSON.parse(searchResult.medicineDetails)[0].medicineManufacturerDate}</td>
      </tr>
      <tr>
        <td className="result-table-td">Expiry Date</td>
        <td>{JSON.parse(searchResult.medicineDetails)[0].medicineExpiryDate}</td>
      </tr>
      <tr>
        <td className="result-table-td" colSpan={2}>
          Customer Address : <b>{searchResult.customerAddress}</b> <br></br>
          Customer Name : <b>{searchResult.customerName}</b> <br></br>
          Email Address : <b>{searchResult.customerEmailAddress}</b> <br></br>
          </td>
      </tr>
      <tr>
        <td className="result-table-td" colSpan={2}>
          Manufacturer Address : <b>{JSON.parse(searchResult.medicineOrderHistory)[0].manufacturerAddress}</b> <br></br>
          {/* Manufacturer Name : <b>0xabc</b> <br></br> */}
          </td>
      </tr>
      <tr>
        <td className="result-table-td" colSpan={2}>
          Distributor Address : <b>{JSON.parse(searchResult.medicineOrderHistory)[0].distributorAddress}</b> <br></br>
          Distributor Name : <b>{JSON.parse(searchResult.medicineOrderHistory)[0].distributorName}</b> <br></br>
          </td>
      </tr>
      <tr>
        <td className="result-table-td" colSpan={2}>
          Retailor Address : <b>{searchResult.retailorAddress}</b> <br></br>
          Retailor Name : <b>{searchResult.retailorName}</b> <br></br>
          </td>
      </tr>
    </tbody>
  </table>
</div>
    )
  }
  return (
    <>
      <div className="form-container">
        <h2>{pageTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Medicine ID</label>
            <input
              type="text"
              placeholder="Enter Medicine Unique ID"
              name="uniqueIdentifier"
              required
            />
          </div>
          <button type="submit">Check Medicine</button>
        </form>

        <hr />
        <br></br>
        <br></br>

      </div>
 
{
  searchResult?searchResultFunc():""
}     
    </>
  );
}
