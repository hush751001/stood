var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		main: './src/client/js/client.js'
	},
	output: {
		path: path.resolve('./dist/client/js'),
		filename: 'client.js'
	},
	module: {
		loaders: [		
			{
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=../images/[hash].[ext]',
					'image-webpack-loader'
				]
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
		new webpack.optimize.UglifyJsPlugin()
	]	
};
