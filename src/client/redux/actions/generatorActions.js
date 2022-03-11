import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";
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
} from "./types";

// ===========================================================================

export const startRecord = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: START_RECORD_NFT
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const stopRecord = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: STOP_RECORD_NFT
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const updateIteration = (iteration, success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: UPDATE_ITERATION,
        payload: iteration
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const prevIteration = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: PREV_ITERATION,
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const nextIteration = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: NEXT_ITERATION,
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const stopGenerator = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: STOP_GENERATOR,
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const pauseGenerator = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: PAUSE_GENERATOR,
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const playGenerator = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: PLAY_GENERATOR,
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const clearGenerator = (success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: CLEAR_GENERATOR,
    });
    
    if (success) {
        success();
    }
};

// ===========================================================================

export const loadGeneratorToState = (generator, success) => async (
    dispatch,
    getState,
    api
) => {
    dispatch({
        type: LOAD_GENERATOR,
        payload: generator
    });

    if (success) {
        success();
    }
};

// ===========================================================================

export const createGenerator = (generatorItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/generators/create", generatorItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================

export const loadGenerator = (id, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/generators/item", { generatorId: id })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const searchGenerators = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let criteria = {}

    await api
        .post("/generators/search", {
            criteria: query,
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


export const deleteGenerator = (generatorId, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/generators/delete", { generatorId: generatorId })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateGenerator = (generator, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/generator/update", generator)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


