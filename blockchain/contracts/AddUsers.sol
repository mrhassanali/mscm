// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract AddUsers {
    struct User {
        string name;
        string fatherName;
        string emailAddress;
        string phonenumber;
        string role;
        string homeaddress;
        string city;
        string postalcode;
        bool accountStatus;
        address walletAddress;
        string password;
    }

    mapping (address => User) public users;
    address public admin;
    address[] public addressList;

    constructor(address _walletAddress, string memory _role, bool _accountStatus, string memory _password) {
        admin = msg.sender;
        addUser("", "", "", "", _password, _role, "", "", "", _accountStatus, _walletAddress);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function addUser(string memory _name, string memory _fatherName, string memory _emailAddress, string memory _phonenumber, string memory _password, string memory _role, string memory _homeaddress, string memory _city, string memory _postalcode, bool _accountStatus, address _walletAddress) public onlyAdmin {
        User storage user = users[_walletAddress];
        user.name = _name;
        user.fatherName = _fatherName;
        user.emailAddress = _emailAddress;
        user.phonenumber = _phonenumber;
        user.password = _password;
        user.role = _role;
        user.homeaddress = _homeaddress;
        user.city = _city;
        user.postalcode = _postalcode;
        user.accountStatus = _accountStatus;
        user.walletAddress = _walletAddress;
        addressList.push(_walletAddress);
    }

   

    function updateUserDetails(
        string memory _name,
        string memory _fatherName,
        string memory _emailAddress,
        string memory _phonenumber,
        string memory _password,
        string memory _homeaddress,
        string memory _city,
        string memory _postalcode,
        bool _accountStatus,
        string memory _role,
        address _walletAddress
    ) public {
        require(msg.sender == _walletAddress || msg.sender == admin, "You are not authorized to update this user's details");
        User storage user = users[_walletAddress];
        user.name = _name;
        user.fatherName = _fatherName;
        user.emailAddress = _emailAddress;
        user.phonenumber = _phonenumber;
        user.password = _password;
        user.homeaddress = _homeaddress;
        user.city = _city;
        user.postalcode = _postalcode;
        user.accountStatus = _accountStatus;
        user.role = _role;
    }
     function getAllUsers() public view returns (User[] memory) {
        uint userCount = 0;
        for (uint i = 0; i < addressList.length; i++) {
            if (users[addressList[i]].walletAddress != address(0)) {
                userCount++;
            }
        }
        User[] memory userList = new User[](userCount);
        uint j = 0;
        for (uint i = 0; i < addressList.length; i++) {
            if (users[addressList[i]].walletAddress != address(0)) {
                userList[j] = users[addressList[i]];
                j++;
            }
        }
        return userList;
    }


    function getSuppliers() public view returns (User[] memory) {
    uint supplierCount = 0;
    for (uint i = 0; i < addressList.length; i++) {
        if (users[addressList[i]].walletAddress != address(0) && keccak256(bytes(users[addressList[i]].role)) == keccak256(bytes("supplier"))) {
            supplierCount++;
        }
    }
    User[] memory supplierList = new User[](supplierCount);
    uint j = 0;
    for (uint i = 0; i < addressList.length; i++) {
        if (users[addressList[i]].walletAddress != address(0) && keccak256(bytes(users[addressList[i]].role)) == keccak256(bytes("supplier"))) {
            supplierList[j] = users[addressList[i]];
            j++;
        }
    }
    return supplierList;
}

}
