import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const [resp, setResponse] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const checkMetamask = async () => {
        if (typeof window.ethereum !== "undefined") {
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const currentAddress = await signer.getAddress();
            const token = sessionStorage.getItem(currentAddress);
            if (token != "") {
              const response = await fetch("/api/verify", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
              const newResponse = await response.json();
              setResponse(newResponse.message);
              if (newResponse.message !== "Valid") {
                window.sessionStorage.removeItem(currentAddress);
                router.replace("/");
              } else {
                setLoading(false);
              }
            } else {
              router.replace("/");
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          router.push("/");
        }
      };

      checkMetamask();
    }, [resp, router]);

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
