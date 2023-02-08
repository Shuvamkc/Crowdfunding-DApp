require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */

const Goerli_Url = process.env.Goerli_Url;
const Private_Key= process.env.Private_key;
const Etherscan_Api = process.env.Etherscan_Api;

module.exports = {
  networks:{
   goerli :{
     url : Goerli_Url,
     accounts : [Private_Key],
     chainId: 5,
     gas: 2100000,
     gasPrice: 8000000000,
   },
  },
  solidity: "0.8.17",
  etherscan :{
    apiKey : Etherscan_Api
  },
};
