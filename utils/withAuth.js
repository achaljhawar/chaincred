import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const [resp, setResponse] = useState('Valid');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const checkMetamask = async () => {
        if (typeof window.ethereum !== 'undefined') {
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const currentAddress = await signer.getAddress();
            const token = sessionStorage.getItem(currentAddress);
            console.log(token)
            if (token != '') {
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                });
                let newresponse = await response.json();
                setResponse(newresponse.message);
                console.log(newresponse);
                if (resp !== 'Valid') {
                    window.sessionStorage.removeItem(currentAddress);
                    router.replace('/');
                } else {
                    setLoading(false);
                }
            } else {
                router.replace('/');
            }
          } catch (err) {
            console.error(err);
          }
        } else {
            router.push('/')
        }
      };

      checkMetamask();
    }, [resp, router]);

    return (
        <>
            {loading &&
                <p>Loading...</p>  
            }
            {!loading && resp === 'Valid' && (
                <Component {...props} />
            )}
        </>
    );
  };

  return Auth;
};

export default withAuth;