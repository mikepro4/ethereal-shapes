import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import Router from "./router";
import reducer from "./redux/reducers";
import { configure as configureStore } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";

import "./styles/main.scss";

const PROXY_ROUTE = "/api";

let axiosInstance 
console.log("WINDOW: ", window)
if (window && window.localStorage !== ["Exception: DOMException: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag. at s (<anonymous>:1:83)"] && typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    axiosInstance = axios.create({
        baseURL: PROXY_ROUTE,
        headers: { "authorization": `${token}` }
    });
} else {
    axiosInstance = axios.create({
        baseURL: PROXY_ROUTE,
    });
}
// const token = localStorage.getItem('token');
// const axiosInstance = axios.create({
//     baseURL: PROXY_ROUTE,
//     headers: { "authorization": `${token}` }
// });

const { history, store } = configureStore(
    window.INITIAL_STATE,
    reducer,
    axiosInstance
);

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history} location={this.props.location}>
                    <div>{renderRoutes(Router)}</div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

// This line connects rendered DOM elements with the React app
ReactDOM.hydrate(<Main />, document.getElementById("app"));