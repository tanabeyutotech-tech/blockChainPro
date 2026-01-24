import { getNFTContract } from "./contract";
import { ethers } from "ethers";
import { fetchCollections  } from "./fetchCollections";
import { MARKETPLACE_ADDRESS } from "../contracts/addresses";
import { getMarketplaceContract  } from "./marketplace";
import { ipfsToHttp  } from "./contract";
import { useEffect, useState } from "react";

export async function fetchCollectionNFTs(NFT_ADRESS) {
    // const [collectionNFTs, setcollectionNFTs] = useState([]);
    let collectionNFTs;
    
    // async function fetNFTs(){
        if (!window.ethereum) throw new Error("No wallet");
  
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = await getNFTContract(NFT_ADRESS);
        const marketplace = await getMarketplaceContract(MARKETPLACE_ADDRESS);

        const nextTokenId = await contract.nextTokenId();
        const common_items = [];
        let item;
        for (let tokenId = 0; tokenId < Number(nextTokenId); tokenId++) {
            const listing = await marketplace.listings(
                  NFT_ADRESS,
                  tokenId
              );

            if (listing.price >= 0n) {
              const tokenURI = await contract.tokenURI(tokenId);
              console.log(`tokenURI:${tokenURI}`);
              const metadataURL = await ipfsToHttp(tokenURI);
              console.log(`metadataURL:${metadataURL}`);
              const metadata = await fetch(metadataURL).then(res => res.json());
              item =
              {
                  tokenId,
                  price: ethers.formatEther(listing.price),
                  seller: listing.seller,
                  image: await ipfsToHttp(metadata.image),
                  name: metadata.name,
                  description: metadata.description,
                  category: metadata.category,
                  buyNow: metadata.buyNow,
                  onAuction: metadata.onAuction
              }
              console.log(`image:${metadata.image}`);
              common_items.push(item);
          }}
          collectionNFTs = common_items;
      // }

  
          return collectionNFTs;


  // MOCK DATA — replace with blockchain later
  // return [
    // {
    //   id: 1,
    //   name: "Cyber Cat",
    //   image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    //   price: "0.25",
    //   collection: "0xA22D78bc37cE77FeE1c44F0C2C0d2524318570c3",
    //   category: "animals",
    // },
    // {
    //   id: 2,
    //   name: "Neon Car",
    //   image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    //   price: "0.6",
    //   collection: "vehicles",
    //   category: "vehicles",
    // },
    // {
    //   id: 3,
    //   name: "Future Laptop",
    //   image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    //   price: "0.4",
    //   collection: "tech",
    //   category: "tech",
    // },
    // {
    //   id: 4,
    //   name: "Coffee Cup",
    //   image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    //   price: "0.15",
    //   collection: "lifestyle",
    //   category: "lifestyle",
    // },
  // ];
}