// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineContract{
 
 struct Medicine{
     uint medicineID;
     string Name;
     string formula;
     string description;
     uint quantity;
     string manufacturerDate;
     string expiryDate;
     address manufacturerID;
     uint price;
 }
 mapping(uint => Medicine) medicineArr;
 


 uint count;
function AddNewMedicine(string memory _Name,string memory _formula,string memory _description,uint _quantity,string memory _manufactureDate,string memory _expiryDate,uint _price) public{
    count ++;
    uint medicineID = count;
    medicineArr[count] = Medicine({
        medicineID: medicineID,
        Name: _Name,
        formula: _formula,
        description: _description,
        quantity: _quantity,
        manufacturerDate: _manufactureDate,
        expiryDate: _expiryDate,
        manufacturerID: msg.sender,
        price: _price
    });
}


function updateMedicine(uint _medicineID, string memory _Name, string memory _formula, string memory _description, uint _quantity, string memory _manufactureDate, string memory _expiryDate, uint _price) public {
    require(medicineArr[_medicineID].manufacturerID == msg.sender, "You are not the manufacturer of this medicine");
    medicineArr[_medicineID] = Medicine(_medicineID, _Name, _formula, _description, _quantity, _manufactureDate, _expiryDate, msg.sender, _price);
}


function deleteMedicine(uint _medicineID) public {
    require(_medicineID <= count, "Medicine ID does not exist");
    require(medicineArr[_medicineID].manufacturerID == msg.sender, "Only the manufacturer can delete this medicine");
    delete medicineArr[_medicineID];
    count--;
}


function TotalMedicine() public view returns(uint Total){
    return count;
}

function AllMedicine() public view returns (Medicine[] memory) {
    uint matchingCount = 0;
    for (uint i = 1; i <= count; i++) {
        if (medicineArr[i].manufacturerID == msg.sender) {
            matchingCount++;
        }
    }
    Medicine[] memory md = new Medicine[](matchingCount);
    uint j = 0;
    for (uint i = 1; i <= count; i++) {
        if (medicineArr[i].manufacturerID == msg.sender) {
            md[j] = medicineArr[i];
            j++;
        }
    }
    return md;
}
}