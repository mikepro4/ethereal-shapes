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
    SHOW_DRAWER,
    HIDE_DRAWER,
    ACTIVATE_KEY,
    DEACTIVATE_KEY,
    UPDATE_ACCOUNT,
    UPDATE_MARKET_TOKENS
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

export const updateMarketTokens = (success) => async (
    dispatch,
	getState,
	api
) => {

    const provider = new ethers.providers.JsonRpcProvider("");
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

    if(items.length > 0 && success) {
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

export const demoOff= (key, success) => async (
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
    if(drawerData) {
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

