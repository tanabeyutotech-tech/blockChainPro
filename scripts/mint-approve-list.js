
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
    const [user] = await hre.ethers.getSigners();
    console.log("using account: ", user.address);

    // const NFT_ADDRESS = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    // const MARKETPLACE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    // attach deployed nft + marketplace contracts
    const NFT_ADDRESS = "0x6f036cDd7d4f30Da47D11f4a039e3db0ABFE57dC";
    const MARKETPLACE_ADDRESS = "0xAca650127FAAfA4Bdf21FCC0bFCCaA68932d326E";
    // const MARKETPLACE_ADDRESS = process.env.MARKETPLACE_ADDRESS;

    if(!hre.ethers.isAddress(NFT_ADDRESS)){
        throw new Error("Invalide NFT address");
    }

    if(!hre.ethers.isAddress(MARKETPLACE_ADDRESS)){
        throw new Error("Invalide marketplace address");
    }

    // Attach to your NFT Contract
    const NFT = await hre.ethers.getContractFactory("NFT");
    const nft = NFT.attach(NFT_ADDRESS);

    // Attach to your Marketplace contract
    const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const marketplace = Marketplace.attach(MARKETPLACE_ADDRESS);

    // mint a new NFT
    console.log("minitng NFT...");
    const tokenURI = "https://rpc.ankr.com/eth_sepolia/cf5de52b2806e13750f8b9bbc4b3ae282012528b6ec6725379e876e2ec9fb46d";
    const mintTx = await nft.mint(user.address, tokenURI);
    await mintTx.wait();

    // get the minted tokenId (nextTokenId - 1)
    const nextTokenId = await nft.nextTokenId(); //Bignumber
    const tokenId = Number(nextTokenId - 1n);
    console.log(`NFT minted with tokenId: ${tokenId}`);

    // Approve the marketplace to handle this NFT
    const approveTx = await nft.approve(MARKETPLACE_ADDRESS, tokenId);
    await approveTx.wait();
    console.log(`Marketplace approved for tokenId: ${tokenId}`);

    // list the NFT on the marketplace
    const price = ethers.parseEther("7");
    const listTx = await marketplace.ListNFT(NFT_ADDRESS, tokenId, price);
    await listTx.wait();
    console.log(`NFt listed on marketplace for 0.01 ETH`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})