import { ethers } from "ethers";
import FactoryABI from "../contracts/NFTFactory.json";
import TokenABI from "../contracts/NFT.json";
import { NFT_FACTORY_ADDRESS } from "../contracts/addresses";

export async function fetchCollections() {
  const provider = new ethers.BrowserProvider(window.ethereum);

  const factory = new ethers.Contract(
    NFT_FACTORY_ADDRESS,
    FactoryABI.abi,
    provider
  );

  const addresses = await factory.getCollections();

  const collections = await Promise.all(
    addresses.map(async (addr) => {
      const token = new ethers.Contract(addr, TokenABI.abi, provider);

      return {
        address: addr,
        name: await token.collectionName(),
        symbol: await token.collectionSymbol(),
        cover: await token.collectionCover(),
        nftCount: Number(await token.nextTokenId()),
      };
    })
  );

  return collections;
}