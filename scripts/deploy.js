const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployer address:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", hre.ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    throw new Error("Insufficient funds for deployment");
  }

  const IdentityRegistry = await hre.ethers.getContractFactory(
    "IdentityRegistry"
  );

  const identityRegistry = await IdentityRegistry.deploy();

  const receipt = await identityRegistry.deploymentTransaction().wait();

  console.log("IdentityRegistry deployed to:", receipt.contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
