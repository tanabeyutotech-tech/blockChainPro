// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    address public marketplace;

    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("My NFT", "MNFT") Ownable(msg.sender) {}

    function setMarketplace(address _marketplace) external onlyOwner {
        marketplace = _marketplace;
    }

    modifier onlyMarketplace() {
        require(msg.sender == marketplace, "Not marketplace");
        _;
    }

    function mint(address to, string memory uri)
        external
        returns (uint256)
    {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit Minted(to, tokenId, uri);
        return tokenId;
    }

    function mintFromMarketplace(address to, string memory uri)
        external
        onlyMarketplace
        returns (uint256)
    {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        _burn(tokenId);
    }
}