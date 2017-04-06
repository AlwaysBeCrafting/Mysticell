const path = require( 'path' );
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
	devtool: 'source-map',
	entry:   [
		require.resolve('react-dev-utils/webpackHotDevClient'),
		require.resolve('./polyfills'),
		paths.appIndexJs,
	],
	output: {
		path:     paths.appBuild,
		pathinfo: true,
		filename: 'static/js/bundle.js',
		publicPath,
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx' ],
		alias:      {
			'react-native': 'react-native-web',
		},
		modules: [
			path.resolve( __dirname, '../src' ),
			'node_modules',
		],
	},
	
	module: {
		rules: [
			{
				test:    /\.tsx?$/,
				include: paths.appSrc,
				loader:  'awesome-typescript-loader',
			},
			{
				test:   /\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test:   /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'file-loader',
				options:  {
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
			{
				test:   /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
				loader: 'url-loader',
				options:  {
					limit: 10000,
					name:  'static/media/[name].[hash:8].[ext]',
				},
			},
		],
	},

	plugins: [
		new InterpolateHtmlPlugin({
			PUBLIC_URL: publicUrl,
		}),
		new HtmlWebpackPlugin({
			inject:   true,
			template: paths.appHtml,
		}),
		new webpack.DefinePlugin(env),
		new webpack.HotModuleReplacementPlugin(),
		new CaseSensitivePathsPlugin(),
		new WatchMissingNodeModulesPlugin(paths.appNodeModules),
	],
	node: {
		fs:  'empty',
		net: 'empty',
		tls: 'empty',
	},
};
