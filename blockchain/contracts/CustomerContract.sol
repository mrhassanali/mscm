// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CustomerContract {
    struct Customer {
        address walletAddress;
        string name;
        string fatherName;
        string emailAddress;
        uint phoneNumber;
        string homeAddress;
        string role;
        string password;
        string accountStatus;
    }

    mapping(uint => Customer) public customers;
    uint public customerCounter = 1;

    function addNewCustomer(address _walletAddress, string memory _name, string memory _fatherName, string memory _emailAddress, uint _phoneNumber, string memory _homeAddress, string memory _password) public {
        Customer memory newCustomer = Customer(_walletAddress, _name, _fatherName, _emailAddress, _phoneNumber, _homeAddress, "customer", _password,"Active");
        customers[customerCounter] = newCustomer;
        customerCounter ++;
    }

   function updateCustomerData(address _walletAddress, string memory _name, string memory _fatherName, string memory _emailAddress, uint _phoneNumber, string memory _homeAddress, string memory _password) public {
    // Loop through the customer mapping to find the customer with the given wallet address
    for (uint i = 1; i < customerCounter; i++) {
        if (customers[i].walletAddress == _walletAddress) {
            // Update the customer's data
            customers[i].name = _name;
            customers[i].fatherName = _fatherName;
            customers[i].emailAddress = _emailAddress;
            customers[i].phoneNumber = _phoneNumber;
            customers[i].homeAddress = _homeAddress;
            customers[i].role = "customer";
            customers[i].password = _password;
            break;
        }
    }
}


function UpdateAccountStatus(address _walletAddress, string memory accountStatus) public {
    // Loop through the customer mapping to find the customer with the given wallet address
    for (uint i = 1; i < customerCounter; i++) {
        if (customers[i].walletAddress == _walletAddress) {
            // Update the customer's account status
            customers[i].accountStatus = accountStatus;
            break;
        }
    }
}

function UpdateCustomerPassword(address _walletAddress, string memory password) public {
    // Loop through the customer mapping to find the customer with the given wallet address
    for (uint i = 1; i < customerCounter; i++) {
        if (customers[i].walletAddress == _walletAddress) {
            // Update the customer's password
            customers[i].password = password;
            break;
        }
    }
}

function getCustomerData(address walletAddress) public view returns (Customer memory) {
    // Loop through the customer mapping to find the customer with the given wallet address
    for (uint i = 1; i < customerCounter; i++) {
        if (customers[i].walletAddress == walletAddress) {
            // Return the customer's data as a tuple
            return customers[i];
        }
    }
    // If no customer is found with the given wallet address, revert the transaction
    revert("No customer found with this wallet address");
}


function getAllCustomer() public view returns (Customer[] memory) {
    Customer[] memory allCustomers = new Customer[](customerCounter-1);
    // Loop through the customer mapping to add all customers to the array
    for (uint i = 1; i < customerCounter; i++) {
        allCustomers[i-1] = customers[i];
    }
    return allCustomers;
}

function getCustomerCount() public view returns (uint) {
    return customerCounter - 1;
}

}
