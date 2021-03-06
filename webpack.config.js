var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname,'app', 'main.jsx');

module.exports = {
	devtool: 'source-map',
	entry: {
		App: [
		    //The script refreshing the browser on non hot updates
			'webpack-dev-server/client?http://localhost:8080',
			//for hot style updates
			'webpack/hot/dev-server', 
			//our app
			mainPath
		]
	},
	output: {
    	filename: 'bundle.js', // Will output App_wp_bundle.js
    	path: buildPath, // Save to Rails Asset Pipeline
  		publicPath: '/build/' // Required for webpack-dev-server
	},
	plugins: [  
  		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
    	extensions: ['', '.js', '.jsx'],
    	root: [
		    path.resolve(__dirname,'app'), path.resolve(__dirname, 'node_modules')
		  ]
  	},
  	module: {
		loaders: [
	    // I highly recommend using the babel-loader as it gives you
	    // ES6/7 syntax and JSX transpiling out of the box
     	{
	        test: /\.(js|jsx)$/,
	        loader: 'babel',
	        exclude: /node_modules/,
	        query: {
	            cacheDirectory: true,
	            presets: ['es2015', 'react']
	        }
        },
	    // Let us also add the style-loader and css-loader, which you can
	    // expand with less-loader etc.
	    {
		    test: /\.css$/,
		    loader: 'style!css'
	    },
	    {
        	test: /\.less$/,
        	loader: "style!css!less"
      	}
   	]
 	}
};