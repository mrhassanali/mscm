var CustomerContract = artifacts.require("CustomerContract");

module.exports = function(deployer) {
  deployer.deploy(CustomerContract);
};