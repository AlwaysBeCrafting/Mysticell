const path = require( 'path' );
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require( './paths' );
const publicPath = '/';
const publicUrl = '';

module.exports = {
	devtool: 'source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		paths.appIndex,
	],
	output: {
		path:     paths.appDist,
		pathinfo: true,
		filename: 'static/js/bundle.js',
		publicPath,
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx' ],
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
					name:  'static/media/[name].[hash:8].[ext]',
				},
			},
		],
	},

	devServer: {
		hot: true,
		inline: false,
		port: 3000,
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject:   true,
			template: paths.appHtml,
		}),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	],
};
