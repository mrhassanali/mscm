import React,{useState,useEffect} from 'react'
import "../../css/Table.css"; 
import ModalComp from "../../components/Modal/ModalComp";
import {getAllMaterials,updateMaterialData} from "./Interact";
import { useSelector } from 'react-redux';
export default function SupplierInventory() {
  const[supplierinventory,setsupplierinventory] = useState([]);
  //For Modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleViewClick=(rowData)=>{
    setSelectedRowData(rowData);
    setIsViewModalOpen(true);
  }
  const handleUpdateClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsUpdateModalOpen(true);
  };
 
  const {walletAddress,name} = useSelector((state) => state.LoginLogout);
  let fetchData = async()=>{
    // let data = await getAllMaterials("0xBBDe65b2166E5B67aC2d9489040fbB0c9A3429E0");
    let data = await getAllMaterials(walletAddress);
    setsupplierinventory(data);
    // console.log(data);
  }
  
useEffect(()=>{
  fetchData();
},[])
const inputEvent = (event) => {
  const { name, value } = event.target;
  setSelectedRowData((preValue) => {
    return {
      // preValue Return the obj that match to name and value
      ...preValue,
      [name]: value,
    };
  });
};

function updateRawMaterial(){
  const{materialName,materialDesc,unitprice,quantity,createdDate,stock} = selectedRowData;

return(
  <div >
  <form onSubmit={handleSubmit}>
  <div className="column">
    <div className="input-box">
      <label>Name</label>
      <input type="text" name="materialName" placeholder="Enter Name"
      value={materialName}
      onChange={inputEvent}
      required/>
    </div>

    <div className="input-box">
      <label>Unit Price</label>
      <input type="number" name="unitprice" placeholder="Enter price"
      value={unitprice}
      onChange={inputEvent}
      required/> 
    </div>
    <div className="input-box">
      <label>Quantity</label>
      <input type="number" name="quantity" placeholder="Enter quantity"
      value={quantity}
      onChange={inputEvent}
      required/>  
    </div>
    </div>
    <div className="input-box">
      <label>Description</label>
      <input type="text" name="materialDesc" placeholder="Enter Description"
      value={materialDesc}
      onChange={inputEvent}/>
    </div>

    <div className="input-box">
        <label>Stock</label>
        <select name="stock" value={stock} onChange={inputEvent} required>
          <option value="DEFAULT" disabled>Select User Role</option>
          <option value="Available">Available</option>
          <option value="out-of-stock">out-of-stock</option>
        </select>
      </div>
    <button type='submit' className='btn btn-primary'>Update Raw Material</button>
  </form>
</div>
)
}

function viewRawMaterial(){
  const{materialName,materialDesc,unitprice,quantity,createdDate,stock} = selectedRowData;
  return(
    <div>
      <div>
        <div><b>Material Name :</b> <span>{materialName}</span></div>
        <div><b>Description :</b> <span>{materialDesc}</span></div>
        <div><b>Unit Price :</b> <span>{unitprice}</span></div>
        <div><b>Quantity :</b> <span>{quantity}</span></div>
        <div><b>Created Date :</b> <span>{createdDate}</span></div>
        <div><b>Stock :</b> <span>{stock}</span></div>
      </div>
    </div>
    )
} 

const handleSubmit = (e) => {
  e.preventDefault();
  // collect form Data  
  const data = new FormData(e.target);

  const dt = { 
    materialName: data.get("materialName"),
    materialDesc: data.get("materialDesc"),
    unitprice: data.get("unitprice"),
    quantity: data.get("quantity"),
    stock: data.get("stock"),
    materialID:selectedRowData.materialID,
    createdDate:selectedRowData.createdDate
  }; 
  updateMaterialData(dt);
  // console.log(dt);
  // console.log(result);
  // e.target.reset();
  
  setIsUpdateModalOpen(false);
  setSelectedRowData(null);
};


    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Material ID</th>
              <th>Material Names</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Stock</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
{
supplierinventory.map((element,index)=>{
return(
  <tr key={index}>
  <td>{element.materialID}</td>
  <td>{element.materialName}</td>
  <td>{element.materialDesc}</td>
  <td>{element.quantity}</td>
  <td>{element.unitprice}</td>
  <td>{element.stock}</td>
  <td> 
    <button type="button" className="btn btn-primary" onClick={() => handleViewClick(element)}> View</button>
    <button type="button" className="btn btn-primary" onClick={() => handleUpdateClick(element)}> Update</button>
  </td>
  </tr>
  )
})
}
</tbody>
</table>

<ModalComp isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}
title="Update Raw Mateial">
{selectedRowData && (updateRawMaterial())}
</ModalComp>

<ModalComp isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}
title="View Raw Mateial">
{selectedRowData && (viewRawMaterial())}
</ModalComp>

      </div>

      
    );
  }
