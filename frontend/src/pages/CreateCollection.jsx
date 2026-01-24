import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFactoryContract } from "../web3/factory";
import { uploadFileToPinata } from "../utils/pinata";
import { NFT_FACTORY_ADDRESS } from "../contracts/addresses";

export default function CreateCollection() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();

    if (!name || !symbol || !coverFile) {
      alert("Name, Symbol, and Cover are required");
      return;
    }

    try {
      setLoading(true);
      const coverImageUrl = await uploadFileToPinata(coverFile);
      // connect to factory
      const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);

      // deploy new NFT collection
      const tx = await factory.createCollection(
        name,
        symbol,
        coverImageUrl
      );

      await tx.wait();

      alert("Collection created on blockchain!");
      navigate("/collections");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl px-6 py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-cyan-300">
        Create New Collection
      </h1>

      <form
        onSubmit={handleCreate}
        className="p-6 space-y-5 rounded-3xl bg-gradient-to-br from-[#061f2f] to-[#020617]"
      >
        <div>
          <label className="block mb-1 text-slate-400">
            Collection Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 text-white outline-none rounded-xl bg-black/40"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-400">
            Symbol
          </label>
          <input
            required
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full p-3 text-white rounded-xl bg-black/40"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-slate-400">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 text-white outline-none rounded-xl bg-black/40"
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block mb-2 text-slate-400">
            Cover Image
          </label>

          <label className="inline-block px-4 py-2 font-semibold text-black cursor-pointer rounded-xl bg-cyan-500 hover:bg-cyan-400">
            Choose Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setCoverFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Cover preview"
              className="object-cover w-full h-48 mt-4 rounded-xl"
            />
          )}
        </div>

        <button
          disabled={loading}
          className="w-full py-3 font-semibold text-black rounded-xl bg-cyan-500 hover:bg-cyan-400"
        >
          {loading ? "Creating..." : "Create Collection"}
        </button>
      </form>
    </div>
  );
}