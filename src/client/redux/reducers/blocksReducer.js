import {
    INIT_UPLOAD,
    ADD_BLOCK,
    SAVE_BLOCKS_INIT,
    SAVE_BLOCKS_DONE
} from '../actions/types';

import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";
import update from "immutability-helper";

export const initialState = {
    status: "idle",
    initialPosition: null,
    currentBlocks: [],
    updatedBlocks: [],
    newBlocks: [],
    files: [],
    uploadDone: false
};

  
export const blocksReducer = function(state = initialState, action) {
    switch(action.type) {
        case INIT_UPLOAD:
            return { ...state,
                initialPosition: action.payload.position,
                status: "uploading",
                currentBlocks: action.payload.currentBlocks,
                updatedBlocks: action.payload.currentBlocks,
                files: action.payload.files
            };
        case ADD_BLOCK:
            let newBlocks = []
            let block = action.payload.block
            if(!state.updatedBlocks || state.updatedBlocks.length == 0) {
                newBlocks = [block]
            } else {
                let currentPosition = _.filter(state.updatedBlocks, { position: block.position})
                if(currentPosition.length > 0) {
                    let keyToDeactivateIndex = _.findIndex(state.updatedBlocks, currentPosition[0]);
                    newBlocks = update(state.updatedBlocks, {
                        $splice: [[keyToDeactivateIndex, 1, block]] 
                    })
                } else {
                    newBlocks = _.concat(state.updatedBlocks, [block])
                }
            }
            let updatedNewBlocks = _.concat(state.newBlocks, [block])

            let uploadDone = updatedNewBlocks.length == state.files.length
            return { ...state,
                newBlocks: updatedNewBlocks,
                updatedBlocks: newBlocks,
                uploadDone: uploadDone
            };
        case SAVE_BLOCKS_INIT:
            return {
                ...state,
                uploadDone: false,
                status: "saving"
            }
        case SAVE_BLOCKS_DONE:
            return initialState
        }
        

    return state;
}
