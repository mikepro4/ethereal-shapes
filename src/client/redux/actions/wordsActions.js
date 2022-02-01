import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";
import update from "immutability-helper";

import {
    LOAD_WORD,
    SAVE_BLOCKS_INIT,
    SAVE_BLOCKS_DONE,
    LOAD_SORTED_BLOCKS,

} from "./types";

export const getMainWord = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/words/main")
        .then(response => {

            dispatch({
                type: LOAD_WORD,
                payload: response.data[0]
            });

            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================

export const createWord = (wordItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/words/create", wordItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadWord = (id, success) => async (
    dispatch,
	getState,
	api
) => {

   

    await api
        .post("/words/item", { wordId: id })
        .then(response => {
            if (success) {
                success(response.data);
            }

            dispatch({
                type: LOAD_WORD,
                payload: response.data
            });

            dispatch({
                type: LOAD_SORTED_BLOCKS,
                payload: {
                    sortBy: response.data.metadata.sortBy,
                    sortByDirection: response.data.metadata.sortByDirection,
                    originalBlocks: response.data.blocks
                }
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const searchWords = (type, identifier, offset, limit, query, success) => async (
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

    if(type == "featured_words") {
        criteria = {
            createdBy: "613422fe0ee5bd00212cd0a4"
        }
    }

    await api
        .post("/words/search", {
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


export const deleteWord = (wordId, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/words/delete", { wordId: wordId })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateWord = (word, data, success) => async (
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

    // let newMetadata = _.merge({}, word.metadata, {
    //     title: data.title,
    //     main: data.main,
    //     mainDate: date,
    //     shapeId: data.shapeId,
    //     audioUrl: data.audioUrl
    // })


    let newMetadata = {
        ...word.metadata,
        ...data
    }

    await api
        .post("/word/update", { 
            wordId: word._id, 
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

export const updateBlocks = (word, blocks, success) => async (
    dispatch,
	getState,
	api
) => {
    
    dispatch({
        type: SAVE_BLOCKS_INIT
    });
    console.log(blocks)

    await api
        .post("/word/updateBlocks", { 
            wordId: word._id, 
            blocks: blocks,
        })
        .then(response => {
            dispatch({
                type: SAVE_BLOCKS_DONE
            });
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });

    
}

// ===========================================================================


export const convertToPositions = (word, sortedBlocks, success) => async (
    dispatch,
	getState,
	api
) => {
    
    // console.log(word, sortedBlocks)

    let newBlocks = []

    newBlocks = sortedBlocks.map((block, i) => {
        return {
            ...block,
            position: i+1
        }
    })
    console.log(newBlocks)
    await api
        .post("/word/updateBlocks", { 
            wordId: word._id, 
            blocks: newBlocks,
        })
        .then(response => {
            dispatch({
                type: SAVE_BLOCKS_DONE
            });
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });

    
}



