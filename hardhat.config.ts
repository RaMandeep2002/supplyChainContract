import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const { vars } = require('hardhat/config');
const SEPOLIA_API_KEY = vars.get('SEPOLIA_API_KEY');
const POLYGONSCAN_API_KEY = vars.get('POLYGONSCAN_API_KEY');
const SEPOLIA_PRIVATE_KEY = vars.get('SEPOLIA_PRIVATE_KEY');
const POLYGONSCAN_PRIVATE_KEY = vars.get('POLYGONSCAN_PRIVATE_KEY');
const config: HardhatUserConfig = {
  solidity: "0.8.24",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_API_KEY}`,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${POLYGONSCAN_API_KEY}`,
      accounts: [`0x${POLYGONSCAN_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: 'VZ97F7WFYYFCNATVRH5U4BFSMA948VP3IR',
  },
};

export default config;
