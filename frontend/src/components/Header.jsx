import WalletModal from "./WalletModal";
import {useEffect, useState } from "react";

export default function Header({ onConnect }) {
  const [showModal, setShowModal] = useState(false);
  const [wallet, setWallet] = useState(null);

   useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) setWallet(savedWallet);
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(accounts[0]);
    localStorage.setItem("walletAddress", accounts[0]);
    setShowModal(false);
  }
  
  function disconnectWallet() {
    localStorage.removeItem("walletAddress");
    setWallet(null);
  }

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-[1800px] px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-full h-9 w-9 bg-gradient-to-tr from-indigo-500 to-purple-600" />
          <span className="text-xl font-semibold">NFT Marketplace</span>
        </div>

        {/* Navigation */}
        <nav className="hidden gap-8 text-sm md:flex text-white/70">
          <span className="cursor-pointer hover:text-white">Explore</span>
          <span className="cursor-pointer hover:text-white">Collections</span>
          <span className="cursor-pointer hover:text-white">Create</span>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <input
            placeholder="Search NFTs"
            className="hidden px-3 py-2 text-sm rounded-lg outline-none sm:block bg-white/5 placeholder:text-white/40"
          />

          {/* Wallet */}
          {wallet ? (
            <button
              onClick={disconnectWallet}
              className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20"
            >
              {wallet.slice(0, 6)}...{wallet.slice(-4)}
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 text-sm font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500"
            >
              Connect Wallet
            </button>
          )}
        </div>

      </div>
    </header>

    {showModal && (
      <WalletModal
        onClose={() => setShowModal(false)}
        onConnect={connectWallet}
      />
    )}

    </>


  );
}