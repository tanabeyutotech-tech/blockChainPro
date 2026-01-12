export default function App() {
const trendingNFTs = [
  {
    id: 1,
    name: "Cyber Tiger",
    creator: "NeoArtist",
    price: "1.4 ETH",
    likes: "5.2K",
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c",
  },
  {
    id: 2,
    name: "Galactic Explorer",
    creator: "StarVoyager",
    price: "2.7 ETH",
    likes: "3.1K",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74",
  },
  {
    id: 3,
    name: "Dreamy City",
    creator: "ArtDreamer",
    price: "0.8 ETH",
    likes: "1.8K",
    image: "https://images.unsplash.com/photo-1604079628040-94301bb21b91",
  },
  {
    id: 4,
    name: "Pixel Panda",
    creator: "RetroCreator",
    price: "0.5 ETH",
    likes: "2.9K",
    image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea",
  },
];

const topCollectors = [
  {
    id: 1,
    name: "CryptoKing",
    eth: "5.8K ETH",
    items: "Items",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "NFTQueen",
    eth: "4.1K ETH",
    items: "Items",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 3,
    name: "ArtWhale",
    eth: "3.6K ETH",
    items: "Items",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
  {
    id: 4,
    name: "MetaGuru",
    eth: "3.2K ETH",
    items: "Items",
    avatar: "https://i.pravatar.cc/100?img=58",
  },
];

const latestNFTs = [
  {
    id: 1,
    title: "Mystic Wolf",
    price: "0.3 ETH",
    likes: "0.8K",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
  },
  {
    id: 2,
    title: "Virtual Racer",
    price: "1.1 ETH",
    likes: "1.2K",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },
  {
    id: 3,
    title: "Alien Artifact",
    price: "0.5 ETH",
    likes: "0.5K",
    time: "Ending in 01:10:33",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
  },
  {
    id: 4,
    title: "Crystal Oasis",
    price: "0.6 ETH",
    likes: "0.9K",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">

      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#0f1424]/80 backdrop-blur">
        <div className="mx-auto max-w-7.5xl px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600" />
            <span className="text-lg font-semibold">NFT Marketplace</span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex gap-8 text-sm text-white/70">
            <span className="hover:text-white cursor-pointer">Explore</span>
            <span className="hover:text-white cursor-pointer">Collections</span>
            <span className="hover:text-white cursor-pointer">Create</span>
          </nav>

          {/* Wallet */}
          <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium hover:bg-blue-500 transition">
            Connect Wallet
          </button>
        </div>
      </header>

      <main className="bg-[#161c33] mx-auto max-w-[1800px] px-10 py-8 grid grid-cols-12 gap-6 container grid grid-cols-[300px_1fr] gap-10" >

        <div className="sticky top-24 bg-[#12172a] w-[300px] space-y-6 rounded-xl bg-white/5 p-5">
            <div className="h-full overflow-y-auto p-5 space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase text-white/70">
                  Categories
                </h3>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">🎨 Art</li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">🧸 Collectibles</li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">🎵 Music</li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">🌍 Virtual Worlds</li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">🌐 Domain Names</li>
                </ul>
              </div>

              <hr className="border-white/10" />

              {/* Filter */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase text-white/70">
                  Filter
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <p className="mb-2 text-sm text-white/80">Price</p>
                  <div className="flex gap-2">
                    <input
                      placeholder="Min"
                      className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none"
                    />
                    <input
                      placeholder="Max"
                      className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-500" />
                    Buy Now
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-500" />
                    On Auction
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-500" />
                    New
                  </label>
                </div>
              </div>

              <hr className="border-white/10" />

              {/* Chains */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase text-white/70">
                  Chains
                </h3>
                <select className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none">
                  <option>All Chains</option>
                  <option>Ethereum</option>
                  <option>Polygon</option>
                  <option>Solana</option>
                </select>
              </div> 
            </div>




        </div>

        <section className="space-y-10">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Trending NFTs</h2>

              <div className="flex gap-3 text-sm text-white/70">
                <button className="hover:text-white">All Categories</button>
                <button className="hover:text-white">Trending</button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {trendingNFTs.map((nft) => (
                <div
                  key={nft.id}
                  className="rounded-xl bg-white/5 overflow-hidden hover:translate-y-[-4px] transition"
                >
                  {/* Image */}
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="h-44 w-full object-cover"
                  />

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">{nft.name}</h3>
                    <p className="text-sm text-white/50">{nft.creator}</p>

                    <div className="flex items-center justify-between pt-2 text-sm">
                      <span className="text-blue-400">{nft.price}</span>
                      <span className="text-white/60">❤️ {nft.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Top Collectors</h2>
              <button className="text-sm text-white/60 hover:text-white">
                See All
              </button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {topCollectors.map((collector) => (
                <div
                  key={collector.id}
                  className="flex items-center gap-4 rounded-xl bg-white/5 p-4 hover:bg-white/10 transition"
                >
                  <img
                    src={collector.avatar}
                    alt={collector.name}
                    className="h-12 w-12 rounded-full"
                  />

                  <div>
                    <p className="font-medium">{collector.name}</p>
                    <p className="text-sm text-white/50">
                      {collector.eth} · {collector.items}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Latest NFTs</h2>
              <button className="text-sm text-white/60 hover:text-white">
                See Items
              </button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {latestNFTs.map((nft) => (
                <div
                  key={nft.id}
                  className="relative rounded-xl bg-white/5 overflow-hidden hover:scale-[1.02] transition"
                >
                  {nft.time && (
                    <span className="absolute top-3 right-3 rounded-lg bg-black/70 px-3 py-1 text-xs">
                      {nft.time}
                    </span>
                  )}

                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-medium">{nft.title}</h3>

                    <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                      <span>💎 {nft.price}</span>
                      <span>💙 {nft.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button className="rounded-full bg-blue-600 px-8 py-3 font-medium hover:bg-blue-700 transition">
                View More →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}