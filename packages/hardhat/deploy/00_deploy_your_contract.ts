import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys the SubscriptionManager contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deploySubscriptionManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("SubscriptionManager", {
    from: deployer,
    // No constructor arguments needed as of yet 
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying
  const subscriptionManager = await hre.ethers.getContract<Contract>("SubscriptionManager", deployer);
  console.log("SubscriptionManager deployed at:", subscriptionManager.address);
};

export default deploySubscriptionManager;

deploySubscriptionManager.tags = ["SubscriptionManager"];
