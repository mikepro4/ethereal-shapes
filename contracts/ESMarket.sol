//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ESMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _tokensSold;

    address payable owner;

    uint256 listingPrice = 0.0001 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    // structs can act like objects

    struct MarketToken {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // tokenId return which MarketToken - fetch which one it is

    mapping(uint256 => MarketToken) private idToMarketToken;

    // listen to events from front-end

    event MarketTokenMinted(
        uint indexed itemId,
        address indexed nftContract,
        uint indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // get the listing price

    function getListingPrice() public view returns(uint256) {
        return listingPrice;
    }

    // create a market item to put it up for sale

    function makeMarketItem(
        address nftContract,
        uint tokenId,
        uint price
    ) public payable nonReentrant {
        require(price > 0, "Price at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _tokenIds.increment();
        uint itemId = _tokenIds.current();

         // to create a market sale for buying and selling between parties

        idToMarketToken[itemId] = MarketToken(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            true
        );

        // NFT Transaction
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketTokenMinted(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );

        //function to conduct transaction and market sales

    }

    function createMarketSale(
        address nftContract,
        uint itemId
    ) public payable nonReentrant {
        uint price = idToMarketToken[itemId].price;
        uint tokenId = idToMarketToken[itemId].tokenId;
        require(msg.value == price, "Please submit the asking price");
        idToMarketToken[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketToken[itemId].owner = payable(msg.sender);
        idToMarketToken[itemId].sold = true;
        _tokensSold.increment();

        payable(owner).transfer(listingPrice);
    }

    function fetchMarketTokens() public view returns(MarketToken[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _tokensSold.current();
        uint currentIndex = 0;
        MarketToken[] memory items = new MarketToken[](unsoldItemCount);
        for(uint i = 0; i< itemCount; i++) {
            if(idToMarketToken[i+1].owner == address(0)) {
                uint currentId = i + 1;
                MarketToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchAllTokens() public view returns(MarketToken[] memory) {
        uint itemCount = _tokenIds.current();
        uint currentIndex = 0;
        MarketToken[] memory items = new MarketToken[](itemCount);
        for(uint i = 0; i< itemCount; i++) {
            uint currentId = i + 1;
            MarketToken storage currentItem = idToMarketToken[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }


    function fetchMyNFTs() public view returns(MarketToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i<totalItemCount; i++) {
            if(idToMarketToken[i+1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketToken[] memory items = new MarketToken[](itemCount);
        for(uint i = 0; i < totalItemCount; i++) {
            if(idToMarketToken[i+1].owner == msg.sender) {
                uint currentId = idToMarketToken[i+1].itemId;

                MarketToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // function for returning an array of minted tokens

    function fetchItemsCreated() public view returns(MarketToken[] memory) {
        // instead of owner it will be .seller
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i<totalItemCount; i++) {
            if(idToMarketToken[i+1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketToken[] memory items = new MarketToken[](itemCount);
        for(uint i = 0; i < totalItemCount; i++) {
            if(idToMarketToken[i+1].seller == msg.sender) {
                uint currentId = idToMarketToken[i+1].itemId;

                MarketToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;

    }
}