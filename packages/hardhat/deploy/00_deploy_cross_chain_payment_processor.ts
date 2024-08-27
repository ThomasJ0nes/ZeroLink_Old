import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCrossChainPaymentProcessor: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("CrossChainPaymentProcessor", {
    from: deployer,
    args: ["0xF694E193200268f9a4868e4Aa017A0118C9a8177", "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846"],
    log: true,
    autoMine: true,
  });
};

export default deployCrossChainPaymentProcessor;

deployCrossChainPaymentProcessor.tags = ["CrossChainPaymentProcessor"];
