var webpack = require('webpack')

module.exports = {
	context : __dirname,
	entry: './js/paint.js',
	output : {
		path : __dirname + '/dist',
		filename : 'paint.js'
	},
	module: {
		rules: [
				{
						test: /\.js$/,
						loader: 'babel-loader',
						query: {
								presets: ['es2015']
						}
				}
		]
	}
}