async function main() {
  const [deployer] = await ethers.getSigners();

  // Obtem o saldo da conta do deployer
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance.toString()), "MATIC");

  // Pega o contrato
  const MyNFT = await ethers.getContractFactory("JAITOKEN");

  // Estime o gás necessário para o deploy
  const estimatedGas = await MyNFT.signer.estimateGas(MyNFT.getDeployTransaction(deployer.address));
  console.log(`Estimated Gas: ${estimatedGas.toString()}`);

  // Recupera o valor atual por unidades de gas
  const currentGasPrice = await ethers.provider.getGasPrice();
  console.log(`Current gas price: ${ethers.utils.formatUnits(currentGasPrice, 'gwei')} Gwei`);
  const currentGasPrice2 = currentGasPrice.add(ethers.utils.parseUnits('2', 'gwei'))
  console.log("Gas price boost: ", ethers.utils.formatUnits(currentGasPrice2, 'gwei'))

  // Define quanto pretende pagar por cada unidade de gas consumida
  const gasPrice = ethers.utils.parseUnits(ethers.utils.formatUnits(currentGasPrice, 'gwei'), 'gwei');

  // Definindo uma margem de seguranca de 25% para o limite de gas
  const gasFraction = estimatedGas.div(4);
  const gasLimit = estimatedGas.add(gasFraction);
  console.log(`Gas Limit: ${gasLimit.toString()}`);

  // // Carrega as informações necessarias para o deploy
  const myNFT = await MyNFT.deploy(deployer.address, {
    // nonce: 0,
    gasLimit: gasLimit,
    gasPrice: gasPrice
  }); // Pass the deployer's address as the initial owner

  console.log("Contract in mempool:", myNFT.address);
  await myNFT.deployed();
  console.log("Contract deployed")
  
}main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});