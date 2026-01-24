import { ethers } from "ethers";
import NFTContractArtifact from "../contracts/NFT.json";
// const FACTORY_ADDRESS = "0xYOUR_FACTORY_ADDRESS"; // ← replace

export async function getNFTContract(CONTRACT_ADDRESS) {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    NFTContractArtifact.abi,
    signer
  );
}

export async function ipfsToHttp(ipfsUrl) {
    if (!ipfsUrl) return "";
    return ipfsUrl.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
    );
}