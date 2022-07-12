const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    //what's the private key? what's the rpc url?
    //hardhat generates it during the deployment (remember the 10 fake accounts?)
    console.log(`Deployed contract to: ${simpleStorage.address}`);
    if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes...");
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value is ${currentValue}`);

    //Update the current Value
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is ${updatedValue}`);
}

// async function verify(contractAddress, args){
const verify = async (contractAddress, args) => {
    console.log("Verifying Contract...");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(error);
        }
    }
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
