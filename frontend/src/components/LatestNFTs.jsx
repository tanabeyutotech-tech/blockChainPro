import NFTCard from "./NFTCard";

export default function LatestNFTs() {
  return (
    <div className="grid grid-cols-4 gap-6">
        <NFTCard
            image="https://picsum.photos/400?random=5"
            title="Mystic Wolf"
            creator="DarkMyth"
            price="0.3"
            likes="0.8"
        />
        <NFTCard
            image="https://picsum.photos/400?random=6"
            title="Virtual Racer"
            creator="SpeedX"
            price="1.1"
            likes="1.2"
            badge="Ending in 01:03:33"
        />
        <NFTCard
            image="https://picsum.photos/400?random=7"
            title="Alien Artifact"
            creator="CosmoLab"
            price="0.5"
            likes="0.5"
        />
        <NFTCard
            image="https://picsum.photos/400?random=8"
            title="Crystal Oasis"
            creator="MetaScape"
            price="0.6"
            likes="0.9"
        />
    </div>
  );
}