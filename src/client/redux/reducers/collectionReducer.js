import * as _ from "lodash";
import update from "immutability-helper";

import {
    LOAD_COLLECTION,
    CLEAR_COLLECTION
} from "../actions/types";

export const initialState = {
    details: null
};

export const collectionReducer = (state = initialState, action) => {
	switch (action.type) {
        case LOAD_COLLECTION:
            return {
                ...state,
                details: action.payload,
            } ;
        case CLEAR_COLLECTION:
            return {
                ...state,
                details: null,
            } ;
		default:
			return state;
	}
};

