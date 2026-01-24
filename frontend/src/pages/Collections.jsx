import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCollections } from "../web3/fetchCollections";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollections() {
      try {
        const data = await fetchCollections();

        setCollections(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCollections();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-cyan-300">Loading collections...</div>;
  }

  return (
    <div className="px-6 py-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-cyan-300">Collections</h1>

      <Link
            to="/collections/create"
            className="inline-block px-6 py-3 mb-6 font-semibold text-black rounded-xl bg-cyan-500 hover:bg-cyan-400"
            >
            + Create Collection
      </Link>
      <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
        {collections.map((col) => (
          <Link
            key={col.address}
            to={`/collections/${col.adress}`}
            className="p-5 transition rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] hover:scale-105"
          >
            <img
              src={col.cover}
              onError={(e) => (e.target.src = "/placeholder.png")}
              alt={col.name}
              className="object-cover w-full h-48 mb-4 rounded-xl"
            />

            <h2 className="text-xl font-semibold text-cyan-300">
              {col.name}
            </h2>

            <p className="text-sm text-slate-400">
              {col.nftCount} NFTs
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}