import { ethers } from "ethers";
import NFTArtifact from "../contracts/NFT.json";
import MarketplaceArtifact from "../contracts/NFTMarketplace.json";
import { MARKETPLACE_ADDRESS } from "../contracts/addresses";

/**
 * Mint NFT into a SPECIFIC collection + list on marketplace
 */
export const mintAndListNFT = async (
  collectionAddress,
  tokenURI,
  nft_price
) => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // 🔥 collection contract (dynamic)
  const collection = new ethers.Contract(
    collectionAddress,
    NFTArtifact.abi,
    signer
  );

  // marketplace contract
  const marketplace = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketplaceArtifact.abi,
    signer
  );

  // approve marketplace
  const approveTx = await collection.setApprovalForAll(
    MARKETPLACE_ADDRESS,
    true
  );
  await approveTx.wait();

  const price = ethers.parseEther(nft_price);

  // 🔥 mint + list
  const tx = await marketplace.mintAndListNFT(
    collectionAddress,
    tokenURI,
    price
  );

  await tx.wait();
};

/**
 * Optional helper
 */
export const approveMarketplace = async (collectionAddress) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const nft = new ethers.Contract(
    collectionAddress,
    NFTArtifact.abi,
    signer
  );

  const tx = await nft.setApprovalForAll(MARKETPLACE_ADDRESS, true);
  await tx.wait();
};