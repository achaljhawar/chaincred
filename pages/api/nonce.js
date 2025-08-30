import crypto from 'crypto';
import data from './walletwhitelist.json';
import 'dotenv/config';
import { ethers } from 'ethers'; 
const abi = data.abi;
const provider = ethers.getDefaultProvider("sepolia", {
  etherscan: process.env.API_KEY,
  exclusive: ["etherscan" ]
});

const contractaddress = process.env.CONTRACT_ADDRESS;
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractaddress, abi, signer);

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Wallet address is required' });
  }

  if (!ethers.isAddress(address)) {
    return res.status(400).json({ message: 'Invalid wallet address format' });
  }

  try {
    const fetchwallet = await contract.checkUserByWallet(address);
    if (!fetchwallet) {
      return res.status(400).json({ message: 'Wallet not registered. Please register first.' });
    }

    const nonce = `Please sign this message to authenticate: ${crypto.randomBytes(16).toString('hex')}`;
    res.status(200).json({ nonce });
  } catch (error) {
    console.error('Nonce generation error:', error.message);
    res.status(500).json({ message: 'Failed to generate authentication nonce' });
  }
}


export default handler;