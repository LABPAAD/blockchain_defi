require("dotenv").config();
require("@nomiclabs/hardhat-ethers"); // Ensure this is the correct package
//const { API_URL, PRIVATE_KEY } = process.env;
API_URL = process.env.API_URL;
PRIVATE_KEY = process.env.PRIVATE_KEY;
API_POLYGON_TEST = process.env.POLYGON_TEST;
POLYGON_MAINNET = process.env.POLYGON_MAINNET;


module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    amoy: {
      url: API_POLYGON_TEST,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    polygon: {
      url: POLYGON_MAINNET,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};