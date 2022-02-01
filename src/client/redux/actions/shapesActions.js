import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import {
    LOAD_SHAPE,
} from "./types";


export const loadShape = (id, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/shapes/item", { shapeId: id })
        .then(response => {
            if (success) {
                success(response.data);
            }

            dispatch({
                type: LOAD_SHAPE,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}