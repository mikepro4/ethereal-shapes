const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')


const assetsPluginInstance = new AssetsPlugin({
	includeManifest: "manifest",
	prettyPrint: true
});

const VENDOR_LIBRARIES = [
	"react",
	"react-dom",
	"react-router-dom",
	"axios",
	"react-router-config",
	"redux",
	"react-redux",
	"redux-thunk",
	"react-helmet"
];

const config = {
	entry: {
		bundle: ["./src/client/client.js"],
		vendor: VENDOR_LIBRARIES
	},
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "[name].[hash:8].js",
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest"],
			minChunks: Infinity
		}),
		new ExtractTextPlugin("style.[contenthash:8].css"),
		assetsPluginInstance,
        // fixes Module not found: Error: Can't resolve 'stream' in '.../node_modules/nofilter/lib'
        new NodePolyfillPlugin(),
        // Note: stream-browserify has assumption about `Buffer` global in its
        // dependencies causing runtime errors. This is a workaround to provide
        // global `Buffer` until https://github.com/isaacs/core-util-is/issues/29
        // is fixed.
        new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
        }),
	],
    
};

let mergedConfig = merge(baseConfig, config);

if (process.env.NODE_ENV === "production") {
	const prod = {
		plugins: [
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV)
				}
			}),
			new UglifyJsPlugin({
				test: /\.js($|\?)/i,
				sourceMap: true,
				uglifyOptions: {
					mangle: {
					keep_fnames: true,
					},
					compress: {
                        inline:false,
					    warnings: false,
					},
					output: {
					beautify: false,
					}
				}
			})
		]
	};
	mergedConfig = merge(mergedConfig, prod);
}

if (process.env.NODE_ENV === "development") {
	const getVendorFilename = buildAssets => [buildAssets.vendor.js];
	const pathsToClean = ["public"];
	const cleanOptions = {
		watch: true
	};

	const dev = {
		plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)],
		devtool: "source-map"
	};

	mergedConfig = merge(mergedConfig, dev);
}

module.exports = mergedConfig; 