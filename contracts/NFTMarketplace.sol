// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    // marketplace fee in percent 
    uint256 public feePercent = 25;
    address public owner;

    mapping(address => mapping(uint256 => Listing)) public listings;

    event Listed(address indexed nft, uint256 indexed tokenId, address seller, uint256 price);
    event Sale(address indexed nft, uint256 indexed tokenId, address buyer, uint price);
    // mapping(address => mapping(uint256 => Listing)) public listings;

    constructor(){
        owner = msg.sender;
    }

    function ListNFT(address _nft, uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
// nft, tokenid, price
        IERC721 nft = IERC721(_nft);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not NFT owner");
        require(nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(_tokenId) == address(this), 
                "Marketplace not approved");
        
        listings[_nft][_tokenId] = Listing(msg.sender, _price);
        emit Listed(_nft, _tokenId, msg.sender, _price);
    }

    function buyNFT(address _nft, uint256 _tokenId) external payable nonReentrant {
        Listing memory item = listings[_nft][_tokenId];
        require(item.price > 0, "NFT not listed");
        require(msg.value >= item.price, "NFT enough ETH sent");

        // marketplace fee
        uint256 fee = (msg.value * feePercent) / 1000;
        uint256 sellerAmount = msg.value - fee;

        // send ETH
        payable(item.seller).transfer(sellerAmount);
        payable(owner).transfer(fee);

        // transfer NFT
        IERC721(_nft).safeTransferFrom(item.seller, msg.sender, _tokenId);

        delete listings[_nft][_tokenId];
        emit Sale(_nft, _tokenId, msg.sender, item.price);
    }
    
}