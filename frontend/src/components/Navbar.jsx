export default function Navbar() {
  return (
    <nav className="bg-[#121212] border-b border-[#2a2a2a] px-8 py-4 flex justify-between">
      <h1 className="text-xl font-bold text-white">NFT Marketplace</h1>
      <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
        Connect Wallet
      </button>
    </nav>
  );
}