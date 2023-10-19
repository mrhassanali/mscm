import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement(document.body);

const SearchMedicine = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const tableData = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 40 },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>
                <button onClick={() => handleRowClick(row)}>Open modal</button>
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Row data:</h2>
        {selectedRowData && (
          <div>
            <p>ID: {selectedRowData.id}</p>
            <p>Name: {selectedRowData.name}</p>
            <p>Age: {selectedRowData.age}</p>
          </div>
        )}
        <button onClick={() => setIsModalOpen(false)}>Close modal</button>
      </Modal>
    </div>
  );
};

export default SearchMedicine;
