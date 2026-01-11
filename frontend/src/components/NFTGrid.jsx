import NFTCard from "./NFTCard";

export default function NFTGrid({ items, buyNFT }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((nft, i) => (
        <NFTCard
          key={i}
          nft={nft}
          onBuy={() => buyNFT(nft)}
        />
      ))}
    </div>
  );
}