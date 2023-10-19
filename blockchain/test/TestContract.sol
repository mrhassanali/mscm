// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
    
    struct User {
        string name;
        uint256 key;
    }
    
    User[] public users;
    
    function addUsers(User[] memory _users) public {
        for (uint i = 0; i < _users.length; i++) {
            users.push(User(_users[i].name, _users[i].key));
        }
    }
    
    function testAddUsers() public {
        User[] memory testUsers = new User[](2);
        testUsers[0] = User({name: "Alice", key: 1});
        testUsers[1] = User({name: "Bob", key: 2});
        addUsers(testUsers);
    }
    
    function showUsers() public view returns (User[] memory) {
        return users;
    }
}

