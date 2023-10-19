import React, { useEffect } from 'react'

export default function DistributeMedicine() {
  let pageTitle = "Distribute Medicine";
useEffect(()=>{
  document.title = pageTitle;
},[pageTitle]);
  return (
    <div className="form-container">
        <h2>{pageTitle}</h2>
        <form action='#'> 
            <div className='input-box'>
                <label>Medicine ID</label>
                <input type="text" placeholder="Enter Medicine Name" required />
            </div>
            <div className="column">
                <div className='input-box'>
                    <label>Retailor Address</label>
                    <input type="text" placeholder="Enter Retailor Address" required />
                </div>
                <div className='input-box'>
                    <label>Price</label>
                    <input type="email" placeholder="Father Name" required />
                </div>
            </div>
            <button>{pageTitle}</button>
        </form>
    </div>
  )
}
