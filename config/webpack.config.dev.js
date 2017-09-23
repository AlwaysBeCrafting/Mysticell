const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const paths = require('./paths');
const publicPath = '/';
const publicUrl = '';

module.exports = {
	devtool: 'source-map',
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			paths.appIndex,
		],
	},
	output: {
		path: paths.appDist,
		pathinfo: true,
		filename: '[name].js',
		chunkFilename: '[name].js',
		publicPath,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		modules: [
			path.resolve(__dirname, '../src'),
			'node_modules',
		],
	},
	
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: paths.appSrc,
				use: [
					'react-hot-loader/webpack',
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
			{
				test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
		],
	},

	devServer: {
		hot: true,
		inline: false,
		quiet: true,
		port: 3000,
		historyApiFallback: true,
		publicPath,
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
		}),
		new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new ForkTsCheckerPlugin({
			tslint: true,
			async: false,
		}),
		new FriendlyErrorsPlugin({
			compilationSuccessInfo: {
				messages: ['Dev server running at http://localhost:3000'],
			},
		}),
	],
};
