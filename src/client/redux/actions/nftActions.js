import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";
import update from "immutability-helper";

import Web3Modal from "web3modal";

import {
    nftAddress, nftMarketAddress
} from "../../../../config";

import NFT from "../../../../artifacts/contracts/NFT.sol/NFT.json";
import ESMarket from "../../../../artifacts/contracts/ESMarket.sol/ESMarket.json";
import { ethers } from "ethers";


import {
    LOAD_NFT,
    LOAD_NEW_NFT,
    UPDATE_NFT_SHAPE
} from "./types";

import { updateMarketTokens } from "./appActions"

export const updateNFTShape = (id) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: UPDATE_NFT_SHAPE,
        payload: id
    });
}


/////////////////////////////////////////////////


export const buyNFT = (fileUrl, passedNft) => async (
    dispatch,
	getState,
	api
) => {

    let marketTokens = getState().app.marketTokens;
    let filteredNfts = _.filter(marketTokens, { image: fileUrl})

    let nft = filteredNfts[0]

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftMarketAddress, ESMarket.abi, signer)
    const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    console.log(nft, nft.tokenId, price)
    const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
        value: price
    });
    console.log(nftContract.baseTokenURI())

    await transaction.wait();
    dispatch(updateMarketTokens(() => {
        console.log("here")
        let marketTokens = getState().app.marketTokens;
        let filteredNfts = _.filter(marketTokens, { image: fileUrl})
    
        let nft = filteredNfts[0]

    }));

    dispatch(updateNFT(passedNft, {
        owner: getState().app.account.address
    }));
   
};

/////////////////////////////////////////////////

// ===========================================================================

export const createNFT = (NFTItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/NFTs/create", NFTItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadNFT = (id, success) => async (
    dispatch,
	getState,
	api
) => {

   

    await api
        .post("/NFTs/item", { NFTId: id })
        .then(response => {
            if (success) {
                success(response.data);
            }

            dispatch({
                type: LOAD_NFT,
                payload: response.data
            });

        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const searchNFTs = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let criteria = {}

    if(type == "user") {
        criteria = {
            createdBy: identifier
        }
    }

    if(type == "featured_NFTs") {
        criteria = {
            createdBy: "613422fe0ee5bd00212cd0a4"
        }
    }

    await api
        .post("/NFTs/search", {
            criteria: criteria,
            sortProperty: "createdAt",
            offset: offset,
            limit: limit,
            order: "-1"
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const deleteNFT = (NFTId, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/NFTs/delete", { NFTId: NFTId })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateNFT = (NFT, data, success) => async (
    dispatch,
	getState,
	api
) => {
    console.log("NFT UPDATE", data)

    let date

    if(data.main) {
        date = new Date()
    } else {
        date = null
    }

    // let newMetadata = _.merge({}, NFT.metadata, {
    //     title: data.title,
    //     main: data.main,
    //     mainDate: date,
    //     shapeId: data.shapeId,
    //     audioUrl: data.audioUrl
    // })


    let newMetadata = {
        ...NFT.metadata,
        ...data
    }

    await api
        .post("/NFT/update", { 
            NFTId: NFT._id, 
            metadata: newMetadata,
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


// ===========================================================================


export const loadNewNFT = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_NFT,
        payload: data
    });
}

export const clearNewNFT = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_NFT
    });
}


export const clearNFT = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NFT
    });
}

// ===========================================================================
