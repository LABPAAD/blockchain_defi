// require("dotenv").config()
// const API_URL = process.env.API_URL
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
// const web3 = createAlchemyWeb3(API_URL)
// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
// console.log(JSON.stringify(contract.abi))

require('dotenv').config();
//const API_URL = process.env.API_URL;
const API_URL = process.env.POLYGON_MAINNET;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
//const contractAddress = process.env.MY_NFTS_ADDRESS;
const contractAddress = process.env.POLYGON_CONTRACT_MAINNET_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFTs.sol/MyNFTs.json");
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    }
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
    }).catch((err) => {console.log("Promise failed:", err)})
}

async function mintMultipleNFTs(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
  //the transaction
  const recipients = [PUBLIC_KEY,PUBLIC_KEY];
  const tokenURIs = [tokenURI,tokenURI];

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintMultipleNFTs(recipients, tokenURIs).encodeABI(),
  }
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
  }).catch((err) => {console.log("Promise failed:", err)})
}

async function mintMultipleNFTsCustonGas(tokenURI) {
  try {
    console.log("Iniciando o mint")
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); // Obtém o último nonce
    // Define os destinatários e os URIs dos tokens
    // Gas 614748 = 6 adrress
    const recipients = [PUBLIC_KEY, PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY, PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY, PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY, PUBLIC_KEY, PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY, PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY, PUBLIC_KEY,PUBLIC_KEY,PUBLIC_KEY];
    const tokenURIs = [tokenURI, tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI, tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI, tokenURI,tokenURI,tokenURI,tokenURI, tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI, tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI,tokenURI, tokenURI,tokenURI,tokenURI];
    console.log("Quantidades de tokens: ", recipients.length)
    console.log("Quantidades de tokens: ", tokenURIs.length)

    // Recupera o valor atual por unidades de gas
    const currentGasPrice = await ethers.provider.getGasPrice();
    console.log(`Current gas price: ${ethers.utils.formatUnits(currentGasPrice, 'gwei')} Gwei`);
    const currentGasPrice2 = currentGasPrice.add(ethers.utils.parseUnits('2', 'gwei'))
    console.log("Gas price boost: ", ethers.utils.formatUnits(currentGasPrice2, 'gwei'))
    // Cria o objeto de transação
    // Define quanto pretende pagar por cada unidade de gas consumida
    const gasPrice = ethers.utils.parseUnits(ethers.utils.formatUnits(currentGasPrice, 'gwei'), 'gwei');
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      //gas: 500000, // Limite de gas inicial (pode ser ajustado depois de estimar o gás)
      gasPrice: gasPrice,
      data: nftContract.methods.mintMultipleNFTs(recipients, tokenURIs).encodeABI(),
    };

    // Estima o gás necessário para a transação
    const estimatedGas = await web3.eth.estimateGas(tx);
    // Ajusta o limite de gas com base na estimativa (+20% para segurança)
    const gasLimit = estimatedGas + Math.floor(estimatedGas * 0.2);
    console.log("estimated gas to mint the tokens: ", estimatedGas);


    // Atualiza o objeto de transação com o gasLimit estimado
    tx.gas = gasLimit;

    // Assina e envia a transação assinada
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log("Transaction hash:", receipt.transactionHash);
    console.log("Transaction successful! Check the status on the blockchain.");
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

mintMultipleNFTsCustonGas("ipfs://QmbyV6Xp4Xm83UfPqmfV9vaeFQB3MaNi1vcSNzUK8iDBkG")
//mintNFT("ipfs://QmV5yuRSTLHjYHvWErLtskGjSJXn7buHhKqCGXEa4fde7f")