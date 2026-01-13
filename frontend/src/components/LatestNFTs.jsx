import NFTCard from "./NFTCard";

export default function LatestNFTs({
    filteredNFTs
}) {
  return (
    <div className="grid grid-cols-4 gap-6 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-3 xl:grid-cols-4">
        {
            filteredNFTs.map((nft) => (
                <NFTCard
                image={nft.image}
                title={nft.title}
                creator={nft.creator}
                price={nft.price}
                likes={nft.likes}
            />
            ))
        }
    </div>
  );
}