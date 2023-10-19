import { useParams,useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {getMedicineUsingID,TransferMedicine} from "./Interact";
import ModalComp from "../../components/Modal/ModalComp";

const ViewMedicineNextPage = () => {
 const[medicineList,setMedicineList] = useState();

  const { id } = useParams();
 const location = useLocation();


  useEffect(() => {
    document.title = "View Medicine";
   

    let data =  getMedicineUsingID(id);
    data.then((result)=>{
      if(result.length>0){
        setMedicineList(result);
      }else{
        
        setMedicineList(false);
      }
        // console.log(result);
    })

  }, []);

 function showMedicine(){
    const{
      medicineID,medicineName,medicineFormula,medicineDescription,quantity,manufacturerData,expiryDate,manufacturer,price
     } = location.state; 
  
    let tdStyle = {
      textAlign:"left",
      width:"300px"
    }
    let tdStyle2 = {
      textAlign:"left"
    }
  return(
    <div>
      <table style={{fontSize:"2.2rem"}}>
  <tbody>
  <tr>
    <td style={tdStyle}><b>Medicine id</b></td>
    <td style={tdStyle2}>{medicineID}</td>
  </tr>
  <tr>
    <td style={tdStyle}><b>Medicine Name</b></td>
    <td style={tdStyle2}>{medicineName}</td>
  </tr>
  <tr>
    <td style={tdStyle}><b>Medicine Formula</b></td>
    <td style={tdStyle2}>{medicineFormula}</td>
  </tr>
  <tr>
    <td style={tdStyle}><b>Medicine Quantity</b></td>
    <td style={tdStyle2}>{quantity}</td>
  </tr>
  <tr>
    <td style={tdStyle}><b>Medicine Description</b></td>
    <td style={tdStyle2}>{medicineDescription}</td>
  </tr>
  <tr>
    <td style={tdStyle}><b>Medicine Price</b></td>
    <td style={tdStyle2}>{price}</td>
  </tr>
  <tr>
    <td style={tdStyle}><b>Medicine Manufacturer Date</b></td>
    {/* <td style={tdStyle2}>{(new Date(manufacturerDate)).toLocaleDateString()}</td> */}
    <td style={tdStyle2}>{manufacturerData}</td>
  </tr>
  <tr>
    <td style={tdStyle}><b>Medicine Expirty Date</b></td>
    {/* <td style={tdStyle2}>{(new Date(expiryDate)).toLocaleDateString()}</td> */}
    <td style={tdStyle2}>{expiryDate}</td>
  </tr>
  </tbody>
  </table>
    </div>
  )
  
  }

//  console.log(location.state);


const [cart, setCart] = useState([]);

  const handleCheckboxChange = (event, uniqueIdentifier) => {
    if (event.target.checked) {
      // Add the unique identifier to the cart
      setCart((prevCart) => [...prevCart, uniqueIdentifier]);
    } else {
      // Remove the unique identifier from the cart
      setCart((prevCart) => prevCart.filter((id) => id !== uniqueIdentifier));
    }
  };



  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const handleEditClick = () => {
 setIsUpdateModalOpen(true);
};


const[isCheckStatusModalOpen,setIsStatusModalOpen] = useState(false);
const[selectedRowData,setSelectedRowData] = useState(false);
const handleViewStatusClick = (rowData) => {
  setSelectedRowData(rowData);
  setIsStatusModalOpen(true);
 };

const handleTransferSubmit = (e)=>{
    e.preventDefault();
    let data = new FormData(e.target);

    let transferMedicineArr = [];
    for(var i = 0; i<cart.length; i++){
        let medicine =
            { 
                uniqueIdentifier:cart[i],
                distributorAddress:data.get("distributorAddress"),
                orderDate:new Date().toISOString().substr(0, 10),
                status:"sold",

                manufacturerAddress: "0x0000000000000000000000000000000000000000",
                medicineID: 0,
                medicineName: "",
                medicineFormula: "",
                medicineDescription: "",
                price: 0,
                manufacturerDate: "",
                expiryDate: ""
            };
            transferMedicineArr.push(medicine);
    }

    TransferMedicine(transferMedicineArr)
    console.log(transferMedicineArr);
    // setIsUpdateModalOpen(false);
 }

  return (
    <div>
      {/* <h2>View Medicine Next Page</h2>
      <p>ID: {id}</p> */}
      {/* Render data for the component */}
      {showMedicine()}
      <br></br>
      <hr></hr>

            <button className='btn btn-primary'
            onClick={handleEditClick}
            style={{
                    position:"fixed",
                    bottom:"40px",
                    right:"40px",
                    borderRadius:"50px",
                    textAlign:"center",
                    boxShadow: "2px 2px 3px #999"
                }}>({cart.length}) Transfer</button>

     <div>

     {
        medicineList?<div>
             <table>
        <thead>
        <tr>
            <th>Select</th>
            <th>Medicine ID</th>
            <th>Status</th>
        </tr>
        </thead>
   <tbody>

    {
            medicineList.map((currValue,index)=>{
                return(
                    <tr key={index}>
                        <td>
{((currValue.status).toUpperCase() == "SOLD")?<button type='button' className='btn btn-primary' onClick={()=>handleViewStatusClick(currValue)}>View Details</button>:<input type='checkbox'
onChange={(event) =>handleCheckboxChange(event, currValue.uniqueIdentifier)}
checked={cart.includes(currValue.uniqueIdentifier)}/>
}
                            </td>
                        <td>{currValue.uniqueIdentifier}</td>
                        <td>{(currValue.status == "Not Ordered")?"Available":"Sold"}</td>
                    </tr>
                )
            })
        }

   </tbody>
        
      </table>
        </div>:<h1 style={{color:"red",textAlign:"center",marginTop:"5rem",fontSize:"2.5rem"}}>In this ID Data is Not Present</h1>
     }
     </div>

     <ModalComp isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}
title="Transfer Medicine">
{
    cart.length>0?<>
    <table>
        <tbody>
            <tr>
                <td colSpan={10}><h3>Selected Medicine</h3></td>
            </tr>
            <tr>
           {
            cart.map((element,index)=>{
                return(
                    <td key={index}>{element}</td>
                )
            })
           }
           </tr>
        </tbody>
    </table>

    <form action="#" style={{marginTop:"1rem"}} onSubmit={handleTransferSubmit}>
        <div className='column' style={{columnWidth:"40rem"}}>
        <div className="input-box">
          <label>Distributor Address</label>
          <input
            type="text"
            name="distributorAddress"
            placeholder="Enter Distributor Address"
            required
          />
        </div>
        <div className="input-box">
        <label>Date</label>
        <input
  type="date"
  name="orderDate"
  placeholder="Enter Order Date"
  required
  defaultValue={new Date().toISOString().substr(0, 10)}
  disabled
/>
        </div>
        </div>
        <button type='submit' className='btn btn-primary'>Transfer</button>
        </form>
    </>:<h3 style={{color:"red",textAlign:"center"}}>Please Select Medicine</h3>
}
</ModalComp>



<ModalComp isOpen={isCheckStatusModalOpen} onClose={() => setIsStatusModalOpen(false)}
title="View Medicine Status">
{/* uniqueIdentifier\medicineID\medicineName\medicineDescription\medicineFormula
\price\manufacturerDate\expiryDate\manufacturerAddress\
distributorAddress\status\orderDate\ */}
{
  selectedRowData && <>
  <div>
    <span>Medicine ID : {selectedRowData.medicineID}</span> <br></br>
    <span>Unique Identifier : {selectedRowData.uniqueIdentifier}</span> <br></br>
    <span>Medicine Name : {selectedRowData.medicineName}</span> <br></br>
    {/* <span>Medicine Description : {selectedRowData.medicineDescription}</span> <br></br> */}
    <span>Medicine Formula : {selectedRowData.medicineFormula}</span> <br></br>
    <span>Price : {selectedRowData.price}</span> <br></br>
    <span>Manufacturer Date : {selectedRowData.manufacturerDate}</span> <br></br>
    <span>Expiry Date : {selectedRowData.expiryDate}</span> <br></br>
   
    <div className='Modalcard'>
    <span>Manufacturer Address : {selectedRowData.manufacturerAddress}</span>
    <span>Distributor Address : {selectedRowData.distributorAddress}</span>
    <span>Status : {selectedRowData.status}</span>
    <span>Order Date : {selectedRowData.orderDate}</span>
      </div>
  </div>
  </>
}
</ModalComp>
    </div>
  );
};


export default ViewMedicineNextPage;