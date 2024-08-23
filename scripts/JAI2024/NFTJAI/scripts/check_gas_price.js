const { ethers } = require("ethers");
require("dotenv").config();

// Conectar ao provedor Alchemy ou outro provedor para Polygon Mainnet
const provider = new ethers.providers.JsonRpcProvider(process.env.API_POLYGON_URL);

// Obter o preço atual do gás
async function getGasPrice() {
  const gasPrice = await provider.getGasPrice();
  console.log(`Current gas price: ${ethers.utils.formatUnits(gasPrice, "gwei")} Gwei`);
  return gasPrice;
}

// Função para estimar o custo
async function estimateMintingCost() {
  const gasPrice = await getGasPrice();
  const estimatedGas = 150000; // Estimativa de unidades de gás para mintar um NFT
  const costInWei = gasPrice.mul(estimatedGas);
  const costInMatic = ethers.utils.formatEther(costInWei);

  console.log(`Estimated cost to mint an NFT: ${costInMatic} MATIC`);
}

// Chame a função para estimar o custo
estimateMintingCost();
