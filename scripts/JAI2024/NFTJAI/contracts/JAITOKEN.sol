// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JAITOKEN is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    constructor(address initialOwner) ERC721("JAITOKEN", "JAIT") Ownable(initialOwner) {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function mintMultipleNFTs(address[] memory recipients, string[] memory tokenURIs)
        public onlyOwner
        returns (uint256)
    {
        require(recipients.length == tokenURIs.length, "Recipients and tokenURIs length mismatch");

        uint256 newItemId = _tokenIds;
        for (uint256 i = 0; i < recipients.length; i++) {
            newItemId++;
            _mint(recipients[i], newItemId);
            _setTokenURI(newItemId, tokenURIs[i]);
        }
        _tokenIds = newItemId;  // Atualiza _tokenIds uma vez após o loop
        return newItemId;
    }
}