import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { playerReducer } from "./playerReducer";
import { blocksReducer } from "./blocksReducer";
import { shapeReducer } from "./shapeReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    app: appReducer,
    auth: authReducer,
    player: playerReducer,
    blocks: blocksReducer,
    shape: shapeReducer
})