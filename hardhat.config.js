require('dotenv').config();
const { API_URL, PRIVATE_KEY } = process.env;
require("@nomicfoundation/hardhat-verify");

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: `https://api-sepolia.etherscan.io/api`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "3U6FBAJM4SUPYGD3C87X2Q6DYPASCTGDPT"
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
}