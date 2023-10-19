// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Retailor{

struct retailorMedicine{
    uint retailorOrderID;
    address retailorAddress;
    string retailorName;
    string retailorLocation;

    address distributorAddress;
    
    string uniqueIdentifier;
    string medicineDetails; // Accept Medicien JSON.stringify() Array
    string retailorOrderDateTime;
    string retailorOrderStatus; // Pending / Rejected / Accepted
    string OrderAcceptRejectDate;
    string retailorPurchasetotalPrice;
    string orderHistory; // contain Manufacturer and distributor Details
}
mapping (uint => retailorMedicine) public retailorOrderStruct;

uint public retailorCounter = 1;
event RetailOrderPlaced(uint indexed retailOrderID, string message); //creating Event
function placeRetailorOrder(retailorMedicine[] memory _retailorMedicines) public {
    for (uint i = 0; i < _retailorMedicines.length; i++) {
        retailorMedicine memory newOrder = retailorMedicine({
            retailorOrderID: retailorCounter,
            retailorAddress: _retailorMedicines[i].retailorAddress,
            retailorName: _retailorMedicines[i].retailorName,
            retailorLocation: _retailorMedicines[i].retailorLocation,
            
            distributorAddress:_retailorMedicines[i].distributorAddress,
            
            uniqueIdentifier: _retailorMedicines[i].uniqueIdentifier,
            medicineDetails: _retailorMedicines[i].medicineDetails,
            retailorOrderDateTime: _retailorMedicines[i].retailorOrderDateTime,
            retailorOrderStatus: "Pending",
            OrderAcceptRejectDate: _retailorMedicines[i].OrderAcceptRejectDate,
            retailorPurchasetotalPrice: _retailorMedicines[i].retailorPurchasetotalPrice,
            orderHistory: _retailorMedicines[i].orderHistory
        });
        
        retailorOrderStruct[retailorCounter] = newOrder;
        emit RetailOrderPlaced(retailorCounter, "Retail order placed successfully");
        retailorCounter++;
    }
}

function updateMedicinePrice(string memory _uniqueIdentifier, string memory _medicineDetails) public {
  bool found = false;
  for (uint i = 1; i < retailorCounter; i++) {
    if (keccak256(bytes(retailorOrderStruct[i].uniqueIdentifier)) == keccak256(bytes(_uniqueIdentifier)) &&
        retailorOrderStruct[i].retailorAddress == msg.sender) {
      found = true;
      retailorOrderStruct[i].medicineDetails = _medicineDetails;
      break;
    }
  }
  require(found, "Medicine not found for the given unique identifier and retailor address");
}

function AcceptRejectOrder(uint _retailorOrderID, string memory _retailorOrderStatus, string memory _OrderAcceptRejectDate) public {
    require(retailorOrderStruct[_retailorOrderID].retailorOrderID != 0, "Retailor order not found");
    require(msg.sender == retailorOrderStruct[_retailorOrderID].distributorAddress, "Only the distributor who was assigned the order can update its status");
    retailorOrderStruct[_retailorOrderID].retailorOrderStatus = _retailorOrderStatus;
    retailorOrderStruct[_retailorOrderID].OrderAcceptRejectDate = _OrderAcceptRejectDate;
}

function getAllOrder() public view returns (retailorMedicine[] memory) {
    retailorMedicine[] memory orders = new retailorMedicine[](retailorCounter - 1);

    for (uint i = 1; i < retailorCounter; i++) {
        orders[i - 1] = retailorOrderStruct[i];
    }

    return orders;
}

function findMedicine(string memory _uniqueIdentifier) public view returns (retailorMedicine memory) {
        for (uint i = 1; i < retailorCounter; i++) {
            if (keccak256(bytes(retailorOrderStruct[i].uniqueIdentifier)) == keccak256(bytes(_uniqueIdentifier))) {
                return retailorOrderStruct[i];
            }
        }
        revert("Medicine with the given unique identifier not found");
}



struct SellMedicine {
    uint sellID;
    string medicineOrderHistory;
    string medicineDetails;
    address retailorAddress;
    address customerAddress;
    string customerEmailAddress;
    string customerName;
    string sellStatus;
    uint medicinePrice;
    string customerOrderDate;
    string uniqueIdentifier;
}

uint sellCounter = 1;
mapping(uint => SellMedicine) public sellMedicines;

function sellInventoryMedicine(SellMedicine[] memory _sellMedicines) public {
    for (uint i = 0; i < _sellMedicines.length; i++) {
        SellMedicine memory newSellMedicine = SellMedicine({
            sellID: sellCounter,
            medicineOrderHistory: _sellMedicines[i].medicineOrderHistory,
            medicineDetails: _sellMedicines[i].medicineDetails,
            retailorAddress: _sellMedicines[i].retailorAddress,
            customerAddress: _sellMedicines[i].customerAddress,
            customerEmailAddress: _sellMedicines[i].customerEmailAddress,
            customerName: _sellMedicines[i].customerName,
            sellStatus: _sellMedicines[i].sellStatus,
            medicinePrice: _sellMedicines[i].medicinePrice,
            customerOrderDate: _sellMedicines[i].customerOrderDate,
            uniqueIdentifier:_sellMedicines[i].uniqueIdentifier
        });

        sellMedicines[sellCounter] = newSellMedicine;
        sellCounter++;
    }
}
// Getting Customer Medicine using Customer Address

function getCustomerMedicine(address _customerAddress) public view returns (SellMedicine[] memory) {
    uint count = 0;
    for (uint i = 1; i < sellCounter; i++) {
        if (sellMedicines[i].customerAddress == _customerAddress) {
            count++;
        }
    }

    SellMedicine[] memory customerMedicines = new SellMedicine[](count);
    count = 0;
    for (uint i = 1; i < sellCounter; i++) {
        if (sellMedicines[i].customerAddress == _customerAddress) {
            customerMedicines[count] = sellMedicines[i];
            count++;
        }
    }

    return customerMedicines;
}



// Getting All sell Medicine Data
function getAllSellMedicine() public view returns (SellMedicine[] memory) {
    SellMedicine[] memory allSellMedicine = new SellMedicine[](sellCounter - 1);
    for (uint i = 1; i < sellCounter; i++) {
        allSellMedicine[i - 1] = sellMedicines[i];
    }
    return allSellMedicine;
}

function customerFindMedicine(string memory _uniqueIdentifier) public view returns (SellMedicine memory) {
    for (uint i = 1; i < sellCounter; i++) {
        if (keccak256(bytes(sellMedicines[i].uniqueIdentifier)) == keccak256(bytes(_uniqueIdentifier))) {
            return sellMedicines[i];
        }
    }
    revert("Medicine with the given unique identifier not found");
}

}