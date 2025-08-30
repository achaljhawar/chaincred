# ChainCred

A blockchain-based degree verification system that allows institutions to store and verify educational credentials securely on the Ethereum blockchain. ChainCred makes degree verification as simple as scanning a QR code.




## 🎥 Demo Video
https://github.com/user-attachments/assets/ddcb824d-32c0-4f78-9dff-52f7d7505cc5

---

## 🌟 Features

- **Blockchain Verification**: Educational credentials are stored immutably on the Ethereum blockchain
- **QR Code Integration**: Easy verification through QR code scanning
- **Wallet Authentication**: Secure MetaMask-based authentication for institutions
- **Real-time Verification**: Instant degree verification with blockchain confirmation
- **Institution Dashboard**: Protected interface for authorized institutions to manage credentials
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS

## 🏗️ Architecture

- **Frontend**: Next.js 14 with React 18
- **Blockchain**: Ethereum (Sepolia testnet) with Hardhat framework
- **Smart Contracts**: Solidity 0.8.24 with hash storage and wallet whitelist functionality
- **Authentication**: JWT tokens with MetaMask wallet signatures
- **Styling**: Tailwind CSS with responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ or Bun
- MetaMask browser extension
- Ethereum testnet (Sepolia) access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chaincred.git
cd chaincred
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
PRIVATE_KEY=your_ethereum_private_key
API_KEY=your_etherscan_api_key
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### For Institutions

1. **Sign Up**: Register your institution through the signup page
2. **Connect Wallet**: Use MetaMask to authenticate your institution's wallet
3. **Upload Credentials**: Access the protected dashboard to upload degree hashes
4. **Generate QR Codes**: Create QR codes for verified degrees

### For Verification

1. **Scan QR Code**: Use any QR code scanner or visit the verification page
2. **Enter Degree Hash**: Manually enter the degree hash for verification
3. **Instant Results**: Get immediate blockchain-based verification results

## 🔧 API Endpoints

- `POST /api/login` - Authenticate with wallet signature
- `POST /api/signup` - Register new institution
- `POST /api/nonce` - Get authentication nonce
- `POST /api/verify` - Verify user authentication
- `POST /api/verifydegree` - Verify degree hash on blockchain
- `POST /api/uploadhashdata` - Upload degree hash to blockchain
- `POST /api/logout` - End user session

## 📦 Smart Contracts

### HashStorage Contract
- **Address**: `0xC9Ab20231992A12A5FD8E2958c70602b8Af9CF31` (Sepolia)
- Stores degree hashes on the blockchain
- Provides verification functions
- Maintains hash integrity and authenticity

### WalletWhitelist Contract  
- **Address**: Configured via environment variable `CONTRACT_ADDRESS`
- Manages authorized institution wallets
- Controls access to degree upload functionality
- Ensures only verified institutions can add credentials

### Contract Addresses (Sepolia Testnet)
| Contract | Address |
|----------|---------|
| HashStorage | `0xC9Ab20231992A12A5FD8E2958c70602b8Af9CF31` |
| WalletWhitelist | Set via `CONTRACT_ADDRESS` environment variable |

## 🛠️ Development

### Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

### Smart Contract Development

The project uses Hardhat for smart contract development:

```bash
npx hardhat compile
npx hardhat test
npx hardhat deploy --network sepolia
```

## 🔐 Security

- All degree data is hashed before blockchain storage
- Wallet-based authentication with signature verification
- Institution whitelist for authorized access
- Secure JWT token management

## 🌍 Deployment

The application is configured for deployment on Vercel with the following settings:
- Build timeout: 60 seconds
- Serverless functions timeout: 10 seconds

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help with ChainCred, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for secure, decentralized education verification**
