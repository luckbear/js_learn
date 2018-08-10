const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')
const vue_loader = require('vue-loader/lib/plugin')


module.exports = {
    // entry:,
    //output:{},
    devServer: {
        port: 8090,
        hot: true,
        open: true,
        contentBase: 'src',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=44077' },
            { test: /\.(ttf|woff|svg|woff2|eot)$/, use: 'url-loader' },
            // { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            template: './src/index.html'
        }),
        new vue_loader(),
        new webpack.HotModuleReplacementPlugin()
    ]
}