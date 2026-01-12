import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NFTGrid from "../components/NFTGrid";
import { fetchListings } from "../utils/fetchListings";
import { getContracts } from "../utils/contracts";
import { ethers } from "ethers";

export default function Marketplace() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchListings().then(setItems);
  }, []);

  const buyNFT = async (nft) => {
    const { marketplace } = await getContracts();

    await marketplace.buyNFT(
      nft.nftAddress,
      nft.tokenId,
      { value: ethers.parseEther(nft.price) }
    );
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <NFTGrid items={items} buyNFT={buyNFT} />
        </main>
      </div>
    </div>
  );
}
