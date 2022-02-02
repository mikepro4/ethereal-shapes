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
    UPDATE_ACCOUNT
} from "./types";

import * as _ from "lodash";
import qs from "qs";

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

export const showDrawer = (type, drawerData, success) => async (
    dispatch,
	getState,
	api
) => {
    if(drawerData) {
        dispatch({
            type: SHOW_DRAWER,
            payload: type,
            drawerData: drawerData
        });
    } else {
        dispatch({
            type: SHOW_DRAWER,
            payload: type,
        });
    }
    

	if (success) {
		success();
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

