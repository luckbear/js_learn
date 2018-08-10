const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vuePlugin = require('vue-loader/lib/plugin')


const isDev = process.env.NODE_ENV == 'development'

const config = {
    target: 'web',
    // entry:path.join(__dirname,'./src/main.js'),
    // output:{
    //     path:path.join(__dirname,'./dist'),
    //     filename:'bundle.js'
    // },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new htmlWebpackPlugin({
            title:'vue_todo',
            template: './src/index.html',
            // filename: 'index.html',
        }),
        new vuePlugin()
    ],
    module: {
        rules: [{
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
            // {test:/\.(png|jpg|gif)$/,use:'url-loader?limit=44077'},
            // {test:/\.(ttf|woff|svg|woff2|eot)$/,use:'url-loader'},
            // {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    }
};

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 3008,
        open: true,
        contentBase: 'src',
        hot: true,
        // host: '0.0.0.0',
        overlay: {
            error: true
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
    //生产环境配置
}


module.exports = config