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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const hash = req.body;
    
    if (!hash || typeof hash !== 'string') {
      return res.status(400).json({ message: 'Valid hash is required' });
    }

    const tx = await contract.store(hash);
    await provider.waitForTransaction(tx.hash);
    
    res.status(200).json({ 
      message: 'Student gradesheet added successfully'  
    });
  } catch (error) {
    console.error('Hash storage error:', error.message);
    res.status(500).json({ message: 'Failed to store gradesheet hash' });
  }
}

export default handler;