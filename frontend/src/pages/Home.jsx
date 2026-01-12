import Header from "../components/Header";
import NFTCard from "../components/NFTCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Header />

      <main className="p-8">
        <h2 className="mb-4 text-xl font-semibold">
          Trending NFTs
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <NFTCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}