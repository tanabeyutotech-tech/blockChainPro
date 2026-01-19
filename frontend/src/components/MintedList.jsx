import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MyNFT from "../abi/MyNFT.json";

export default function MintedList() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    async function loadNFTs() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        MyNFT.abi,
        provider
      );

      const events = await contract.queryFilter("Minted");

      const items = await Promise.all(
        events.map(async (e) => {
          const uri = e.args.tokenURI.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          );
          const meta = await fetch(uri).then(r => r.json());

          return {
            tokenId: e.args.tokenId.toString(),
            name: meta.name,
            image: meta.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            ),
          };
        })
      );

      setNfts(items.reverse());
    }

    loadNFTs();
  }, []);

  return (
    <section>
      <h2>Minted NFTs</h2>
      <div className="grid">
        {nfts.map(nft => (
          <div key={nft.tokenId}>
            <img src={nft.image} />
            <p>{nft.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}