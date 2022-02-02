import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";
import update from "immutability-helper";

import {

} from "./types";

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

            // dispatch({
            //     type: LOAD_NFT,
            //     payload: response.data
            // });

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
