import { ethers } from "ethers";
import Marketplace from "../abi/NFTMarketplace.json";
import NFT from "../abi/NFT.json";
import { MARKETPLACE_ADDRESS, SEPOLIA_RPC } from "./constants";

export async function fetchListings() {
  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC);

  const marketplace = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    Marketplace.abi,
    provider
  );

  const listedEvents = await marketplace.queryFilter("Listed");

  const items = await Promise.all(
    listedEvents.map(async (e) => {
      const { nft, tokenId, price } = e.args;

      const nftContract = new ethers.Contract(
        nft,
        NFT.abi,
        provider
      );

      const tokenURI = await nftContract.tokenURI(tokenId);
      const metadata = await fetch(tokenURI).then(res => res.json());

      return {
        nftAddress: nft,
        tokenId: tokenId.toString(),
        name: metadata.name,
        image: metadata.image,
        price: ethers.formatEther(price),
        creator: metadata.creator || "Unknown",
      };
    })
  );

  return items;
}