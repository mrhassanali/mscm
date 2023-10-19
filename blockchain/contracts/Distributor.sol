// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Distributor {
    struct orderMedicine {
        uint orderID;
        address distributorAddress;
        string distributorLocation;
        string distributorName;
        address manufacturerAddress;
        string manufacturerName;
        string orderDetails;
        string orderDateTime;
        uint totalPrice;
        string orderStatus;
        string orderAcceptDateTime;
    }

    mapping(uint => orderMedicine) public orderMedicines;
    uint public orderCounter = 1;

    function placeMedicineOrder(
        address _distributorAddress,
        string memory _distributorLocation,
        string memory _distributorName,
        address _manufacturerAddress,
        string memory _manufacturerName,
        string memory _orderDetails,
        string memory _orderDateTime,
        uint _totalPrice
        ) public {
        orderMedicine storage order = orderMedicines[orderCounter];
        order.orderID = orderCounter;
        order.distributorAddress = _distributorAddress;
        order.distributorLocation = _distributorLocation;
        order.distributorName = _distributorName;
        order.manufacturerAddress = _manufacturerAddress;
        order.manufacturerName = _manufacturerName;
        order.orderDetails = _orderDetails;
        order.orderDateTime = _orderDateTime;
        order.totalPrice = _totalPrice;
        order.orderStatus = "Pending";
        order.orderAcceptDateTime = "null";
        orderCounter++;
    }

    function acceptMedicineOrder(uint _orderID, string memory _orderStatus, string memory _orderAcceptDateTime) public {
        orderMedicine storage order = orderMedicines[_orderID];
        
        // Check if the caller is the manufacturer
        require(order.manufacturerAddress == msg.sender, "Only the manufacturer can update the order status and accept date time.");
        
        // Update the order status and accept date time
        order.orderStatus = _orderStatus;
        order.orderAcceptDateTime = _orderAcceptDateTime;
    }

    function getManufacturerAllOrder(address _manufacturerAddress) public view returns (orderMedicine[] memory) {
        uint orderCount = 0;
        
        // Get the total number of orders placed by the manufacturer
        for (uint i = 1; i < orderCounter; i++) {
            if (orderMedicines[i].manufacturerAddress == _manufacturerAddress) {
                orderCount++;
            }
        }
        
        // Create a new array to hold all the orders placed by the manufacturer
        orderMedicine[] memory manufacturerOrders = new orderMedicine[](orderCount);
        uint index = 0;
        
        // Loop through all the orders and add the ones placed by the manufacturer to the array
        for (uint i = 1; i < orderCounter; i++) {
            if (orderMedicines[i].manufacturerAddress == _manufacturerAddress) {
                manufacturerOrders[index] = orderMedicines[i];
                index++;
            }
        }
        
        return manufacturerOrders;
    }

    function getDistributorAllOrder(address _distributorAddress) public view returns (orderMedicine[] memory) {
        uint orderCount = 0;
        
        // Get the total number of orders placed by the distributor
        for (uint i = 1; i <= orderCounter; i++) {
            if (orderMedicines[i].distributorAddress == _distributorAddress) {
                orderCount++;
            }
        }
        
        // Create a new array to hold all the orders placed by the distributor
        orderMedicine[] memory distributorOrders = new orderMedicine[](orderCount);
        uint index = 0;
        
        // Loop through all the orders and add the ones placed by the distributor to the array
        for (uint i = 1; i <= orderCounter; i++) {
            if (orderMedicines[i].distributorAddress == _distributorAddress) {
                distributorOrders[index] = orderMedicines[i];
                index++;
            }
        }
        
        return distributorOrders;
    }
}