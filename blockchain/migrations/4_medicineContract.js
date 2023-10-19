var MedicineContract = artifacts.require("MedicineContract");

module.exports = function(deployer) {
  deployer.deploy(MedicineContract);
};