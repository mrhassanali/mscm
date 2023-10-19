// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineContract {
 
struct MedicineInventory {
    uint medicineID; // A unique ID for each medicine
    string medicineName; // The name of the medicine
    string medicineFormula; // The formula of the medicine
    string medicineDescription; // The description of the medicine
    uint quantity; // The quantity of the medicine
    uint price; // The price of the medicine
    string manufacturerData; // The date of manufacture of the medicine
    string expiryDate; // The expiry date of the medicine
    string status; // The status of the medicine (available/out-of-stock)
    address manufacturer; // The address of the manufacturer who added the medicine
}
// Define a mapping to store medicines by their unique identifiers
mapping (uint => MedicineInventory) public manufacturerInventory;
uint public medicineCounter;

// Define a function to add a new medicine
function addMedicineInventory(
    string memory _medicineName,
    string memory _medicineFormula,
    string memory _medicineDescription,
    uint _quantity,
    uint _price,
    string memory _manufacturerData,
    string memory _expiryDate,
    string memory _status
    ) public {
    // Increment medicine counter
    medicineCounter++;

    // Create a new medicine struct and store it in the mapping
    manufacturerInventory[medicineCounter] = MedicineInventory(
        medicineCounter,
        _medicineName,
        _medicineFormula,
        _medicineDescription,
        _quantity,
        _price,
        _manufacturerData,
        _expiryDate,
        _status,
        msg.sender
    );
    
// Emit a MedicineAdded event
emit MedicineAdded(medicineCounter);
}

// Define a MedicineAdded event
event MedicineAdded(uint medicineID);

function getInventoryCounter() public view returns(uint count){
    return medicineCounter;
}

// Define a function to update a medicine
function updateMedicineInventory(
    uint _medicineID,
    string memory _medicineName,
    string memory _medicineFormula,
    string memory _medicineDescription,
    uint _quantity,
    uint _price,
    string memory _manufacturerData,
    string memory _expiryDate,
    string memory _status
    ) public {
    // Check if the caller is the manufacturer who added the medicine
    require(msg.sender == manufacturerInventory[_medicineID].manufacturer, "Only the manufacturer can update this medicine");
    // Update the medicine in the mapping
    manufacturerInventory[_medicineID].medicineName = _medicineName;
    manufacturerInventory[_medicineID].medicineFormula = _medicineFormula;
    manufacturerInventory[_medicineID].medicineDescription = _medicineDescription;
    manufacturerInventory[_medicineID].quantity = _quantity;
    manufacturerInventory[_medicineID].price = _price;
    manufacturerInventory[_medicineID].manufacturerData = _manufacturerData;
    manufacturerInventory[_medicineID].expiryDate = _expiryDate;
    manufacturerInventory[_medicineID].status = _status;
}



function getAllMedicineInventory(address manufacturerAddress) public view returns (MedicineInventory[] memory) {
    uint matchingCount = 0;
    // Count the number of medicines that belong to the specified manufacturer
    for (uint i = 1; i <= medicineCounter; i++) {
        if (manufacturerInventory[i].manufacturer == manufacturerAddress) {
            matchingCount++;
        }
    }
    // Create a new array to store the matching medicines
    MedicineInventory[] memory matchingMedicines = new MedicineInventory[](matchingCount);
    uint j = 0;
    // Populate the new array with the matching medicines
    for (uint i = 1; i <= medicineCounter; i++) {
        if (manufacturerInventory[i].manufacturer == manufacturerAddress) {
            matchingMedicines[j] = manufacturerInventory[i];
            j++;
        }
    }
    return matchingMedicines;
}




 struct Medicine {
        uint medicineID;
        string uniqueIdentifier;
        string medicineName;
        string medicineFormula;
        string medicineDescription;
        uint price;
        string manufacturerDate;
        string expiryDate;
        string orderDate;
        string distributorAddress;
        string status;
        string manufacturerAddress;
    } 
    
    mapping (string => Medicine) public medicines;
    string[] public medicineList; // Array of all medicine unique identifiers

    uint public medicineCount;

    function addMedicine(Medicine[] memory _medicines) public {
        for (uint i = 0; i < _medicines.length; i++) {
            medicines[_medicines[i].uniqueIdentifier] = _medicines[i];
            medicineList.push(_medicines[i].uniqueIdentifier); // Add unique identifier to list
            medicineCount++;
        }
    }

    function getMedicineCount() public view returns (uint) {
        return medicineCount;
    }


function getMedicinesByID(uint _medicineID) public view returns (Medicine[] memory) {
    Medicine[] memory matchingMedicines = new Medicine[](medicineCount);
    uint count = 0;
    for (uint i = 0; i < medicineList.length; i++) {
        string memory uniqueIdentifier = medicineList[i];
        Medicine memory medicine = medicines[uniqueIdentifier];
        if (medicine.medicineID == _medicineID) {
            matchingMedicines[count] = medicine;
            count++;
        }
    }
    // Resize the array to remove empty elements
    assembly {
        mstore(matchingMedicines, count)
    }
    return matchingMedicines;
}


function findMedicine(string memory _uniqueIdentifier) public view returns (Medicine memory) {
    Medicine memory medicine = medicines[_uniqueIdentifier];
    require(medicine.medicineID != 0, "Medicine not found");
    return medicine;
}



function UpdateMedicine(Medicine[] memory _medicines) public {
    for (uint i = 0; i < _medicines.length; i++) {
        // Check if the medicine exists in the mapping
        require(medicines[_medicines[i].uniqueIdentifier].medicineID != 0, "Medicine not found");
        // Update the orderDate, distributorAddress and status fields
        medicines[_medicines[i].uniqueIdentifier].orderDate = _medicines[i].orderDate;
        medicines[_medicines[i].uniqueIdentifier].distributorAddress = _medicines[i].distributorAddress;
        medicines[_medicines[i].uniqueIdentifier].status = _medicines[i].status;
    }
}




function deleteMedicine(string memory _uniqueIdentifier) public {
    require(medicines[_uniqueIdentifier].medicineID != 0, "Medicine not found");
    delete medicines[_uniqueIdentifier];
    for (uint i = 0; i < medicineList.length; i++) {
        if (keccak256(abi.encodePacked(medicineList[i])) == keccak256(abi.encodePacked(_uniqueIdentifier))) {
            medicineList[i] = medicineList[medicineList.length - 1];
            medicineList.pop();
            break;
        }
    }
    medicineCount--;
}




}