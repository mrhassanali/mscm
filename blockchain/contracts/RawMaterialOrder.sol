// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract RawMaterialOrder {
    struct OrderRawMaterial {
        uint orderID;
        address manufacturerID;
        address supplierID;
        string manufacturerName;
        string orderDetails;
        uint totalPrice;
        string orderTime;
        string orderStatus;
        uint orderStatusUpdateTime;
    }

    mapping(uint => OrderRawMaterial) orderRawMaterials;
    uint orderRawMaterialCounter;

function placeOrderRawMaterial(
        address _manufacturerID,
        address _supplierID,
        string memory _manufacturerName,
        string memory _orderDetails,
        uint _totalPrice,
        string memory _orderTime
    ) public returns (uint) {
        orderRawMaterialCounter++;
        OrderRawMaterial memory order = OrderRawMaterial(
            orderRawMaterialCounter,
            _manufacturerID,
            _supplierID,
            _manufacturerName,
            _orderDetails,
            _totalPrice,
            _orderTime,
            "Pending",
            block.timestamp
        );
        orderRawMaterials[orderRawMaterialCounter] = order;
        return orderRawMaterialCounter;
    }


    function updateOrderStatus(uint _orderID, string memory _orderStatus) public {
        OrderRawMaterial storage order = orderRawMaterials[_orderID];
        order.orderStatus = _orderStatus;
        order.orderStatusUpdateTime = block.timestamp;
    }

    function getOrderRawMaterialDetails(uint _orderID) public view returns (OrderRawMaterial memory) {
        return orderRawMaterials[_orderID];
    }

    function getAllOrderRawMaterialDetails() public view returns (OrderRawMaterial[] memory) {
        OrderRawMaterial[] memory allOrders = new OrderRawMaterial[](orderRawMaterialCounter);
        for (uint i = 1; i <= orderRawMaterialCounter; i++) {
            allOrders[i-1] = orderRawMaterials[i];
        }
        return allOrders;
    }
}
