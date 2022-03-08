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
import Iteration2 from "../react/pages/iteration2"
import Collections from "../react/pages/collections"
import Collection from "../react/pages/collection"

export default [
    {
        ...App,
        routes: [
            {
                ...Iteration1,
                path: "/",
                exact: true,
                params: {
                    name: "home"
                }
            },
            {
                ...Collection,
                path: "/collection",
                exact: true,
                params: {
                    name: "collection"
                }
            },
            {
                ...Collections,
                path: "/collections",
                exact: true,
                params: {
                    name: "collections"
                }
            },
            {
                ...Iteration2,
                path: "/iteration2",
                exact: true,
                params: {
                    name: "iteration 2"
                }
            },
            {
                ...Home,
                path: "/featured",
                exact: true,
                params: {
                    name: "Featured"
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