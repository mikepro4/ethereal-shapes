import {
    LOAD_NFT,
    CLEAR_NFT,
    LOAD_NEW_NFT,
    CLEAR_NEW_NFT,
    UPDATE_NFT_SHAPE,
    UPDATE_NFT_IMAGE
} from '../actions/types';

export const initialState = {
    currentNFT: {},
    newNFT: {}
};

  
export const nftReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_NFT:
            return { ...state,
                currentNFT: action.payload
            };
        case LOAD_NEW_NFT:
            return { ...state,
                newNFT: action.payload
            };
        case CLEAR_NFT:
            return { ...state,
                currentNFT: {}
            };
        case CLEAR_NEW_NFT:
            return { ...state,
                newNFT: {}
            };
        case UPDATE_NFT_SHAPE:
            return {
                ...state,
                newNFT: {
                    ...state.newNFT,
                    metadata: {
                        ...state.newNFT.metadata,
                        shapeId: action.payload
                    }
                }
            }
        case UPDATE_NFT_IMAGE:
            return {
                ...state,
                newNFT: {
                    ...state.newNFT,
                    nft: {
                        ...state.newNFT.nft,
                        fileUrl: action.payload
                    }
                }
            }
        }

    return state;
}
