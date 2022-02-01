import React from "react";
import { renderToString } from "react-dom/server";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";
import Router from "../client/router";
import { ConnectedRouter, push } from "connected-react-router";

export default (
    expressRequest,
    reduxStore,
    buildAssets,
    routerContext = {},
    history
) => {

    const injectAssets = assets => {
        const assetNameWeights = {
            manifest: 1,
            vendor: 2,
            bundle: 3
        };


        return Object.entries(assets)
            .sort((firstElement, secondElement) => {
                if (
                    assetNameWeights[firstElement[0]] < assetNameWeights[secondElement[0]]
                )
                    return -1;
                else if (
                    assetNameWeights[firstElement[0]] ===
                    assetNameWeights[secondElement[0]]
                )
                    return 0;
                return 1;
            })
            .reduce((accumulatorString, currentElement) => {
                if (currentElement[0] == "vendor" || currentElement[0] == "bundle" || currentElement[0] == "manifest") {
                    accumulatorString += `<script src='/${currentElement[1].js}'></script>`;

                    return accumulatorString;
                } else return ""
            }, "");
    };
    // reduxStore.dispatch(push(expressRequest.path));

    const content = renderToString(
        <Provider store={reduxStore}>
            <ConnectedRouter history={history}>
                <div>{renderRoutes(Router)}</div>
            </ConnectedRouter>
        </Provider>
    );

    const helmetInstance = Helmet.renderStatic();
    const html = `
    <html lang="en">
      <head>
        ${helmetInstance.title.toString()}
        ${helmetInstance.meta.toString()}
        <link rel="stylesheet" href="/${buildAssets.bundle.css}">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#0000000">
        <meta property="og:url" content="https://www.mikhail.co />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mikhail Proniushkin" />
        <meta property="og:description" content="Design, Tech & Techno" />
        <meta property="og:image" content="https://res.cloudinary.com/dcdnt/image/upload/v1631067755/mikhail.png" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
    </head>

    <body id="body">
        <div id="app">${content}</div>
        <script>
            window.INITIAL_STATE= ${serialize(reduxStore.getState())}
            window.BASE_API_URL = ${process.env.BASE_API_URL && `"${process.env.BASE_API_URL}"`}
        </script>
        ${injectAssets(buildAssets)}
    </body>

    </html>
  `;

    return html;
};