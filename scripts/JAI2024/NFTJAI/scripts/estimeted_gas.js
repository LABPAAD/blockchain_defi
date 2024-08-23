const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Obtenha a fábrica do contrato
  const MyNFT = await hre.ethers.getContractFactory("MyNFTs");

  // Estime o gás necessário para o deploy
  const estimatedGas = await MyNFT.signer.estimateGas(MyNFT.getDeployTransaction(deployer.address));
  console.log(`Estimated Gas: ${estimatedGas.toString()}`);

  // Defina o limite de gás com base na estimativa (talvez um pouco mais para segurança)
  const gasLimit = estimatedGas.add(ethers.BigNumber.from('100000'));

  console.log(`Gas Limit: ${gasLimit.toString()}`);

  // Deploy do contrato
  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
