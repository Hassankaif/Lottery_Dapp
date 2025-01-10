const Lottery = artifacts.require("Lottery");

module.exports = function (deployer) {
  deployer.deploy(Lottery, { gas: 6721975 }); // Set an appropriate gas limit
};
