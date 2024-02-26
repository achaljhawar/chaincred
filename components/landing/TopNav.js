const NavButton = ({ label }) => {
  return (
    <div className="flex items-center px-3 rounded-md hover:bg-indigo-400 hover:text-white transition-colors cursor-pointer select-none">
      {label}
    </div>
  );
};

const TopNav = ({ metamaskHandler, connecting, setConnecting }) => {
  return (
    <div className="flex w-full h-20 py-4 gap-4">
      <div className="flex-1 flex">
        <h2 className="text-2xl font-semibold">CHAINCRED</h2>
      </div>
      <div className="flex justify-center bg-slate-100 border border-slate-300 p-[2px] gap-1 rounded-md">
        <NavButton label="Features" />
        <NavButton label="Our Team" />
      </div>
      <div className="flex-1 flex justify-end">
        <button
          className="flex border disabled:cursor-wait border-black hover:text-indigo-600 hover:border-indigo-600 transition-colors px-4 rounded-lg items-center cursor-pointer"
          onClick={async () => {
            setConnecting(true);
            await metamaskHandler();
            setConnecting(false);
          }}
          disabled={connecting}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default TopNav;
