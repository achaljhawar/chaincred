import {ethers} from 'ethers';
import jwt from 'jsonwebtoken';

const secretKey = 'mySecretKey';


async function handler(req,res) {
    const {signedMessage, nonce, address} = req.body;


    const recoveredAddress = ethers.verifyMessage(nonce, signedMessage);


    if (recoveredAddress !== address) {
        return res.status(401).json({message: 'Invalid Signature'});
    }
    const token = jwt.sign({name: address}, secretKey, {expiresIn: '10m'});

    res.status(200).json({token});

}

export default handler;