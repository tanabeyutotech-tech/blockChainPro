const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main(){
    const [buyer] = await ethers.getSigners();

    const NFT_ADDRESS = "0xECB55a2Cf50Bb2b7A247a17A086bDf70c18613EA";
    const MARKETPLACE_ADDRESS = "0xF0D8D32157C5388250e593Eb5EBe577F83BB7E88";

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