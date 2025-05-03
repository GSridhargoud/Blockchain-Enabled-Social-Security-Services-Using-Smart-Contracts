const NameStore = artifacts.require("NameStore");

module.exports = function (deployer) {
  // Deploy the contract to the network
  deployer.deploy(NameStore);
};
