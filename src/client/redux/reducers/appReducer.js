import * as _ from "lodash";
import update from "immutability-helper";

import {
    DEMO_ON,
    DEMO_OFF,
	SHOW_APP_MENU,
	HIDE_APP_MENU,
    FETCH_AUTH,
    AUTH_CLEAR,
    UPDATE_TOTAL_PIXELS,
	UPDATE_TOTAL_SCROLLED_PIXELS,
    UPDATE_COLLECTION,
    SHOW_DRAWER,
    HIDE_DRAWER,
    ACTIVATE_KEY,
    DEACTIVATE_KEY,
    LOAD_WORD,
    LOAD_SHAPE,
    LOAD_SORTED_BLOCKS,
    CLEAR_SORTED_BLOCKS,
    UPDATE_ACCOUNT,
    UPDATE_MARKET_TOKENS,
    UPDATE_COLLECTION_ITEM,
    PAUSE_ANIMATION,
    SALES_ACTIVE,
    UPDATE_STATUS_BUYING,
    UPDATE_STATUS_MINTING,
    SET_DRAFT,
    SET_APPROVED,
    SET_REJECTED,
    SET_SOLD,
    SET_MIC,
    SET_MIC_AUDIO,
    SET_IFRAME,
    SET_TOUCH_ZONES
} from "../actions/types";

export const initialState = {
    account: {
        metamask: false,
        ownedTokens: null,
        balance: null,
        address: null,
    },
    marketTokens: [],


    demoMode: false,
    totalPixels: 0,
	clientWidth: 0,
	clientHeight: 0,
	totalScrolledPixels: 0,
	scrollTo: null,
    menuOpen: false,
    user: null,
    updateCollection: false,
    updateCollectionItem: null,
    drawerOpen: false,
    drawerType: null,
    drawerData: {},
    position: {},
    drawerLocation: {},
    pauseAnimation: false,

    activeKeys: [],
    
    activeWord: {},
    activeShape: {},
    sortedBlocks: [],

    nftTokens: [],

    salesActive: false,

    buying: false,
    minting: false,

    draft: false,
    approved: false,
    rejected: false,
    sold: false,
    mic: false,
    micAudio: null,
    iframe: false,
    touchZones: false
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
        case SET_TOUCH_ZONES:
            return {
                ...state,
                touchZones: action.payload
            }
        case SET_IFRAME:
            return {
                ...state,
                iframe: action.payload
            }
        case SET_MIC_AUDIO:
            return {
                ...state,
                micAudio: action.payload
            }
        case SET_MIC:
            return {
                ...state,
                mic: action.payload
            }
        case SET_SOLD:
            return {
                ...state,
                sold: action.payload
            }
        case SET_APPROVED:
            return {
                ...state,
                approved: action.payload
            }
        case SET_REJECTED:
            return {
                ...state,
                rejected: action.payload
            }
        case SET_DRAFT:
            return {
                ...state,
                draft: action.payload
            }
        case UPDATE_STATUS_BUYING:
            return {
                ...state,
                buying: action.payload
            }
        case UPDATE_STATUS_MINTING:
            return {
                ...state,
                minting: action.payload
            }
        case SALES_ACTIVE:
            return {
                ...state,
                salesActive: action.payload
            }
        case PAUSE_ANIMATION:
            return {
                ...state,
                pauseAnimation: action.payload
            }
        case UPDATE_MARKET_TOKENS:
            return {
                ...state,
                marketTokens: action.payload
            }
        case UPDATE_ACCOUNT:
            return {
                ...state,
                account: {
                    ...state.account,
                    ...action.payload
                }
            }
        case LOAD_WORD:
            return {
                ...state,
                activeWord: action.payload
            }
        case LOAD_SHAPE:
            return {
                ...state,
                activeShape: action.payload
            }
        case DEMO_ON:
			return {
				...state,
				demoMode: true
            }
        case DEMO_OFF:
            return {
                ...state,
                demoMode: false
            }
        case FETCH_AUTH:
			return {
				...state,
				user: action.payload
			}
		case AUTH_CLEAR:
			return {
				...state,
				user: null
			}
		case SHOW_APP_MENU:
			return {
				...state,
				menuOpen: true
			}
		case HIDE_APP_MENU:
			return {
				...state,
				menuOpen: false
			}
        case UPDATE_TOTAL_PIXELS:
            return {
                ...state,
                totalPixels: action.total,
                clientWidth: action.clientWidth,
                clientHeight: action.clientHeight
            } ;
        case UPDATE_TOTAL_SCROLLED_PIXELS:
            return {
                ...state,
                totalScrolledPixels: action.pixels
            };
        case UPDATE_COLLECTION:
            return {
                ...state,
                updateCollection: action.payload
            };
        case UPDATE_COLLECTION_ITEM:
            return {
                ...state,
                updateCollectionItem: action.payload
            };
        case SHOW_DRAWER:
            let drawer

            if(action.drawerData) {
                drawer = action.drawerData
            } else {
                drawer = state.drawerData
            }

            let position

            if(action.element) {
                position =  {
                    x: action.element.current.offsetTop + 55,
                    y: action.element.current.offsetLeft - 250,
                }

            } else {
                position = {}
            }
            return {
                ...state,
                drawerOpen: true,
                drawerType: action.payload,
                drawerData: drawer,
                position:  position,
                drawerLocation: action.drawerLocation
            }
        case HIDE_DRAWER:
            return {
                ...state,
                drawerOpen: false,
                drawerType: null,
                drawerData: null,
                suggestions: [],
                position:  {},
                drawerLocation: null
            }
        case ACTIVATE_KEY:
            let activeKeys = []

            let keyToActivateIndex = _.findIndex(state.activeKeys, action.payload);

            if(keyToActivateIndex < 0) {
                let newKeys = _.union(state.activeKeys, [action.payload])
                return {
                    ...state,
                    activeKeys: newKeys
                }
            } else {
                return {
                    ...state
                }
            }
            
        case DEACTIVATE_KEY:

            let keyToDeactivateIndex = _.findIndex(state.activeKeys, action.payload);

            if(keyToDeactivateIndex) {
                return update(state, {
                    activeKeys: { $splice: [[keyToDeactivateIndex, 1]] }
                });
            } else {
                return {
                    ...state
                }
            }
        case LOAD_SORTED_BLOCKS:
            let sortBy = action.payload.sortBy
            let direction = action.payload.sortByDirection
            let originalBlocks = action.payload.originalBlocks
            // console.log(type, direction, originalBlocks)
            // let sortedBlocks = _.orderBy(originalBlocks, block => block.palette.h, [direction]);
            // console.log(sortedBlocks)
            let sortedBlocks = []
            let newSortedBlocks
            if(sortBy == "position") {
                sortedBlocks = _.orderBy(originalBlocks, block => block.position, [direction]); 

                newSortedBlocks = sortedBlocks.map((block,i )=> {
                    return {
                        ...block,
                        position: block.position
                    }
                })
            }

            if(sortBy == "h") {
                sortedBlocks = _.orderBy(originalBlocks, block => block.palette.h, [direction]);
            }

            if(sortBy == "s") {
                sortedBlocks = _.orderBy(originalBlocks, block => block.palette.s, [direction]);
            }

            if(sortBy == "b") {
                sortedBlocks = _.orderBy(originalBlocks, block => block.palette.b, [direction]);
            }

            if(sortBy !== "position") {
                newSortedBlocks = sortedBlocks.map((block,i )=> {
                    return {
                        ...block,
                        position: i
                    }
                })
            }

            // console.log(block.position, direction)

            return {
                ...state,
                sortedBlocks: newSortedBlocks
            }
        case CLEAR_SORTED_BLOCKS: 
            return {
                ...state,
                sortedBlocks: []
            }
		default:
			return state;
	}
};

