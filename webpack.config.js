const path = require('path')   //引入node内置模块path
const webpack = require('webpack')

let HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports ={
    mode: 'development',
    devServer: {
        hot: true,
        port: 4321
    },
    entry: { // 入口文件，把src下的main.js编译到出口文件
        app: './src/main.js'
    },
    output:{                   //出口文件
        path:path.resolve(__dirname,'dist'),   //出口路径和目录
        filename:"bundle.js"                     //编译后的名称
    },
    module:{
        rules:[  {
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }, {
            test:/\.css$/,
            use:['style-loader','css-loader']
        },{
            test:/\.(jpg|png|gif)$/,
            use:'url-loader?limit=8192'
        }, {
            test:/\.(eot|svg|woff|woff2|wtf)$/,
            use:'url-loader'
        }]
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({  //自动插入到dist目录中
            template:path.resolve(__dirname, './index.html'),//模板路径
            filename:'index.html',//自动生成的HTML文件的名称
            inject: true
        })
    ]
}