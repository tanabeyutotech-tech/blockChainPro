import NFTCard from "./NFTCard";

export default function NFTCardPanel({
    filteredNFTs, placeholder, onSell
}) {
  return (
    <div className="grid grid-cols-4 gap-6 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-3 xl:grid-cols-4">
        {
            filteredNFTs.map((nft) => (
                <NFTCard
                    nft={nft}
                    placehoder={placeholder}
                    onSell={onSell}
            />
            ))
        }
    </div>
  );
}