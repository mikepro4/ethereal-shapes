import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import {
    LOAD_SHAPE,
    LOAD_NEW_SHAPE,
    CLEAR_NEW_SHAPE,
    CLEAR_SHAPE
} from "./types";

export const getMainShape = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/shapes/main")
        .then(response => {

            dispatch({
                type: LOAD_SHAPE,
                payload: response.data[0]
            });

            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================

export const createShape = (shapeItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/shapes/create", shapeItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadShape = (id, single, success) => async (
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

            if(!single) {
                dispatch({
                    type: LOAD_SHAPE,
                    payload: response.data
                });
            }
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const loadNewShape = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_SHAPE,
        payload: data
    });
}

export const clearNewShape = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_SHAPE
    });
}


export const clearShape = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_SHAPE
    });
}

// ===========================================================================


export const searchShapes = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let criteria = {}

    if(type == "user") {
        criteria = {
            createdBy: identifier
        }
    }

    if(type == "featured_shapes") {
        criteria = {
            createdBy: "613422fe0ee5bd00212cd0a4"
        }
    }

    criteria = {
        notHidden: true
    }

    await api
        .post("/shapes/search", {
            criteria: criteria,
            sortProperty: "createdAt",
            offset: offset,
            limit: limit,
            order: "1"
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


export const deleteShape = (shapeId, shapeItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/posts/delete", { shapeId: shapeId, shape: postshapeItemItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateShape = (shape, data, success) => async (
    dispatch,
	getState,
	api
) => {

    let date

    if(data.main) {
        date = new Date()
    } else {
        date = null
    }

    let newMetadata = _.merge({}, shape.metadata, {
        title: data.title,
        main: data.main,
        mainDate: date
    })

    let newSHape = _.merge({}, shape.defaultViz.shape, data.shape)
    let newPoint = _.merge({}, shape.defaultViz.point, data.point)
    let newOverlay = _.merge({}, shape.defaultViz.point, data.overlay)

    let newShape = {
        ...shape,
        metadata: newMetadata,
        defaultViz: {
            shape: newSHape,
            point: newPoint,
            overlay: newOverlay,
            colors: data.colors
        }
    }


    await api
        .post("/shape/update", { 
            shapeId: newShape._id, 
            metadata: newShape.metadata,
            defaultViz: newShape.defaultViz,
            status: newShape.status
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

export const updateShapeHidden = (id, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/shape/updateHidden", { 
            shapeId: id, 
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

