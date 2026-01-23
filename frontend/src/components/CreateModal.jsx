
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
  const [preview, setPreview] = useState(null);

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
      <div className="sell-modal" ref={modalRef}>
        <h2 className="sell-title">Sell NFT</h2>

        {/* File Upload */}
        <label className="file-upload">
          Choose File
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const selected = e.target.files[0];
              if (!selected) return;
              setFile(selected);
              setPreview(URL.createObjectURL(selected));

            }}
          />
        </label>

        <div className="image-preview">
          {preview ? (
            <img src={preview} alt="NFT Preview" />
          ) : (
            <span>No image selected</span>
          )}
        </div>

        {/* NFT Name */}
        <input
          type="text"
          placeholder="NFT Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="sell-input"
        />

        {/* Price */}
        <input
          type="text"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="sell-input price-input"
        />

        {/* Category */}
        

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="sell-input"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Art">Art</option>
          <option value="Animals">Animals</option>
          <option value="Music">Music</option>
          <option value="Games">Games</option>
          <option value="Photography">Photography</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="NFT Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="sell-textarea"
        />

        {/* Buttons */}
        <div className="sell-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn-confirm"
            onClick={handleMint}
            disabled={loading}
          >
            {loading ? "Minting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
