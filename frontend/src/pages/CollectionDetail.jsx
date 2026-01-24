import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCollectionNFTs } from "../web3/fetchNFTs";

export default function CollectionDetail({minted, mintedCallBack}) {
  const { address } = useParams(); // ✅ FIX
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

   async function loadNFTs() {
    try {
      const allNFTs = await fetchCollectionNFTs(address);

      // const filtered = allNFTs.filter(
      //   (nft) =>
      //     nft.collection?.toLowerCase() === address.toLowerCase()
      // );

      setNfts(allNFTs);
    } catch (err) {
      console.error("Failed to load NFTs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNFTs();
  }, [address]);

  useEffect(() => {
    if(minted){
      loadNFTs();
      console.log(`new colleciton mintedeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`);
      mintedCallBack();
    }

  }, [minted]);

  if (loading) {
    return (
      <div className="p-10 text-center text-cyan-300">
        Loading NFTs...
      </div>
    );
  }

  return (
    <div className="px-6 py-10 mx-auto max-w-7xl">
      {/* ✅ HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-cyan-300">
          Collection
        </h1>
        <p className="mt-2 text-sm break-all text-slate-400">
          {address}
        </p>

        <Link
          to="/collections"
          className="inline-block mt-4 text-cyan-400 hover:underline"
        >
          ← Back to Collections
        </Link>
      </div>

      {nfts.length === 0 ? (
        <p className="text-slate-400">
          No NFTs found in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
          {nfts.map((nft) => (
            <div
              key={nft.address}
              className="p-5 rounded-3xl bg-gradient-to-br from-[#061f2f] to-[#020617]"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="object-cover w-full h-48 mb-4 rounded-xl"
              />

              <h3 className="text-lg font-semibold text-cyan-300">
                {nft.name}
              </h3>

              <p className="text-sm text-slate-400">
                Price: {nft.price} ETH
              </p>

              <button className="w-full py-2 mt-4 font-semibold text-black rounded-xl bg-cyan-500 hover:bg-cyan-400">
                Buy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}