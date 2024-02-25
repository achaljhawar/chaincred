import Image from "next/image";
import TopNav from "./TopNav";
import Link from 'next/link';

const LandingPage = ({metamaskHandler}) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-full max-w-[1200px]">
        <TopNav metamaskHandler={metamaskHandler} />
        <div className="h-[20vh] w-full relative -z-10">
        <div className="absolute top-0 right-0 left-[350px] h-[80vh] max-h-[600px] overflow-visible bg-indigo-100 blur-2xl" />
            <div className="absolute top-0 right-0 left-[350px] h-[80vh] max-h-[600px]">
                <Image alt="illustration" fill="true" src="/illus.png" className="object-contain"></Image>
            </div>
        </div>
        <section about="hero" className="flex flex-col">
          <h1 className="text-5xl font-semibold">
            Blockchain Meets
            <br />
            <span className="text-indigo-600">lorem ipsum</span>
          </h1>
          <p className="pt-8 text-2xl">
            Signin to blockchain i.e decentralized login
            <br />
            for profit and fun haha
          </p>
          <div className="pt-8 flex gap-4 text-xl">
            <div className="flex border border-black py-2 px-4 rounded-lg items-center cursor-pointer" onClick={metamaskHandler}>
              Connect Wallet
            </div>
            <Link href={"/signup"} className="flex rounded-lg py-2 px-4 text-white bg-indigo-600 cursor-pointer">
              Sign Up
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
