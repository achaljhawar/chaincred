import {ethers} from 'ethers';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'fallback-secret-for-dev';


async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { signedMessage, nonce, address } = req.body;

    if (!signedMessage || !nonce || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!ethers.isAddress(address)) {
        return res.status(400).json({ message: 'Invalid wallet address' });
    }

    try {
        const recoveredAddress = ethers.verifyMessage(nonce, signedMessage);

        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(401).json({ message: 'Invalid signature' });
        }

        const token = jwt.sign({ address: address }, secretKey, { expiresIn: '1h' });
        
        // Set secure httpOnly cookie
        res.setHeader('Set-Cookie', [
            `auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`,
            `wallet-address=${address}; Secure; SameSite=Strict; Path=/; Max-Age=3600`
        ]);
        
        res.status(200).json({ message: 'Login successful', address: address });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Authentication failed' });
    }

}

export default handler;