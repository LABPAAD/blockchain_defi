
async function main() {
    
    const [deployer] = await ethers.getSigners();

    // Grab the contract factory 
    const MyNFT = await ethers.getContractFactory("MyNFTs");

    // Estime o gás necessário para o deploy
    const estimatedGas = await MyNFT.signer.estimateGas(MyNFT.getDeployTransaction(deployer.address));
    const nonce = await ethers.provider.getTransactionCount(deployer.address);
    console.log(nonce)
}
main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
  });