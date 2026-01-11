//It will be used by the solidity compiler to validate its version
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//this is the main building block for smart contracts
contract NFT is ERC721URIStorage, Ownable {

    uint256 public nextTokenId;
    mapping(uint256 => string) private _tokenURIs;

    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    // bool public mint;
    //the constructor of nft contract

    constructor() ERC721("My NFT", "MNFT")  
                  Ownable(msg.sender){
    }

    function mint(address to, string memory uri) external onlyOwner {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit Minted(to, tokenId, uri);
    }

    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        _burn(tokenId);
    }

    // tokenURI now follows standard ERC721 behavior
    function tokenURI(uint256 tokenId) public view override returns (string memory){
        require(ownerOf(tokenId) == msg.sender , "Token does not exist");
        return _tokenURIs[tokenId];
    }
    // function to transfer tokens
    // function transfer(address to, uint256 amount) external {
    //     // check if the transaction sender has tokens
    //     require(balances[msg.sender] >= amount, "not enough tokens");

    //     // transfer the amount
    //     balances[msg.sender] -= amount;
    //     balances[to] += amount;


    //     // notify off-chain application of the transfer
    //     emit Transfer(msg.sender, to, amount);
    // }

    // function balanceOf(address account) external view returns (uint256){
    //     return balances[account];
    // }

}