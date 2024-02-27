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
})

async function handler(req, res) {
  const name = await contract.getAddress()
  console.log(name);
  if (req.method === 'POST') {
    try {
      let walletAddress;
      const { name, email } = req.body;
      if(req.body.walletAddress) {
        walletAddress = req.body.walletAddress;
        if(!ethers.isAddress(walletAddress)) {
          return res.status(400).json({message: 'Invalid wallet address'});
        }
        const fetchemail = await contract.checkUserByEmail(email);
        const fetchwallet = await contract.checkUserByWallet(walletAddress);
        if ((!fetchemail)&&(!fetchwallet)){
          const tx = await contract.registerUser(email,walletAddress);
          const txReceipt = await provider.waitForTransaction(tx.hash);
          console.log(txReceipt);
          res.json({success : true});
        } else {
          res.status(200).json({message: "Registration failed email or wallet address already registered"})
        }
      } else {  
        const fetchemail = await contract.checkUserByEmail(email);
        if(!fetchemail){
          const wallet = ethers.Wallet.createRandom();
          const walletPrivateKey = wallet.privateKey;
          walletAddress = wallet.address;
          const tx = await contract.registerUser(email,walletAddress);
          const txReceipt = await provider.waitForTransaction(tx.hash);
          console.log(txReceipt)
          res.status(200).json({message : walletPrivateKey});
          async function main(){
            const info = await transporter.sendMail({
              from : {
                name : 'PicChain',
                address : 'achaljhawar03@gmail.com'
              },
              to: `${email}`,
              subject: "Here's your wallet address to access our app",
              text: `${walletPrivateKey}`
            })
            console.log("Message sent: %s", info.messageId);
          }
          main()
          res.json({success : true});
        } else {
          res.status(200).json({message : "Registration failed email already registered"})
        }
      }
      res.status(200).json({ 
        message: 'Registration successful!'  
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