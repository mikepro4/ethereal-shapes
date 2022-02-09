require("@nomiclabs/hardhat-waffle");
const projectId = "0095c162fff84a3eb7540a929ed0dfa1";
const fs = require("fs")
const keyData = fs.readFileSync("./mykey.text", {
    encoding: "utf8", flag: "r"
})

// const keyData = fs.readFileSync("./polygon-key.text", {
//     encoding: "utf8", flag: "r"
// })


module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
            accounts: [keyData]
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${projectId}`,
            accounts: [keyData]
        },
        ropsten: {
            url: `https://ropsten.infura.io/v3/${projectId}`,
            accounts: [keyData]
        },
        polygon: {
            url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
            accounts: [keyData]
        }
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};
