import {
    LOAD_SHAPE,
    CLEAR_SHAPE,
    LOAD_NEW_SHAPE,
    CLEAR_NEW_SHAPE
} from '../actions/types';

export const initialState = {
    currentShape: {},
    newShape: {}
};

  
export const shapeReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_SHAPE:
            return { ...state,
                currentShape: action.payload
            };
        case LOAD_NEW_SHAPE:
            return { ...state,
                newShape: action.payload
            };
        case CLEAR_SHAPE:
            return { ...state,
                currentShape: {}
            };
        case CLEAR_NEW_SHAPE:
            return { ...state,
                newShape: {}
            };
        }

    return state;
}
