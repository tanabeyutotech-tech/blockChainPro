import Header from "./components/Header";
import Home from "./pages/Home";
import WalletModal from "./components/WalletModal";
import CreateModal from "./components/CreateModal";


import { useState } from "react";

export default function App() {
  const [walletOpen, setWalletOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [walletConected, setwalletConnected] = useState(false);
  const [minted, setMinted] = useState(false);
  
  return (
      <div className="min-h-screen text-white bg-neutral-950">
        <Header  
          onConnect={ () => {setWalletOpen(true);}} 
          onCreate={() => {setShowModal(true)}}
          onWalletConnect={() => {setwalletConnected(true), console.log("conheader")}}
          onWalletdisConnect={() => {setwalletConnected(false);  console.log("disconheader")}}
        />

        {showModal && (
          <CreateModal
            onClose={() => setShowModal(false)}
            onMinted={() => setMinted(true)}
          />
        )}
{/*  */}
        <Home walletOpen={walletOpen} onClose={() => setWalletOpen(false)} walletConected={walletConected} minted={minted} mintedCallBack={() => {setMinted(false); console.log(`minted callback ${minted}`)}} />

      {walletOpen && (
        <WalletModal onClose={() => setWalletOpen(false)} />
      )}
      </div>
    );
}