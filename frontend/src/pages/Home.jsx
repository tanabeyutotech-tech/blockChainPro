import TrendingNFTs from "../components/TrendingNFTs";
import TopCollectors from "../components/TopCollectors";
import LatestNFTs from "../components/LatestNFTs";

export default function Home() {
  return (
    <div className="mx-auto max-w-[2000px] px-6 py-10">
      
      <div className="flex gap-[40px]">
        <aside className="w-[300px] shrink-0">
            <div className="sticky top-24 space-y-8 rounded-xl bg-[#12172a] p-5">
                
                <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
                    Categories
                </h3>
                <ul className="space-y-3 text-sm">
                    {[
                    "Art",
                    "Gaming",
                    "Music",
                    "Photography",
                    "Sports",
                    "Utility",
                    ].map((item) => (
                    <li
                        key={item}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
                    >
                        {item}
                        <span className="text-xs text-white/40">›</span>
                    </li>
                    ))}
                </ul>
                </div>

                {/* Filters */}
                <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
                    Filters
                </h3>
                <div className="space-y-3">
                    {["Buy Now", "On Auction", "Has Offers"].map((filter) => (
                    <label
                        key={filter}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                        <input type="checkbox" className="accent-indigo-500" />
                        {filter}
                    </label>
                    ))}
                </div>
                </div>

                {/* Chains */}
                <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
                    Chains
                </h3>
                <div className="space-y-3 text-sm">
                    {["Ethereum", "Polygon", "Solana", "BNB Chain"].map((chain) => (
                    <div
                        key={chain}
                        className="cursor-pointer rounded-lg px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
                    >
                        {chain}
                    </div>
                    ))}
                </div>
                </div>

            </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 space-y-14">
            {/* <TrendingNFTs /> */}
            <div>
                <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Trending NFTs</h2>
                <button className="text-sm text-indigo-400 hover:text-indigo-300">
                    View all →
                </button>
                </div>
                    <TrendingNFTs />
            </div>
            {/* <TopCollectors /> */}
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Top Collectors</h2>
                    <button className="text-sm text-indigo-400 hover:text-indigo-300">
                    View all →
                    </button>
                </div>

                <div className="flex gap-4 overflow-x-auto rounded-xl bg-[#12172a] p-4">
                    {/* Collector rows */}
                    <div className="min-w-[270px] flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-sm text-white/40 w-6 shrink-0">1</span>

                            <img
                            src="https://i.pravatar.cc/100?img=1"
                            alt="collector"
                            className="h-9 w-9 rounded-full shrink-0"
                            />

                            <div className="min-w-0">
                            <p className="text-sm font-medium truncate">@cryptoking</p>
                            <p className="text-xs text-white/40 truncate">Collected NFTs</p>
                            </div>
                        </div>

                        <span className="text-sm font-semibold shrink-0 whitespace-nowrap">
                            124.3 ETH
                        </span>
                    </div>

                    <div className="min-w-[270px] flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-sm text-white/40 w-6 shrink-0">1</span>

                            <img
                            src="https://i.pravatar.cc/100?img=2"
                            alt="collector"
                            className="h-9 w-9 rounded-full shrink-0"
                            />

                            <div className="min-w-0">
                            <p className="text-sm font-medium truncate">@cryptoking</p>
                            <p className="text-xs text-white/40 truncate">Collected NFTs</p>
                            </div>
                        </div>

                        <span className="text-sm font-semibold shrink-0 whitespace-nowrap">
                            124.3 ETH
                        </span>
                    </div>

                    <div className="min-w-[270px] flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-sm text-white/40 w-6 shrink-0">1</span>

                            <img
                            src="https://i.pravatar.cc/100?img=3"
                            alt="collector"
                            className="h-9 w-9 rounded-full shrink-0"
                            />

                            <div className="min-w-0">
                            <p className="text-sm font-medium truncate">@cryptoking</p>
                            <p className="text-xs text-white/40 truncate">Collected NFTs</p>
                            </div>
                        </div>

                        <span className="text-sm font-semibold shrink-0 whitespace-nowrap">
                            124.3 ETH
                        </span>
                    </div>

                    <div className="min-w-[270px] flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-sm text-white/40 w-6 shrink-0">1</span>

                            <img
                            src="https://i.pravatar.cc/100?img=4"
                            alt="collector"
                            className="h-9 w-9 rounded-full shrink-0"
                            />

                            <div className="min-w-0">
                            <p className="text-sm font-medium truncate">@cryptoking</p>
                            <p className="text-xs text-white/40 truncate">Collected NFTs</p>
                            </div>
                        </div>

                        <span className="text-sm font-semibold shrink-0 whitespace-nowrap">
                            124.3 ETH
                        </span>
                    </div>

                    <div className="min-w-[270px] flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-sm text-white/40 w-6 shrink-0">1</span>

                            <img
                            src="https://i.pravatar.cc/100?img=5"
                            alt="collector"
                            className="h-9 w-9 rounded-full shrink-0"
                            />

                            <div className="min-w-0">
                            <p className="text-sm font-medium truncate">@cryptoking</p>
                            <p className="text-xs text-white/40 truncate">Collected NFTs</p>
                            </div>
                        </div>

                        <span className="text-sm font-semibold shrink-0 whitespace-nowrap">
                            124.3 ETH
                        </span>
                    </div>


                </div>
            </div>
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Trending NFTs</h2>
                    <button className="text-sm text-indigo-400 hover:text-indigo-300">
                        View all →
                    </button>
                </div>
                <LatestNFTs />
            </div>
        </section>
      </div>


    </div>
  );
}