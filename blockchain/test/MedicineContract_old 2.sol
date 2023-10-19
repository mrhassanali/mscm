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

    // Define a struct for each medicine
    struct Medicine {
        uint medicineID; // A unique ID for each medicine
        string uniqueIdentifier; // A unique identifier for each medicine
        string medicineName; // The name of the medicine
        string medicineFormula; // The formula of the medicine
        string medicineDescription; // The description of the medicine
        uint price; // The price of the medicine
        string manufacturerData; // The date of manufacture of the medicine
        string expiryDate; // The expiry date of the medicine
        string orderDate; // The date of order of the medicine
        string distributorAddress; // The address of the distributor of the medicine
        string status; // The status of the delivery of the medicine
    }

    // Define a mapping to store medicines by their unique identifiers
    mapping (string => Medicine) public medicines;

    // Define a function to add a new medicine
function addMedicine(
        uint _medicineID,
        string memory _uniqueIdentifier,
        string memory _medicineName,
        string memory _medicineFormula,
        string memory _medicineDescription,
        uint _price,
        string memory _manufacturerData,
        string memory _expiryDate,
        address _manufacturer
    ) public {
        // Check if the caller is the manufacturer
        require(msg.sender == _manufacturer, "Only the manufacturer can call this function");

        // Check if the unique identifier is already taken
        require(medicines[_uniqueIdentifier].medicineID == 0, "This unique identifier is already taken");

        // Create a new medicine struct and store it in the mapping
        medicines[_uniqueIdentifier] = Medicine(
            _medicineID,
            _uniqueIdentifier,
            _medicineName,
            _medicineFormula,
            _medicineDescription,
            _price,
            _manufacturerData,
            _expiryDate,
            "",
            "",
            "Not ordered"
        );
    }


    // Define a function to update a medicine
    function updateMedicine(
        string memory _uniqueIdentifier,
        string memory _orderDate,
        string memory _distributorAddress,
        string memory _status,
        address _manufacturer
    ) public {
        // Check if the caller is the manufacturer
        require(msg.sender == _manufacturer, "Only the manufacturer can call this function");

        // Check if the unique identifier exists
        require(medicines[_uniqueIdentifier].medicineID != 0, "This unique identifier does not exist");

        // Update the order date, distributor address and status of the medicine in the mapping
        medicines[_uniqueIdentifier].orderDate = _orderDate;
        medicines[_uniqueIdentifier].distributorAddress = _distributorAddress;
        medicines[_uniqueIdentifier].status = _status;
    }

    // Define a function to delete a medicine using its unique identifier
    function deleteMedicine(string memory _uniqueIdentifier, address _manufacturer) public {
        // Check if the caller is the manufacturer
        require(msg.sender == _manufacturer, "Only the manufacturer can call this function");

        // Check if the medicine exists
        require(medicines[_uniqueIdentifier].medicineID != 0, "This unique identifier does not exist");

        // Delete the medicine from the mapping
        delete medicines[_uniqueIdentifier];
    }

   function getMedicineDetails(string memory _uniqueIdentifier) public view returns (
        uint medicineID,
        string memory uniqueIdentifier,
        string memory medicineName,
        string memory medicineFormula,
        string memory medicineDescription,
        uint price,
        string memory manufacturerData,
        string memory expiryDate,
        string memory orderDate,
        string memory distributorAddress,
        string memory status
    ) {
        // Check if the medicine with the given unique identifier exists
        require(medicines[_uniqueIdentifier].medicineID != 0, "This unique identifier does not exist");
        // Get the medicine details from the mapping
        Medicine storage medicine = medicines[_uniqueIdentifier];
        // Return the medicine details
        return (
            medicine.medicineID,
            medicine.uniqueIdentifier,
            medicine.medicineName,
            medicine.medicineFormula,
            medicine.medicineDescription,
            medicine.price,
            medicine.manufacturerData,
            medicine.expiryDate,
            medicine.orderDate,
            medicine.distributorAddress,
            medicine.status
        );
    }


    function getMedicineByID(uint _medicineID) public view returns (
    uint medicineID,
    string memory uniqueIdentifier,
    string memory medicineName,
    string memory medicineFormula,
    string memory medicineDescription,
    uint price,
    string memory manufacturerData,
    string memory expiryDate,
    string memory orderDate,
    string memory distributorAddress,
    string memory status
) {
    // Retrieve the Medicine struct from the mapping by its medicineID
    Medicine memory medicine = medicines[manufacturerInventory[_medicineID].medicineName];

    // Return the Medicine struct values as individual return variables
    return (
        medicine.medicineID,
        medicine.uniqueIdentifier,
        medicine.medicineName,
        medicine.medicineFormula,
        medicine.medicineDescription,
        medicine.price,
        medicine.manufacturerData,
        medicine.expiryDate,
        medicine.orderDate,
        medicine.distributorAddress,
        medicine.status
    );
}

}