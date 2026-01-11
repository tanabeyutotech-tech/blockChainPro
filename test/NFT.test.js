const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Contract", function () {
  let NFT, nft, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    await nft.waitForDeployment();
  });

  it("Should set the correct owner", async function () {
    expect(await nft.owner()).to.equal(owner.address);
  });

  it("Should mint an NFT to owner", async function () {
    const tokenURI = "ipfs://test-metadata.json";

    await nft.mint(owner.address, tokenURI);

    expect(await nft.ownerOf(0)).to.equal(owner.address);
    expect(await nft.tokenURI(0)).to.equal(tokenURI);
  });

  it("Should increment tokenId after mint", async function () {
    await nft.mint(owner.address, "uri1");
    await nft.mint(owner.address, "uri2");

    expect(await nft.ownerOf(1)).to.equal(owner.address);
  });

  it("Should NOT allow non-owner to mint", async function () {
    await expect(
      nft.connect(addr1).mint(addr1.address, "ipfs://hack.json")
    ).to.be.revertedWithCustomError(
      nft,
      "OwnableUnauthorizedAccount"
    );
  });
});