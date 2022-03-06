import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";
import update from "immutability-helper";

import {
} from "./types";

// ===========================================================================

export const createTranscript = (transcriptItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/transcripts/create", transcriptItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================

export const loadTranscript = (id, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/transcripts/item", { transcriptId: id })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================

export const searchTranscripts = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let criteria = {
        nftId: query.nftId
    }

    await api
        .post("/transcripts/search", {
            criteria: criteria,
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

export const deleteTranscript = (transcriptId, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/transcripts/delete", { transcriptId: transcriptId })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

