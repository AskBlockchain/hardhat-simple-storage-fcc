//imports
const { ethers, run, network } = require("hardhat");

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract....");
  const SimpleStorage = await SimpleStorageFactory.deploy();
  await SimpleStorage.deployed();
  console.log(`Deployed contract to: ${SimpleStorage.address}`);
  //what happens "verify:verify" when we deploy to our hardhat network?
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await SimpleStorage.deployTransaction.wait(6);
    await verify(SimpleStorage.address, []); //[] ~ constructor arguments
  }
  console.log(network.config);

  const currentValue = await SimpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);
  // Update the current value
  const transactionResponse = await SimpleStorage.store(9);
  await transactionResponse.wait(1);
  const updatedValue = await SimpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Vaerified!");
    } else {
      console.log(e);
    }
  }
}

//Call main() function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
