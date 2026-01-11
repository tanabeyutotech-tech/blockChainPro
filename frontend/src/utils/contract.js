import { ethers } from "ethers";
import NFT from "../abi/NFT.json";
import Marketplace from "../abi/NFTMarketplace.json";
import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "./constants";
import { getSigner } from "./provider";

export async function getContracts() {
  const signer = await getSigner();

  const nft = new ethers.Contract(NFT_ADDRESS, NFT.abi, signer);
  const marketplace = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    Marketplace.abi,
    signer
  );

  return { nft, marketplace };
}