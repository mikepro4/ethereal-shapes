import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import Login from "../react/pages/auth/login"
import Signup from "../react/pages/auth/signup"
import Logout from "../react/pages/auth/logout"
import Mint from "../react/pages/mint"
import NFT from "../react/pages/nft"
import All from "../react/pages/all"
import Sale from "../react/pages/sale"
import MyNFTs from "../react/pages/mynfts"
import About from "../react/pages/about"
import Admin from "../react/pages/admin"
import Shapes from "../react/pages/shapes"
import Review from "../react/pages/review"
import Planet from "../react/pages/planet"
import Iteration1 from "../react/pages/iteration1"

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
                ...Iteration1,
                path: "/iteration1",
                exact: true,
                params: {
                    name: "iteration 1"
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

                ...All,
                path: "/all",
                exact: true,
                params: {
                    name: "All NFTs"
                }
            },
            {

                ...Sale,
                path: "/sale",
                exact: true,
                params: {
                    name: "on Sale"
                }
            },
            {

                ...MyNFTs,
                path: "/my-nfts",
                exact: true,
                params: {
                    name: "My Nfts"
                }
            },
            {

                ...About,
                path: "/about",
                exact: true,
                params: {
                    name: "My Nfts"
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
                ...Admin,
                path: "/admin",
                exact: true,
                params: {
                    name: "admin"
                }
            },
            {
                ...Shapes,
                path: "/shapes",
                exact: true,
                params: {
                    name: "admin"
                }
            },
            {
                ...Review,
                path: "/review",
                exact: true,
                params: {
                    name: "review"
                }
            },
            {
                ...Planet,
                path: "/planet",
                exact: true,
                params: {
                    name: "review"
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