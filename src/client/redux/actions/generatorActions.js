import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";
import update from "immutability-helper";

import {
    LOAD_COLLECTION,
    CLEAR_COLLECTION
} from "./types";

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


export const updateGeneratorDetails = (generator, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/generator/update", { 
            generatorId: generator._id, 
            metadata: generator.metadata,
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


