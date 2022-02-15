import {
    DEMO_ON,
    DEMO_OFF,
    SHOW_APP_MENU,
    HIDE_APP_MENU,
    UPDATE_TOTAL_PIXELS,
    UPDATE_TOTAL_SCROLLED_PIXELS,
    SCROLL_TO,
    SCROLL_TO_RESET,
    UPDATE_COLLECTION,
    UPDATE_COLLECTION_ITEM,
    SHOW_DRAWER,
    HIDE_DRAWER,
    ACTIVATE_KEY,
    DEACTIVATE_KEY,
    UPDATE_ACCOUNT,
    UPDATE_MARKET_TOKENS,
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
} from "./types";

import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import Web3Modal from "web3modal";

import {
    nftAddress, nftMarketAddress
} from "../../../../config";

import NFT from "../../../../artifacts/contracts/NFT.sol/NFT.json";
import ESMarket from "../../../../artifacts/contracts/ESMarket.sol/ESMarket.json";
import { ethers } from "ethers";

/////////////////////////////////////////////////

export const setTouchZones = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SET_TOUCH_ZONES,
        payload: value
    });
};


/////////////////////////////////////////////////

export const setIframe = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SET_IFRAME,
        payload: value
    });
};

/////////////////////////////////////////////////


export const setMicAudio = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SET_MIC_AUDIO,
        payload: value
    });
};


/////////////////////////////////////////////////

export const setMic = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SET_MIC,
        payload: value
    });
};


/////////////////////////////////////////////////

export const getMarketStats = (success) => async (
    dispatch,
    getState,
    api
) => {

    await api
        .post("/market/stats", {})
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

/////////////////////////////////////////////////

export const setDraft = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SET_DRAFT,
        payload: value
    });
};

/////////////////////////////////////////////////

export const setSold = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SET_SOLD,
        payload: value
    });
};


/////////////////////////////////////////////////

export const setApproved = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SET_APPROVED,
        payload: value
    });
};

/////////////////////////////////////////////////

export const setRejected = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SET_REJECTED,
        payload: value
    });
};

/////////////////////////////////////////////////

export const updateStatusBuying = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: UPDATE_STATUS_BUYING,
        payload: value
    });
};

/////////////////////////////////////////////////

export const updateStatusMinting = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: UPDATE_STATUS_MINTING,
        payload: value
    });
};

/////////////////////////////////////////////////

export const pauseAnimation = (value) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: PAUSE_ANIMATION,
        payload: value
    });
};

/////////////////////////////////////////////////

export const updateMarketTokens = (success) => async (
    dispatch,
    getState,
    api
) => {

    // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/gyaYPfWvTp5LWylwLELws3CJhjTLL6Gy");
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/vRUT6XYcEKill-ZdUvWmgYl-avIZnwAt");
    
    // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/0095c162fff84a3eb7540a929ed0dfa1");
    // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/0095c162fff84a3eb7540a929ed0dfa1");
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftMarketAddress, ESMarket.abi, provider);
    const data = await marketContract.fetchAllTokens();


    const items = await Promise.all(data.map(async i => {
        const tokenURI = await tokenContract.tokenURI(i.tokenId);

        const meta = await axios.get(tokenURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
        }
        return item;
    }))

    console.log(items)
    let activeNFT = getState().activeNFT.currentNFT
    if(activeNFT && activeNFT.nft) {
        let activeFileUrl = getState().activeNFT.currentNFT.nft.fileUrl
        let activeId = getState().activeNFT.currentNFT._id
    
        let filteredNfts = _.filter(items, { image: activeFileUrl })
    
        let activeFileOwner = filteredNfts[0].owner
        let activeTokenId = filteredNfts[0].tokenId
    
        await api
            .post("/NFT/updateOwner", {
                nftId: activeId,
                owner: activeFileOwner,
                tokenId: activeTokenId ? activeTokenId : ""
            })
            .then(response => {
                if (success) {
                    success(response.data);
                }
            })
            .catch(() => {
                // dispatch(authError('Account with this email already exists'));
            });
    }

    if (items.length > 0 && success) {
        success();
    }
    dispatch({
        type: UPDATE_MARKET_TOKENS,
        payload: items
    });
};

/////////////////////////////////////////////////

export const updateAccount = (account) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: UPDATE_ACCOUNT,
        payload: account
    });
};


/////////////////////////////////////////////////

export const demoOn = (key, success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: DEMO_ON,
    });
};

export const demoOff = (key, success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: DEMO_OFF,
    });
};


/////////////////////////////////////////////////

export const activateKey = (key, success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: ACTIVATE_KEY,
        payload: key
    });
};

export const deactivateKey = (key, success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: DEACTIVATE_KEY,
        payload: key
    });
};

/////////////////////////////////////////////////

export const updateCollection = (update, success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: UPDATE_COLLECTION,
        payload: update
    });
};

/////////////////////////////////////////////////

export const updateCollectionItem = (item, success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: UPDATE_COLLECTION_ITEM,
        payload: item
    });
};


///////////////////////////////////////////////////

export const updateQueryString = (
    updatedState,
    location,
    history
) => dispatch => {
    let queryParams = qs.parse(location.search.substring(1));
    const updatedQuery = _.assign({}, queryParams, updatedState);
    const str = qs.stringify(updatedQuery);
    history.push({
        search: "?" + str
    });
};

/////////////////////////////////////////////////

export const showMenu = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: SHOW_APP_MENU,
    });

    if (success) {
        success();
    }
    document.body.classList.add("no-scroll");
};

export const hideMenu = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: HIDE_APP_MENU,
    });

    if (success) {
        success();
    }
    document.body.classList.remove("no-scroll");
};

/////////////////////////////////////////////////

export const updateTotalPixels = (total, clientWidth, clientHeight) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_TOTAL_PIXELS,
        total: total,
        clientWidth: clientWidth,
        clientHeight: clientHeight,
    });
}

export const updateTotalScrolledPixels = (px) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_TOTAL_SCROLLED_PIXELS,
        pixels: px
    });
}

/////////////////////////////////////////////////

export const setScrollTo = (px) => async (dispatch) => {
    dispatch({
        type: SCROLL_TO,
        payload: px
    });
}

export const resetScrollTo = (px) => async (dispatch) => {
    dispatch({
        type: SCROLL_TO_RESET
    });
}


/////////////////////////////////////////////////

export const showDrawer = (type, drawerData, element, drawerLocation) => async (
    dispatch,
    getState,
    api
) => {
    if (drawerData) {
        dispatch({
            type: SHOW_DRAWER,
            payload: type,
            drawerData: drawerData,
            element: element,
            drawerLocation: drawerLocation
        });
    } else {
        dispatch({
            type: SHOW_DRAWER,
            payload: type,
            element: element,
            drawerLocation: drawerLocation
        });
    }

    document.body.classList.add("no-scroll");
};

export const hideDrawer = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: HIDE_DRAWER
    });

    if (success) {
        success();
    }
    document.body.classList.remove("no-scroll");
};

