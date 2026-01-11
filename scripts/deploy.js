const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const MyContract = await ethers.getContractFactory("NFT");
  const contract = await MyContract.deploy();

  await contract.waitForDeployment?.();
  // const nft = await contract.deployed();

  console.log("Contract deployed to:", contract.target || contract.address);
  const contractBalance = await ethers.provider.getBalance(contract.target);
  console.log("Contract balance:", ethers.formatEther(contractBalance), "ETH");

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });