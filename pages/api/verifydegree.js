import data from './HashStorage.json';
import 'dotenv/config';
import { ethers } from 'ethers'; 
const abi = data.abi;
const provider = ethers.getDefaultProvider("sepolia", {
  etherscan: process.env.API_KEY,
  exclusive: ["etherscan" ]
});

const contractaddress = "0xC9Ab20231992A12A5FD8E2958c70602b8Af9CF31";
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractaddress, abi, signer);

async function handler(req, res) {
  if (req.method === 'POST') {
    const hash = req.body;
    console.log(hash)
    try {
        const hasHash = await contract.hasHash(hash);
        if (!hasHash) {
          return res.status(400).json({ message: 'this degree is manipulated' });
        } else {
          return res.status(200).json({ message: 'degree verified' });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


export default handler;