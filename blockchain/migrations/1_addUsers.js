// var AddUsers = artifacts.require("AddUsers");

// module.exports = function(deployer) {
//   // deployment steps
//   deployer.deploy(AddUsers);
// };

var AddUsers = artifacts.require("AddUsers");

module.exports = function(deployer) {
  deployer.deploy(
    AddUsers,
    "0x26e4d01B4868284B857E9DC42eB0eE02FE33b107", //wallet address
    "admin",
    true,
    "password",
  );
};
