var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, 'main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
        rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|.png|.gif|.bmp)$/, use: ['url-loader?limit=1024'] },
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ }
        ]
    },
    devServer: {
        hot: true,
        port: 8089,
        open: true,
        openPage: 'index.html'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html'
        })
    ]
}