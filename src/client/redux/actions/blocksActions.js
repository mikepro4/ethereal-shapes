import {
    INIT_UPLOAD,
    ADD_BLOCK,
    SAVE_BLOCKS_INIT
} from '../actions/types';

export const initUpload = (position, currentBlocks, files) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: INIT_UPLOAD,
        payload: {
            position: position,
            currentBlocks: currentBlocks,
            files: files
        }
    });
}

export const addBlock = (block) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type:ADD_BLOCK,
        payload: {
            block: block
        }
    });
}

export const initSave = () => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: SAVE_BLOCKS_INIT,
    });
}
