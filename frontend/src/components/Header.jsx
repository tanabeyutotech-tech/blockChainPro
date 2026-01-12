export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-neutral-800">
      <h1 className="text-2xl font-bold text-purple-500">
        NFT Marketplace
      </h1>

      <button className="px-4 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700">
        Connect Wallet
      </button>
    </header>
  );
}