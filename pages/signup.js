import Image from "next/image";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Checkbox from "@/components/Checkbox";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [walletAddress, setWalletAddress] = useState("");
  const [useWallet, setUseWallet] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const signupData = {
      name,
      email,
    };

    if (useWallet) {
      signupData.walletAddress = walletAddress;
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex gap-8 h-screen items-center">
      <div className="flex-1 flex justify-end pl-16 max-sm:hidden">
        <div className="h-[60vh] min-h-64 max-h-[600px] w-full relative">
        <Image alt="illustration" fill={true} src={"signup.svg"} />
        </div>
      </div>
  
      <div className="flex-1 flex sm:justify-start max-sm:justify-center">
      <div className="flex flex-col gap-6 p-12 bg-slate-50">
      <h1 className="text-4xl">Sign Up</h1>

      <Checkbox label="Sign up with wallet address" checked={useWallet} setter={setUseWallet} />

      {useWallet && (
        <FormInput field="Wallet address" value={walletAddress} setter={setWalletAddress} />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FormInput field="Name" value={name} setter={setName} />
        <FormInput field="Email" value={email} setter={setEmail} />
        <input type="hidden" name="formType" value="signup" />
        <input
          type="submit"
          value="Submit"
          className="py-3 bg-indigo-500 cursor-pointer rounded-md text-white text-md"
        />
      </form>
    </div></div>
    </div>
  );
}

export default SignupPage;
