var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry: {
        app: path.join(__dirname, 'main.js'),
        vendors: ['jquery']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/build.js'
    },
    module: {
        rules: [
            // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.css$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: "style-loader", //使用的loader最终用什么loader去出来他
                    use: 'css-loader',
                    publicPath: '../'
                })
            },
            // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.scss$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            { test: /\.(jpg|.png|.gif|.bmp)$/, use: ['url-loader?limit=1024name=images/img-[hash:8].[ext]'] },
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ }
        ]
    },
    plugins: [

        new htmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
            minify: { //压缩html代码
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        //配置抽取分离第三方包
        new webpack.optimize.CommonsChunkPlugin({
            //这个属性找的是entry节点下配置的属性名
            name: 'vendors',
            //这里指的是分离出来叫什么名
            filename: 'js/vendors.js'
        }),
        //配置每次运行发布命令时。清除dist目录
        new cleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            //优化压缩js
            compress: {
                warnings: false //移出警告
            }
        }),
        //如果只配置上面的步骤可能有的电脑会报错，需要将NODE环境设置为生成环境
        new webpack.DefinePlugin({ //设置为产品上线环境
            'process.env.NODE_ENV': "production"
        }),
        //配置抽取CSS文件的插件
        new extractTextWebpackPlugin("css/styles.css"),
        //配置压缩CSS文件
        new optimizeCssAssetsWebpackPlugin()
    ]
}