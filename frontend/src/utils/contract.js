import { ethers } from "ethers";
import NFTArtifact from "../contracts/NFT.json";
import MarketplaceArtifact from "../contracts/NFTMarketplace.json";
import { MARKETPLACE_ADDRESS } from "../contracts/addresses";

export async function mintAndListNFT(
  collectionAddress,
  tokenURI,
  priceEth
) {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    collectionAddress,
    NFTArtifact.abi,
    signer
  );

  console.log(`get contract `);

  // await contract.setMarketplace(MARKETPLACE_ADDRESS);

  console.log(`setmarketpalce `);

  const marketplace = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketplaceArtifact.abi,
    signer
    );
    const ty = await contract.setApprovalForAll(MARKETPLACE_ADDRESS, true);
    await ty.wait();

    console.log(`marketpalce `);

    const price = ethers.parseEther(priceEth);
    console.log(`price: ${price} `);

    const tz = await contract.setMarketplace(MARKETPLACE_ADDRESS);
    tz.wait();
    console.log(`setmarkeplaced: ${price} `);

    const tx = await marketplace.mintAndListNFT(
      collectionAddress,
      tokenURI,
      price
    );
    console.log(`marketpalceAdreess : ${MARKETPLACE_ADDRESS} `);

    await tx.wait();

}