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
		fallback:   paths.nodePaths,
		extensions: [ '.js', '.json', '.jsx', '.ts', '.tsx', '' ],
		alias:      {
			'react-native': 'react-native-web',
		},
		root: [
			path.resolve( __dirname, '../src' ),
		],
	},
	
	module: {
		loaders: [
			{
				test:    /\.tsx?$/,
				include: paths.appSrc,
				loader:  'awesome-typescript-loader',
			},
			{
				test:   /\.less$/,
				loader: 'style!css?importLoaders=1!postcss!less',
			},
			{
				test:   /\.json$/,
				loader: 'json',
			},
			{
				test:   /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'file',
				query:  {
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
			{
				test:   /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
				loader: 'url',
				query:  {
					limit: 10000,
					name:  'static/media/[name].[hash:8].[ext]',
				},
			},
		],
	},
	
	postcss() {
		return [
			autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9', // React doesn't support IE8 anyway
				],
			}),
		];
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
