const NavButton = ({label}) => {
    return (
        <div className="flex items-center px-3 rounded-md hover:bg-indigo-400 hover:text-white cursor-pointer select-none">
            {label}
        </div>
    );
}

const TopNav = ({metamaskHandler}) => {
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
        <div className="flex border border-black px-4 rounded-lg items-center cursor-pointer" onClick={metamaskHandler}>Connect Wallet</div>
      </div>
    </div>
  );
};

export default TopNav;
