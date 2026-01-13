import Header from "./components/Header";
import Home from "./pages/Home";
import WalletModal from "./components/WalletModal";

import { useState } from "react";

export default function App() {
  const [walletOpen, setWalletOpen] = useState(false);
  return (
      <div className="min-h-screen text-white bg-neutral-950">
        <Header  onConnect={() => setWalletOpen(true)} />
        <Home walletOpen={walletOpen} onClose={() => setWalletOpen(false)} />

      {walletOpen && (
        <WalletModal onClose={() => setWalletOpen(false)} />
      )}
      </div>
    );
}