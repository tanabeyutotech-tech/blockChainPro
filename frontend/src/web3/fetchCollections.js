import { ethers } from "ethers";
import NFTArtifact from "../contracts/NFT.json";
import { getFactoryContract } from "./factory";

export async function fetchCollections() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const factory = await getFactoryContract();
  const addresses = await factory.getCollections();

  return Promise.all(
    addresses.map(async (addr) => {
      const nft = new ethers.Contract(
        addr,
        NFTArtifact.abi,
        signer
      );
        console.log(`collection data: ${await nft.collectionName()}`);
        console.log(`collection data: ${await nft.collectionSymbol()}`);
        console.log(`collection data: ${await nft.collectionCover()}`);

      return {
        address: addr,
        name: await nft.collectionName(),
        symbol: await nft.collectionSymbol(),
        cover: await nft.collectionCover(),
      };
    })
  );
}