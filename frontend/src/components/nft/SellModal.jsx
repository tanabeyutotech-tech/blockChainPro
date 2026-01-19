import { useState } from "react";

export default function SellModal({ nft, onClose, onConfirm }) {
  const [price, setPrice] = useState("");

  if (!nft) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[380px] p-6 rounded-xl bg-[#12172a]">

        <h2 className="mb-4 text-lg font-semibold text-center">
          Sell NFT
        </h2>

        <img
          src={nft.image}
          alt={nft.name}
          className="object-cover w-full mb-4 rounded-xl aspect-square"
        />

        <input
          type="number"
          step="0.0001"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 mb-4 text-white bg-black rounded-lg"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-600 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(nft, price)}
            className="flex-1 py-2 bg-blue-600 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}