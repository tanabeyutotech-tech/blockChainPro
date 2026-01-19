async function confirmSell(nft, price) {
  if (!window.ethereum) return;

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const nftContract = new ethers.Contract(
      NFT_ADDRESS,
      NFTArtifact.abi,
      signer
    );

    const marketplace = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MarketplaceArtifact.abi,
      signer
    );

    const priceWei = ethers.parseEther(price.toString());

    // 1️⃣ Approve marketplace to transfer NFT
    const approveTx = await nftContract.approve(
      MARKETPLACE_ADDRESS,
      nft.tokenId
    );
    await approveTx.wait();

    // 2️⃣ List NFT
    const listTx = await marketplace.listNFT(
      NFT_ADDRESS,
      nft.tokenId,
      priceWei
    );
    await listTx.wait();

    console.log("NFT listed!");

    // 3️⃣ Refresh UI
    await fetchListedNFTs();

    // 4️⃣ Close modal
    closeModal();

  } catch (err) {
    console.error("Sell failed:", err);
  }
}