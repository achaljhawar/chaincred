import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'fallback-secret-for-dev';
function parseCookies(cookieHeader) {
    const cookies = {};
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            if (name && value) {
                cookies[name] = decodeURIComponent(value);
            }
        });
    }
    return cookies;
}

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const cookies = parseCookies(req.headers.cookie);
    const token = cookies['auth-token'];
    const walletAddress = cookies['wallet-address'];

    if (!token) {
        return res.status(401).json({ message: 'No authentication token found' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        
        // Verify the wallet address matches the token
        if (walletAddress && decoded.address.toLowerCase() !== walletAddress.toLowerCase()) {
            return res.status(401).json({ message: 'Token mismatch' });
        }
        
        return res.status(200).json({ 
            message: 'Valid', 
            address: decoded.address,
            isAuthenticated: true 
        });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Expired', isAuthenticated: false });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token', isAuthenticated: false });
        }
        return res.status(500).json({ message: 'Token verification failed', isAuthenticated: false });
    }
}