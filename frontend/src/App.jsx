import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import CreateCollection from "./pages/CreateCollection";
import WalletModal from "./components/WalletModal";
import CreateModal from "./components/CreateModal";

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
          <Routes>
            <Route
              path="/"
              element={
                <Home walletOpen={walletOpen} onClose={() => setWalletOpen(false)} walletConected={walletConected} minted={minted} mintedCallBack={() => {setMinted(false); }} />
              }
            >
            </Route>
            <Route path="/collections" element={<Collections />} />
            <Route
              path="/collections/:address"
              element={<CollectionDetail minted={minted} mintedCallBack={() => {setMinted(false); }}/>}

            >
            </Route>
            <Route path="/collections/create" element={<CreateCollection />} />
          </Routes>
          {showModal && (
            <CreateModal
              onClose={() => setShowModal(false)}
              onMinted={() => setMinted(true)}
            />
          )}

        {walletOpen && (
          <WalletModal onClose={() => setWalletOpen(false)} />
        )}
        </div>
    );
}