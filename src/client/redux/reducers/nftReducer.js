import {
    LOAD_NFT,
    CLEAR_NFT,
    LOAD_NEW_NFT,
    CLEAR_NEW_NFT
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
        }

    return state;
}
