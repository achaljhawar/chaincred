import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const [resp, setResponse] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const checkAuthentication = async () => {
        if (typeof window.ethereum === "undefined") {
          router.push("/");
          return;
        }

        try {
          // Check if user has connected wallet
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length === 0) {
            router.replace("/");
            return;
          }

          // Verify authentication via cookie-based API
          const response = await fetch("/api/verify", {
            method: "GET",
            credentials: "include", // Include cookies in request
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            router.replace("/");
            return;
          }

          const result = await response.json();
          setResponse(result.message);
          
          if (result.isAuthenticated && result.message === "Valid") {
            // Verify that the authenticated address matches current wallet
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const currentAddress = await signer.getAddress();
            
            if (result.address.toLowerCase() !== currentAddress.toLowerCase()) {
              // Wallet switched, need to re-authenticate
              await fetch("/api/logout", {
                method: "POST",
                credentials: "include"
              });
              router.replace("/");
              return;
            }
            
            setLoading(false);
          } else {
            router.replace("/");
          }
        } catch (err) {
          console.error("Authentication error:", err.message);
          router.replace("/");
        }
      };

      checkAuthentication();
    }, [router]);

    return (
      <>
        {loading && (
          <div className="flex fixed left-0 right-0 top-0 h-screen items-center justify-center gap-2">
            <div
              className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            >
            </div>
          </div>
        )}
        {!loading && resp === "Valid" && <Component {...props} />}
      </>
    );
  };

  return Auth;
};

export default withAuth;
