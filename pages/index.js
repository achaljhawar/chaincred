import Link from 'next/link';
import styles from '../styles/styles.module.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function HomePage() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  useEffect(() =>{
    setIsMetamaskInstalled(!!window.ethereum);
  });
  async function handleMetamaskLogin() {
    try {
      if (!isMetamaskInstalled){
        throw new Error('Metamask is not installed')
      }
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const response = await fetch('/api/nonce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      const clonedResponse = response.clone();

      if (!response.ok) {
        const error = await clonedResponse.json(); 
        console.log(error);
        return;
      }
    
      const resp = await response.json();
    
      const nonce = resp.message;
      const signedMessage = await signer.signMessage(nonce);
      const data = {signedMessage, nonce, address};
      const authResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
      });

      let token = await authResponse.json();
      console.log(token);
      sessionStorage.setItem(address, token.token);

      window.location.href = './protected-route';
    
    } catch (err){
      console.error(err);
      alert('Failed to login with Metamask')
    }
  }
  return(
    <div className={styles.container}>
      <h1>Welcome, Please select an option below to continue</h1>
      <button className={styles.btn} onClick={handleMetamaskLogin}>Login with Metamask</button>
      <br />
      <br />
      <Link href="/signup">
      <button className={styles.btn}>Signup</button>
      </Link>
    </div>
  )
}
export default HomePage;
