const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main(){
    const [buyer] = await ethers.getSigners();

    const NFT_ADDRESS = "0x6f036cDd7d4f30Da47D11f4a039e3db0ABFE57dC";
    const MARKETPLACE_ADDRESS = "0xAca650127FAAfA4Bdf21FCC0bFCCaA68932d326E";

    const marketplace = await ethers.getContractAt("NFTMarketplace", MARKETPLACE_ADDRESS);
    
    const tokenId = 7;
    console.log("NFT purchased by");
    // buy the NFt
    // you must send the correct amount of ETH Listed in the marketplace
    const listing = await marketplace.listings(NFT_ADDRESS, tokenId);
    const price = listing.price;

    const tx = await marketplace.buyNFT(NFT_ADDRESS, tokenId, { value : price });
    await tx.wait();

    console.log("NFT purchased by", buyer.address);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})