import { ethers } from 'ethers';
import nodemailer from 'nodemailer';
import data from './walletwhitelist.json';
import 'dotenv/config';

const abi = data.abi;
const provider = ethers.getDefaultProvider("sepolia", {
  etherscan: process.env.API_KEY,
  exclusive: ["etherscan" ]
});

const contractaddress = process.env.CONTRACT_ADDRESS;
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractaddress, abi, signer);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.google.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendEmail(email, walletPrivateKey) {
  try {
    await transporter.sendMail({
      from: {
        name: 'Chaincred',
        address: `${process.env.EMAIL}`
      },
      to: `${email}`,
      subject: "Here's your wallet address to access our app",
      text: `${walletPrivateKey}`
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, walletAddress } = req.body;

      if (walletAddress) {
        if (!ethers.isAddress(walletAddress)) {
          return res.status(400).json({ message: 'Invalid wallet address' });
        }

        const fetchemail = await contract.checkUserByEmail(email);
        const fetchwallet = await contract.checkUserByWallet(walletAddress);
        if ((!fetchemail) && (!fetchwallet)) {
          const tx = await contract.registerUser(email, walletAddress);
          await provider.waitForTransaction(tx.hash);
          return res.status(200).json({
            message: `Registration successful! You can now use your wallet to login to our website.`
          });
        } else if (fetchemail && fetchwallet) {
          return res.status(409).json({
            message: `Registration successful! You can now use your wallet to login to our website.`
          });
        } else if (fetchemail) {
          return res.status(409).json({
            message: `Registration successful! You can now use your wallet to login to our website.`
          });
        } else {
          return res.status(409).json({
            message: `Registration successful! You can now use your wallet to login to our website.`
          });
        }
      } else {
        const fetchemail = await contract.checkUserByEmail(email);

        if (!fetchemail) {
          const wallet = ethers.Wallet.createRandom();
          const walletPrivateKey = wallet.privateKey;
          const walletAddress = wallet.address;

          const tx = await contract.registerUser(email, walletAddress);
          await provider.waitForTransaction(tx.hash);

          sendEmail(email, walletPrivateKey);

          return res.status(200).json({
            message: `Registration successful! You can now use your wallet to login to our website.`
          });
        } else {
          return res.status(401).json({ 
            message: "Registration failed email already registered" 
          });
        }
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