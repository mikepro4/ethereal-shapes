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
    UPDATE_NFT_IMAGE,
    UPDATE_NFT_SHAPE
} from "./types";

import { updateMarketTokens, updateCollectionItem } from "./appActions"


// export const updateNFTImage = (url) => async (
//     dispatch,
// 	getState,
// 	api
// ) => {

//     dispatch({
//         type: UPDATE_NFT_IMAGE,
//         payload: url
//     });
// }

export const updateNFTDuration = (nftId, duration, success) => async (
    dispatch,
	getState,
	api
) => {
        await api
            .post("/NFT/updateDuration", { 
                nftId: nftId, 
                duration: duration
            })
            .then(response => {
                dispatch(loadNFT(nftId, (data) => {
                    dispatch(loadNewNFT(data))
                }));
                if (success) {
                    success(response.data);
                }
            })
            .catch(() => {
            });

//     dispatch({
//         type: UPDATE_NFT_SHAPE,
//         payload: id
//     });
// }
}

export const updateNFTImage = (nftId, fileUrl, success) => async (
    dispatch,
	getState,
	api
) => {
        await api
            .post("/NFT/updateImage", { 
                nftId: nftId, 
                fileUrl: fileUrl
            })
            .then(response => {
                dispatch(loadNFT(nftId, (data) => {
                    dispatch(loadNewNFT(data))
                }));
                if (success) {
                    success(response.data);
                }
            })
            .catch(() => {
            });

//     dispatch({
//         type: UPDATE_NFT_SHAPE,
//         payload: id
//     });
// }
}


export const updateNFTShape = (shapeId, nftId, success) => async (
    dispatch,
	getState,
	api
) => {
        await api
            .post("/NFT/updateShape", { 
                nftId: nftId, 
                shapeId: shapeId
            })
            .then(response => {
                dispatch(loadNFT(nftId, (data) => {
                    dispatch(loadNewNFT(data))
                }));
                if (success) {
                    success(response.data);
                }
            })
            .catch(() => {
            });

//     dispatch({
//         type: UPDATE_NFT_SHAPE,
//         payload: id
//     });
// }
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
    console.log(nftAddress, nft.tokenId, signer, nft, price.toString())
    const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
        value: price
    });
    console.log(nftContract.baseTokenURI())

    await transaction.wait();
    dispatch(updateMarketTokens(() => {
        // console.log("here")
        // let marketTokens = getState().app.marketTokens;
        // let filteredNfts = _.filter(marketTokens, { image: fileUrl})
    
        // let nft = filteredNfts[0]

    }));

    dispatch(updateNFT(passedNft, {
        metadata: {
            owner: getState().app.account.address
        }
    }, () => {
        dispatch(updateCollectionItem(passedNft))
    }));

    // dispatch(loadNFT(passedNft._id, (data) => {
    //     dispatch(loadNewNFT(data))
    // }));
   
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

export const loadNFTDetails = (id, success) => async (
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
    let sortProperty = "createdAt"
    let sortDirection = "-1"

    if(type == "user") {
        criteria = {
            createdBy: identifier
        }
    }

    if(type == "featured_NFTs") {
        criteria = {
            featured: true
        }

        sortProperty = "featuredOrder"

        sortDirection = "1"
    }

    if(type == "sale") {
        criteria = {
            sale: true
        }
    }

    if(type == "my-nfts") {
        criteria = {
            owner: identifier
        }
    }

    await api
        .post("/NFTs/search", {
            criteria: criteria,
            sortProperty:sortProperty,
            offset: offset,
            limit: limit,
            order: sortDirection
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
    console.log("NFT UPDATE", NFT, data)


    // let newMetadata = _.merge({}, NFT.metadata, {
    //     title: data.title,
    //     main: data.main,
    //     mainDate: date,
    //     shapeId: data.shapeId,
    //     audioUrl: data.audioUrl
    // })

    // if(NFT && NFT._id) {
    console.log("NFT._id: ", NFT._id)

    let id = getState().activeNFT.newNFT._id
    console.log(id, getState())
    await api
        .post("/NFT/update", { 
            nftId: NFT._id, 
            metadata: {
                ...NFT.metadata,
                ...data.metadata
            },
            nft: {
                ...NFT.nft,
                ...data.nft
            },
        })
        .then(response => {
            dispatch(loadNFT(id, (data) => {
                dispatch(loadNewNFT(data))
            }));
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
    // }
   
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
