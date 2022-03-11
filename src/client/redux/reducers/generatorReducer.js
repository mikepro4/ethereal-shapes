import * as _ from "lodash";
import update from "immutability-helper";

import {
    LOAD_GENERATOR,
    CLEAR_GENERATOR,
    PLAY_GENERATOR,
    PAUSE_GENERATOR,
    STOP_GENERATOR,
    NEXT_ITERATION,
    PREV_ITERATION,
    UPDATE_ITERATION,
    START_RECORD_NFT,
    STOP_RECORD_NFT
} from "../actions/types";

export const initialState = {
    details: null,
    status: "stop",
    record: false,
    currentIteration: 0
};

export const generatorReducer = (state = initialState, action) => {
	switch (action.type) {
        case START_RECORD_NFT:
            return {
                ...state,
                record: true
            } ;
        case STOP_RECORD_NFT:
            return {
                ...state,
                record: false
            } ;
        case PLAY_GENERATOR:
            return {
                ...state,
                status: "play"
            } ;
        case PAUSE_GENERATOR:
            return {
                ...state,
                status: "pause"
            } ;
        case STOP_GENERATOR:
            return {
                ...state,
                status: "stop",
                currentIteration: 0
            } ;
        case NEXT_ITERATION:
            return {
                ...state,
                currentIteration: state.currentIteration + 1
            } ;
        case PREV_ITERATION:
            return {
                ...state,
                currentIteration: state.currentIteration - 1
            } ;
        case UPDATE_ITERATION:
            return {
                ...state,
                currentIteration: action.payload
            } ;
        case LOAD_GENERATOR:
            return {
                ...state,
                details: action.payload,
            } ;
        case CLEAR_GENERATOR:
            return {
                ...state,
                details: null,
            } ;
		default:
			return state;
	}
};

