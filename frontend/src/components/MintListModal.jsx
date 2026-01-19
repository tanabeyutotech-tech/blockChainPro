import { useState } from "react";
import { ethers } from "ethers";
import { X } from "lucide-react";

import NFTAbi from "../contracts/NFT.json";
import MarketplaceAbi from "../contracts/NFTMarketplace.json";

import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "../contracts/addresses";

export default function MintListModal({ onClose }) {
  const [tokenURI, setTokenURI] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  async function mintAndListNFT() {
    try {
      setLoading(true);

      if (!window.ethereum) {
        alert("MetaMask not found");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const nft = new ethers.Contract(
        NFT_ADDRESS,
        NFTAbi.abi,
        signer
      );

      const marketplace = new ethers.Contract(
        MARKETPLACE_ADDRESS,
        MarketplaceAbi.abi,
        signer
      );

      /* 1️⃣ Mint NFT */
      const mintTx = await nft.mint(
        await signer.getAddress(),
        tokenURI
      );
      await mintTx.wait();

      /* 2️⃣ Get tokenId */
      const nextTokenId = await nft.nextTokenId();
      const tokenId = Number(nextTokenId - 1n);

      /* 3️⃣ Approve marketplace */
      const approveTx = await nft.approve(
        MARKETPLACE_ADDRESS,
        tokenId
      );
      await approveTx.wait();

      /* 4️⃣ List NFT */
      const priceInWei = ethers.parseEther(price);

      const listTx = await marketplace.ListNFT(
        NFT_ADDRESS,
        tokenId,
        priceInWei
      );
      await listTx.wait();

      alert("NFT minted & listed successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-xl bg-[#12172a] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Mint & List NFT
          </h2>
          <button onClick={onClose}>
            <X className="text-white/60 hover:text-white" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            placeholder="Token URI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            className="w-full px-4 py-2 text-white rounded-lg outline-none bg-white/10"
          />

          <input
            placeholder="Price in ETH"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 text-white rounded-lg outline-none bg-white/10"
          />

          <button
            onClick={mintAndListNFT}
            disabled={loading}
            className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Mint & List"}
          </button>
        </div>
      </div>
    </div>
  );
}