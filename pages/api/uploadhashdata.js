import { ethers } from 'ethers';
import data from './HashStorage.json';
import 'dotenv/config';
const abi = data.abi;
const provider = ethers.getDefaultProvider("sepolia", {
  etherscan: process.env.API_KEY,
  exclusive: ["etherscan" ]
});

const contractaddress = "0xC9Ab20231992A12A5FD8E2958c70602b8Af9CF31";
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractaddress, abi, signer);

async function handler(req, res) {
  const name = await contract.getAddress()
  console.log(name);
  if (req.method === 'POST') {
    try {
      const hash = req.body;
      console.log(hash);
      const tx = await contract.store(hash);
      const txReceipt = await provider.waitForTransaction(tx.hash);
      console.log(txReceipt)
      res.status(200).json({ 
        message: 'student added successfully'  
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred'});
    }
  } else {
    res.status(405).json({message: 'Method not allowed'});  
  }
}

export default handler;