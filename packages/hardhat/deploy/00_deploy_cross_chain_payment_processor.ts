import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCrossChainPaymentProcessor: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("CrossChainPaymentProcessor", {
    from: deployer,
    args: [
      "0x114A20A10b43D4115e5aeef7345a1A71d2a60C57", // Optimism Sepolia
      "0xE4aB69C077896252FAFBD49EFD26B5D171A32410", // LINK
    ],
    log: true,
    autoMine: true,
  });
};

export default deployCrossChainPaymentProcessor;

deployCrossChainPaymentProcessor.tags = ["CrossChainPaymentProcessor"];
