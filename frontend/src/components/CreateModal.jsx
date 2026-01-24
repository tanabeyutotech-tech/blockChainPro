import { useEffect, useRef, useState } from "react";
import { uploadFileToPinata, uploadJSONToPinata } from "../utils/pinata";
import { mintAndListNFT } from "../utils/contract";
import "./CreateModal.css";

const CreateModal = ({ onClose, onMinted, collectionAddress }) => {
  const modalRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // ESC close
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  // outside click close
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleMint = async () => {
    try {
      if (!file) return alert("Select image");
      if (!name.trim()) return alert("Enter NFT name");
      if (!price.trim()) return alert("Enter price");
      if (!category) return alert("Select category");
      if (!collectionAddress) return alert("Collection not found");

      setLoading(true);

      // 1️⃣ upload image
      const imageURI = await uploadFileToPinata(file);

      // 2️⃣ upload metadata
      const tokenURI = await uploadJSONToPinata({
        name,
        description,
        image: imageURI,
        attributes: [
          {
            trait_type: "Category",
            value: category,
          },
        ],
      });

      // 3️⃣ mint into selected collection
      await mintAndListNFT(
        collectionAddress,
        tokenURI,
        price
      );

      alert("NFT minted successfully!");
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
        <h2 className="sell-title">Mint NFT</h2>

        <label className="file-upload">
          Choose File
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files[0];
              if (!f) return;
              setFile(f);
              setPreview(URL.createObjectURL(f));
            }}
          />
        </label>

        <div className="image-preview">
          {preview ? <img src={preview} /> : <span>No image selected</span>}
        </div>

        <input
          className="sell-input"
          placeholder="NFT Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="sell-input"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="sell-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

        <textarea
          className="sell-textarea" 
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

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