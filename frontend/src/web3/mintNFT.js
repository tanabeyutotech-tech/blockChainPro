import { ethers } from "ethers";
import NFTABI from "../abis/NFT.json";

export async function mintNFTToCollection(
  collectionAddress,
  tokenURI,
  price
) {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const nft = new ethers.Contract(
    collectionAddress,
    NFTABI,
    signer
  );

  const tx = await nft.mint(signer.address, tokenURI);
  await tx.wait();

  return true;
}