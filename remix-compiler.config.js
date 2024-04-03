const { vars } = require('hardhat/config');
const SEPOLIA_API_KEY = vars.get('SEPOLIA_API_KEY');
const SEPOLIA_PRIVATE_KEY = vars.get('SEPOLIA_PRIVATE_KEY');
module.exports = {
  solidity: '0.8.24',
  networks: {
    mumbai: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_API_KEY}`,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: 'VZ97F7WFYYFCNATVRH5U4BFSMA948VP3IR',
  },
};
