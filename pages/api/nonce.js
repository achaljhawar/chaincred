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
  if (req.method === 'POST') {
    const { address } = req.body;
    console.log(address)
    try {
        const fetchwallet = await contract.checkUserByWallet(address);
        if (!fetchwallet) {
          return res.status(400).json({ message: 'Please register first' });
        } 

      const nonce = crypto.randomBytes(32).toString('hex');

      res.status(200).json({ message: nonce });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


export default handler;