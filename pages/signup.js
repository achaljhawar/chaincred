import { useState } from 'react';
import styles from '../styles/signup.module.css';
function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [walletAddress, setWalletAddress] = useState('');
  const [useWallet, setUseWallet] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const signupData = {
      name,
      email 
    };

    if (useWallet) {
      signupData.walletAddress = walletAddress; 
    }

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData)
    });
    
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      
      <label>
        <input
          type="checkbox"
          checked={useWallet}
          onChange={(e) => setUseWallet(e.target.checked)}
        />
        Sign up with wallet address
      </label>

      {useWallet && (
        <label>
          Wallet Address:
          <input 
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className={styles.input} 
          />
        </label>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span className={styles.label}>Name:</span>  
          <input
            type="text"  
            value={name}
            onChange={(e) => setName(e.target.value)} 
            className={styles.input}
          />
        </label>

        <label>
          <span className={styles.label}>Email:</span>
          <input
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupPage;