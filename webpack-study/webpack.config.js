const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './dist')
    },
    mode: 'development',
    devServer: {
        port: 3000,
        contentBase: 'src',
        open: true,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test: /\.css$/,use:['style-loader','css-loader']},
            {test:/\.(png|jpg|gif)$/,use:'url-loader?limit=44077'},
            {test:/\.(ttf|woff|svg|woff2|eot)$/,use:'url-loader'}
            
        ]
    }
}