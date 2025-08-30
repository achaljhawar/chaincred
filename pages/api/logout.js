export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Clear authentication cookies
    res.setHeader('Set-Cookie', [
      'auth-token=; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'wallet-address=; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    ]);

    res.status(200).json({ 
      message: 'Logout successful',
      isAuthenticated: false 
    });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ message: 'Logout failed' });
  }
}