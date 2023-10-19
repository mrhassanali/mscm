// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract RawMaterial {
    struct Material {
        uint materialID;
        string materialName;
        string materialDesc;
        uint unitprice;
        uint quantity;
        string createdDate;
        address supplierID;
        string stock;
    }

    mapping (uint => Material) materials;
    uint public materialCount;

    function addMaterial(string memory _materialName, string memory _materialDesc, uint _unitprice, uint _quantity,string memory _createdDate, string memory _stock) public {
        materialCount++;
        materials[materialCount] = Material({
         materialID : materialCount,
         materialName : _materialName,
         materialDesc : _materialDesc,
         unitprice : _unitprice,
         quantity : _quantity,
         createdDate : _createdDate,
         supplierID : msg.sender,
         stock : _stock
        });
    }

 
    function updateMaterial(uint _materialID, string memory _materialName, string memory _materialDesc, uint _unitprice, uint _quantity,string memory _createdDate, string memory _stock) public {
        require(_materialID <= materialCount, "Material does not exist");
        require(materials[_materialID].supplierID == msg.sender,"You are Not Permission or Material Not Exist");
        materials[_materialID] = Material({
         materialID : materialCount,
         materialName : _materialName,
         materialDesc : _materialDesc,
         unitprice : _unitprice,
         quantity : _quantity,
         createdDate : _createdDate,
         supplierID : msg.sender,
         stock : _stock
        });
    }


    function getAllMaterials() public view returns (Material[] memory) {
    uint matchingCount = 0;
    for (uint i = 1; i <= materialCount; i++) {
        if (materials[i].supplierID == msg.sender) {
            matchingCount++;
        }
    }
    Material[] memory materialList = new Material[](matchingCount);
    uint j = 0;
    for (uint i = 1; i <= materialCount; i++) {
        if (materials[i].supplierID == msg.sender) {
            materialList[j] = materials[i];
            j++;
        }
    }
    return materialList;
}
}

