const Token = artifacts.require('Katcontract');

module.exports = function (deployer) {
  deployer.deploy(Token);
};
