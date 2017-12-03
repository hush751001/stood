var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		main: './src/client/js/client.js'
	},
	devtool: 'eval-source-map',
	output: {
		path: path.resolve('./dist/client/js'),
		filename: 'client.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [{
						loader: "style-loader"
				}, {
						loader: "css-loader", options: {
								sourceMap: true
						}
				}, {
						loader: "sass-loader", options: {
								sourceMap: true
						}
				}]

			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
          {
            loader: 'file-loader',
            options: {
							publicPath: 'js/'
						}  
          }
        ]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]	
};
