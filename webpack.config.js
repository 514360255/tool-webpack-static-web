/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/2/27
 */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        _$: './src/static/js/_$/_$.ts'
    },
    output: {
        filename: 'static/js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            },
            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                      {loader: 'css-loader'},
                      {loader: 'postcss-loader'}
                  ],
                  publicPath: '../css'
              })

            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"sass-loader"
                    }]
                })
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'[name]-[hash:5].[ext]',
                            limit: 1000,
                            outputPath:'static/images/' // html和css中图片的输出路径
                        }
                    },
                    {
                        loader:'img-loader',
                        options:{
                            quality: 80
                        }
                    },
                    {
                        loader:'html-loader',
                        options:{
                            attrs:['img:src','img:data-src']
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx']
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new ExtractTextPlugin('static/css/[name].css'),
        new htmlWebpackPlugin({
            template: './src/view/index.html',
            filename: 'index.html',
            title: 'demo',
            chunks: ['_$']
        })
    ]
};
