const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const webpackNodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = {
	target: "node",
	entry: "./src/server.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "build")
	},
	externals: [webpackNodeExternals(), 
        ]
};

module.exports = merge(baseConfig, config); 