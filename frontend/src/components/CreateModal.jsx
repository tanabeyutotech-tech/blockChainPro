import { useEffect, useRef, useState } from "react";
import { uploadFileToPinata, uploadJSONToPinata } from "../utils/pinata";
import { mintAndListNFT } from "../utils/contract";
import "./CreateModal.css";

const CreateModal = ({ onClose, onMinted }) => {
  const modalRef = useRef(null);

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // close on ESC
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  // close when clicking outside
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleMint = async () => {
    try {
      if (!file) return alert("Select an image");
      if (!name.trim()) return alert("Enter NFT name");
      if (!price.trim()) return alert("Enter price");
      if (!category.trim()) return alert("Enter category");
      setLoading(true);

      // 1. upload image
      const imageURI = await uploadFileToPinata(file);
      console.log(`imageURI: ${imageURI}`);

      // 2. upload metadata
      const tokenURI = await uploadJSONToPinata({
        name: name,
        description: description,
        category: category,
        image: imageURI,

      });

      console.log(`tokenURI: ${tokenURI}`);
      
      // 3. mint NFT
      await mintAndListNFT(tokenURI, price, category);
      console.log("mingted!");
      alert("NFT minted!");
      onMinted();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Mint failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" ref={modalRef}>
        <h2>Mint NFT</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="NFT Name"
          value={name}
            className="w-full px-3 py-2 mt-3 text-gray-900 placeholder-gray-400 bg-white border rounded-md"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="NFT Price"
          value={price}
            className="w-full px-3 py-2 mt-3 text-gray-900 placeholder-gray-400 bg-white border rounded-md"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
            className="w-full px-3 py-2 mt-3 text-gray-900 placeholder-gray-400 bg-white border rounded-md"
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          placeholder="NFT Description"
          value={description}
          className="w-full px-3 py-2 mt-3 text-gray-900 placeholder-gray-400 bg-white border rounded-md"          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
        {/* Cancel */}
            <button
                onClick={onClose}
                className="px-4 py-2 text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
            >
                Cancel
            </button>

            {/* Mint */}
            <button
                onClick={handleMint}
                disabled={loading}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
                {loading ? "Minting..." : "Mint NFT"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;