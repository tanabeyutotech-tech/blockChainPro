import { ethers } from "ethers";
import NFTArtifact from "../contracts/NFT.json";
import MarketplaceArtifact from "../contracts/NFTMarketplace.json";

// const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "../contracts/addresses";

export const mintAndListNFT = async (tokenURI, nft_price, category) => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }
  console.log("ming1");
  console.log(`nft price : ${nft_price}`);

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  console.log(`NFT_ADDRESS ${NFT_ADDRESS}`);

  const contract = new ethers.Contract(
    NFT_ADDRESS,
    NFTArtifact.abi,
    signer
  );


  const tx = await contract.mint(
    await signer.getAddress(),
    tokenURI);
    await tx.wait();

    const nextTokenId = await contract.nextTokenId();
    const tokenId = Number(nextTokenId - 1n);

    const approveTx = await contract.approve(
    MARKETPLACE_ADDRESS,
    tokenId
    );
    await approveTx.wait();    

    const marketplace = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketplaceArtifact.abi,
    signer
    );

    const priceInEth = "1"; // example
    const price = ethers.parseEther(nft_price);

    const listTx = await marketplace.ListNFT(
    NFT_ADDRESS,
    tokenId,
    price
    );
    await listTx.wait();
    
};