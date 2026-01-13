import NFTCard from "./NFTCard";

export default function TrendingNFTs() {
  return (
    <div className="grid grid-cols-4 gap-6">
        <NFTCard
            image="https://picsum.photos/400?random=1"
            title="Cyber Tiger"
            creator="NeoArtist"
            price="1.4"
            likes="5.2"
        />
        <NFTCard
            image="https://picsum.photos/400?random=2"
            title="Galactic Explorer"
            creator="StarVoyager"
            price="2.7"
            likes="3.1"
        />
        <NFTCard
            image="https://picsum.photos/400?random=3"
            title="Dreamy City"
            creator="ArtDreamer"
            price="0.8"
            likes="1.8"
        />
        <NFTCard
            image="https://picsum.photos/400?random=4"
            title="Pixel Panda"
            creator="RetroCreator"
            price="0.5"
            likes="2.9"
        />
    </div>
  );
}