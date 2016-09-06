"use strict";

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

const keys = {
	env: {
		dev: 'development',
		prod: 'production'
	}
};

const NODE_ENV = process.env.NODE_ENV || keys.env.dev;

module.exports = {

	context: __dirname + '/www',

	// entry: './home', // simple variant of 'entry: {..<several entry points>..}'
	entry: ['./js/main', './css/main'],
	output: {
		path: __dirname + '/dist', // relative path is available, bot not recommended
		filename: 'build.js'
	},

	watch: NODE_ENV === keys.env.dev,

	watchOptions: {
		aggregateTimeout: 300
	},

	devtool: NODE_ENV === keys.env.dev ? 'source-map' : null,

	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!sass')
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			},
			{
				test: /\.dot$/,
				loader: 'dot'
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},

	resolve: {
		modulesDirectories: ['', 'www', 'node_modules'],
		extensions: ['', '.js', '.json', '.scss', '.css', '.dot']
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new ExtractTextPlugin('main.css')
	]

};
