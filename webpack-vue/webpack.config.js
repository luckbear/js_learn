const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoader = require('vue-loader/lib/plugin')

module.exports = {
    entry:path.join(__dirname,'src/index.js'),
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    mode:'development',
    devServer:{
        port:3000,
        open:true,
        contentBase:'src',
        hot:true

    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new vueLoader()
    ],
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    resolve:{
        alias:{
            // 'vue$':'vue/dist/vue.js'
        }
    }
}