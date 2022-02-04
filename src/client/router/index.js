import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import Login from "../react/pages/auth/login"
import Signup from "../react/pages/auth/signup"
import Logout from "../react/pages/auth/logout"
import Mint from "../react/pages/mint"
import NFT from "../react/pages/nft"

export default [
    {
        ...App,
        routes: [
            {
                ...Home,
                path: "/",
                exact: true,
                params: {
                    name: "home"
                }
            },
            {
                ...NFT,
                path: "/nft",
                exact: true,
                params: {
                    name: "New NFT"
                }
            },
			{
				...Login,
				path: "/auth/login",
				params: {
					name: "login"
				}
			},
			{
				...Signup,
				path: "/auth/signup",
				params: {
					name: "signup"
				}
			},
			{
				...Logout,
				path: "/auth/logout",
				params: {
					name: "logout"
				}
			},
			{
				...Mint,
				path: "/mint",
				params: {
					name: "mint"
				}
			},
            {
                ...NFT,
                path: "/:tokenId",
                exact: true,
                params: {
                    name: "Market NFT"
                }
            },
        ]
    }
];