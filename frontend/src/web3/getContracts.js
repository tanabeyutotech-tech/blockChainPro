import { ethers } from "ethers";
import NFTArtifact from "../contracts/NFT.json";
import MarketplaceArtifact from "../contracts/NFTMarketplace.json";
import {
  NFT_ADDRESS,
  MARKETPLACE_ADDRESS,
} from "../contracts/addresses";

export async function getContracts() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const nftContract = new ethers.Contract(
    NFT_ADDRESS,
    NFTArtifact.abi,
    signer
  );

  const marketplaceContract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketplaceArtifact.abi,
    signer
  );

  return { provider, signer, nftContract, marketplaceContract };
}