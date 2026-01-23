import NFTCard from "./NFTCard";

export default function TrendingNFTs({nft}) {
  return (
        <div  className="space-y-6 text-slate-200 bg-gradient-to-r from-[#061f2f] to-[#020617] rounded-3xl p-6 shadow-lg shadow-cyan-500/10">
            <h2 className="text-xl font-semibold text-cyan-300 ">🔥 Trending NFTs</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                
                <div
                    key={nft.tokenId}
                    className="rounded-2xl bg-gradient-to-b from-[#0b1d3a] to-[#050c1f] border border-cyan-500/10  shadow-lg shadow-cyan-500/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/30">
                    {/* Image */}
                    <img
                    src={nft.image}
                    alt={nft.name}
                    className="object-cover w-full h-56"
                    />

                    {/* Content */}
                    <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{nft.name}</h3>
                        <span className="text-xs text-white/50">{nft.category}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        <img
                            src={nft.creatorAvatar}
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs text-white/60">
                            {/* @{nft.seller} */}
                        </span>
                        </div>

                        <span className="text-sm font-semibold text-indigo-400">
                        {nft.price} ETH
                        </span>
                    </div>

                    <button onClick={ () => { buyNFT(NFT_ADDRESS, nft.tokenId, nft.price)}} className="w-full py-2 text-sm font-medium transition bg-indigo-600 rounded-lg hover:bg-indigo-500">
                        Buy Now 
                    </button>
                    </div>
                </div>
                
            </div>
        </div>
  );
}