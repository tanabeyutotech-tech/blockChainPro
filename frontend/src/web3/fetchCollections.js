import { ethers } from "ethers";
import NFTArtifact from "../contracts/NFT.json";
import { NFT_FACTORY_ADDRESS } from "../contracts/addresses";

import { getFactoryContract } from "./factory";

export async function fetchCollections() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);
  const addresses = await factory.getCollections();

  function ipfsToHttp(ipfsUrl) {
    if (!ipfsUrl) return "";
    return ipfsUrl.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
    );
  }
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
        coverImageUrl: ipfsToHttp(await nft.collectionCover()),
      };
    })
  );
}