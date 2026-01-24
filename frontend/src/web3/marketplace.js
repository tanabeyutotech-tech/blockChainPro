import { ethers } from "ethers";
import MarketplaceArtifact from "../contracts/NFTMarketplace.json";
// const FACTORY_ADDRESS = "0xYOUR_FACTORY_ADDRESS"; // ← replace

export async function getMarketplaceContract(CONTRACT_ADDRESS) {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    MarketplaceArtifact.abi,
    signer
  );
}