import React,{useState} from 'react'
import {findMedicineUsingUniqueIdentifier} from "./Interact";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchMedicine() {
const[searchData,setSearchData] = useState([]);

    let fetchData=(data)=>{
        findMedicineUsingUniqueIdentifier(data).then((result)=>{
            // setSearchData(result);
            if(result.uniqueIdentifier){
                setSearchData(result);
                toast.success('Medicine Found', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }else{
                toast.error('🦄 Wow so easy!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            // console.log(result);
        }).catch((error)=>{
            console.log(error);
        })
    }

const handleSearchSubmit = (e)=>{
    e.preventDefault();
    setSearchData([]);
    let data = new FormData(e.target);
    let uniqueIdentifier = data.get("uniqueIdentifier");
    fetchData(uniqueIdentifier);
    console.log(uniqueIdentifier);
}

  return (
    <>
     <div className="form-container">
      <form action="#" onSubmit={handleSearchSubmit}>
        <div className="input-box">
          <label>Medicine unique Number</label>
          <input type="text" placeholder="Enter Medicine ID" name='uniqueIdentifier' required />
        </div>
        <button type='submit'>Check Medicine</button>
      </form>

      <hr />
    </div>

    <div>
    {
        searchData.length > 0 ?<div className='form-container'>
            <table>
        <tbody>
            <tr>
                <td style={{textAlign:"left",width:"300px"}}><b>Medicine ID : </b>{searchData.uniqueIdentifier}</td>
            </tr>
            <tr>
                <td style={{textAlign:"left",width:"300px"}}><b>Medicine Price : </b>{searchData.price}</td>
            </tr>
            <tr>
                <td style={{textAlign:"left",width:"300px"}}><b>Medicine Description</b> : {searchData.medicineDescription}</td>
            </tr>
            <tr>
                <td style={{textAlign:"left",width:"300px"}}><b>Manufacturer Address</b> : {searchData.manufacturerAddress}</td>
            </tr>
            <tr>
                <td style={{textAlign:"left",width:"300px"}}><b>Distributor Address</b> : {searchData.distributorAddress}</td>
            </tr>
            <tr>
                <td style={{textAlign:"left",width:"300px"}}><b>Order Date</b> : {(searchData.orderDate)=="null"?"Not Sold":(searchData.orderDate)}</td>
              </tr>
        </tbody>
      </table>
        </div>:""
     }
    </div>
    </>
  )
}
