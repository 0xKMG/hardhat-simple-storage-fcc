require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("@nomiclabs/hardhat-etherscan");
// require("hardhat-gas-reporter");
require("solidity-coverage");
require("./tasks/block-number");

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKET_CAP_KEY = process.env.COINMARKET_CAP_KEY || "key";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    //defaultNetwork: hardhat;
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: Thanks hardhat LOLL
            chainId: 31337,
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET_CAP_KEY,
        token: "MATIC",
    },
};
