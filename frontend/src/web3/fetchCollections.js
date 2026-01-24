import { getFactoryContract } from "./factory";
import { ethers } from "ethers";
import NFTArtifact from "../contracts/NFT.json";


export async function fetchCollections() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const factory = await getFactoryContract();
  const collections = await factory.getCollections(); // array of addresses

  const result = await Promise.all(
    collections.map(async (col) => {
      const nft = new ethers.Contract(
        col,
        NFTArtifact.abi,
        signer
      );

      console.log(`collection address: ${col}`);

      const name = await nft.collectionName();      // ✅ correct
      const symbol = await nft.collectionSymbol();  // ✅
      const cover = await nft.collectionCover();    // ✅
      const total = await nft.nextTokenId();        // ✅
      console.log(`collection symbol: ${symbol}`);

      return {
        address: col,
        name,
        symbol,
        cover,
        nftCount: Number(total),
      };
    })
  );

  return result;
}