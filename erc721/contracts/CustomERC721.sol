pragma solidity ^0.4.23;

import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract CustomERC721 is ERC721Token {
    constructor(
        string _name,
        string _symbol,
        address _to,
        uint256 _tokenId,
        string _tokenURI
    ) public ERC721Token(_name, _symbol) {
        super._mint(_to, _tokenId);
        super._setTokenURI(_tokenId, _tokenURI);
    }
}
