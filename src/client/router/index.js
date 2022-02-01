import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import Login from "../react/pages/auth/login"
import Signup from "../react/pages/auth/signup"
import Logout from "../react/pages/auth/logout"

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
        ]
    }
];