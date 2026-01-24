import { useEffect, useRef, useState } from "react";
import { uploadFileToPinata, uploadJSONToPinata } from "../utils/pinata";
import { mintAndListNFT } from "../utils/contract";
import { fetchCollections } from "../web3/fetchCollections";
import "./CreateModal.css";

export default function CreateModal({ onClose, onMinted }) {
  const modalRef = useRef(null);

  const [collections, setCollections] = useState([]);
  const [collectionAddress, setCollectionAddress] = useState("");

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

  // Load collections
  useEffect(() => {
    fetchCollections().then(setCollections).catch(console.error);
  }, []);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  async function handleMint() {
    if (!file) return alert("Select image");
    if (!name) return alert("Enter name");
    if (!price) return alert("Enter price");
    const cleanPrice = price.trim();
    if (!cleanPrice || isNaN(cleanPrice)) {
      alert("Price must be a valid number (e.g. 0.01)");
      return;
    }
    if (!category) return alert("Select category");
    if (!collectionAddress) return alert("Select collection");

    try {
      setLoading(true);

      const imageURI = await uploadFileToPinata(file);

      const tokenURI = await uploadJSONToPinata({
        name,
        description,
        image: imageURI,
        attributes: [{ trait_type: "Category", value: category }],
      });

      await mintAndListNFT(
        collectionAddress,
        tokenURI,
        cleanPrice
      );

      alert("NFT minted!");
      onMinted();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Mint failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="sell-modal" ref={modalRef}>
        <h2 className="sell-title">Mint NFT</h2>

        {/* Collection */}
        <select
          className="sell-input"
          value={collectionAddress}
          onChange={(e) => setCollectionAddress(e.target.value)}
        >
          <option value="" disabled>
            Select Collection
          </option>
          {collections.map((c) => (
            <option key={c.address} value={c.address}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Image */}
        <label className="file-upload">
          Choose File
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </label>

        {preview && <img src={preview} className="preview" />}

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

        {/* Category (Home sidebar logic preserved) */}
        <select
          className="sell-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Art</option>
          <option>Animals</option>
          <option>Music</option>
          <option>Games</option>
          <option>Photography</option>
        </select>

        <textarea
          className="sell-textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="sell-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleMint} disabled={loading}>
            {loading ? "Minting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}