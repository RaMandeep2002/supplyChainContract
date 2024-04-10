import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("SupplyChain", (m) => {


  const lock = m.contract("SupplyChain");

  return { lock };
});

export default LockModule;
