import TrendingNFTs from "../components/TrendingNFTs";
import TopCollectors from "../components/TopCollectors";
import NFTCardPanel from "../components/NFTCardPanel";
import MintListModal from "../components/MintListModal";
import SellModal from "../components/nft/SellModal";
import { useEffect, useState, useRef  } from "react";
import { ethers } from "ethers";

import NFTArtifact from "../contracts/NFT.json";
import MarketplaceArtifact from "../contracts/NFTMarketplace.json";

import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "../contracts/addresses";

import { getContracts } from "../web3/getContracts";

export default function Home({ walletOpen, onClose, walletConected, minted, mintedCallBack }) {
    const [selectedNFT, setSelectedNFT] = useState(null);

    function handleSellClick(nft) {
        setSelectedNFT(nft);
    }

    function closeModal() {
        setSelectedNFT(null);
    }

    async function confirmSell(nft, price) {
        console.log("Selling NFT:", nft.tokenId, price);
        if (!window.ethereum) return;

        try {
        // const provider = new ethers.BrowserProvider(window.ethereum);
        // const signer = await provider.getSigner();
        // const nft = new ethers.Contract(
        //     NFT_ADDRESS,
        //     NFTArtifact.abi,
        //     signer
        // );
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const nftContract = new ethers.Contract(
            NFT_ADDRESS,
            NFTArtifact.abi,
            signer
            );

            const marketplace = new ethers.Contract(
            MARKETPLACE_ADDRESS,
            MarketplaceArtifact.abi,
            signer
            );

            const priceWei = ethers.parseEther(price.toString());
            console.log(`pricewei: ${priceWei}`);
            // 1️⃣ Approve marketplace to transfer NFT
            const approveTx = await nftContract.approve(
                MARKETPLACE_ADDRESS,
                nft.tokenId
            );
            await approveTx.wait();

            // 2️⃣ List NFT
            const listTx = await marketplace.ListNFT(
                NFT_ADDRESS,
                nft.tokenId,
                priceWei
            );
            await listTx.wait();

            console.log("NFT listed!");

            // 3️⃣ Refresh UI
            await fetchListedNFTs();

            // 4️⃣ Close modal
            closeModal();

        } 
        catch (err) {
            console.error("Sell failed:", err);
        }
        closeModal();
    }
    const [common_NFTs, setCommonNFTs] = useState([]);
    const [myNFTs, setMydNFTs] = useState([]);

    function ipfsToHttp(ipfsUrl) {
        if (!ipfsUrl) return "";
        return ipfsUrl.replace(
            "ipfs://",
            "https://gateway.pinata.cloud/ipfs/"
        );
    }

    useEffect(() => {
        fetchListedNFTs();
    }, []);

    useEffect(() => {
        if (walletConected) {
            console.log(`walletRender`);
            fetchListedNFTs();
        }
    }, [walletConected]);

    useEffect(() => {
        if (minted) {
            console.log(`walletRender ${minted}`);
            fetchListedNFTs();
            mintedCallBack();
        }
    }, [minted]);

    async function getMetaMaskInfo(){

    }

    async function buyNFT(NFT_ADDRESS, tokenId, priceInEth) {
        if (!window.ethereum) return;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const nft = new ethers.Contract(
            NFT_ADDRESS,
            NFTArtifact.abi,
            signer
        );

        const marketplace = new ethers.Contract(
            MARKETPLACE_ADDRESS,
            MarketplaceArtifact.abi,
            signer
        );
        console.log(`signer, nft: ${nft.nextTokenId()}`);
        // 3. Convert price to wei
        const price = ethers.parseEther(priceInEth.toString());
        console.log(`price: ${price}`);
        console.log(`price: ${NFT_ADDRESS}`);
        console.log(`price: ${tokenId}`);
        // // 4. Call buyNFT
        const tx = await marketplace.buyNFT(NFT_ADDRESS, tokenId, {
            value: price,
        });
        // console.log("Transaction sent:", tx.hash);

        await tx.wait();
        console.log("NFT bought successfully");

        // alert("NFT bought successfully!");
        await fetchListedNFTs();
        console.log("Rerendered");

    }    

    async function fetchListedNFTs() {
        console.log(`fetch function`);
        if (!window.ethereum) return;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const nft = new ethers.Contract(
            NFT_ADDRESS,
            NFTArtifact.abi,
            signer
        );

        const marketplace = new ethers.Contract(
            MARKETPLACE_ADDRESS,
            MarketplaceArtifact.abi,
            signer
        );
        console.log(`NFT_ADDRESS ${NFT_ADDRESS}`);
        const nextTokenId = await nft.nextTokenId();
        const common_items = [];
        const my_items = [];
        let item;

        console.log(`nft itemnumber:  ${Number(nextTokenId)}`);
        for (let tokenId = 0; tokenId < Number(nextTokenId); tokenId++) {
        const listing = await marketplace.listings(
            NFT_ADDRESS,
            tokenId
        );
        //  console.log(`item num:  ${tokenId}`);

        if (listing.price >= 0n) {
            // console.log(`listitem 1: ${listing.price}`);
            // console.log(`listitem2 : ${listing.seller}`);
            const tokenURI = await nft.tokenURI(tokenId);
            // console.log(`tokenURI:  ${tokenURI}`);
            const metadataURL = ipfsToHttp(tokenURI);
            // console.log(`metadataURL:  ${metadataURL}`);
            const metadata = await fetch(metadataURL).then(res => res.json());
            const owner = await nft.ownerOf(tokenId);
            const currentAccount = (await signer.getAddress()).toLowerCase();
            item =
            {
                tokenId,
                price: ethers.formatEther(listing.price),
                seller: listing.seller,
                image: ipfsToHttp(metadata.image),
                name: metadata.name,
                description: metadata.description,
                category: metadata.category,
                buyNow: metadata.buyNow,
                onAuction: metadata.onAuction

            }
            console.log(`item: price: ${item.price}`);
            // owner.toLowerCase() === currentAccount
            if(owner.toLowerCase() === currentAccount){
                my_items.push(item);
            }
            else{
                if(item.price > 0)
                    common_items.push(item);
            }
        }
        }

        // const jj = Number(nextTokenId);
        // console.log(`nft property: ${common_items.at(1).price}`);

        setMydNFTs(my_items);
        setCommonNFTs(common_items);
        // console.log(`item num:  ${jj}`);
    }    

    const [activeCategory, setActiveCategory] = useState("All");
    const [filters, setFilters] = useState({
        buyNow: false,
        onAuction: false,
    });

    const collectors = [
        { id: 1, name: "cryptoking", avatar: "https://i.pravatar.cc/100?img=1", volume: 68.4 },
        { id: 2, name: "nftqueen", avatar: "https://i.pravatar.cc/100?img=2", volume: 98.7 },
        { id: 3, name: "pixelgod", avatar: "https://i.pravatar.cc/100?img=3", volume: 82.1 },
        { id: 4, name: "ethlord", avatar: "https://i.pravatar.cc/100?img=4", volume: 71.9 },
        { id: 5, name: "chainmaster", avatar: "https://i.pravatar.cc/100?img=5", volume: 64.2 },
        { id: 6, name: "artwhale", avatar: "https://i.pravatar.cc/100?img=6", volume: 59.4 },
    ];

    const [sortOrder, setSortOrder] = useState("desc");

    const sortedCollectors = [...collectors].sort((a, b) =>
    sortOrder === "desc" ? b.volume - a.volume : a.volume - b.volume
    );
    
    const nftData = [
    {
        id: 1,
        name: "Cyber Ape #24",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        price: 1.25,
        creator: "cryptoking",
        creatorAvatar: "https://i.pravatar.cc/100?img=11",
        category: "Art",
        buyNow: true,
        auction: false,
    },
    {
        id: 2,
        title: "Rare Bunny",
        image: "https://picsum.photos/400/400?random=2",
        price: "0.6 ETH",
        category: "Games",
        buyNow: true,
        auction: false,
    },
    {
        id: 3,
        name: "Meta City",
        image: "https://picsum.photos/400/400?random=3",
        price: "3.9 ETH",
        creator: "darknft",
        category: "Games",
        buyNow: true,
        auction: false,
    },
    {
        id: 4,
        name: "Pixel Punk",
        image: "https://picsum.photos/400/400?random=4",
        price: "0.8 ETH",
        creator: "darknft",
        category: "Music",
        buyNow: true,
        auction: true,
    },
    {
        id: 5,
        name: "AI Dreamscape",
        image: "https://picsum.photos/400/400?random=5",
        price: "5.2 ETH",
        creator: "darknft",
        category: "Photography",
        buyNow: false,
        auction: true,
    },
    
];
    const [minting, setMinting] = useState(false);

    const [showMintModal, setShowMintModal] = useState(false);

    const filteredNFTs = common_NFTs.filter((nft) => {
    if (activeCategory !== "All" && nft.category !== activeCategory) return false;
    if (filters.buyNow && !nft.buyNow) return false;
    if (filters.onAuction && !nft.auction) return false;
    return true;
    });

    

    return (
        <>
        <div className="mx-auto max-w-[2000px] px-6 py-10">
        <div className="flex gap-[40px]">
            <aside className="w-[300px] shrink-0 rounded-2xl bg-white/5 p-5 transition hover:bg-white/10 hidden lg:block ">
                <div className="sticky top-24 space-y-8 rounded-xl bg-[#12172a] p-5">
                    <div>
                    <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase text-white/60">
                        Categories
                    </h3>
                    <ul className="space-y-3 text-sm">
                        {["All", "Art", "Music", "Games", "Photography"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                                ${
                                    activeCategory === cat
                                    ? "bg-blue-600/20 text-blue-400"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </ul>
                    </div>

                    {/* Filters */}
                    <div>
                    <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase text-white/60">
                        Filters
                    </h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 text-sm text-white/60">
                            <input
                                type="checkbox"
                                checked={filters.buyNow}
                                onChange={(e) =>
                                setFilters({ ...filters, buyNow: e.target.checked })
                                }
                                className="w-4 h-4 accent-blue-600"
                            />
                            Buy Now
                        </label>

                        <label className="flex items-center gap-3 text-sm text-white/60">
                            <input
                                type="checkbox"
                                checked={filters.onAuction}
                                onChange={(e) =>
                                setFilters({ ...filters, onAuction: e.target.checked })
                                }
                                className="w-4 h-4 accent-blue-600"
                            />
                            Auction
                        </label>

                    </div>
                    </div>

                    {/* Chains */}
                    <div>
                    <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase text-white/60">
                        Chains
                    </h3>
                    <div className="space-y-3 text-sm">
                        {["Ethereum", "Polygon", "Solana", "BNB Chain"].map((chain) => (
                        <div
                            key={chain}
                            className="px-3 py-2 rounded-lg cursor-pointer text-white/80 hover:bg-white/10 hover:text-white"
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

                {/* <my NFTs /> */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">My NFTs</h2>
                    </div>
                    {
                        <NFTCardPanel 
                            filteredNFTs={myNFTs.slice(0,4)}
                            placeholder={"Sell"}
                            onSell={handleSellClick}
                        />
                    }
                    {
                        <SellModal
                            nft={selectedNFT}
                            onClose={closeModal}
                            onConfirm={confirmSell}
                        />
                    }
                    
                </div>

                {/* <TrendingNFTs /> */}
                <div  className="space-y-6 ">
                    <h2 className="text-xl font-semibold">🔥 Trending NFTs</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredNFTs.map((nft) => (
                        <div
                            key={nft.tokenId}
                            className="rounded-xl bg-[#12172a] overflow-hidden hover:scale-[1.02] transition"
                        >
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
                        ))}
                    </div>
                </div>
                {/* <TopCollectors /> */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Top Collectors</h2>
                        <select
                            className="rounded-lg bg-[#12172a] px-3 py-1 text-sm"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            >
                            <option value="desc">Highest Volume</option>
                            <option value="asc">Lowest Volume</option>
                        </select>
                    </div>

                    <div className="flex gap-4 overflow-x-auto rounded-xl bg-[#12172a] p-4">
                        {/* Collector rows */}
                        {sortedCollectors.map((c, i) => (
                        <div
                            key={c.id}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5"
                        >
                            <span className="text-sm text-white/40">{i + 1}</span>
                            <img src={c.avatar} className="w-8 h-8 rounded-full" />
                            <div className="min-w-0">
                            <p className="text-sm font-medium truncate">@{c.name}</p>
                            <p className="text-xs text-white/40">{c.volume} ETH</p>
                            </div>
                        </div>
                        ))}


                    </div>
                </div>
                {/* <Latest NFTs /> */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Latest NFTs</h2>
                        <button className="text-sm text-indigo-400 hover:text-indigo-300">
                            View all →
                        </button>
                    </div>
                    {
                        <NFTCardPanel 
                            filteredNFTs={filteredNFTs.slice(0,4)}
                            placeholder={"Latest"}
                        />
                    }
                    
                </div>
            </section>
        </div>


        </div>

        {/* 🔑 MODAL RENDERING — ALWAYS LAST */}
        {showMintModal && (
            <MintListModal onClose={() => setShowMintModal(false)} />
        )}

    
        </>
    );
}