const path = require("path");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
	const isProduction = env === "production";
	//const CSSExtract = new ExtractTextPlugin("styles.css");

	console.log("env", env);
	return {
		entry: "./src/app.js",
		output: {
			path: path.join(__dirname, "public"),
			filename: "bundle.js",
		},
		module: {
			rules: [
				{
					loader: "babel-loader", //for es6 & jsx features to browser understandable es5 code
					test: /\.js$/,
					exclude: /node_modules/,
				},
				{
					test: /\.s?css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								publicPath: path.join(__dirname, "public"),
							},
						},
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
							},
						}, // to import css using '@import' and interprets to import/require
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
							},
						}, //to compile scss to css
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "styles.css",
			}),
		],
		// plugins: [CSSExtract],
		devtool: isProduction ? "source-map" : "inline-source-map", //build-rebuild for sourcemaps makes faster rebuild process

		devServer: {
			contentBase: path.join(__dirname, "public"),
			historyApiFallback: true, // to let webpack not to make http request to server with url route getting changed
			//and to let browser handle client-side routing
		},
	};
};

// "style-loader", // inject css into the DOM
// "css-loader", // to import css using '@import' and interprets to import/require
// //===//
// "sass-loader", //to compile scss to css
// // use is for multiple loaders
