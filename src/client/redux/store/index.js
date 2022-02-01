import * as redux from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware, routerReducer, connectRouter, push } from "connected-react-router";

import { createBrowserHistory, createMemoryHistory } from "history";

const INITIAL_STATE = {};

export const configure = (
    initialState = INITIAL_STATE,
    reducers = {},
    axiosInstance = null,
    fromServer: null,
    path
) => {
    let history;

    if (fromServer) {
        history = createMemoryHistory();
    } else {
        history = createBrowserHistory();

        // Analytics will be tracked here
        history.listen(location => console.log("Track route change: ", location));
    }

    const initializedRouterMW = routerMiddleware(history);

    const middlewares = axiosInstance
        ? [thunk.withExtraArgument(axiosInstance)]
        : [thunk];
    const appliedMiddlewares = redux.applyMiddleware(
        ...middlewares,
        initializedRouterMW
    );
    const composeArguments = [appliedMiddlewares];

    if (global.window !== undefined) {
        composeArguments.push(
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : _ => _
        );
    }

    // THIS IS SUPER IMPORTANT
    if (fromServer) {
        history.push(path);
    }

    const composedEnhancer = redux.compose(...composeArguments);
    const store = redux.createStore(reducers(history), initialState, composedEnhancer);

    return { history, store };
};
